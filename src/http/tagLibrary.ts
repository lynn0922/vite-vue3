import { defHttp } from '@/utils/axios/index'
import { TagLibrary } from '@/enum/api'

interface Iparams {
    type: string
}

interface TagLibraryListModel {
    success: boolean
    msg: string
    records: any[]
    total?: number
}

interface TagLibraryNotListModel {
    code: number
    mag: string
    data: string
}

/**
 *
 * @param params 获取标签库列表 { type：1 } 1 固定标签 2 动态标签
 * @returns
 */
export const getTagLibraryList = async (params: Iparams) => {
    return await defHttp.get<TagLibraryListModel>({ url: TagLibrary.TAGLIST, params })
}

/**
 *
 * @returns 获取标签树列表
 */
export const getTagTree = async () => {
    return await defHttp.get<TagLibraryListModel>({ url: TagLibrary.TAGTREE })
}

/**
 *
 * @param id 刷新标签组 接口
 * @returns
 */
export const RefreshTagGroup = async (id: string) => {
    return await defHttp.get<TagLibraryNotListModel>(
        { url: TagLibrary.REFRESHTAGGROUP, params: id },
        {
            joinParamsToUrl: true
        }
    )
}
