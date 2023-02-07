//index.js
//获取应用实例

Page({
  data: {
    painting: {},
    paintingIndex: 0,
    paintingList: [
      {
        width: 375,
        height: 555,
        clear: true,
        views: [
          //背景,0
          {
            type: 'image',
            url: '/images/paper_bg.jpg',
            top: 0,
            left: 0,
            width: 375,
            height: 555
          },


          {
            type: 'text',
            content: '您的专属经纪人',
            fontSize: 16,
            lineHeight: 16,
            color: '#fff',
            textAlign: 'left',
            top: 30,
            left: 80,
            bolder: true
          },
          {
            type: 'text',
            content: '发现了一间好房，邀请您来看一看！',
            fontSize: 15,
            lineHeight: 12,
            color: '#fff',
            textAlign: 'left',
            top: 59.5,
            left: 80
          },
          {
            type: 'image',
            url: 'http://haomai.51fubaba.com/picture/house_picture/upload/20220928082583298329.jpg',
            top: 136,
            left: 42.5,
            width: 290,
            height: 186
          },


          {
            type: 'text',
            content: '售价：',
            fontSize: 17,
            color: '#fff',
            textAlign: 'left',
            top: 367,
            left: 64.5,
            bolder: true
          },

          {
            type: 'text',
            content: '万',
            fontSize: 19,
            color: '#E62004',
            textAlign: 'left',
            top: 367,
            left: 114.5,
            bolder: true
          },
          {
            type: 'text',
            content: '元/㎡',
            fontSize: 16,
            color: '#fff',
            textAlign: 'left',
            top: 370,
            left: 180,
          },

          {
            type: 'text',
            content: '地址：',
            fontSize: 17,
            color: '#fff',
            textAlign: 'left',
            top: 395,
            left: 64.5,
            bolder: true
          },

          {
            type: 'text',
            content: '点击下方前往小程序了解更多',
            fontSize: 14,
            color: '#EDEDED',
            textAlign: 'left',
            top: 500,
            left: 85.5,
            lineHeight: 16,
            breakWord: true,
          }
        ]
      },
    ],
    shareImage: '',

    mode: 'normal' // cry
  },

  onLoad() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });

    const pages = getCurrentPages()
    const options = pages[pages.length - 1].options
    const optionKeys = Object.keys(options);
    let url = '/pages/public/house-details/house-details?'
    optionKeys.forEach(key => {
      if (options[key] != 'null')
        url = url + key + '=' + options[key] + '&';
    })
    if (!wx.getStorageSync('erptoken')) {
      setTimeout(() => {
        wx.reLaunch({ url: url })
      }, 500)
    }

  },
  onShow() {
    const pages = getCurrentPages()
    const paintingList = this.data.paintingList
    paintingList[0].views[1].content = paintingList[0].views[1].content + " " + pages[pages.length - 1].options['agent_real_name']
    paintingList[0].views[3].url = pages[pages.length - 1].options['picture']
    paintingList[0].views[5].content = pages[pages.length - 1].options['req_amt'] + paintingList[0].views[5].content
    paintingList[0].views[6].content = pages[pages.length - 1].options['req_amt3'] + paintingList[0].views[6].content
    paintingList[0].views[7].content = paintingList[0].views[7].content + " " + pages[pages.length - 1].options['address']

    console.log(pages[pages.length - 1].options)

    this.setData(
      {
        paintingList: paintingList
      }
    )

    this.eventDraw()
  },

  eventDraw() {
    const { paintingList, paintingIndex } = this.data
    this.setData({
      mode: 'normal',
      painting: paintingList[paintingIndex],
      paintingIndex: paintingIndex === 0 ? 1 : 0
    })


  },

  eventGetImage(event) {
    wx.hideLoading()
    const { tempFilePath } = event.detail
    this.setData({
      shareImage: tempFilePath
    })
    if (this.data.mode === 'cry') {
      this.eventDrawCry()
    }
  },
  eventDrawCry() {
    const { paintingList, paintingIndex } = this.data
    this.setData({
      mode: 'cry',
      painting: paintingList[paintingIndex],
      paintingIndex: paintingIndex === 0 ? 1 : 0
    })
  },
})
