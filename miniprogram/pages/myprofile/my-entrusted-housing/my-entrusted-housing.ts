/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/comma-dangle */

import { webGet } from "../../../utils/http";

/* eslint-disable promise/always-return */
Page({
  data: {
    housing_city: '',
    housingId: '',
    housing: []
  },
  onLoad() {
    if (this.data.housing_city === '') {
      this.setData({
        housing_city: 'DL'
      });
    }
    webGet('/api/entrust-housing/ershoufang', { housingCity: this.data.housing_city })
      .then((res: any) => {
        for (const item of res.data) {
          item.expected_price = parseFloat(item.expected_price).toFixed(2);
          // item.publish_date = util.formatDate(new Date(item.publish_date));
        }
        this.setData({
          housing: res.data,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
  },
  cancelEntrust(event: any) {
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '是否取消委托',
      success: (res) => {
        if (res.confirm) {
          webGet('/entrust-housing/ershoufang', {
            housingId: event.currentTarget.dataset.item.id
          })
            .then((res: any) => {
              console.log(res.status)
              if (res.status) {
                wx.showToast({
                  title: '取消委托成功',
                  icon: 'success'
                });
                this.onLoad();
              } else {
                wx.showToast({
                  title: '取消委托失败',
                });
              }
            });
        }
      }
    });
  }
});
