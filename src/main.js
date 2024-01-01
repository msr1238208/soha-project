import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../src/style.css'
import ToastPlugin from "vue-toast-notification";


createApp(App).use(router).mount('#app')
