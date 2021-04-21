declare interface Api {
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
}
