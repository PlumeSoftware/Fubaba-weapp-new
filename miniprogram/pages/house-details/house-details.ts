/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-var */
/* eslint-disable object-curly-spacing */
import { webGet, webPost } from '../../utils/http';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import CryptoJS from 'crypto-js';

Page({
  data: {
    attentioned: false,//是否已关注
    isAgent: false,
    imgUrls: [] as string[],

    //分享时的参数
    shareTitle: '',
    shareUrl: '',
    shareObject: {},

    //图片banner显示
    indicatorDots: true,

    existVr: false,//是否存在vr
    open: false,

    //房源类型，1-二手房 0-租房
    req_type: 1,

    pay_way: '',

    base: {} as any, //房源基础信息
    housing: {} as any, //房源详细信息
    picture: {} as any, //房源图片
    agent: {} as any,// 经纪人信息
    ad_remark: [] as string[],

    doingAttention: false,//是否已关注

  },

  onShow() {
    const pages = getCurrentPages(); // 获取加载的页面
    const currentPage = pages[pages.length - 1]; // 获取当前页面的对象
    const { sharingCode } = currentPage.options; // 获取url中的参数
    if (sharingCode && !getApp().get('erptoken')) {
      getApp().set('sharingCode', sharingCode, true)
    }
    const token = getApp().get('token');
    const question_flag = wx.getStorageSync('question_flag');


    if (question_flag == 1) {
      //是否为拉黑用户
      wx.showModal({
        title: '账号或设备异常', //提示的标题
        content: '请联系客服89853988', //提示的内容
        showCancel: false,
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            wx.reLaunch({
              url: '/pages/index/index'
            });
          }
        },
      })
    } else if (!token) {
      //检测是否登录
      wx.showModal({
        title: '用户未授权', //提示的标题
        content: '微信授权后即可查看房源详情', //提示的内容
        confirmText: "前往授权",
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: `/pages/enroll/enroll`,
            })
          } else if (res.cancel) {
            wx.reLaunch({
              url: '/pages/index/index'
            });
          }
        },
      })
    } else {
      //如果已经登录，再获取一次房源信息用户记录
      const pages = getCurrentPages();
      const houseInfo = pages[pages.length - 1].options; // 获取url中的参数

      webGet(`/api/${houseInfo['req_type'] == '0' ? 'renthouse' : 'ershoufang'}/selling-houses/${houseInfo['req_id']}/${getApp().get('sharingCode') || null}`)
    }
  },

  async onLoad() {
    // 用于显示分享按钮
    this.setData({ isAgent: getApp().get('erptoken') ? true : false })
    // 显示的数据优先级：若不为经纪人，则 参数中的经纪人id > 本地存储绑定的经纪人id > 服务端存储的经纪人id > 网络获取

    const pages = getCurrentPages();
    const houseInfo = pages[pages.length - 1].options; // 获取url中的参数

    //参数存在分享码，记录当前页面的分享码
    if (houseInfo['sharingCode']) {
      getApp().set('sharingCode', houseInfo['sharingCode'] || null)
    }
    if (getApp().get('erptoken')) {
      getApp().set('sharingCode', CryptoJS.MD5(wx.getStorageSync('agent_user_id')))
    }

    //参数存在新的经纪人信息（电话）和分享码,且当前用户非经纪人，前端绑定该新的经纪人，同一分享码只触发一次
    //参数存在城市信息，进行修改
    if (houseInfo['city']) {
      getApp().changeCity(houseInfo['city'])
    }

    //获取房源详情-二手房api
    await webGet(`/api/${houseInfo['req_type'] == '0' ? 'renthouse' : 'ershoufang'}/selling-houses/${houseInfo['req_id']}/${getApp().get('sharingCode') || null}`).then(
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
        res.data.housing.pictures.forEach((item: { picture_name: string }) => imgUrlArr.push(getApp().global.picturePath + item.picture_name));

        const { hus_rooms, hus_halls, hus_kitchens, hus_toilets, hus_expose, hus_build_name } = res.data.housing
        //补充房源信息
        const model = [];
        if (hus_rooms && hus_rooms !== '0') model.push(`${hus_rooms}室`);
        if (hus_halls && hus_halls !== '0') model.push(`${hus_halls}厅`);
        if (hus_kitchens && hus_kitchens !== '0') model.push(`${hus_kitchens}厨`);
        if (hus_toilets && hus_toilets !== '0') model.push(`${hus_toilets}卫`);

        //判断参数情况
        this.data.housing.hus_expose = hus_expose == "null" ? '' : hus_expose;

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

    const existVr = await webGet<{ data: boolean }>(`/api/ershoufang/vr/check/${this.data.base.req_id}/`)
    this.setData({ existVr: existVr.data })

    let agent_tel;
    if (getApp().get('erptoken')) {
      //当前用户也为经纪人，则不考虑参数情况，请求为网络请求的数据（开发者）
      agent_tel = this.data.base.agent.agent_tel
    } else {
      //获得经纪人信息，优先级 参数>缓存>网络请求
      agent_tel = houseInfo['agent_tel'] || getApp().get('agent_tel') || this.data.base.agent.agent_tel
    }
    const agent = await webGet<{ data: {} }>(`/api/agent/get/${agent_tel.slice(0, 11)}`)

    this.setData({ agent: agent!.data })

    // 相关房源
    webGet(`/api/${this.data.base.req_type ? 'ershoufang' : 'renthouse'}/selling-houses/${houseInfo['req_id']}/related-houses`)
      .then((res: any) => {
        if (getApp().get('sharingCode')) {
          res.data.forEach((item: any) => {
            item.req_type = this.data.req_type
            item.agent = this.data.agent
          })
        }
        this.setData({ relatedHouses: res.data });
      });
    // 转发api
    wx.showShareMenu({
      withShareTicket: true,
      // menus: ['shareAppMessage', 'shareTimeline']
      menus: ['shareAppMessage']
    })

    // 获取关注房源api，判断是否已经关注
    if (getApp().get('token')) {
      const favoriteList = (await webGet<{ data: AnyArray }>('/api/my-favorite/ershoufang')).data
      if (favoriteList.find((i: any) => i.req_id === houseInfo['req_id'])) {
        this.setData({ attentioned: true });
      }
    }
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
    if (getApp().get('erptoken')) {
      options['agent_user_id'] = getApp().get('agent_user_id');
      options['agent_real_name'] = getApp().get('agent_real_name');
      options['agent_tel'] = getApp().get('agent_tel');
      const content = {
        req_id: this.data.base.req_id,
        agent_user_id: getApp().get('sharingCode'),
        sharingCode: getApp().get('sharingCode')
      };
      webPost('/api/agent/recordSharingCode', content)
    }

    const optionKeys: Array<string> = Object.keys(options);
    optionKeys.forEach((key: string) => {
      if (options[key] != 'null')
        url = url + key + '=' + options[key] + '&';
    })
    url = url + `sharingCode=${getApp().get('sharingCode')}`;
    url = url + `&city=${getApp().get('city')}`;
    return {
      title: this.data.shareTitle,
      path: url,
    }
  },
  toVrView() {
    wx.navigateTo({
      url: '/pages/vr-webview/vr-webview'
    });
  },

  // 回到首页方法
  onClickHome() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  onPaper() {
    const pages = getCurrentPages()
    const options = pages[pages.length - 1].options
    const imgUrls = this.data.imgUrls
    let url = `/pages/multiple/multiple`
    url = url + `?req_id=${options['req_id']}`
    url = url + `&agent_real_name=${getApp().get('agent.agent_real_name')}`
    url = url + `&req_amt3=${this.data.base.req_amt3}`
    url = url + `&req_amt=${this.data.base.req_amt}`
    url = url + `&address=${this.data.housing.hus_chengqu == 'null' ? '' : this.data.housing.hus_chengqu} ${this.data.housing.hus_build_name}`
    url = url + `&agent_tel=${getApp().get('agent_tel')}`
    url = url + `&sharingCode=${getApp().get('sharingCode')}`
    url = url + "&picture=" + imgUrls[0]
    url = url + "&city=" + getApp().get('city')
    console.log(url)

    const content = {
      req_id: this.data.base.req_id,
      agent_user_id: getApp().get('sharingCode'),
      sharingCode: getApp().get('sharingCode')
    };

    webPost('/api/agent/recordSharingCode', content)
    wx.reLaunch({
      url: url
    })
  },

  async doFavoriteOrNot() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const houseInfo = currentPage.options;
    if (houseInfo && !this.data.doingAttention) {
      this.data.doingAttention = true;
      webGet('/api/my-favorite', { fyReqId: houseInfo.req_id })
        .then((res: any) => {
          if (res) {
            this.setData({
              attentioned: !this.data.attentioned
            });
            // eslint-disable-next-line vars-on-top
            var cookie = res.header['Set-Cookie'];
            if (cookie != null) {
              wx.setStorageSync('token', res.header['Set-Cookie']); // 服务器返回的 Set-Cookie，保存到本地
            }
          }
          this.data.doingAttention = false;
        })
        .catch(() => {
          this.data.doingAttention = false;
        })
    }
  },
  // 拨打电话api
  setPhone() {
    if (!getApp().get('erptoken')) {
      wx.makePhoneCall({
        phoneNumber: this.data.agent.agent_tel?.slice(0, 11)
      });
    } else {
      //经纪人只需要打给集团内部小号
      wx.makePhoneCall({
        phoneNumber: this.data.agent.agent_tel?.slice(12, 16)
      });
    }
  },

});
