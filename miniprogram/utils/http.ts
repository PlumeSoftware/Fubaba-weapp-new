export function get<T>(url: string, query?: { [key: string]: PropertyKey | null }) {
    return new Promise<T>((resolve, reject) => {
        wx.request({
            url,
            data: query,
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
            url,
            data: body,
            method: 'POST',
            success(res) {
                resolve(res.data as T)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}