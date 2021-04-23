export interface IfieldList {
    value: string
    label: string
    fixed?: string
    align?: string
    key?: string
    type?: string
    align?: string
    sortable?: boolean
    width?: string
    minWidth?: string
    children?: Ichildren[]
    list: string
    hidden?: boolean
}

export interface Ichildren {
    key?: string
    value: string
    label: string
    align?: string
    width?: string
    minWidth?: string
}

export interface Ihandle {
    fixed?: string
    align?: string
    label: string
    width?: string
    btList: IbtList[]
}

interface IfRenderFn {
    (row: any): any;
}

export interface IbtList {
    slot?: boolean
    event: string
    ifRender?: IfRenderFn
    type?: string
    icon?: string
    disabled?: boolean
    label?: string
    loading: string
}

export interface Basic<T extends any> {
    [index: string]: T
}

export interface IlistTypeInfo {
    [index: string]: any
}

export interface IState {
    listInfo: {
        pageSizes: number[]
        query: {
            page: number
            limit: number
        }
    }
}
