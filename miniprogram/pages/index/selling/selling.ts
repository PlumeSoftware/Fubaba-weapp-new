/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable @typescript-eslint/comma-dangle */

import { webPost } from "../../../utils/http";

/* eslint-disable promise/always-return */
Component({
  data: {
    show: false,
    columsCityCode: ['dl', 'zh'],
    columns: ['大连', '庄河'],
    city: getApp().global.code,
    housingCity: '',

    housingEstate: '',
    housingAddress: '',
    housingArea: '',
    expectedPrice: '',
    yourname: ''
  },
  lifetimes: {
    ready() {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage']
      });
        this.setData({
          housingCity: this.data.columns[this.data.columsCityCode.findIndex((i: string) => i == getApp().global.code)]
        });
    }
  },

  methods: {
    onSubmit() {
      this.data.city = this.data.housingCity;
      webPost('/api/entrust-housing/ershoufang', this.data)
        .then(() => {
          wx.showToast({
            title: '发布房源成功',
            icon: 'success'
          });
          wx.navigateTo({
            url: '/pages/myprofile/my-entrusted-housing/my-entrusted-housing'
          });
        })

    }
  }
});
