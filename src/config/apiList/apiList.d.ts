
export interface IapiList {
    [index: string]: any
    common: {
        uploadImg: string
        getBankCardInfo: string
    }
    home: {
        banner: string
        login: string
        logout: string
        userLogin: string
        userBase: string
    }
    qywxApi: {
        userList: string,
        userDetail: string
    }
}
