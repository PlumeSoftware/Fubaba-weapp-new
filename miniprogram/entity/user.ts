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
    agent_real_name: string
    agent_tel: string
    agent_user_id: number
}