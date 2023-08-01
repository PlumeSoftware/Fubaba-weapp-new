import { TapEvent } from "miniprogram/entity/event"

// switch (type) {
//     case "name": {
//         return function (fy: FyRes) { return fy.houseInfo?.houseAddress?.includes(value.toString()) };
//     }
//     case "price":
//         switch (value) {
//             case "A": return function (fy: FyRes) { return fy.reqAmt <= 40 };
//             case "B": return function (fy: FyRes) { return fy.reqAmt >= 40 && fy.reqAmt <= 60 };
//             case "C": return function (fy: FyRes) { return fy.reqAmt >= 60 && fy.reqAmt <= 80 };
//             case "D": return function (fy: FyRes) { return fy.reqAmt >= 80 && fy.reqAmt <= 100 };
//             case "E": return function (fy: FyRes) { return fy.reqAmt >= 100 && fy.reqAmt <= 150 };
//             case "F": return function (fy: FyRes) { return fy.reqAmt >= 150 && fy.reqAmt <= 200 };
//             case "G": return function (fy: FyRes) { return fy.reqAmt > 200 };
//         }
//     case "area":
//         switch (value) {
//             case "A": return function (fy: FyRes) { return fy.houseInfo?.houseArea <= 50 };
//             case "B": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 50 && fy.houseInfo?.houseArea <= 70 };
//             case "C": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 70 && fy.houseInfo?.houseArea <= 90 };
//             case "D": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 90 && fy.houseInfo?.houseArea <= 110 };
//             case "E": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 110 && fy.houseInfo?.houseArea <= 130 };
//             case "F": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 130 && fy.houseInfo?.houseArea <= 150 };
//             case "G": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 150 && fy.houseInfo?.houseArea <= 200 };
//             case "H": return function (fy: FyRes) { return fy.houseInfo?.houseArea >= 200 };
//         }
//     case "room":
//         return function (fy: FyRes) { return fy.houseInfo?.houseRooms == value };
//     case "expose": {
//         const houseExposeList = await this.cacheManager.get<HouseExpose[]>('houseExposeList' + city);
//         //将查询值转换为数据库可用值
//         const expose = value.toString().replace('S', '南').replace('N', '北').replace('E', '东').replace('W', '西');
//         return function (fy: FyRes) { return fy.houseInfo?.houseExpose == houseExposeList.find(i => i.expose == expose)?.expose };
//     }
//     case "floor":
//         switch (value) {
//             case "L": return function (fy: FyRes) { return fy.houseInfo?.houseInFloor <= 6 };
//             case "M": return function (fy: FyRes) { return fy.houseInfo?.houseInFloor > 6 && fy.houseInfo?.houseInFloor <= 9 };
//             case "H": return function (fy: FyRes) { return fy.houseInfo?.houseInFloor > 9 };
//         }
//     case "fitment":
//         const houseFitmentList = await this.cacheManager.get<HouseFitment[]>('houseFitmentList' + city);
//         //将houseFitmentCode转换为字典
//         const dickey = ["A", "B", "C", "D", "E"]
//         const dic = houseFitmentList.map((i, index) => { return { key: dickey[index], value: i.fitment } })
//         return function (fy: FyRes) { return dic.find(i => i.value == fy.houseInfo?.houseFitment)?.key == value };
//     case "usage":
//         const houseUsageList = await this.cacheManager.get<HouseUsage[]>('houseUsageList' + city);
//         switch (value) {
//             case "A": return function (fy: FyRes) { return fy.houseInfo?.houseUsage == houseUsageList.find(i => i.usage == "普通住宅")?.usage };
//             case "B": return function (fy: FyRes) { return fy.houseInfo?.houseUsage == houseUsageList.find(i => i.usage == "公建")?.usage };
//             case "C": return function (fy: FyRes) { return fy.houseInfo?.houseUsage == houseUsageList.find(i => i.usage == "别墅")?.usage };
//             case "D": return function (fy: FyRes) { return fy.houseInfo?.houseUsage == houseUsageList.find(i => i.usage == "商铺")?.usage };
//             case "E": return function (fy: FyRes) { return fy.houseInfo?.houseUsage == houseUsageList.find(i => i.usage == "写字楼")?.usage };
//         }
//     case "construct":
//         const houseConstructionList = await this.cacheManager.get<HouseConstruction[]>('houseConstructionList' + city);
//         switch (value) {
//             case "A": return function (fy: FyRes) { return fy.houseInfo?.houseConstruction == houseConstructionList.find(i => i.construction == "框架")?.construction };
//             case "B": return function (fy: FyRes) { return fy.houseInfo?.houseConstruction == houseConstructionList.find(i => i.construction == "砖混")?.construction };
//             case "C": return function (fy: FyRes) { return fy.houseInfo?.houseConstruction == houseConstructionList.find(i => i.construction == "钢筋混凝土")?.construction };
//             case "D": return function (fy: FyRes) { return fy.houseInfo?.houseConstruction == houseConstructionList.find(i => i.construction == "砖木")?.construction };
//             case "E": return function (fy: FyRes) { return fy.houseInfo?.houseConstruction == houseConstructionList.find(i => i.construction == "其它")?.construction };

//         }
//     case "build_year":
//         return function (fy: FyRes) { return fy.houseInfo?.houseBuildYear < Number(value) + new Date().getFullYear() };
// }

Component({
    data: {
        sifterList: [
            {
                name: '价格',
                values: [
                    { name: "40万以下", param: "A", choose: false },
                    { name: "40-60万", param: "B", choose: false },
                    { name: "60-80万", param: "C", choose: false },
                    { name: "80-100万", param: "D", choose: false },
                    { name: "100-150万", param: "E", choose: false },
                    { name: "150-200万", param: "F", choose: false },
                    { name: "200万以上", param: "G", choose: false }
                ]
            },
            {
                name: '房型',
                values: [
                    { name: "一室", param: "1", choose: false },
                    { name: "二室", param: "2", choose: false },
                    { name: "三室", param: "3", choose: false },
                    { name: "四室", param: "4", choose: false }
                ]
            },
            {
                name: '面积',
                values: [
                    { name: "50㎡以下", param: "A", choose: false },
                    { name: "50-70㎡", param: "B", choose: false },
                    { name: "70-90㎡", param: "C", choose: false },
                    { name: "90-110㎡", param: "D", choose: false },
                    { name: "110-130㎡", param: "E", choose: false },
                    { name: "130-150㎡", param: "F", choose: false },
                    { name: "150-200㎡", param: "G", choose: false },
                    { name: "200㎡以上", param: "H", choose: false }
                ]
            },
            {
                name: '更多',
            },
            {
                name: '排序',
            }
        ],
        currentChooseIndex: -1
    } as { [key: string]: Object },

    methods: {
        changeSifter(e: TapEvent) {
            if (this.data.currentChooseIndex == e.currentTarget.dataset.index) {
                this.setData({
                    currentChooseIndex: -1
                })
            } else {
                this.setData({
                    currentChooseIndex: e.currentTarget.dataset.index
                })
            }
        },
        changeChosen(e: TapEvent) {
            const sifterList = this.data.sifterList;
            const typeIndex = e.currentTarget.dataset.typeindex;
            const chosenIndex = e.currentTarget.dataset.chosenindex;
            sifterList[typeIndex].values[chosenIndex].choose = !sifterList[typeIndex].values[chosenIndex].choose;
            this.setData({
                sifterList: sifterList
            })
        },
    } as { [key: string]: any }
})