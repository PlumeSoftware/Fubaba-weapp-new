/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-var */
/* eslint-disable object-curly-spacing */
import { webGet } from '../../utils/http';
import CryptoJS from "crypto-js";
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({
  data: {
    showMap: false,
    covers: [
      {
        latitude: 23.099994,
        longitude: 113.30452,
        iconPath: '../../../images/location.png'
      }
    ],
    showShare: false,
    attentioned: false,
    ad_remark: [] as string[],
    imgUrls: [] as string[],
    setPhone: '',
    shareTitle: '',
    shareUrl: '',
    shareObject: {},
    indicatorDots: true,
    existVr: false,
    open: false,
    //房源类型，1-二手房 0-租房
    req_type: 1,

    base: {} as any, //房源基础信息
    housing: {} as any, //房源详细信息
    picture: {} as any, //房源图片
    agent: {} as any,// 经纪人信息

    doingAttention: false,//是否已关注

  },

  async onLoad() {
    console.log(getApp().city)
    // 显示的数据优先级：若不为经纪人，则 参数中的经纪人id > 本地存储绑定的经纪人id > 服务端存储的经纪人id > 网络获取

    const pages = getCurrentPages();
    const listingDetails = pages[pages.length - 1].options; // 获取url中的参数

    //参数存在分享码，记录当前页面的分享码
    if (listingDetails['sharingCode'] && listingDetails['sharingCode'] != 'null') {
      wx.setStorageSync('sharingCode', listingDetails['sharingCode']);
    } else {
      wx.setStorageSync('sharingCode', 'null');
    }

    //参数存在新的经纪人信息（电话）和分享码,且当前用户非经纪人，前端绑定该新的经纪人，同一分享码只触发一次
    //参数存在城市信息，进行修改

    //获取房源详情-二手房api
    await webGet(`/api/${listingDetails['req_type'] == '1' ? 'ershoufang' : 'renthouse'}/selling-houses/${listingDetails['req_id']}/${listingDetails['sharingCode']}`).then(
      (res: any) => {
        //设置房源类型为租房
        this.setData({ req_type: res.data['req_type'] })
        let pay_way;
        switch (Number(res.data['req_price_way'])) {
          case 1: pay_way = '月付押一'; break;
          case 3: pay_way = '季付押一'; break;
          case 6: pay_way = '半年付押一'; break;
          case 12: pay_way = '年付押一'; break;
        }

        //设置房源信息
        const imgUrlArr: string[] = [];
        res.data.housing.pictures.forEach((item: { picture_name: string }) => imgUrlArr.push('http://haomai.51fubaba.com/picture/house_picture/' + item.picture_name));


        const { hus_rooms, hus_halls, hus_kitchens, hus_toilets, hus_expose, hus_build_name } = res.data.housing
        //补充房源信息
        const model = [];
        if (hus_rooms && hus_rooms !== '0') model.push(`${hus_rooms}室`);
        if (hus_halls && hus_halls !== '0') model.push(`${hus_halls}厅`);
        if (hus_kitchens && hus_kitchens !== '0') model.push(`${hus_kitchens}厨`);
        if (hus_toilets && hus_toilets !== '0') model.push(`${hus_toilets}卫`);

        //判断参数情况
        this.data.housing.hus_expose = hus_expose == "null" ? '' : hus_expose;

        console.log(model)
        this.setData({
          base: res.data,
          housing: res.data.housing,
          imgUrls: imgUrlArr,
          pay_way: pay_way,
          title: model.join(''),//房型
          ad_remark: res.data.ad_remark?.split("\n"), //分行用
          shareTitle: hus_build_name + model.join(''),//分享时的标题
        });

      })
    // WxappApis.default.checkVrExist(listingDetails.req_id!).then(res => this.setData({ existVr: res }))

    //获得经纪人信息
    const agent = await webGet<{ data: {} }>(`/api/agent/get/${listingDetails['agent_tel']!.slice(0, 11)}`)
    //参数存在经纪人信息，当前用户也为经纪人，则不考虑参数情况，请求为网络请求的数据（开发者）
    if (wx.getStorageSync('erptoken')) {
      this.setData({ isagent: true })
      this.setData({ agent: agent!.data })
      //经纪人不需要处理原先的分享码，故重新生成，并存储
    } else {
      //非经纪人
      if (wx.getStorageSync('agent_tel')) {
        //已绑定经纪人的用户，将当前页面显示为绑定经纪人的联系方式
        const agent = {
          agent_user_id: wx.getStorageSync('agent_user_id'),
          agent_real_name: wx.getStorageSync('agent_real_name'),
          agent_tel: wx.getStorageSync('agent_tel')
        }
        this.setData({ agent: agent })
      } else {
        //未绑定经纪人的用户，自行进入小程序时，采用为网络请求的数据（开发者）
        this.setData({ agent: agent!.data })
      }
    }

    // 相关房源api
    webGet(`/api/${this.data.base.req_type ? 'ershoufang' : 'renthouse'}/selling-houses/20210221016/related-houses`)
      .then((res: any) => {
        res.data.forEach((item: any) => {
          //使下一个房源保持分享页面模式
          item.req_type = this.data.base.req_type
          item.sharingCode = wx.getStorageSync('sharingCode');
        })
        // }
        console.log(res.data)
        this.setData({
          relatedHouses: res.data
        });
      });
    // 转发api
    wx.showShareMenu({
      withShareTicket: true,
      // menus: ['shareAppMessage', 'shareTimeline']
      menus: ['shareAppMessage']
    })

    // 获取关注房源api，判断是否已经关注
    // if (wx.getStorageSync('token')) {
    //   WxappApis.default
    //     .loginMyFavorite(listingDetails.req_id)
    //     .then((res: any) => {
    //       res.data.forEach((item: any) => {
    //         if (item.req_id === listingDetails.req_id) {
    //           this.setData({
    //             attentioned: true
    //           });
    //         }
    //       });
    //     });
    // }
  },

  //处理丢失资源的图片
  errorLoadImage(e: any) {
    const imgUrlArr: Array<string> = this.data.imgUrls;
    imgUrlArr.splice(imgUrlArr.findIndex((item: string) => item == e.target.dataset.errorimg), 1)
    if (!imgUrlArr.length) {
      imgUrlArr.push("../../../images/logo.png")
    }
    this.setData({
      imgUrls: imgUrlArr
    });
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: false
    });
  },
  onClick() {
    this.setData({ showShare: true });
  },

  onClose() {
    this.setData({ showShare: false });
  },

  onSelect(event: { detail: { name: any } }) {
    Toast(event.detail.name);
    this.onClose();
  },

  onShareAppMessage() {
    let url: string = this.data.shareUrl;

    //复制原先的参数，无论是携带参数进入还是网络请求
    const options = JSON.parse(JSON.stringify(this.data.shareObject));

    //由经纪人进行分享，修改分享后的参数，上传分享码
    if (wx.getStorageSync('erptoken')) {
      options['agent_user_id'] = wx.getStorageSync('agent_user_id');
      options['agent_real_name'] = wx.getStorageSync('agent_real_name');
      options['agent_tel'] = wx.getStorageSync('agent_tel');
      // WxappApis.default.uploadSharingCode(wx.getStorageSync('sharingCode'), wx.getStorageSync('agent_user_id'), wx.getStorageSync('present_req'));
    }

    const optionKeys: Array<string> = Object.keys(options);
    optionKeys.forEach((key: string) => {
      if (options[key] != 'null')
        url = url + key + '=' + options[key] + '&';
    })
    url = url + `sharingCode=${wx.getStorageSync('sharingCode')}`;
    url = url + `&city=${wx.getStorageSync('city')}`;
    return {
      title: this.data.shareTitle,
      path: url,
    }
  },
  toVrView() {
    wx.navigateTo({
      url: '/pages/public/vr-webview/vr-webview'
    });
  },

  // 回到首页方法
  onClickHome() {
    wx.reLaunch({
      url: '/pages/public/home/home'
    })
  },

  onPaper() {
    const pages = getCurrentPages()
    const options = pages[pages.length - 1].options
    const imgUrls = this.data.imgUrls
    let url = `/pages/public/multiple/multiple?req_id=${options['req_id']}&req_amt=${options['req_amt']}&req_amt3=${options['req_amt3']}&agent_user_id=${wx.getStorageSync('agent_user_id')}&agent_real_name=${wx.getStorageSync('agent_real_name')}&agent_tel=${wx.getStorageSync('agent_tel')}&address=${options['hus_chengqu']} ${options['hus_build_name']}&sharingCode=${wx.getStorageSync('sharingCode')}`
    url = url + "&picture=" + imgUrls[0]
    url = url + "&city=" + wx.getStorageSync('city')

    //由经纪人进行分享，修改分享后的参数，上传分享码
    if (wx.getStorageSync('erptoken')) {
      // WxappApis.default.uploadSharingCode(wx.getStorageSync('sharingCode'), wx.getStorageSync('agent_user_id'), wx.getStorageSync('present_req'));
      wx.reLaunch({
        url: url
      })
    }
  },

  async doFavoriteOrNot() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const listingDetails = currentPage.options;
    if (listingDetails && !this.data.doingAttention) {
      this.data.doingAttention = true;
      // WxappApis.default
      //   .myFavorite(listingDetails.req_id)
      //   .then((res: any) => {
      //     if (res) {
      //       this.setData({
      //         attentioned: !this.data.attentioned
      //       });
      //       // eslint-disable-next-line vars-on-top
      //       var cookie = res.header['Set-Cookie'];
      //       if (cookie != null) {
      //         wx.setStorageSync('token', res.header['Set-Cookie']); // 服务器返回的 Set-Cookie，保存到本地
      //       }
      //     }
      //     this.data.doingAttention = false;
      //   })
      //   .catch(() => {
      //     this.data.doingAttention = false;
      //   })
    }
  },
  // 拨打电话api
  setPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.agent.agent_tel!
    });
  },

});
