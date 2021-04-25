import { reactive } from 'vue'

export const useFilter = () => {
    const filter = reactive({
        value: '',
        sex: '',

        remark: '',
        group: '',

        sexOptions: [
            { label: '男', value: 0 },
            { label: '女', value: 1 }
        ],
        groupOptions: [
            { label: '我是好孩子群', value: 0 },
            { label: '我是好宝宝群', value: 1 }
        ],
        tagOptions: [
            {
                value: 'source',
                label: '添加来源'
                // children: [
                //     {
                //         value: '0',
                //         label: '商学院'
                //     },
                //     {
                //         value: '1',
                //         label: '商学院'
                //     },
                //     {
                //         value: '2',
                //         label: '商学院'
                //     }
                // ]
            },
            {
                value: 'level',
                label: '用户等级'
                // children: [
                //     {
                //         value: '0',
                //         label: '小宝'
                //     },
                //     {
                //         value: '1',
                //         label: '达人'
                //     },
                //     {
                //         value: '2',
                //         label: '商学院'
                //     }
                // ]
            },
            {
                value: 'source',
                label: '是否出单'
                // children: [
                //     {
                //         value: '0',
                //         label: '已出单'
                //     },
                //     {
                //         value: '1',
                //         label: '未出单'
                //     }
                // ]
            }
        ],
        selectTags: []
    })

    const handleDowload = () => {
        console.log('handleDowload')
    }

    const lazyLoad = (node: any, resolve: any) => {
        console.log('....focus', node, resolve)
    }

    return {
        filter,
        handleDowload,

        lazyLoad
    }
}
