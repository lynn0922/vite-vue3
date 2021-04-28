import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export const usePageTable = () => {
    const route = useRoute()

    const state = reactive({
        lastUpdateTime: '',
        countTotal: 0
    })

    onMounted(() => {
        state.countTotal = (route.query.countTotal as unknown) as number
        state.lastUpdateTime = (route.query.lastUpdateTime as unknown) as string
    })

    return {
        state
    }
}
