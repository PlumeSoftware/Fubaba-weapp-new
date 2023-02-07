//筛选条件
export interface FilterFormItem {
  multiple: boolean;
  options: Array<FilterCheckItem>;
}

export interface FiltersFormdata {
  priceRanges: FilterFormItem;
  priceStart: number;
  priceEnd: number;
  roomTypes: FilterFormItem;
  houseAreas: FilterFormItem;
  chaoxiangs: FilterFormItem;
  houseTags: FilterFormItem;
  floorLevels: FilterFormItem;
  houseAges: FilterFormItem;
  jiegous: FilterFormItem;
  yongtus: FilterFormItem;
  zhuangxius: FilterFormItem;
  sortMethod: FilterFormItem;
  [filtername: string]: FilterFormItem | number;
}
export interface FilterCheckItem {
  value: string;
  label: string;
  checked?: boolean;
}

export interface ErshoufangFilterCriteria {
  priceRanges: Array<string>;
  priceStart: number;
  priceEnd: number;
  roomTypes: Array<string>;
  houseAreas: Array<string>;
  chaoxiangs: Array<string>;
  houseTags: Array<string>;
  floorLevels: Array<string>;
  houseAges: Array<string>;
  jiegous: Array<string>;
  yongtus: Array<string>;
  zhuangxius: Array<string>;

  [fieldname: string]: Array<string | number> | number | string;
}

export interface ErshoufangQueryCriteria {
  sort: string;
  filters: ErshoufangFilterCriteria;
}

export const optionsDeck = {
  priceOptions: [
    {
      value: 'p1',
      label: '1000以内'
    },
    {
      value: 'p2',
      label: '1000-1500'
    },
    {
      value: 'p3',
      label: '1500-2000'
    },
    {
      value: 'p4',
      label: '2000-2500'
    },
    {
      value: 'p5',
      label: '2500-3500'
    },
    {
      value: 'p6',
      label: '3500-5000'
    },
    {
      value: 'p7',
      label: '5000以上'
    }
  ],
  husRoomOptions: [
    {
      value: 'r1',
      label: '一室'
    },
    {
      value: 'r2',
      label: '二室'
    },
    {
      value: 'r3',
      label: '三室'
    },
    {
      value: 'r4',
      label: '四室'
    },
    {
      value: 'r5',
      label: '五室'
    },
    {
      value: 'r6',
      label: '五室以上'
    }
  ],
  areasOptions: [
    {
      value: 'a1',
      label: '50㎡以下'
    },
    {
      value: 'a2',
      label: '50-70㎡'
    },
    {
      value: 'a3',
      label: '70-90㎡'
    },
    {
      value: 'a4',
      label: '90-110㎡'
    },
    {
      value: 'a5',
      label: '110-130㎡'
    },
    {
      value: 'a6',
      label: '130-150㎡'
    },
    {
      value: 'a7',
      label: '150-200㎡'
    },
    {
      value: 'a8',
      label: '200㎡以上'
    }
  ],

  rentPayingWay: [
    {
      value: 'w1',
      label: '月付押一'
    },
    {
      value: 'w3',
      label: '季三押一'
    }, {
      value: 'w6',
      label: '半年付押一'
    }, {
      value: 'w12',
      label: '年付押一'
    },
  ],
  insidePlantList: [{
    value: 'i1',
    label: '宽带'
  },
  {
    value: 'i2',
    label: '电视'
  },
  {
    value: 'i3',
    label: '洗衣机'
  },
  {
    value: 'i4',
    label: '床'
  },
  {
    value: 'i5',
    label: '冰箱'
  },
  {
    value: 'i6',
    label: '空调'
  },
  {
    value: 'i7',
    label: '暖气'
  },
  {
    value: 'i8',
    label: '衣柜'
  },
  {
    value: 'i9',
    label: '热水器'
  },
  {
    value: 'i10',
    label: '天然气'
  }
  ],
  tagsOptions: [
    {
      value: 'A',
      label: '市场附近'
    },
    {
      value: 'B',
      label: '车站附近'
    },
    {
      value: 'C',
      label: '封闭小区'
    },
    {
      value: 'D',
      label: '近商业区'
    },
    {
      value: 'E',
      label: '南北通厅'
    }
  ], jiegousOptions:
    [
      {
        value: 'j1',
        label: '多层'
      },
      {
        value: 'j2',
        label: '高层'
      },
      {
        value: 'j3',
        label: '小高层'
      },
      {
        value: 'j4',
        label: '平房'
      },
      {
        value: 'j5',
        label: '别墅'
      },
      {
        value: 'j5',
        label: '花园洋房'
      },
      {
        value: 'j5',
        label: '其它结构'
      }
    ]
};
