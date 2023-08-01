import { Picture } from "./media";
import { Agent } from "./user";

/**
 * Fy
 */
export interface Fy {
    /**
     * 房评备注
     */
    adRemark?: null | string;
    agentInfo: Agent;
    houseInfo: House;
    /**
     * 支付方法
     */
    paywayCode?: number;
    /**
     * 发布时间
     */
    releaseTime: string;
    /**
     * 出售单价
     */
    reqAmt?: number;
    /**
     * 出售租价
     */
    reqAmt2?: number;
    /**
     * 出售总价
     */
    reqAmt3?: number;
    /**
     * 出售信息id
     */
    reqId: string;
}

/**
 * House
 */
export interface House {
    houseAddress: string;
    houseArea: number;
    /**
     * 城区
     */
    houseBlock?: string;
    houseBuildYear: number;
    houseConstruction: string;
    houseExpose: string;
    /**
     * 房源特色
     */
    houseFeature: HouseFeature[];
    houseFitment: string;
    houseHalls: number;
    houseId: number;
    houseInFloor: number;
    /**
     * 房源已安装设施
     */
    houseInnerPlant: HouseInnerPlant[];
    houseKitchens: number;
    houseName: string;
    houseRooms: number;
    houseToilets: number;
    houseTotalFloor: number;
    houseUsage: string;
    /**
     * 房源图片列表
     */
    pictures: Picture[];
}

export interface HouseFeature {
    /**
     * 标签code
     */
    code: string;
    /**
     * 标签名称
     */
    name: string;
}

export interface HouseInnerPlant {
    /**
     * 设施code
     */
    code: string;
    /**
     * 设施名称
     */
    name: string;
}