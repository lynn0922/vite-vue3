import { reactive, toRefs } from 'vue'

export const useTableData = () => {
    const data = {
        data: [
            {
                name: '测试数据',
                ucode: 200,
                remark: '杨小姐',
                sex: '男',
                wxName: '小唯',
                group: '',
                tag: '经理：近24小时来访',
                time: '2020年2月17日18:00:00'
            }
        ],
        fieldList: [
            { label: '昵称', value: 'name' },
            { label: 'ucode', value: 'ucode' },
            { label: '备注', value: 'remark' },
            { label: '性别', value: 'sex' },
            { label: '所加企业微信昵称', value: 'wxName' },
            { label: '所在群', value: 'group' },
            { label: '标签', value: 'tag' },
            { label: '添加时间', value: 'time' }
        ],
        total: 200,
        paging: true,
        checkBox: true,
        handle: {
            fixed: 'right',
            label: '操作',
            width: '600',
            btList: [
                {
                    label: '查看详情',
                    type: 'text',
                    event: 'check'
                }
            ]
        }
    }

    const tabelData = reactive(data)

    const handleSizeChange = (val: number) => {
        console.log(val)
    }
    const handleCurrentChange = (val: number) => {
        console.log(val)
    }
    const handleClick = (val: string) => {
        console.log(val)
    }
    const selectAll = (val: any[]) => {
        console.log(val)
    }
    const selectionChange = (val: any[]) => {
        console.log(val)
    }

    return {
        tabelData,
        handleSizeChange,
        handleClick,
        selectAll,
        selectionChange,
        handleCurrentChange
    }
}
