import { Basic, IfieldList, Ihandle } from './page-table'

export type Itag = {
    title: string
    id: number
}

export interface ItableInfo {
    data: Basic<any>[]
    fieldList: IfieldList[]
    handle: Ihandle
}

export interface IState {
    tagList?: Itag[]
    selectTag?: number
    tableInfo?: ItableInfo
    filterInfo?: any
    listTypeInfo?: IlistTypeInfo
}

export interface IlistTypeInfo {
    statusList: IstatusList[]
}

export interface IstatusList {
    key: string
    value: number
}
