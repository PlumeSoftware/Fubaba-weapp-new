export interface UserInfo {
    fb_user_id: string
    phone: string
    question_flag: number | string | null
    unionid: string,
    name?: string
}

export interface WxInfo {
    openid: string
    unionid: string
}

export interface Agent {
    agentTel: string;
    avatar: string;
    qrPic: string;
    realName: string;
    userId: number;
}