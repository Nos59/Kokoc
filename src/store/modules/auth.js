import { Payload, asyncRequest, makeMutations } from '@/utils/store.js'
import { defaultAxios } from '@/utils/api.js'

const state = () => ({
    login_status: new Payload(),
    access_token: localStorage.getItem('access_token') || null,
    refresh_token: localStorage.getItem('refresh_token') || null
})

const getters = {
    is_logged(state) {
        return state.access_token !== null && state.refresh_token !== null
    }
}

const actions = {
    login({ commit }, form) {
        const statusSetter = status => commit('login_status', { status })
        const action = async () => {
            const { access, refresh } = await defaultAxios.post('https://dev-ar.zonesmart.ru/api/user/jwt/create/', {
                email: form.email,
                password: form.password
            })

            commit('UPDATE_ACCESS_TOKEN', access)
            commit('UPDATE_REFRESH_TOKEN', refresh)
            location.reload()
        }
        return asyncRequest(action, statusSetter)
    },

    refresh({ commit, state }) {
        const statusSetter = status => commit('login_status', { status })
        const action = async () => {
            const { access } = await defaultAxios.post('https://dev-ar.zonesmart.ru/api/user/jwt/refresh/', {
                refresh: state.refresh_token
            })

            commit('UPDATE_ACCESS_TOKEN', access)
        }
        return asyncRequest(action, statusSetter)
    },

    logout({ commit }) {
        const statusSetter = status => commit('login_status', { status })
        const action = async () => {
            commit('DESTROY_TOKENS')
            location.reload()
        }

        return asyncRequest(action, statusSetter)
    }
}

const mutations = {
    ...makeMutations(state),
    UPDATE_ACCESS_TOKEN: (state, token) => {
        state.access_token = token
        localStorage.setItem('access_token', token)
    },
    UPDATE_REFRESH_TOKEN: (state, token) => {
        state.refresh_token = token
        localStorage.setItem('refresh_token', token)
    },
    DESTROY_TOKENS: (state) => {
        state.access_token = null
        state.refresh_token = null
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
