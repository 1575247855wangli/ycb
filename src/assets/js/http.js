import axios from 'axios'
import router from '@/router/index'
axios.defaults.withCredentials = true
export const http = axios.create({
  baseURL: 'http://47.94.4.92:8080'
})
// 47.94.4.92:8080
// http://47.94.4.92:8080
// 192.168.31.252:8080
// 请求拦截，所有的请求都先执行这段
http.interceptors.request.use(function (config) {
  // 除了登录页面，都把token带上
  if (config.url !== '/login') {
    // 在header 里面 设置了一个 key 为 token的参数，可修改
    config.headers['token'] = window.localStorage.getItem('token')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})


const httpPlugin = {}

httpPlugin.install = function (Vue, options) {
  Vue.prototype.$http = http
}
export default httpPlugin