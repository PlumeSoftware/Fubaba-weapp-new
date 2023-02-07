/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/comma-dangle */
interface City {
  code: CitiesEnum;
  name: string;
  baseHref: string;
  baseErpHref: string;
  husPictureRootPath: string;
  userProfilePictureRootPath: string;
  erpLoginUrl: string;
}
// eslint-disable-next-line @typescript-eslint/comma-dangle
enum CitiesEnum {
  'DL' = 'DL',
  'ZH' = 'ZH'
}
const Cities: Array<City> = [
  {
    code: CitiesEnum.DL,
    name: '大连',
    baseHref: '/dl/',
    baseErpHref: '/erp-dl/',
    husPictureRootPath: 'http://fmj.51fubaba.com/picture/house_picture/',
    userProfilePictureRootPath: 'http://fmj.51fubaba.com/picture/user_picture/',
    erpLoginUrl: 'https://fmj.51fubaba.com:6443/system/login/user_login_enter_hzh.asp'
  },
  {
    code: CitiesEnum.ZH,
    name: '庄河',
    baseHref: '/zh/',
    baseErpHref: '/erp-zh/',
    husPictureRootPath: 'http://haomai.51fubaba.com/picture/house_picture/',
    userProfilePictureRootPath:
      'http://haomai.51fubaba.com/picture/user_picture/',
    erpLoginUrl:
      'https://haomai.51fubaba.com:5443/system/login/user_login_enter_hzh.asp'
  }
];

Page({
  data: {
    url: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const chosenCity: City = Cities.find(item => item.code == getApp().get('code').toUpperCase())!;
    this.setData({ "url": `${chosenCity.erpLoginUrl}?login_from=WX&access_token=${wx.getStorageSync('erptoken')}` })
  }
});