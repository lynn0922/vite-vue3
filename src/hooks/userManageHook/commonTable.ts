import { reactive, watch } from 'vue'

export const useCommonTable = (info: any) => {
    const state = reactive(info)

    

    return {
        state
    }
}
