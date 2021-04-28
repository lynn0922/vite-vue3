import { getApiSign } from './util'

export const getToken = (url: string, params: any) => {
    const p = getUrlPathParams(url)

    const apiSign = getApiSign({ ...p, ...params })

    return `OAuth apiSign=${apiSign}`
}

const getUrlPathParams = (url: string) => {
    const params: {
        [index: string]: any
    } = {}
    if (!url || url.indexOf('?') === -1) {
        return params
    }
    const l_arr = url.split('?')
    let paramStr = ''
    if (l_arr && l_arr.length > 1) {
        paramStr = l_arr[1]
    }
    if (paramStr) {
        const seg = paramStr.split('&'),
            len = seg.length
        let i = 0
        let s
        for (; i < len; i++) {
            if (!seg[i]) {
                continue
            }
            s = seg[i].split('=')
            params[s[0]] = s[1]
        }
    }
    return params
}
