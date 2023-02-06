export const webGet = async function <T>(url: string, params: any = new Object()): Promise<T> {
    const keys: string[] = Object.keys(params);
    url = getApp().get('api') + url + (params ? '?' : '')
    keys.forEach(key => {
        url = url + key + '=' + params[key] + '&'
    })
    if (keys.length > 0) {
        url = url.slice(0, -1)
    }
    const token = `token=${getApp().get('token')}`
    return await new Promise<T>((r) => {
        wx.request({
            url: url,
            method: 'GET',
            header: {
                token: token,
                cookie: token
            },
            success: (res) => {
                if (res.statusCode < 400) {
                    r(res.data as T)
                } else {
                    r({} as T)
                }
            },
            fail: () => {
                r({} as T)
            }
        })
    })
}

export const webPost = async function <T>(url: string, body: any = new Object()): Promise<T> {
    url = getApp().get('api') + url
    const token = getApp().get('token');
    return await new Promise<T>((r) => {
        wx.request({
            url: url,
            header: {
                cookie: token,
                token: token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            data: body,
            success: (res) => {
                r(res.data as T)
            },
        })
    })
}