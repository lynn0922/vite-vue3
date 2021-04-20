import { App } from 'vue';

import {
    ElButton,
    ElInfiniteScroll,
    ElLoading,
    ElMessage,
    ElMessageBox,
    ElNotification,
    ElSelect,
    ElOption
} from 'element-plus';

const components = [
    ElButton,
    ElSelect,
    ElOption
]

const plugins = [
    ElInfiniteScroll,
    ElLoading,
    ElMessage,
    ElMessageBox,
    ElNotification,
]

// 按需加载
export function asRequired(app: App<Element>) {
    app.config.globalProperties.$ELEMENT = { size: 'small', zIndex: 3000 }

    components.forEach(component => {
        app.component(component.name, component)
    })

    plugins.forEach(plugin => {
        app.use(plugin)
    })
}