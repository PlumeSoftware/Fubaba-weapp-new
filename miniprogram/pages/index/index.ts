// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    active: 0,
    tarbar: [
      { item: "首页", icon: "home" },
      { item: "委托", icon: "visa" },
      { item: "我的", icon: "user" },
    ],
  },

  toShare() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  onShareAppMessage() { },

  async onChange(event: any) {
    this.setData({ active: event.detail });
    wx.setNavigationBarTitle({ title: this.data.tarbar[this.data.active].item })
  },
});
