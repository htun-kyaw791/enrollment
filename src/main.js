import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(Notifications)

app.mount('#app')