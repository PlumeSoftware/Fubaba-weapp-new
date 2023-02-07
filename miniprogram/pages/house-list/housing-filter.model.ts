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
    { value: 'p1', label: '40万以下' }, { value: 'p2', label: '40-60万' }, { value: 'p3', label: '60-80万' },
    { value: 'p4', label: '80-100万' }, { value: 'p5', label: '100-150万' }, { value: 'p6', label: '150-200万' },
    { value: 'p7', label: '200万以上' }
  ],
  husRoomOptions: [
    { value: 'r1', label: '一室' }, { value: 'r2', label: '二室' }, { value: 'r3', label: '三室' },
    { value: 'r4', label: '四室' }, { value: 'r5', label: '五室' }, { value: 'r6', label: '五室以上' }
  ],
  areasOptions: [
    { value: 'a1', label: '50㎡以下' }, { value: 'a2', label: '50-70㎡' }, { value: 'a3', label: '70-90㎡' },
    { value: 'a4', label: '90-110㎡' }, { value: 'a5', label: '110-130㎡' }, { value: 'a6', label: '130-150㎡' },
    { value: 'a7', label: '150-200㎡' }, { value: 'a8', label: '200㎡以上' }
  ], tagsOptions: [
    { value: 'A', label: '市场附近' }, { value: 'B', label: '车站附近' }, { value: 'C', label: '封闭小区' },
    { value: 'D', label: '近商业区' }, { value: 'E', label: '南北通厅' }
  ], exposeOptions:
    [
      { value: 'c1', label: '南北' }, { value: 'c2', label: '南' }, { value: 'c3', label: '东西' },
      { value: 'c4', label: '东南' }, { value: 'c5', label: '西南' }
    ], levelsOptions:
    [
      { value: 'fl1', label: '低楼层' }, { value: 'fl2', label: '中楼层' }, { value: 'fl3', label: '高楼层' }
    ], agesOptions:
    [
      { value: 'y1', label: '5年以内' }, { value: 'y2', label: '10年以内' }, { value: 'y3', label: '15年以内' },
      { value: 'y4', label: '20年以内' }, { value: 'y5', label: '20年以上' }
    ], fitmentOptions:
    [
      { value: 'z1', label: '清水' }, { value: 'z2', label: '简装' }, { value: 'z3', label: '精装' },
      { value: 'z3', label: '普装' }, { value: 'z4', label: '豪装' }
    ], usageOptions:
    [
      { value: 'u1', label: '普通住宅' }, { value: 'u2', label: '公建' }, { value: 'u3', label: '别墅' },
      { value: 'u4', label: '商铺' }, { value: 'u5', label: '写字楼' }
    ], jiegousOptions:
    [
      { value: 'j1', label: '框架' }, { value: 'j2', label: '砖混' }, { value: 'j3', label: '钢筋混凝土' },
      { value: 'j4', label: '砖木' }, { value: 'j5', label: '其他' }
    ], sortOptions:
    [
      {
        value: 's1',
        label: '最新发布'
      },
      {
        value: 's2',
        label: '总价从低到高'
      },
      {
        value: 's3',
        label: '总价从高到低'
      },
      {
        value: 's4',
        label: '单价从低到高'
      },
      {
        value: 's5',
        label: '面积从大到小'
      }
    ]
};
