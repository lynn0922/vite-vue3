import { onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { initRules } from '@/utils/util'
import { useFormData } from '@/hooks/tagLibrary/useForm'
import { useTableData } from '@/hooks/tagLibrary/useTable'
import { ElMessageBox } from 'element-plus'
import { PageEnum } from '@/enum/route'
import { TAGLIST, TAG } from '@/enum/tagList'
import { getTagLibraryList, RefreshTagGroup } from '@/http/tagLIbrary'
import { cloneDeep } from 'lodash-es'
import { ResultEnum } from '@/enum/httpEnum'
import { createNotification } from '../messageBox/useMessage'

export const useIndex = () => {
    const router = useRouter()

    const { formState } = useFormData()
    const { tableState } = useTableData()

    const state = reactive({
        dialogVisible: false,
        tagList: [
            { name: TAG.FIXED, label: TAGLIST[TAG.FIXED] },
            { name: TAG.DYNAMIC, label: TAGLIST[TAG.DYNAMIC] }
        ],
        activeName: TAG.FIXED,
        dialogtitle: '新建标签'
    })

    const table = ref(tableState.tableListInfo)

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
                    formState.formInfo.fieldList = [
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
                    ]
                }
                resetForm()
            }
        }
    )

    onMounted(() => {
        initFormRules()
        getList()
    })

    const getList = async (type: string = state.activeName) => {
        const { records, total } = await getTagLibraryList({ type: type })

        const itemTable = {
            title: '',
            timeTxt: '最后更新时间：',
            time: '',
            id: '',
            target: '',
            refresh: true,
            showUserNum: false,
            userTotal: 0,
            create: true,
            tableInfo: {
                data: [],
                fieldList: [
                    { label: '标签名称', value: 'tagName' },
                    { label: '人数', value: 'userCount', sortable: true }
                ],
                pagination: {
                    page: 1,
                    limit: 10,
                    total: 0
                },
                sortProp: 'userCount',
                sortOrder: 1,
                paging: false,
                checkBox: false,
                handle: {
                    fixed: 'right',
                    label: '操作',
                    width: '300',
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

        if (type === TAG.FIXED && records.length !== 0 && total !== 0) {
            const fixedTable = cloneDeep(itemTable)

            records.map((item) => {
                for (const t of tableState.tableListInfo) if (t.title === item.tagGroupName) return

                fixedTable.target = item.tagGroupName
                fixedTable.id = item.id
                fixedTable.title = item.tagGroupName
                fixedTable.time = item.lastUpdateTime || ''
                fixedTable.tableInfo.data = item.tagList
                fixedTable.create = false
                tableState.tableListInfo.push(fixedTable)
            })
        }

        if (type === TAG.DYNAMIC && records.length !== 0 && total !== 0) {
            const dynamicTable = cloneDeep(itemTable)

            records.map((item) => {
                for (const t of tableState.dynamicListInfo) if (t.title === item.tagGroupName) return

                dynamicTable.target = item.tagGroupName
                dynamicTable.id = item.id
                dynamicTable.title = item.tagGroupName
                dynamicTable.userTotal = item.userTotal
                dynamicTable.time = item.lastUpdateTime || ''
                dynamicTable.tableInfo.data = item.tagList
                dynamicTable.create = false
                dynamicTable.showUserNum = true

                tableState.dynamicListInfo.push(dynamicTable)
            })
        }
    }

    const handleClick = (event: string, row: any) => {
        switch (event) {
            case 'check':
                router.push({
                    path: PageEnum.TAGUSERDETAIL,
                    query: {
                        id: row.id,
                        lastUpdateTime: row.lastUpdateTime,
                        countTotal: row.userCount
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
                ElMessageBox({
                    title: '删除标签',
                    message: '删除后，所有标记此标签的用户将全部接触关联，请确认',
                    showCancelButton: true
                })
                    .then((res) => {
                        console.log(res, '...')
                    })
                    .catch((err) => {
                        console.log(err, '..err')
                    })
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

    const handelCreateTag = (val: string) => {
        state.dialogVisible = true
        state.dialogtitle = '新建标签'

        switch (val) {
            case 'power':
                state.dialogtitle = '标签信息'
                formState.formInfo.fieldList = [
                    {
                        label: '出单金额',
                        value: 'money',
                        type: 'slot',
                        required: true,
                        className: 'el-form-block'
                    }
                ]
                break

            default:
                break
        }
    }

    const selectAll = (select: any) => {
        console.log(select)
    }

    const selectionChange = (select: any) => {
        console.log(select)
    }

    const onConfirm = (value: string) => {
        console.log(
            '父组件打印:',
            value,
            formState.formInfo.data.tagname,
            formState.formInfo.data.id,
            formState.formInfo.ref,
            '....'
        )
        state.dialogVisible = false
    }

    const refreshTable = async (item: any) => {
        const { code } = await RefreshTagGroup(item.id)

        if (code === ResultEnum.SUCCESS) {
            createNotification({
                title: '刷新成功',
                message: ' 后台刷新中，需要一段时间，请稍等再看最新数据',
                type: 'success'
            })
        }
    }

    const handleClickTab = (tab: any) => {
        tab.paneName === TAG.FIXED
            ? ((table.value as any) = tableState.tableListInfo)
            : ((table.value as any) = tableState.dynamicListInfo)

        getList(tab.paneName)
    }

    return {
        ...toRefs(state),
        formState,
        table,
        handleClick,
        handleSizeChange,
        handleCurrentChange,
        handelCreateTag,
        onConfirm,
        refreshTable,
        selectAll,
        selectionChange,
        handleClickTab
    }
}
