export type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

export interface Basic<T extends any> {
    [index: string]: T
}

export interface Irules {
    required?: boolean
    message: string
    trigger: string
    min?: number
    max?: number
    type?: string
    validator?: Ivalidator
}

interface Ivalidator {
    (rule?: any, value: string, callback: (error?: any) => void): void
}

export interface IfieldList {
    label?: string
    value: string
    type: string
    className?: string
    show: boolean
    min?: number
    max?: number
    disabled?: boolean
    autosize?: {
        minRows: number
        maxRows: number
    }
    event: string
    clearable?: boolean
    filterable?: boolean
    list: string
    dateType: string
    key: string
    multiple: boolean
    collapseTags: boolean
    filterMethod: any
    remote: boolean
    remoteMethod: any
    loading: boolean
    loadingText: string
    reserveKeyword: boolean
    defaultFirstOption: boolean
}

export interface IlistType {
    key: string
    value: 1
    disabled?: boolean,
}
