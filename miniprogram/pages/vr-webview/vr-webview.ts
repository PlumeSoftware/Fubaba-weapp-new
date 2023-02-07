/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/comma-dangle */
Page({
  data: {
    url: `https://${wx.getStorageSync('city') == 'dl' ? 'fmj' : 'haomai'}.51fubaba.com:${wx.getStorageSync('city') == 'dl' ? '6443' : '5443'}/vr.html?req_id=${wx.getStorageSync('present_req')}`
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.setData({
      url: `https://${wx.getStorageSync('city') == 'dl' ? 'fmj' : 'haomai'}.51fubaba.com:${wx.getStorageSync('city') == 'dl' ? '6443' : '5443'}/vr.html?req_id=${wx.getStorageSync('present_req')}`
    })
  },
});
