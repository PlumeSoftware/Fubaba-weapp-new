
// app.ts
App<IAppOption>({
  global: {
    token: '',
    erptoken: '',

    code: 'zh',
    city: '庄河',
    api: 'https://mobile.51fubaba.cn:8443/zh-weapp',
    picturePath: 'https://haomai.51fubaba.com:5443/picture/house_picture/',

    agent: {
      agent_user_id: '',
      agent_real_name: '',
      agent_tel: ''
    },

    cities: [
      { code: 'zh', city: '庄河', api: 'https://mobile.51fubaba.cn:8443/zh-weapp', picturePath: 'https://haomai.51fubaba.com:5443/picture/house_picture/' },
      { code: 'dl', city: '大连', api: 'https://mobile.51fubaba.cn:8443/dl-weapp', picturePath: 'https://fmj.51fubaba.com:6443/picture/house_picture/' }
    ],
  },

  get(key: string) {
    return this.global[key] || null
  },
  set(key: string, value: any, storage = false) {//键值，以及是否需要存在用户缓存中
    this.global[key] = value
    if (storage) {
      wx.setStorageSync(key, value)
    }
  },

  changeCity(code: string) {
    const target = this.global.cities.find((i: { code: string }) => i.code == code);
    this.global.code = target.code;
    this.global.city = target.city;
    this.global.picturePath = target.picturePath;
    this.global.api = target.api;

    this.set('code', target.code, true)
  },
  onLaunch() {
    const code = wx.getStorageSync('city') || 'zh';
    this.changeCity(code)

    const token = wx.getStorageSync('token')
    if (token) this.global.token = token

    const agent = wx.getStorageSync('agent');
    if (agent) this.global.agent = agent
  }
})