/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable promise/always-return */

import { get } from "../../utils/http";
import { login } from "../../utils/auth";
import { UserInfo } from "../../entity/user";

Page({
  data: {
    token: wx.getStorageSync('token')
  },


  //获取用户信息
  async getUserInfo(e: any) {
    const userInfo = await login();
    userInfo.fb_user_id = userInfo.fb_user_id
    if (!userInfo.phone) {
      const code = e.detail.code;
      userInfo.phone = (await get<{ userInfo: UserInfo }>('/api/wxapi/getPhone', { code })).userInfo.phone
    }
    getApp().set('userInfo', userInfo)

    //判断是否从房源页面跳转而来
    const pages = getCurrentPages();
    console.log(pages)
    wx.navigateBack()
  },
})
