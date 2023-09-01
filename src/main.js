import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia()

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import '@coreui/coreui/dist/css/coreui.min.css'

//vue-json-excel3
import JsonExcel from 'vue-json-excel3'

// sweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
app.config.globalProperties.filters = {
    formatNum(value){
        return new Intl.NumberFormat("en-US",{
            maximumFractionDigits: 2
        }).format(value)
    }
}
app.component("downloadExcel", JsonExcel)
app.use(router)
app.use(pinia)
app.use(VueSweetalert2)
app.mount('#app')
