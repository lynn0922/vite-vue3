export interface IfieldList {
    [index: string]: any
    type?: string
    label?: string
    btType?: string
    icon?: string
    event?: string
    show?: boolean
    value?: string
    list?: string
    width?: string
    children?: any
    minWidth?: string
    sortable?: boolean
    hidden?: boolean
    fixed?: string
    title?: string
}

export interface Ichildren {
    value?: string
    label?: string
    width?: string
    minWidth?: string
}

export interface Basic<T extends any> {
    [index: string]: T
}

export interface IlistTypeInfo {
    [index: string]: any
}

export interface IbtList {
    show?: boolean
    slot?: boolean
    event?: string
    ifRender?: () => {}
    type?: string
    icon?: string
    disabled?: boolean
    label?: string
    loading?: string
}

export interface Ihandle {
    fixed?: string
    label?: string
    width?: string
    btList?: IbtList[]
}

export interface IState {
    listInfo: {
        total: number
        pageSizes: number[]
        query: {
            page: number
            limit: number
        }
    }
}
