import { reactive } from 'vue'

export const useTableData = () => {
    const tableList = {
        tableListInfo: [
            {
                title: '注册来源',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                type: 'register',
                target: 'source',
                refresh: true,
                create: true,
                tableInfo: {
                    data: [
                        {
                            tagname: '测试数据',
                            id: 200
                        },
                        {
                            tagname: '测试数据',
                            id: 200
                        },
                        {
                            tagname: '测试数据',
                            id: 200
                        },
                        {
                            tagname: '测试数据',
                            id: 200
                        },
                        {
                            tagname: '测试数据',
                            id: 200
                        },
                        {
                            tagname: '测试数据',
                            id: 200
                        }
                    ],
                    fieldList: [
                        { label: '标签名称', value: 'tagname' },
                        { label: '人数', value: 'id', sortable: true }
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
                            }
                            // {
                            //     label: '编辑',
                            //     type: 'text',
                            //     event: 'edit'
                            // },
                            // {
                            //     label: '删除',
                            //     type: 'text',
                            //     event: 'del'
                            // }
                        ]
                    }
                }
            }
        ],
        dynamicListInfo: [
            {
                title: '是否注册唯享客',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                type: 'register',
                refresh: true,
                target: 'registerUser',
                showUserNum: true,
                create: false,
                tableInfo: {
                    data: [
                        {
                            tagname: '已注册唯享客',
                            id: 200
                        },
                        {
                            tagname: '已注册唯享客',
                            id: 200
                        },
                        {
                            tagname: '未注册唯享客',
                            id: 200
                        },
                        {
                            tagname: '已注册唯享客',
                            id: 200
                        },
                        {
                            tagname: '未注册唯享客',
                            id: 200
                        },
                        {
                            tagname: '已注册唯享客',
                            id: 200
                        }
                    ],
                    fieldList: [
                        { label: '标签名称', value: 'tagname' },
                        { label: '人数', value: 'id', sortable: true }
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
                            }
                        ]
                    }
                }
            },
            {
                title: '用户等级',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                refresh: true,
                showUserNum: true,
                create: false,
                target: 'grade',
                tableInfo: {
                    data: [
                        {
                            account: '小宝',
                            name: 200
                        },
                        {
                            account: '达人',
                            name: 201
                        },
                        {
                            account: '经理',
                            name: 202
                        },
                        {
                            account: '总监',
                            name: 203
                        },
                        {
                            account: '总裁',
                            name: 204
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

                    handle: {
                        fixed: 'right',
                        label: '操作',
                        width: '600',
                        btList: [
                            {
                                label: '查看',
                                type: 'text',
                                event: 'check'
                            }
                        ]
                    }
                }
            },
            {
                title: '是否出单',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                refresh: true,
                target: 'issue',
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
            {
                title: '活跃情况',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                refresh: true,
                target: 'lively',
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
            }
        ]
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
