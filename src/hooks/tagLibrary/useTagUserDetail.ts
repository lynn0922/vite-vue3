import { reactive, toRefs } from 'vue'

export const usePageTable = () => {
    const state = reactive({
        tableInfo: {
            data: [
                {
                    name: '长夜飞空',
                    name1: '杨小姐',
                    name2: '123456',
                    name3: '小唯（企业微信昵称）',
                    name4: '女',
                    name5: '经理；近24小时来访；添加当日；1-5000元；主动联系',
                    name6: '2021年2月17日 17：00：00'
                },
                {
                    name: '长夜飞空',
                    name1: '杨小姐',
                    name2: '123456',
                    name3: '小唯（企业微信昵称）',
                    name4: '女',
                    name5: '经理；近24小时来访；添加当日；1-5000元；主动联系',
                    name6: '2021年2月17日 17：00：00'
                },
                {
                    name: '长夜飞空',
                    name1: '杨小姐',
                    name2: '123456',
                    name3: '小唯（企业微信昵称）',
                    name4: '女',
                    name5: '经理；近24小时来访；添加当日；1-5000元；主动联系',
                    name6: '2021年2月17日 17：00：00'
                }
            ],
            fieldList: [
                { label: '昵称', value: 'name' },
                { label: '备注', value: 'name1' },
                { label: 'ucode', value: 'name2' },
                { label: '所加企业微信', value: 'name3' },
                { label: '性别', value: 'name4' },
                { label: '标签', value: 'name5' },
                { label: '添加时间', value: 'name6' }
            ],
            paging: true,
            total: 20
        }
    })

    const handleSizeChange = (val: number) => {
        console.log(val)
    }
    const handleCurrentChange = (val: number) => {
        console.log(val)
    }

    return {
        state,
        handleSizeChange,
        handleCurrentChange
    }
}
