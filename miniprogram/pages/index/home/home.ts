/* eslint-disable promise/catch-or-return */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable promise/always-return */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { webGet } from '../../../utils/http';

Component({
    data: {
        ershoufangSellingInfos: [] as Array<any>,
        city: 'zh',
        cityName: ''
    },
    methods: {
        //进入二手房页面
        erShouFang() { wx.navigateTo({ url: "/pages/house-list/house-list" }) },
        xinFang() {
        },
        rentHouse() { wx.navigateTo({ url: "/pages/house-list-rent/house-list-rent" }) },
        erp() { wx.navigateTo({ url: "/pages/erp/home/erphome" }); },
        // 去往搜索页面跳转
        onFouse() { wx.navigateTo({ url: '/pages/search/search' }); },
        // 城市切换
        changeCity() { wx.navigateTo({ url: '/pages/select-city/select-city' }); },
        //获得分享
        onShareAppMessage: () => { path: "/pages/index/index?city=" + wx.getStorageSync('city') }
    },
    lifetimes: {
        async ready() {
            //@ts-ignore
            this.setData({
                ershoufangSellingInfos: (await webGet<{ data: any }>('/api/houses-suggestion/personalize'))?.data,
                city: getApp().global.city,
                cityName: getApp().global.cities.find((i: { code: string }) => i.code == getApp().global.code).city
            })
        }
    }
});
