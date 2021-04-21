import cryptoJs from 'crypto-js'

/**
 * 请求header Authorization
 * @param {params} 请求参数
 */
export function getApiSign(params: any) {
    let paramKeys = Object.keys(params).sort()
    let paramValues = paramKeys.map((key) =>
        typeof params[key] !== 'undefined' ? params[key].toString() : ''
    )
    let str = paramValues.join('')
    let salt = 'ebd15ed3a9704ebbb7bfd051e4a1ca28' // 唯享客加签
    let tokenSecret = getCookie('_csrf_token')
    if (tokenSecret) {
        salt = salt + '&' + tokenSecret
    }
    let sha1 = cryptoJs.algo.SHA1.create()
    sha1.reset()
    sha1.update(salt)
    let hashed = sha1.finalize(str).toString()
    return hashed
}

export function getCookie(cname: string) {
    var name = cname + '='
    var ca = document.cookie.split(';')
    var i
    var c
    var caLength = ca.length
    for (i = 0; i < caLength; i += 1) {
        c = ca[i]
        while (c.charAt(0) === ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) !== -1) {
            return c.substring(name.length, c.length)
        }
    }
    return ''
}

/**
 * 通过key找到在列表中对应的显示
 * @param {Object} obj
 *  @param obj.dataList 数据列表
 *  @param obj.value    数据的值对应的字段名称   例如 'value'
 *  @param obj.label    数据的说明对应的字段名称 例如 'label'
 *  @param obj.data     当前传入的数据值
 * @return name        返回当前传入值在数组中对应的名字
 */
export const getDataName = (obj: { dataList: any[]; value: string; label: string; data: any }) => {
    let name = obj.data
    if (Array.isArray(obj.dataList) && obj.dataList.length > 0) {
        for (let i = 0; i < obj.dataList.length; i++) {
            if (obj.dataList[i][obj.value] === obj.data) {
                name = obj.dataList[i][obj.label]
            }
        }
    }
    return name
}
