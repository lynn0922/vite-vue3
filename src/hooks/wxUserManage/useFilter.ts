import { Gender, KeyEnum } from '@/enum/gender'
import { getTagTree } from '@/http/tagLibrary'
import { onMounted, reactive } from 'vue'

export const useFilter = () => {
    const filter = reactive({
        searchUserType: '',
        searchUserKey: '',
        gender: '',
        ucodes: '',
        tagIds: [],

        sexOptions: [
            { label: Gender[0], value: Gender.未知 },
            { label: Gender[1], value: Gender.男性 },
            { label: Gender[2], value: Gender.女性 }
        ],
        tagOptions: [],

        searchKeyOpt: [
            { label: KeyEnum[1], value: KeyEnum.用户昵称 },
            { label: KeyEnum[2], value: KeyEnum.用户备注 }
        ]
    })

    onMounted(() => {
        getTree()
    })

    const handleDowload = () => {
        console.log('handleDowload')
    }

    const getTree = async () => {
        const { records } = await getTagTree()

        ;(filter as any).tagOptions = records
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

/**
 *  {
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
 */
