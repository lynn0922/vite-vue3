import { createApp } from 'vue'
import App from './App.vue'
import { asRequired } from "./assets/element/index";
import './assets/styles/element-variables.scss'
import router from "./router/index";
import store from "./store/index";


const app = createApp(App)

asRequired(app);

app.use(router)
app.use(store)
app.mount('#app')
