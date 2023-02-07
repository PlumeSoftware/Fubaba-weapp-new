/* eslint-disable guard-for-in */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/catch-or-return */
import { HouseInfo, ReqInfo } from '../../../../components/room-source.model';
import * as WxappApis from '../../../../utils/api-request';
import { Cities, City } from '../../../../utils/constants';

Page({
  data: {
    active: 1,
    ershoufangAccessLogs: {} as Array<any>,
    ershoufangAccessLogsGroup: [],
    rentHouseAccessLogsGroup: []
  },
  onLoad() {
    WxappApis.default.getMyErshoufangAccessLogs().then((res1: any) => {

      this.setData({
        ershoufangAccessLogsGroup: res1.data.data
      });
    });


    WxappApis.default.getMyRentHouseAccessLogs().then((res2: any) => {

      this.setData({
        rentHouseAccessLogsGroup: res2.data.data
      });
    });

    const chosenCity: City = Cities.find(item => item.code == wx.getStorageSync('city').toUpperCase())!;

    this.setData({
      husPictureRootPath: chosenCity.husPictureRootPath
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
    const AccessLog = event.currentTarget.dataset.item.sellingInfo;
    let reqStr = '?';
    let house: string = '';
    for (const key in AccessLog) {
      reqStr += `${key}=${AccessLog[key]}&`;
    }
    for (const key in AccessLog.housing) {
      house = house + key + '=' + AccessLog.housing[key] + '&';
    }
    wx.navigateTo({
      url: `/pages/public/house-details/house-details?req_id=${AccessLog.req_id}`
    });
  }
});
