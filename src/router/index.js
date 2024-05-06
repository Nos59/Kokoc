import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'
import store from '@/store/index.js'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth
        },
        {
            path: '/logout',
            name: 'logout'
        },
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
})

router.beforeEach( (to, from) => {
    const is_logged = store.getters['auth/is_logged']
    if (!is_logged && to.name !== 'auth') {
        return { name: 'auth' }
    }
    if (is_logged && to.name === 'auth') {
        return { name: 'home' }
    }
})

export default router
