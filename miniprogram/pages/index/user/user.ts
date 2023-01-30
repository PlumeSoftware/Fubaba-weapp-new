/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/comma-dangle */
import {webGet } from '../../../utils/http';
import CryptoJS from 'crypto-js';

Page({
  data: {
    isAgent: false, // 是否为经纪人
    headimgurl: '',
    nickname: 'loading',
    token: wx.getStorageSync('token'),
    open: false,
    phoneNumber: "未绑定"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const token = wx.getStorageSync('token');
    if (token) {
      this.login();
    }
  },
  login() {
    wx.login({
      success: (res) => {
        const _this = this;
        wx.request({
          url: WxappApis.default.getApiBaseUrl() + '/wxapi/login', // 测试api
          data: {
            code: res.code // 用户登录凭证，有效期5分钟
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            cookie: wx.getStorageSync('token') // 读取cookie
          },
          method: 'GET',
          success(res) {
            res.data = res.data;
            _this.setData({
              image: res.data.wxInfo!.headimgurl,
              nickname: res.data.wxInfo!.nickname ? res.data.wxInfo!.nickname : '用户' + CryptoJS.MD5(res.data.userInfo!.phone).toString().slice(0, 7),
              phoneNumber: res.data.userInfo!.phone,
              hasUserInfo: true
            });
            if (res.data.wxInfo!.nickname === null) {
              _this.setData({
                open: true
              });
            }

            //判断是否为拉黑用户
            const question_flag = res.data.userInfo.question_flag
            if (question_flag == 1) {
              wx.setStorageSync('question_flag', question_flag);
            } else {
              wx.setStorageSync('question_flag', 0);
            }

            //判断是否为经纪人
            if (res.data.userInfo!.phone) {
              const phone = res.data.userInfo!.phone;
              wx.request({
                url: WxappApis.default.getApiBaseUrl() + "/agent/get/" + phone,
                method: "GET",
                success(resag) {
                  res.data = res.data as ResLoginData;
                  if ((resag.data as { data: HousingAgent, status: boolean }).data) {
                    const agent = (resag.data as { data: HousingAgent, status: boolean }).data;

                    wx.setStorageSync('agent_user_id', agent.agent_user_id)
                    wx.setStorageSync('agent_real_name', agent.agent_real_name)
                    wx.setStorageSync('agent_tel', agent.agent_tel.slice(0, 11));

                    _this.setData({ 'isAgent': true })
                    WxappApis.default.getNewQrPic(wx.getStorageSync('city'), agent.agent_tel.slice(0, 11));

                    wx.request({
                      url: WxappApis.default.getApiBaseUrl() + "/agent/update",
                      method: "POST",
                      header: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      },
                      data: {
                        agent_user_id: agent.agent_user_id,
                        fb_user_id: res.data.userInfo!.fb_user_id,
                        agent_tel: (resag.data as { data: HousingAgent, status: boolean }).data.agent_tel,
                        unionid: res.data.wxInfo?.openid
                      },
                      success(resag) {
                        wx.setStorageSync('erptoken', (resag.data as { data: string, status: boolean }).data);
                      }
                    });
                  }
                }
              })
            }

            const cookie = res.header['Set-Cookie'];
            if (cookie) {
              wx.setStorageSync('token', res.header['Set-Cookie']);
              _this.setData({ token: wx.getStorageSync('token') });
            }
          },
          fail() {
            wx.removeStorageSync('token');
            wx.showModal({
              title: '提示',
              content: '登录失败'
            });
          }
        });
      }
    });
  },

  // 获取手机号
  getUserProfile(e: any) {
    this.setData({
      istrue: false,
      open: true
    });
    const code = e.detail.code;
    WxappApis.default.slientLogin(code).then((res: any) => {
      this.setData({
        nickname: res.userInfo.nickName,
        image: res.userInfo.avatarUrl,
        phoneNumber: res.userInfo.phone,
        hasUserInfo: true,
        open: false
      });
    });
  },

  // 获取授权
  getUserInfo() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        WxappApis.default
          .getWxInfo(res.encryptedData, res.iv)
          .then((res: any) => {
            console.log(res);
          });
        this.setData({
          nickname: res.userInfo.nickName,
          image: res.userInfo.avatarUrl,
          hasUserInfo: true,
          open: false
        });
      }
    });
  },
  // 退出登录
  Logout() {
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '是否确定退出',
      success: () => {
        //清理数据
        wx.removeStorageSync('token');
        wx.removeStorageSync('erptoken');

        wx.removeStorageSync('agent_user_id')
        wx.removeStorageSync('agent_real_name')
        wx.removeStorageSync('agent_tel');

        wx.removeStorageSync('present_req')


        this.setData({
          nickname: '',
          image: '',
          phoneNumber: '',
          token: ''
        });
      }
    });
  },

  //跳转到erp网页版
  toErpView() {
    wx.navigateTo({
      url: '/pages/public/erp-webview/erp-webview'
    });
  },

  toProfilePage() {
    wx.navigateTo({
      url: `/pages/public/myprofile/my-profile/my-profile`
    });
  }
});
