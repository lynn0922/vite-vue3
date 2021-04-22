import { reactive, watch } from 'vue'

export const useDialog = () => {
    const dialogState = reactive({
        dialogInfo: {
            title: {
                create: '添加',
                update: '编辑'
            },
            visible: false,
            type: 'create',
            btLoading: false,
            btList: [
                {
                    label: '关闭',
                    type: '',
                    icon: '',
                    event: 'close',
                    show: true
                },
                {
                    label: '保存',
                    type: 'primary',
                    icon: '',
                    event: 'save',
                    saveLoading: false,
                    show: true
                }
            ]
        }
    })

    watch(
        () => dialogState.dialogInfo.visible,
        () => {
            // if (formState.formInfo.ref) {
            //     console.log('...', formState.formInfo.ref)
            //     // formState.formInfo.ref.resetFields();
            // }
            console.log('....watch');
        }
    )

    return {
        dialogState
    }
}
