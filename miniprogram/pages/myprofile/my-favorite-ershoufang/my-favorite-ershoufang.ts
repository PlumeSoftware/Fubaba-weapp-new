/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-restricted-syntax */

import { webGet } from "../../../utils/http";

Page({
  data: {
    fyReqId: '',
    myFavoriteErshoufangs: [],
    myFavoriteRentHouse: []
  },
  onLoad() {
    webGet('/api/my-favorite/ershoufang').then((res: any) => {
      res.data.forEach((i: any) => i.housing.pictures[0].picture_name = getApp().global.picturePath + i.housing.pictures[0].picture_name)
      this.setData({
        myFavoriteErshoufangs: res.data
      });
      const myFavoriteErshoufangs = res.data;
      // eslint-disable-next-line promise/always-return
      for (const item of myFavoriteErshoufangs) {
        const model = [];
        if (item.housing.hus_rooms > 0) {
          model.push(`${item.housing.hus_rooms}室`);
        }
        if (item.housing.hus_halls > 0) {
          model.push(`${item.housing.hus_halls}厅`);
        }
        if (item.housing.hus_kitchens > 0) {
          model.push(`${item.housing.hus_kitchens}厨`);
        }
        if (item.housing.hus_toilets > 0) {
          model.push(`${item.housing.hus_toilets}卫`);
        }
        this.setData({
          model: model.join(' ')
        });
      }
    })
      .catch((err: any) => {
        console.log(err);
      });

    webGet('/api/my-favorite/rentHouse').then((res: any) => {
      res.data.forEach((i: any) => i.housing.pictures[0].picture_name = getApp().global.picturePath + i.housing.pictures[0].picture_name)
      this.setData({
        myFavoriteRentHouse: res.data
      });
      const myFavoriteRentHouse = res.data;
      // eslint-disable-next-line promise/always-return
      for (const item of myFavoriteRentHouse) {
        const model = [];
        if (item.housing.hus_rooms > 0) {
          model.push(`${item.housing.hus_rooms}室`);
        }
        if (item.housing.hus_halls > 0) {
          model.push(`${item.housing.hus_halls}厅`);
        }
        if (item.housing.hus_kitchens > 0) {
          model.push(`${item.housing.hus_kitchens}厨`);
        }
        if (item.housing.hus_toilets > 0) {
          model.push(`${item.housing.hus_toilets}卫`);
        }
        this.setData({
          model: model.join(' ')
        });
      }
    })
      .catch((err: any) => {
        console.log(err);
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
  onClickFavoriteLog(event: any) {
    const FavoriteLog = event.currentTarget.dataset.item;
    const targetCity = FavoriteLog.city;
    // if (targetCity === this.appCityService.getCurrentCity().code) {
    let reqStr = '?';
    let house: string = '';
    // eslint-disable-next-line guard-for-in
    for (const key in FavoriteLog) {
      reqStr += `${key}=${FavoriteLog[key]}&`;
    }
    // eslint-disable-next-line guard-for-in
    for (const key in FavoriteLog.housing) {
      house = house + key + '=' + FavoriteLog.housing[key] + '&';
    }
    wx.navigateTo({
      url: `/pages/public/house-details/house-details?req_id=${FavoriteLog.req_id}`
    });
  }
});
