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
app.use(FrappeUI, {
    resources: true,
    call: true,
    // TODO: during dev, I always get socket.io error.
    // TODO: So I will disable this for now.
    // TODO: I need to test socketio connection when this app is embedded in a frappe app.
    socketio: false,
})
app.use(router)
app.mount('#app')
