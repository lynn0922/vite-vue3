import { createApp } from 'vue'
import App from './App.vue'
import { useRequired } from './assets/element/index'
import './assets/styles/element-variables.scss'
import '@/assets/styles/index.scss'
import { store, key } from './store'
import router, { setupRouter } from './router'
import { useGlobComp } from '@/components/index'


;(async () => {
    const app = createApp(App)

    useRequired(app)
    useGlobComp(app)
    setupRouter(app)

    app.use(store, key)

    await router.isReady()

    app.mount('#app', true)

    if (import.meta.env.DEV) {
        window.__APP__ = app
    }
})()
