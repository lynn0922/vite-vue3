import { Basic, IfieldList, Ihandle } from '@/components/PageTable/tableTypes'
import { reactive } from 'vue'

interface Iitem {
    title: string
    timeTxt: string
    time: string
    target: string
    refresh?: boolean
    showUserNum?: boolean
    create?: boolean
    userTotal?: number
    tableInfo: {
        data: Basic<any>[]
        fieldList: IfieldList[]
        sortProp?: string
        total?: number
        sortOrder?: number
        paging?: boolean
        checkBox?: boolean
        handle: Ihandle
    }
}

interface ItableList {
    tableListInfo: Iitem[]
    dynamicListInfo: Iitem[]
}

export const useTableData = () => {
    const tableList: ItableList = {
        tableListInfo: [],
        dynamicListInfo: []
    }

    const tableState = reactive(tableList)

    return {
        tableState
    }
}

/**
 *  {
                title: '添加来源',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                refresh: true,
                target: 'addsource',
                create: true,

                tableInfo: {
                    data: [
                        {
                            account: '测试数据',
                            name: 200
                        },
                        {
                            account: '测试数据1',
                            name: 201
                        },
                        {
                            account: '测试数据2',
                            name: 202
                        },
                        {
                            account: '测试数据3',
                            name: 203
                        },
                        {
                            account: '测试数据4',
                            name: 204
                        },
                        {
                            account: '测试数据5',
                            name: 205
                        }
                    ],
                    fieldList: [
                        { label: '标签名称', value: 'account' },
                        { label: '人数', value: 'name', sortable: true }
                    ],
                    sortProp: 'name',
                    sortOrder: 1,
                    paging: false,
                    handle: {
                        fixed: 'right',
                        label: '操作',
                        width: '600',
                        btList: [
                            {
                                label: '查看',
                                type: 'text',
                                event: 'check'
                            },
                            {
                                label: '编辑',
                                type: 'text',
                                event: 'edit'
                            },
                            {
                                label: '删除',
                                type: 'text',
                                event: 'del'
                            }
                        ]
                    }
                }
            },
 */

/**
             * {
                title: '自定义标签',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                refresh: true,
                target: 'customsource',
                create: true,
                tableInfo: {
                    data: [
                        {
                            account: '测试数据',
                            name: 200
                        },
                        {
                            account: '测试数据1',
                            name: 201
                        },
                        {
                            account: '测试数据2',
                            name: 202
                        },
                        {
                            account: '测试数据3',
                            name: 203
                        },
                        {
                            account: '测试数据4',
                            name: 204
                        },
                        {
                            account: '测试数据5',
                            name: 205
                        }
                    ],
                    fieldList: [
                        { label: '标签名称', value: 'account' },
                        { label: '人数', value: 'name', sortable: true }
                    ],
                    sortProp: 'name',
                    sortOrder: 1,
                    paging: true,
                    total: 20,
                    checkBox: true,
                    handle: {
                        fixed: 'right',
                        label: '操作',
                        width: '600',
                        btList: [
                            {
                                label: '查看',
                                type: 'text',
                                event: 'check',
                                slot: true
                            },
                            {
                                label: '编辑',
                                type: 'text',
                                event: 'edit',
                                slot: true
                            },
                            {
                                label: '删除',
                                type: 'text',
                                event: 'del',
                                slot: true
                            }
                        ]
                    }
                }
            }
             */

/**
             * {
                title: '能力层级',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                refresh: true,
                target: 'power',
                showUserNum: true,
                create: true,
                tableInfo: {
                    data: [
                        {
                            account: '1~5000元',
                            name: 200
                        },
                        {
                            account: '5000~1万元',
                            name: 201
                        }
                    ],
                    fieldList: [
                        { label: '标签名称', value: 'account' },
                        { label: '人数', value: 'name', sortable: true }
                    ],
                    sortProp: 'name',
                    sortOrder: 1,
                    paging: false,
                    checkBox: false,
                    handle: {
                        fixed: 'right',
                        label: '操作',
                        width: '600',
                        btList: [
                            {
                                label: '查看',
                                type: 'text',
                                event: 'check'
                            },
                            {
                                label: '编辑',
                                type: 'text',
                                event: 'edit'
                            },
                            {
                                label: '删除',
                                type: 'text',
                                event: 'del'
                            }
                        ]
                    }
                }
            },
             */

/**
             *  {
                title: '添加时段',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                refresh: true,
                target: 'addtime',
                showUserNum: true,
                create: false,
                tableInfo: {
                    data: [
                        {
                            account: '已出单',
                            name: 200
                        },
                        {
                            account: '未出单',
                            name: 201
                        }
                    ],
                    fieldList: [
                        { label: '标签名称', value: 'account' },
                        { label: '人数', value: 'name', sortable: true }
                    ],
                    sortProp: 'name',
                    sortOrder: 1,
                    paging: false,
                    checkBox: false,
                    handle: {
                        fixed: 'right',
                        label: '操作',
                        width: '600',
                        btList: [
                            {
                                label: '查看',
                                type: 'text',
                                event: 'check',
                                slot: true
                            }
                        ]
                    }
                }
            },
             */

/**
             *  {
                title: '条件标签',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                refresh: true,
                target: 'condition',
                showUserNum: true,
                create: true,
                tableInfo: {
                    data: [
                        {
                            account: '已出单',
                            name: 200
                        },
                        {
                            account: '未出单',
                            name: 201
                        }
                    ],
                    fieldList: [
                        { label: '标签名称', value: 'account' },
                        { label: '人数', value: 'name', sortable: true }
                    ],
                    sortProp: 'name',
                    sortOrder: 1,
                    paging: true,
                    checkBox: false,
                    handle: {
                        fixed: 'right',
                        label: '操作',
                        width: '600',
                        btList: [
                            {
                                label: '查看',
                                type: 'text',
                                event: 'check',
                                slot: true
                            }
                        ]
                    }
                }
            }
             */
