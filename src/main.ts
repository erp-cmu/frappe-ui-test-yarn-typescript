import { VueQueryPlugin } from '@tanstack/vue-query'
import { FrappeUI } from 'frappe-ui'
import { frappeRequest, setConfig } from 'frappe-ui'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './lib/routers'
import './style.css'

setConfig('resourceFetcher', frappeRequest)
let app = createApp(App)
app.use(VueQueryPlugin)
app.use(FrappeUI)
app.use(router)
app.mount('#app')
