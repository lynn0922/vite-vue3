import { createApp } from 'vue'
import App from './App.vue'
import { asRequired } from './assets/element/index'
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss';

import { store, key } from './store'
import router from './router'
import { silentApi , httpRequestObject } from "@/utils/api";
import { components } from "@/components/index";


const app = createApp(App)
import '@/assets/styles/theme.scss'

components.map(c => {
    app.component(c.name, c)
})

app.config.globalProperties.$api = httpRequestObject
app.config.globalProperties.$silentApi = silentApi

asRequired(app)
app.use(store, key)
app.use(router)
app.mount('#app')
