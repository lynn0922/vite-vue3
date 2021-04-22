import { IapiList } from "./apiList";


const api: IapiList = {
    common: {
        uploadImg: '',
        getBankCardInfo: ''
    },
    home: {
        banner: 'union/ad/banner',
        login: '/login',
        logout: 'adp_logout',
        userLogin: 'union/user/login',
        userBase: '/v/index#/promotion/product'
    },
    qywxApi: {
        userList: '/vsp/workweixin/user/list',
        userDetail: '/vsp/workweixin/user/detail/{id}'
    }
}

export default api
