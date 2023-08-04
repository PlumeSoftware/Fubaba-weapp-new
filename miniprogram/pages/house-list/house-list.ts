import { get } from "../../utils/http"

Page({
    data: {
        houseList: [] as AnyArray,
    },

    async onLoad() {
        console.log(this.data.houseList)
        const result = await get<{ data: AnyArray }>('/fy/getFyInfo')
        this.setData({
            houseList: result.data
        })
    }
})