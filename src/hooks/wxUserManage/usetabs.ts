import { reactive } from 'vue'

interface Istate {
    activeName: string
    tabData: {
        label: string
        name: string
        disabled?: boolean
    }[]
    fixedTags: {
        tagName: string
        id: number
    }[]
    dynamicTags: {
        tagName: string
        id: number
    }[]
    dialogVisible: boolean
    options: {
        value: string
        label: string
    }[]
    value: string
    checkList: any[]
    checkData: {
        label: string
        id: number
    }[]
}

export const useTabs = () => {
    const state = reactive<Istate>({
        activeName: 'detail',
        tabData: [
            {
                label: '详细信息',
                name: 'detail'
            }
            // {
            //     label: '群聊信息',
            //     name: 'group',
            //     disabled: true
            // }
        ],
        fixedTags: [],
        dynamicTags: [],
        dialogVisible: false,
        options: [],
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
            { id: 10, label: '需加强联系' }
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
