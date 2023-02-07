import { Agent, UserInfo, WxInfo } from "../entity/user";
import { webGet, webPost } from "./http";

export const login = async function (): Promise<UserInfo> {
    const res: { code: string } = await new Promise(r => { wx.login({ success: (res) => { r(res) } }) });
    const auth: any = { code: res.code };

    //如果缓存存在agent信息且不为经纪人，那么带上agent信息
    if (getApp().get('agent') && (!getApp().get('erptoken'))) {
        auth.agent_user_id = getApp().get('agent').agent_user_id;
        auth.city = getApp().get('city');
    }

    const { userInfo, wxInfo, token } = (await webGet<{ userInfo: UserInfo, wxInfo: WxInfo, token: string }>('/api/wxapi/login', auth));
    //存储token
    getApp().set('token', token, true)
    //判断是否为拉黑用户
    getApp().set('question_flag', userInfo.question_flag, true)

    userInfo.name = `微信用户${userInfo.fb_user_id.slice(-6)}`
    getApp().set('userInfo', userInfo)

    // 判断是否为经纪人
    if (userInfo.phone) {
        const agent = (await webGet<{ data: Agent }>(`/api/agent/get/${userInfo.phone}`)).data;
        if (agent.agent_user_id) {
            const data =
            {
                agent_user_id: agent.agent_user_id,
                fb_user_id: userInfo.fb_user_id,
                agent_tel: agent.agent_tel,
                unionid: wxInfo.openid
            }
            getApp().set('erptoken', (await webPost<{ data: string }>('/api/agent/update', data)).data, true);

            getApp().set('agent_tel', agent.agent_tel,true)
            getApp().set('agent_real_name', agent.agent_real_name,true)
            webGet('/api/agent/getQrPic', { city: getApp().get('city'), phone: agent.agent_tel.slice(0, 11) });
        }
    }
    return userInfo;
}