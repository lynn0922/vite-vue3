import {
    defineComponent,
    getCurrentInstance,
    nextTick,
    onMounted,
    reactive,
    toRefs,
    watch
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserList } from '@/http/userManage'
import { initRules } from '@/utils/util'

export const useIndex = () => {
    const router = useRouter()

    const { formState } = useFormData()
    const { tableState } = useTableData()
    const state = reactive({
        dialogVisible: false,
        tagList: [
            { id: 0, title: '固定标签' },
            { id: 1, title: '动态标签' }
        ],
        selectTag: 0,
        dialogtitle: '新建标签'
    })

    const initFormRules = () => {
        const formInfo = formState.formInfo
        formInfo.rules = initRules(formInfo.fieldList as any)
    }

    // 初始化表单
    const resetForm = () => {
        formState.formInfo.data = {
            tagname: '',
            id: ''
        }
    }

    watch(
        () => state.dialogVisible,
        (val) => {
            const formInfo = formState.formInfo
            if (!val) {
                if (formInfo.ref) {
                    ;(formInfo.ref as any).resetFields()
                }
                resetForm()
            }
        }
    )

    onMounted(() => {
        initFormRules()
    })

    function handleSelectTag(num: number) {
        state.selectTag = num
    }

    const handleClick = (event: string, row: any) => {
        switch (event) {
            case 'check':
                router.push({
                    path: '/userDetail',
                    query: {
                        id: '123456'
                    }
                })
                break
            case 'edit':
                state.dialogVisible = true
                state.dialogtitle = '编辑标签'

                for (const key in row) {
                    if (key in formState.formInfo.data) {
                        ;(formState.formInfo as any).data[key] = row[key]
                    }
                }

                break
            case 'del':
                break

            case 'bt-edit':
                ;(formState.formInfo.fieldList[1] as any).show = false
                state.dialogVisible = true
                state.dialogtitle = '编辑标签'
                for (const key in row) {
                    if (key in formState.formInfo.data) {
                        ;(formState.formInfo as any).data[key] = row[key]
                    }
                }
                break

            default:
                break
        }
        // console.log(row.name, event)
        // console.log(event, toRefs(row))
    }

    // function getTeacherList() {
    //     const { ctx } = getCurrentInstance() as any
    //     console.log('%c 🥘 ctx: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', ctx)
    //     return ctx.$api.get('home.banner')
    // }

    const handleSizeChange = (val: number) => {
        console.log(val)
    }

    const handleCurrentChange = (val: number) => {
        console.log(val)
    }

    const handelCreateTag = () => {
        state.dialogVisible = true
        state.dialogtitle = '新建标签'
    }

    const onConfirm = (value: string) => {
        console.log(
            '父组件打印:',
            value,
            formState.formInfo.data.tagname,
            formState.formInfo.data.id,
            '....'
        )
        state.dialogVisible = false
    }

    return {
        ...toRefs(state),
        formState,
        ...toRefs(tableState),
        handleClick,
        handleSelectTag,
        handleSizeChange,
        handleCurrentChange,
        handelCreateTag,
        onConfirm
    }
}

const useTableData = () => {
    const tableList = {
        TableListInfo: [
            {
                title: '注册来源',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                type: 'register',
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
            {
                title: '添加来源',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                refresh: true,
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
            {
                title: '自定义标签',
                timeTxt: '最后更新时间：',
                time: '2021.04.11 00:01:30',
                refresh: true,
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
        ]
    }

    const tableState = reactive(tableList)

    return {
        tableState
    }
}

const useFormData = () => {
    const formState = reactive({
        formInfo: {
            ref: null,
            data: {
                tagname: '',
                id: ''
            },
            fieldList: [
                {
                    label: '标签名称',
                    value: 'tagname',
                    type: 'input',
                    required: true,
                    className: 'el-form-block'
                },
                {
                    label: '标识',
                    value: 'id',
                    type: 'input',
                    required: true,
                    className: 'el-form-block'
                }
            ],
            rules: {},
            hideRequiredAsterisk: true,
            labelWidth: '80px'
        },
        listTypeInfo: {
            source: [
                {
                    key: '最美诵读',
                    value: 1
                },
                {
                    key: '诗教课堂',
                    value: 2
                },
                {
                    key: '迦凌杯',
                    value: 3
                },
                {
                    key: '经典诵读',
                    value: 4
                }
            ]
        }
    })

    return {
        formState
    }
}
