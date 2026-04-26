import { effectScope } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Footer from '../components/Footer.vue'
import Home from '../components/HomeView.vue'
import Login from '../components/LoginView.vue'
import { useAuth } from '../composables/auth'
import { BASE_URL } from '../utils/env'
import Nav from './Nav.vue'

const routes = [
    {
        path: '/',
        components: {
            default: Home,
            nav: Nav,
            footer: Footer,
        },
    },
    {
        path: '/signin', // Avoid using /login because it will redirect to frappe-site actual login page. This is probably due to frappe-ui plugin.
        components: {
            default: Login,
            nav: Nav,
            footer: Footer,
        },
    },
    {
        path: '/dashboard',
        components: {
            default: Dashboard,
            nav: Nav,
            footer: Footer,
        },
        meta: { requiresAuth: true },
    },
]

const router = createRouter({
    history: createWebHistory(BASE_URL),
    routes,
})

router.beforeEach(async (to) => {
    if (!to.meta.requiresAuth) {
        return true
    }

    // Create a new effect scope for this navigation guard to safely use composables without affecting the global scope.
    const scope = effectScope()
    const username = await scope.run(() => {
        // Call your composable here
        const { username } = useAuth()
        return username.value
    })
    scope.stop() // Always stop the scope to prevent memory leaks

    if (!username) {
        return { path: '/signin' }
    }

    return true
})

export { router }
