import axios from 'axios'
import { useUserStore } from '@/stores/user';

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
})
service.interceptors.request.use(
    (config) => {
        const { accessToken } = useUserStore()
        if (accessToken) {
            config.headers['Authorization'] = accessToken
        } else {
            config.headers['Authorization'] = null
        }
        return config
    },
    (error) => {
        console.log(error)
        return Promise.reject()
    }
)

service.interceptors.response.use(
    (response) => {
        const res = response.data
        if (response.status === 200 && res.size) {
            return res
        }
        if (res.code !== 0) {
            return Promise.reject(res)
        }
        return res
    },
    (error) => {
        console.log(error)
        return Promise.reject()
    }
)

export default service
