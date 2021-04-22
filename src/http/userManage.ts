import { silentApi, httpRequestObject } from '@/utils/api'

/**
 * 获取企业微信用户列表
 * @param params 请求参数
 * @returns 
 */
export const getUserList = async (params: any) => {
    return await httpRequestObject.get('qywxApi.userList', params)
}
