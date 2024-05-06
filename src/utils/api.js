import axios from 'axios'
import store from '@/store'

export const defaultAxios = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

defaultAxios.interceptors.response.use(response => {
    return response.data
}, async error => {
    const { status } = error.response
    if (status === 401) {
        await store.dispatch('auth/logout')
    }
    return error
})

export const axiosSecure = axios.create({
    baseURL: import.meta.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('access_token')
    }
})

axiosSecure.interceptors.request.use(request => {
    request.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token')
    return request
})

axiosSecure.interceptors.response.use(response => {
    return response.data
}, async error => {
    const { status } = error.response
    if (status === 401) {
        await store.dispatch('auth/refresh')
        return axiosSecure(error.config)
    }
    return error
})
