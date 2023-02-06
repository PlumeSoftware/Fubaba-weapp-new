/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
import { HouseInfo } from '../../../../components/room-source.model';
import * as WxappApis from '../../../../utils/api-request';
import util from '../../../../utils/util';

Page({
  data: {
    housing_city: '',
    housingId: '',
    housing: [] as Array<HouseInfo>
  },
  onLoad() {
    if (this.data.housing_city === '') {
      this.setData({
        housing_city: 'DL'
      });
    }
    WxappApis.default
      .entrustHousing({ housingCity: this.data.housing_city })
      .then((res: any) => {
        for (const item of res.data) {
          item.expected_price = parseFloat(item.expected_price).toFixed(2);
          item.publish_date = util.formatDate(new Date(item.publish_date));
        }
        this.setData({
          housing: res.data,
        });
      })
      .catch((err: any) => {
        console.log(err);
      });
    // wx.showShareMenu({
    //   withShareTicket: true,
    //   //menus: ['shareAppMessage', 'shareTimeline']
    //   menus: ['shareAppMessage']
    // });
  },
  cancelEntrust(event: any) {
    wx.showModal({
      cancelColor: 'cancelColor',
      title: '是否取消委托',
      success: (res) => {
        if (res.confirm) {
          WxappApis.default
            .entrustCancel({
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
                  icon: 'error'
                });
              }
            });
        }
      }
    });
  }
});
