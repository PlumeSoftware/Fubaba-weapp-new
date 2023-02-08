/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable promise/always-return */

import { login } from "../../../utils/auth";

/* eslint-disable @typescript-eslint/comma-dangle */
Component({
  data: {
    userInfo: {},
    token: '',
    erptoken: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */

  lifetimes: {
    async ready() {
      if (getApp().global.token) {
        await login()
      }
      setInterval(() => {
        if (getApp().global.token) {
          this.setData({
            userInfo: getApp().global.userInfo,
            token: getApp().global.token,
            erptoken: getApp().global.erptoken
          })
        }
      }, 1000)
    }
  },
  methods: {
    // 退出登录
    logout() {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: '是否确定退出',
        success: (r) => {
          if (r.confirm) {
            //清理数据
            wx.removeStorageSync('token');
            wx.removeStorageSync('erptoken');
            wx.removeStorageSync('present_req')

            getApp().set('token', '', true)
            getApp().set('erptoken', '', true)
            getApp().set('userInfo', {})

            this.setData({
              userInfo: {},
              token: '',
              erptoken: '',
            });
          }
        }
      });
    },

    //跳转到erp网页版
    toErpView() {
      wx.navigateTo({
        url: '/pages/erp-webview/erp-webview'
      });
    },

    toProfilePage() {
      wx.navigateTo({
        url: `/pages/myprofile/my-profile/my-profile`
      });
    }
  },
});
