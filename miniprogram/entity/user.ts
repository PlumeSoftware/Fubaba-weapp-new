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
    agent_tel: string;
    avatar: string;
    qrPic: string;
    agent_real_name: string;
    userId: number;
    agent_user_id: number;
}