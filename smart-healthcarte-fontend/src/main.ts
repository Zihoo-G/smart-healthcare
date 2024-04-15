// import ElementPlus from 'element-plus'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/style.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@popperjs/core'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
