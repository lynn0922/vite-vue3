import { reactive } from 'vue'

export const useFormData = () => {
    const formState = reactive({
        formInfo: {
            ref: null,
            data: {
                account: '', // 账户
                name: '', // 真实姓名
                nickName: '', // 微信名称
                mobile: '', // 手机号
                wechat: '', // 微信号
                school: '', // 学校
                grade: '', // 年级
                area: '', // 区域
                source: '', // 来源
                status: '' // 状态
            },
            fieldList: [
                {
                    label: '账号名称',
                    value: 'account',
                    type: 'input',
                    required: true
                    // className: 'el-form-block' // 是否一行显示
                },
                {
                    label: '真实姓名',
                    value: 'name',
                    type: 'input'
                    // className: 'el-form-block'
                },
                {
                    label: '微信名称',
                    value: 'nickName',
                    type: 'input'
                    // className: 'el-form-block'
                },
                {
                    label: '手机号码',
                    value: 'mobile',
                    type: 'input'
                    // className: 'el-form-block'
                },
                { label: '微信号码', value: 'wechat', type: 'input' },
                { label: '学校信息', value: 'school', type: 'input' },
                { label: '年级', value: 'grade', type: 'input' },
                {
                    label: '地区',
                    value: 'area',
                    type: 'input'
                    // className: 'el-form-block'
                },
                {
                    label: '来源',
                    value: 'source',
                    type: 'select',
                    list: 'source'
                    // className: 'el-form-block'
                },
                {
                    label: '状态',
                    value: 'status',
                    type: 'select',
                    list: 'statusList',
                    required: true
                }
            ],
            rules: {},
            labelWidth: '100px'
        }
    })

    return {
        formState
    }
}
