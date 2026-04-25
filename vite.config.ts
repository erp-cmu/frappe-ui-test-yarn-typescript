import { inspectConfig } from '@meeg/vite-plugin-inspect-config'
import vue from '@vitejs/plugin-vue'
import frappeui from 'frappe-ui/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {},
    },
    plugins: [
        vue(),
        // The frappeui plugin has a default object with all the fields set to true.
        // However, it does not have per-key default values, so if you only set one field to true, the rest will be undefined and not get the default value of true.
        // So we need to set all the fields to true if we want to use the default values.
        frappeui({
            frontendRoute: null,
            lucideIcons: true,
            frappeProxy: true,
            frappeTypes: true,
            jinjaBootData: true,
            buildConfig: false,
        }),
        // This plugin is used to inspect the Vite config and see which plugins are being used and what their options are.
        inspectConfig(),
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
