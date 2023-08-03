/* eslint-disable guard-for-in */
/* eslint-disable object-curly-spacing */

import { get } from "../../../utils/http";

Page({
  data: {
    active: 1,
    ershoufangAccessLogs: {} as Array<any>,
    ershoufangAccessLogsGroup: [],
    rentHouseAccessLogsGroup: []
  },
  onLoad() {
    get('/api/my-access-logs/ershoufang').then((res: any) => {
      res.data.data.forEach((i: any) => i.sellingInfo.housing.pictures[0].picture_name = getApp().global.picturePath + i.sellingInfo.housing.pictures[0].picture_name)
      console.log(res.data.data[0].sellingInfo.housing.pictures[0])
      this.setData({
        ershoufangAccessLogsGroup: res.data.data
      });
    });

    get('/api/my-access-logs/renthouse').then((res: any) => {
      res.data.data.forEach((i: any) => i.sellingInfo.housing.pictures[0].picture_name = getApp().global.picturePath + i.sellingInfo.housing.pictures[0].picture_name)
      this.setData({
        rentHouseAccessLogsGroup: res.data.data
      });
    });

    wx.showShareMenu({
      withShareTicket: true,
      //menus: ['shareAppMessage', 'shareTimeline']
      menus: ['shareAppMessage']
    });
  },
  onChange(event: any) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none'
    });
  },
  onClickAccessLog(event: any) {
    const accessLog = event.currentTarget.dataset.item.sellingInfo;
    wx.navigateTo({
      url: `/pages/house-details/house-details?req_id=${accessLog.req_id}&req_type=${accessLog.req_type}`
    });
  }
});
