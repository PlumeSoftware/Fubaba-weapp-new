import { get } from "../../utils/http";

Component({
  properties: {
    sellingHouse: {
      type: Object,
      value: {}
    }
  },
  options: {},
  data: {
    picture: {
      picture_name: '',
      info_type: 1
    },
    //图片服务器根路径
    husPictureRootPath: '',
  },
  lifetimes: {
    ready() {
      const { hus_rooms, hus_halls, hus_kitchens, hus_toilets } = this.properties.sellingHouse;
      //部分房源缺失部分数据，缺失数据不显示
      const model = [] as Array<{}>;
      if (hus_rooms) model.push(`${hus_rooms}室`);
      if (hus_halls) model.push(`${hus_halls}厅`);
      if (hus_kitchens) model.push(`${hus_kitchens}厨`);
      if (hus_toilets) model.push(`${hus_toilets}卫`);

      this.setData({
        model: model.join(' '),
        husPictureRootPath: getApp().global.picturePath,
        picture: this.properties.sellingHouse.housing.pictures[0]
      });
    },
  },
  methods: {
    errorLoadCover() {
      //封面index为0失败才会触发该方法
      this.checkImageUrl()
    },

    checkImageUrl(): void {
      get<{ statusCode: number }>(`${this.data.husPictureRootPath} + ${this.properties.sellingHouse.housing.pictures[0].picture_name}`)
        .then(res => {
          if (res?.statusCode == 404) {
            this.properties.sellingHouse.housing.pictures.pop()
            if (this.properties.sellingHouse.housing.pictures.length) this.checkImageUrl();
            else this.setData({ picture: { picture_name: "../../images/logo.png", info_type: 1 } });
          }
          else {
            const name: string = this.properties.sellingHouse.housing.pictures[0].picture_name;
            const axf = name.split('.').pop()?.toLowerCase();
            const type = ['jpg', 'png', 'jpeg'].find(s => s == axf) ? 1 : 2;
            this.setData({ picture: { picture_name: name, info_type: type } })
          }
        },
        )
    },
    onclickHouseDetails() {
      const { req_id, agent, req_type } = this.properties.sellingHouse;
      wx.navigateTo({
        url: `/pages/house-details/house-details?req_id=${req_id}&agent_user_id=${agent.agent_user_id}&req_type=${req_type}&agent_tel=${agent.agent_tel}`
      });
    },
  }
});
