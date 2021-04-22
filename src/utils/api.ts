import { ElMessage } from 'element-plus'
import AxiosApi from './axios'

const host = '//vsp-admin.vip.vip.com'

class PackApi extends AxiosApi {
    constructor(options = {}) {
        super(options)
        this.host = host
    }
    handleUnauthError(response: any) {
        let url = response.config.url
        if (url === this.getAbsoluteApi('user.login')) {
            ElMessage.warning('无权限访问')
            window.location.href = 'http://err.vip.com/404.html'
        } else {
            ElMessage.warning('无权限，请稍后再试')
        }
    }
    handleUnLoginError(response: any) {
        let url = response.config.url
        if (url === this.getAbsoluteApi('user.login')) {
            /*this.redirect('user.login', {
                r: window.location.hash
            });*/
            window.location.href = 'http://err.vip.com/404.html'
        } else {
            ElMessage.warning('登录已过期，请重新登录')
            window.location.href = 'http://err.vip.com/404.html'
        }
    }
}

let wxkApi = new PackApi()
export let silentApi = new PackApi({ showStatusErrorBox: false })

export const httpRequestObject = {
    get: wxkApi.get.bind(wxkApi),
    post: wxkApi.post.bind(wxkApi),
    delete: wxkApi.delete.bind(wxkApi),
    put: wxkApi.put.bind(wxkApi),
    cacheGet: wxkApi.cacheGet.bind(wxkApi),
    redirect: wxkApi.redirect.bind(wxkApi),
    request: wxkApi.request.bind(wxkApi),
    getAbsoluteApi: wxkApi.getAbsoluteApi.bind(wxkApi),
    create: function (options: any) {
        return new PackApi(options)
    }
}
