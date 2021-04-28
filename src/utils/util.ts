import cryptoJs from 'crypto-js'
import { isObject } from '@/utils/is'
import { AxiosRequestConfig } from 'axios'

/**
 * 请求header Authorization
 * @param {params} 请求参数
 */
export function getApiSign(params: any) {
    const paramKeys = Object.keys(params).sort()
    const paramValues = paramKeys.map((key) => (typeof params[key] !== 'undefined' ? params[key].toString() : ''))
    const str = paramValues.join('')
    let salt = 'ebd15ed3a9704ebbb7bfd051e4a1ca28' // 唯享客加签
    const tokenSecret = getCookie('_csrf_token')
    if (tokenSecret) {
        salt = salt + '&' + tokenSecret
    }
    const sha1 = cryptoJs.algo.SHA1.create()
    sha1.reset()
    sha1.update(salt)
    const hashed = sha1.finalize(str).toString()
    return hashed
}

export function getCookie(cname: string) {
    const name = cname + '='
    const ca = document.cookie.split(';')
    let i
    let c
    const caLength = ca.length
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

/**
 *
 * @param {*} fieldList
 * 初始化表单规则
 */
export const initRules = (fieldList: { type: string; required: boolean; validator: any; value: string }) => {
    const obj: { [index: string]: any } = {}
    // 循环字段列表
    for (const item of fieldList as any) {
        const type = item.type === 'select' ? '选择' : '输入'
        if (item.required) {
            if (item.validator) {
                obj[item.value] = {
                    required: item.required,
                    validator: item.validator,
                    trigger: 'blur'
                }
            } else {
                obj[item.value] = {
                    required: item.required,
                    message: '请' + type + item.label,
                    trigger: 'blur'
                }
            }
        } else if (item.validator) {
            obj[item.value] = {
                validator: item.validator,
                trigger: 'blur'
            }
        }
    }
    return obj
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
    let parameters = ''
    for (const key in obj) {
        parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
    }
    parameters = parameters.replace(/&$/, '')
    return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
    let key: string
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
    }
    return src
}

/**
 *
 * @param config  移除请求中参数中的 空字符串，null, undefined
 */
export function clearEmptyParam(config: AxiosRequestConfig) {
    ;['data', 'params'].forEach((item) => {
        if ((config as any)[item]) {
            const keys = Object.keys((config as any)[item])
            if (keys.length) {
                keys.forEach((key) => {
                    const rawType = toRawType((config as any)[item])
                    if (['', undefined, null].includes((config as any)[item][key]) && ['Object'].includes(rawType)) {
                        delete (config as any)[item][key]
                    }
                })
            }
        }
    })
}

/**
 * @description 获取原始类型
 * @param {*} value
 * @returns {String} 类型字符串，如'String', 'Object', 'Null', 'Boolean', 'Number', 'Array'
 */
export function toRawType(value: any) {
    return Object.prototype.toString.call(value).slice(8, -1)
}
