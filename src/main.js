import './assets/main.css'
import "vue-select/dist/vue-select.css";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Notifications from '@kyvg/vue3-notification'
import VueSelect from "vue-select";
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(Notifications)
app.component("v-select", VueSelect)

app.mount('#app')