/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable promise/always-return */

import { webGet } from "../../utils/http";
import { login } from "../../utils/auth";
import { UserInfo } from "../../entity/user";

/* eslint-disable @typescript-eslint/comma-dangle */
Page({
  data: {
    isAuth: false, // 是否授权
    // 用户信息
    token: wx.getStorageSync('token')
  },


  //获取用户信息
  async getUserInfo(e: any) {
    const userInfo = await login();
    userInfo.fb_user_id=userInfo.fb_user_id
    if (!userInfo.phone) {
      const code = e.detail.code;
      userInfo.phone = (await webGet<{ userInfo: UserInfo }>('/api/wxapi/getPhone', { code })).userInfo.phone
    }
    getApp().set('userInfo', userInfo)

    //判断是否从房源页面跳转而来
    const present_req = wx.getStorageSync("present_req")
    const pages = getCurrentPages();

    if (present_req && pages[pages.length - 2].__route__ != "pages/public/login/login") {
      wx.reLaunch({
        url: `/pages/public/house-details/house-details?req_id=${present_req}&sharingCode=${wx.getStorageSync('sharingCode')}`
      });
      wx.setStorageSync("present_req", '');
    } else {
      wx.navigateBack()
    }
  },
})
