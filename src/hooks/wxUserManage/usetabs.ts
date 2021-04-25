import { reactive } from 'vue'
export const useTabs = () => {
    const state = reactive({
        activeName: 'detail',
        tabData: [
            {
                label: '详细信息',
                name: 'detail'
            },
            {
                label: '群聊信息',
                name: 'group',
                disabled: true
            }
        ],
        tags: [
            { name: '标签一', type: '' },
            { name: '标签二', type: 'success' },
            { name: '标签三', type: 'info' },
            { name: '标签四', type: 'warning' },
            { name: '标签五', type: 'danger' }
        ],
        dialogVisible: false,
        options: [
            {
                value: '选项1',
                label: '黄金糕'
            },
            {
                value: '选项2',
                label: '双皮奶'
            },
            {
                value: '选项3',
                label: '蚵仔煎'
            },
            {
                value: '选项4',
                label: '龙须面'
            },
            {
                value: '选项5',
                label: '北京烤鸭'
            }
        ],
        value: '',
        checkList: [],
        checkData: [
            { id: 0, label: '待沟通' },
            { id: 1, label: '已流失' },
            { id: 2, label: '需加强联系需加强联系需加强联系' },
            { id: 3, label: '待沟通' },
            { id: 4, label: '已流失' },
            { id: 5, label: '需加强联系' },
            { id: 6, label: '需加强联系' },
            { id: 7, label: '需加强联系' },
            { id: 8, label: '需加强联系' },
            { id: 9, label: '需加强联系' },
            { id: 10, label: '需加强联系' },
        ]
    })

    const addTag = () => {
        state.dialogVisible = true
    }
    const handleClick = () => {
        console.log('handleClick')
    }

    const closeTag = () => {
        console.log('closeTag')
    }

    const onConfirm = () => {
        console.log('onConfirm')
    }

    return {
        state,
        handleClick,
        closeTag,
        onConfirm,
        addTag
    }
}
