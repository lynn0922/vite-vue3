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
import { useFormData } from '@/hooks/tagLibrary/useForm'
import { useTableData } from '@/hooks/tagLibrary/useTable'
import { ElMessageBox } from 'element-plus'
import { PageEnum } from '@/enum/route'
import { TAGLIST, TAG } from '@/enum/tagList'

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
        activeName: TAG.DYNAMIC,
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
    })
    const handleClick = (event: string, row: any) => {
        switch (event) {
            case 'check':
                router.push({
                    path: PageEnum.TAGUSERDETAIL,
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
        console.log('%c 🦐 val: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', val)
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

    const refreshTable = (target: string) => {
        console.log(target)
    }

    return {
        ...toRefs(state),
        formState,
        ...toRefs(tableState),
        handleClick,
        handleSizeChange,
        handleCurrentChange,
        handelCreateTag,
        onConfirm,
        refreshTable,
        selectAll,
        selectionChange
    }
}
