export enum ERROR_CODE {
    apiNoResponse = 'ERR_20001',
    apiNoPermission = 'ERR_20002',
    apiNotLogin = 'ERR_20003',
    apiHttpError = 'ERR_20004',
    apiNoData = 'ERR_20005',
    apiHasError = 'ERR_20006',
    resDuplicateAudience = 'ERR_3333',
    resImageCutFail = 'ERR_3335'
}

export enum RESPONSE_STATUS {
    no_access = 401,
    no_login = 403,
    order_error = 300
}
