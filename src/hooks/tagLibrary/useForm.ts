import { reactive } from "vue"

export const useFormData = () => {
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
        }
    })

    return {
        formState
    }
}
