/* eslint-disable guard-for-in */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/catch-or-return */
Page({
  data: {
    url: ''
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      //menus: ['shareAppMessage', 'shareTimeline']
      menus: ['shareAppMessage']
    });
  },
  onShow() {
    this.setData({
      url: `https://fmj.51fubaba.com:6443/picture/qr_picture/${getApp().get('code')}${getApp().get('agent_tel').slice(0, 11)}.png`
    })
  },

});
