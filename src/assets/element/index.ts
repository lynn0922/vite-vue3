import { App } from 'vue'

import {
    ElButton,
    ElInfiniteScroll,
    ElLoading,
    ElMessage,
    ElMessageBox,
    ElNotification,
    ElSelect,
    ElOption,
    ElRow,
    ElCol,
    ElTable,
    ElTableColumn,
    ElTag,
    ElPagination,
    ElDialog,
    ElInput,
    ElInputNumber,
    ElDatePicker,
    ElFormItem,
    ElForm
} from 'element-plus'

const components = [
    ElButton,
    ElSelect,
    ElOption,
    ElRow,
    ElCol,
    ElTable,
    ElTableColumn,
    ElTag,
    ElPagination,
    ElDialog,
    ElInput,
    ElInputNumber,
    ElDatePicker,
    ElFormItem,
    ElForm
]

const plugins = [ElInfiniteScroll, ElLoading, ElMessage, ElMessageBox, ElNotification]

// 按需加载
export function useRequired(app: App) {
    app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }

    components.forEach((component) => {
        app.component(component.name, component)
    })

    plugins.forEach((plugin) => {
        app.use(plugin)
    })
}
