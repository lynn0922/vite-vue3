import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import JSONBIG from 'json-bigint'
import { ERROR_CODE, RESPONSE_STATUS } from '@/enum/error-code'
import api from '@/config/api-list'
import { getApiSign } from './util'

// 默认配置  使用jsonbig转换响应数据
axios.defaults.transformResponse = [
    (data) => {
        return JSONBIG.parse(data)
    }
]
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['ajax-req'] = '1'

class AxiosApi {
    host: string
    API: any
    dataCache: any
    options: {
        showStatusErrorBox: boolean
        useResponse: boolean
    }

    constructor(options = {}) {
        this.host = '/'
        this.API = {}
        this.dataCache = {}
        this.options = Object.assign(
            {
                showStatusErrorBox: true, // 是否处理错误弹窗提示
                useResponse: false // 是否返回response，默认返回response.data;
            },
            options
        )
    }

    async axiosRequest(config: AxiosRequestConfig) {
        try {
            const response: AxiosResponse = await axios(config)
            this.handleError(response, config)
            if (this.options.useResponse) {
                return response
            } else {
                return response.data
            }
        } catch (error) {
            this.handleError(error.response, config)
        }
    }

    handleError(response: AxiosResponse, config = {}) {
        // 没有登录态 重定向至指定 url
        if (response && response.status === 200 && response.data.bizCode === '100') {
            window.location.href = response.data.redirectUrl
            return
        }

        let errorCode: any
        if (!response) {
            if (this.options.showStatusErrorBox) ElMessage.error('系统无响应')

            errorCode = ERROR_CODE.apiNoResponse
        } else if (response.status === RESPONSE_STATUS.no_access) {
            errorCode = ERROR_CODE.apiNoPermission

            this.handleUnauthError(response)
        } else if (response.status === RESPONSE_STATUS.no_login) {
            errorCode = ERROR_CODE.apiNotLogin

            this.handleUnLoginError(response)
        } else if (response.status > RESPONSE_STATUS.order_error) {
            errorCode = ERROR_CODE.apiHttpError

            if (this.options.showStatusErrorBox) ElMessage.error('系统错误，请稍后再试')
        } else {
            let data = response.data
            if (!data) {
                errorCode = ERROR_CODE.apiNoData

                ElMessage.error('系统错误，请稍后再试')
            } else if (+data.code !== 1) {
                errorCode = ERROR_CODE.apiHasError

                this.handleErrorWithStatusCode(data)
            }
        }
        if (errorCode) {
            /*Mar.report(errorCode, {
            req: config,
            res: response
            });*/
        }
    }
    handleErrorWithStatusCode(data: any) {
        if (this.options.showStatusErrorBox) {
            ElMessage.error(data.msg)
        }
    }

    handleUnLoginError(response: AxiosResponse) {}
    handleUnauthError(response: AxiosResponse) {}

    getAbsoluteApi(url: string) {
        if (/^((http(s?):)?\/\/)/.test(url)) return url
        if (
            (url.indexOf('?') === -1 && url.indexOf('.') > -1) ||
            (url.indexOf('.') > -1 && url.indexOf('?') > url.indexOf('.'))
        ) {
            var urlSplit = url.split('.')
            if (urlSplit.length > 1) {
                url = api[`${urlSplit[0]}`][`${urlSplit[1]}`]
            }
            if (!url) return ''
        }
        if (!/^(\/)|^(http(s?):\/\/)/.test(url)) {
            url = this.host + url
        }
        return url
    }
    getUrlPathParams(url: string) {
        let params: {
            [index: string]: any
        } = {}
        if (!url || url.indexOf('?') === -1) {
            return params
        }
        let l_arr = url.split('?')
        let paramStr = ''
        if (l_arr && l_arr.length > 1) {
            paramStr = l_arr[1]
        }
        if (paramStr) {
            let seg = paramStr.split('&'),
                len = seg.length,
                i = 0,
                s
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

    updateParamsApi(obj: { params?: any; url?: string; method?: string; data?: any }) {
        obj.params = obj.params || {}
        obj.url = this.getAbsoluteApi(obj.url as string)
        obj.params = JSON.parse(JSON.stringify(obj.params))
        obj.params = Object.assign(
            {
                timestamp: new Date().getTime()
            },
            obj.params
        )

        let pathQuery: string[] = []
        obj.url = obj.url.replace(/\{(.*?)\}/g, function (match, key) {
            pathQuery.push(key)
            return obj.params[key] || ''
        })
        pathQuery.forEach((key) => {
            delete obj.params[key]
        })

        axios.defaults.headers.common['Authorization'] = `OAuth apiSign=${getApiSign({
            ...this.getUrlPathParams(obj.url),
            ...obj.params
        })}`

        if (obj.method !== 'get' && typeof obj.data === 'undefined') {
            let dataTmp: string[] = []
            Object.keys(obj.params).forEach((key) => {
                dataTmp.push(`${key}=${obj.params[key]}`)
            })
            obj.data = dataTmp.join('&')
            obj.params = {}
        }
        Object.keys(obj.params).forEach((key) => {
            let value = obj.params[key]
            if (Array.isArray(value)) {
                obj.params[key] = value.join(',')
            }
        })
        return {
            url: obj.url,
            params: obj.params,
            data: obj.data
        }
    }
    redirect(url: string, params: any) {
        let obj = this.updateParamsApi({
            method: 'get',
            url,
            params
        })
        let querys: any = []
        Object.keys(obj.params).forEach((k) => {
            querys.push(k + '=' + obj.params[k])
        })
        querys = querys.join('&')
        if (obj.url.indexOf('?') > -1) {
            obj.url += '&' + querys
        } else if (querys.length > 0) {
            obj.url += '?' + querys
        }
        window.location.href = obj.url
    }
    /**
     *
     * @param config {method, url, params, data}
     */
    request(config = {}) {
        return this.axiosRequest({
            ...config,
            ...this.updateParamsApi(config)
        })
    }
    get(url: string, params: any) {
        let method = 'get'
        return this.axiosRequest({
            ...this.updateParamsApi({
                method,
                url,
                params
            })
        })
    }
    post(url: string, params: any, data: any) {
        let method = 'post'
        return this.axiosRequest({
            ...this.updateParamsApi({
                method,
                url,
                params,
                data
            })
        })
    }
    delete(url: string, params: any, data: any) {
        let method = 'delete'
        return this.axiosRequest({
            ...this.updateParamsApi({
                method,
                url,
                params,
                data
            })
        })
    }
    put(url: string, params: any, data: any) {
        let method = 'put'
        return this.axiosRequest({
            ...this.updateParamsApi({
                method,
                url,
                params,
                data
            })
        })
    }
    cacheGet(url: string, params: any, force: any) {
        if (typeof params === 'boolean') {
            force = params
            params = {}
        }
        let cacheUrl =
            url +
            '?' +
            Object.keys(params || {})
                .map((paramKey) => [paramKey, params[paramKey]].join('='))
                .join('&')
        if (typeof this.dataCache[cacheUrl] !== 'undefined' && !force) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(JSON.parse(this.dataCache[cacheUrl]))
                }, 16)
            })
        } else {
            return this.get(url, params).then((data) => {
                if (data && data.data) {
                    this.dataCache[cacheUrl] = JSON.stringify(data)
                } else {
                    delete this.dataCache[url]
                }
                return data
            })
        }
    }
}

export default AxiosApi
