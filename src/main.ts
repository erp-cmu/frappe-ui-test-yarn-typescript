import { FrappeUI } from 'frappe-ui'
import { frappeRequest, setConfig } from 'frappe-ui'
import { createApp } from 'vue'

import App from './App.vue'
import './style.css'

setConfig('resourceFetcher', frappeRequest)
let app = createApp(App)
app.use(FrappeUI)
app.mount('#app')
