import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Footer from '../components/Footer.vue'
import Home from '../components/HomeView.vue'
import Login from '../components/LoginView.vue'
import Nav from '../components/Nav.vue'
import { fetchLoggedUsername } from '../composables/auth'
import { BASE_URL } from '../utils/env'

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

    // TODO: We should ideally cache this value so that we don't have to make an API call on every route change. We can use something like Vue Query for this, but for now, we'll just fetch it every time.
    const username = await fetchLoggedUsername()

    if (!username) {
        return { path: '/signin' }
    }

    return true
})

export { router }
