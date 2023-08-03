/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/comma-dangle */

import { get } from "../../utils/http";

Page({
  data: {
    ershoufangSearchSuggestion: [] as Array<any>,
    queryParams: {
      keyword: ''
    },
    referKeyword: '',
    req_type: 1,//从二手房-1 租房-0 页面跳转过来
    // 历史记录数组
  },
  onLoad() {
    const pages = getCurrentPages();
    const { req_type } = pages[pages.length - 1].options;
    this.setData({ req_type: Number(req_type!) })
  },
  onChange() {
    if (this.data.req_type) {
      get('/api/houses-suggestion', { keyword: this.data.referKeyword })
        .then((res: any) => { this.setData({ ershoufangSearchSuggestion: res.data }) })
    }
  },

  toSearchSugItem(event: any) {
    //同时为点击项和搜索项的event，如果为点击，则在currentTarget中，否则为搜索，在detail中
    const keyword = event.currentTarget?.dataset?.item?.hus_build_name || event.detail;
    console.log(keyword,this.data.req_type)
    switch (this.data.req_type) {
      case 0: {
        wx.navigateTo({ url: `/pages/house-list-rent/house-list-rent?keyword=${keyword}` });
        break;
      }
      case 1: {
        wx.navigateTo({ url: `/pages/house-list/house-list?keyword=${keyword}` });
        break;
      }
    }
  },
});
