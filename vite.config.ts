import vue from '@vitejs/plugin-vue'
import frappeui from 'frappe-ui/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {},
    },
    plugins: [
        frappeui({
            lucideIcons: true,
        }),
        vue(),
    ],
    optimizeDeps: {
        include: [
            'frappe-ui > feather-icons',
            // "showdown",
            // "engine.io-client",
            'debug',
            'interactjs',
            // "highlight.js/lib/core",
        ],
    },
})
