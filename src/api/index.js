import { service, axios } from '@/utils/axios'
import user from './v1/user'

const api = {
  install(Vue) {
    Vue.prototype.$api = api
    Vue.prototype.$http = service
    Vue.prototype.$third = axios
  },
  user
}

export default api
