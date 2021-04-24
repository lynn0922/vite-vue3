import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 按需加载
export function useRequired(app: App) {
    app.use(ElementPlus, { size: 'small', zIndex: 3000, locale })
}
