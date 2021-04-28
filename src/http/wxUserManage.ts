import { defHttp } from '@/utils/axios/index'
import { WxUserApi } from '@/enum/api'

interface Iparams {
    searchUserType?: string
    searchUserKey?: string
    gender?: string
    ucodes?: string
    tagIds?: string
    pageNo: number
    pageSize: number
}

interface WxUserListModel {
    success: boolean
    msg: string
    records: any[]
    total: number
}

/**
 *
 * @param params 获取微信用户列表
 * @returns
 */
export const getWxUserList = async (params: Iparams) => {
    return await defHttp.get<WxUserListModel>({ url: WxUserApi.WXUSERLIST, params })
}

/**
 *
 * @param id 根据ID查找用户详情
 * @returns
 */
export const getWxUserDetail = async (id: string) => {
    return await defHttp.get(
        { url: WxUserApi.wxuserDetail, params: id },
        {
            joinParamsToUrl: true
        }
    )
}
