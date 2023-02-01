Page({
  data: {
    city: '',
    cities: [],
  },
  onLoad() {
    this.setData({
      city: getApp().global.cities.find((i: { code: string }) => i.code == getApp().global.code).city,
      cities: getApp().global.cities
    })
  },
  changeCity(e: { currentTarget: { dataset: { code: string } } }) {
    const code = e.currentTarget.dataset.code;
    getApp().changeCity(code);
    wx.reLaunch({url:'/pages/index/index'})
  }
});
