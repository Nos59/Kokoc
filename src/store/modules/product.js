import { Payload, asyncRequest, makeMutations } from '@/utils/store.js'
import { axiosSecure } from '@/utils/api.js'

const state = () => ({
    products: new Payload()
})

const getters = {

}

const actions = {
    getProducts({ commit }, { page = 1, per_page = 4 } = {}) {
        const statusSetter = status => commit('products', { status })
        const action = async () => {
            const offset = per_page * (page-1)
            const data = await axiosSecure.get(`https://dev-ar.zonesmart.ru/api/product/?limit=${per_page}&offset=${offset}`)
            commit('products', data)
        }

        return asyncRequest(action, statusSetter)
    }
}

const mutations = {
    ...makeMutations(state)
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
