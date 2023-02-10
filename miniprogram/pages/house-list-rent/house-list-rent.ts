/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable complexity */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-case-declarations */
// eslint-disable-next-line import/no-named-as-default
import { webGet } from '../../utils/http';
import { optionsDeck } from './housing-filter.model';

Page({
  data: {
    citySelect: wx.getStorageSync('city') || 'dl',
    open: false,
    activeTabName: '',
    activeTabIndex: -1,
    pageNum: 1,
    height: 1000,
    rentSellingInfos: [] as AnyArray,
    filterTabsMetadata: [
      {
        name: 'priceRange',
        label: '价格',
        chose: false
      },
      {
        name: 'husRooms',
        label: '房型',
        chose: false
      },
      {
        name: 'houseAreas',
        label: '面积',
        chose: false
      },
      {
        name: 'more',
        label: '更多',
        chose: false
      }
    ],
    filtersFormdata: {
      priceLeast: null,
      priceMax: null,
      // 价格
      priceRange: {
        multiple: true,
        options: optionsDeck.priceOptions
      },
      husRooms: {
        multiple: true,
        options: optionsDeck.husRoomOptions
      },
      houseAreas: {
        multiple: true,
        options: optionsDeck.areasOptions
      },
      houseTags: {
        multiple: true,
        tag: "房源特色",
        name: "houseTags",
        options: optionsDeck.tagsOptions
      },
      rentPayingWay: {
        multiple: false,
        tag: "付租方式",
        name: "rentPayingWay",
        options: optionsDeck.rentPayingWay
      },
      insidePlant: {
        multiple: true,
        tag: "室内设施",
        name: "insidePlant",
        options: optionsDeck.insidePlantList
      },
      jiegous: {
        multiple: true,
        tag: "结构",
        name: "jiegous",
        options: optionsDeck.jiegousOptions
      }
    } as any,

    //查询条件
    queryCriteria: {
      sort: 's1',
      filters: {
        priceRange: [] as Array<string>,
        husRooms: [] as Array<string>,
        houseAreas: [] as Array<string>,
        houseTags: [] as Array<string>,
      } as any
    },
    index: 0,
    fillItem: '',
    targetItem: ''
  },
  onLoad() {
    //屏幕高度
    const height = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: height,
      citySelect: wx.getStorageSync('city'),
      keyword: wx.getStorageSync('keyword')
    });
    this.onSearch();
    // 转发api
    wx.showShareMenu({
      withShareTicket: true,
      //menus: ['shareAppMessage', 'shareTimeline']
      menus: ['shareAppMessage']
    });
  },
  // 搜索房源没有关键字
  getSearch() {
    this.setData({
      rentSellingInfos: []
    })
    this.onSearch()
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    //滑动屏幕两倍时，加载新数据
    if (e.scrollTop / (this.data.height * 2) > this.data.pageNum) {
      this.data.pageNum++;
      this.searchRentHouse(wx.getStorageSync('keyword'), this.data.pageNum, this.data.queryCriteria)
        .then((res: any) => {
          const rentSellingInfos = this.data.rentSellingInfos;
          res.data.records.forEach((item: any) => rentSellingInfos.push(item));
          this.setData({ rentSellingInfos: rentSellingInfos })
        })
    }
  },

  async searchRentHouse(
    keyword: string,
    pageNum: number,
    queryCriteria: {
      sort: string;
      filters: {
        priceRange: Array<string>;
        priceLeast: string;
        priceMax: string;
        husRooms: Array<string>;
        houseAreas: Array<string>;
        chaoxiangs: Array<string>;
        houseTags: Array<string>;
        floorLevels: Array<string>;
        houseAges: Array<string>;
        usage: Array<string>;
        yongtus: Array<string>;
        zhuangxius: Array<string>;
      };
    }) {
    const url = '/api/renthouse/selling-houses';

    let queryCriteriaUrl: string = '?';
    if (keyword) {
      queryCriteriaUrl += `keyword=${keyword}&`;
    }
    if (pageNum !== null) {
      queryCriteriaUrl += `pageNum=${pageNum}&`;
    }


    for (const criteria in queryCriteria.filters) {
      const urlKey: string = criteria;
      let urlValue: string = '';
      // 判断属性值是否为数组
      //@ts-ignore
      if (typeof queryCriteria.filters[criteria] === 'object') urlValue = queryCriteria.filters[criteria].join('_');
      //@ts-ignore
      else urlValue = queryCriteria.filters[criteria];

      queryCriteriaUrl += `${urlKey}=${urlValue}&`;
    }
    return await webGet(url + queryCriteriaUrl);
  },

  onFouse() {
    wx.navigateTo({
      url: '/pages/search/search',
    });
  },
  // 搜索
  onSearch() {
    this.searchRentHouse(wx.getStorageSync('keyword'), 1, this.data.queryCriteria)
      .then((res: any) => {
        console.log(res.data.records)
        this.setData({
          rentSellingInfos: res.data.records
        });
      })

  },

  // 城市切换
  onCilkCity() {
    wx.navigateTo({
      url: '/pages/select-city/select-city'
    });
  },

  // 点击进入筛选
  onFilterTabItemClick(event: any): void {
    const tabIndex = event.currentTarget.dataset.index;
    this.data.targetItem = event.currentTarget.dataset.item.label;
    this.data.index = tabIndex;
    if (tabIndex !== this.data.activeTabIndex) {
      this.showFilterTabPanel(tabIndex);
    } else {
      this.hideFilterTabPanel();
    }
  },
  // 显示下拉列表
  showFilterTabPanel(tabIndex: number): void {
    this.data.activeTabIndex = this.data.index;
    this.data.activeTabName = this.data.filterTabsMetadata[tabIndex].name;
    this.setData({
      open: true,
      activeTabName: this.data.activeTabName,
      activeTabIndex: this.data.activeTabIndex
    });
  },
  // 隐藏下拉列表
  hideFilterTabPanel(): void {
    this.data.activeTabIndex = -1;
    this.data.activeTabName = '';
    this.setData({
      open: false
    });
  },
  // 查看房源
  _onFilterHousingList(): void {
    this.data.queryCriteria = {
      sort: this.data.queryCriteria.sort,
      filters: this.data.queryCriteria.filters
    };

    this.hideFilterTabPanel();
    this.onSearch()
  },
  _onCheckItemClick(event: any): void {
    const targetCheckItem = event.currentTarget.dataset.item;
    const index = event.currentTarget.dataset.index;
    const filtername = event.currentTarget.dataset.filtername;
    targetCheckItem.checked = !targetCheckItem.checked;
    //寻找筛选项
    const filterFormItem = this.data.filtersFormdata[filtername];
    filterFormItem.options[index].checked = targetCheckItem.checked;

    if (targetCheckItem.checked && filterFormItem && !filterFormItem.multiple) {
      filterFormItem.options.forEach((checkItem: any) => {
        if (checkItem.value != targetCheckItem.value) {
          checkItem.checked = false;
        }
      });
    }

    if (!this.data.queryCriteria.sort) {
      this.data.filtersFormdata.sortMethod.options[0].checked = true
    }

    this.setData({
      filtersFormdata: this.data.filtersFormdata
    });

    if (filtername == 'sortMethod') {
      this._onFilterHousingList();
    }

    const multiple = filterFormItem.multiple;
    const checkedValues = filterFormItem.options
      .filter((checkitem: any) => checkitem.checked)
      .map((checkedItem: any) => checkedItem.value);
    if (multiple) {
      this.data.queryCriteria.filters[filtername] = checkedValues;
    }

  },

  // 回到首页方法
  onClickHome() {
    wx.switchTab({
      url: '/pages/home/home'
    });
  }
});
