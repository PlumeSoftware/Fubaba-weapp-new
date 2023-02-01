/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
Page({
  data: {
    show: false,
    columsCityCode: ['dl', 'zh'],
    columns: ['大连', '庄河'],
    city: getApp().global.code,
    housingCity: getApp().global.city,

    housingEstate:'',
    housingAddress:'',
    housingArea:'',
    expectedPrice:'',
    yourname:''
  },
  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      //menus: ['shareAppMessage', 'shareTimeline']
      menus: ['shareAppMessage']
    });
    this.setData({
      housingCity: wx.getStorageSync("city")
    });
  },

  onSubmit() {
    this.data.city = this.data.housingCity;
    WxappApis.default
      .createHouse(this.data)
      .then((res: any) => {
        wx.showToast({
          title: '发布房源成功',
          icon: 'success'
        });
        wx.navigateTo({
          url: '/pages/public/myprofile/my-entrusted-housing/my-entrusted-housing'
        });
      })
      .catch((err: any) => {
        console.log(err);
      });

  }
});
