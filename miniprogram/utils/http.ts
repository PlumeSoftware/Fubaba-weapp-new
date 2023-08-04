const BaseUrl = 'http://127.0.0.1:39444'

export function get<T>(url: string, query?: { [key: string]: PropertyKey | null }) {
    return new Promise<T>((resolve, reject) => {
        wx.request({
            url: BaseUrl + url,
            data: query,
            method: 'GET',
            header: {
                openid: 'owPhC42c2p0h1IraIrX3bZln-kf4',
                city: getApp().get('code')
            },
            success(res) {
                resolve(res.data as T)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

export function post<T>(url: string, body?: { [key: string]: PropertyKey | null }) {
    return new Promise<T>((resolve, reject) => {
        wx.request({
            url: BaseUrl + url,
            data: body,
            method: 'POST',
            header: {
                openid: 'owPhC42c2p0h1IraIrX3bZln-kf4',
                city: getApp().get('code')
            },
            success(res) {
                resolve(res.data as T)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}