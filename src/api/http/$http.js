import axios from 'axios'
import qs from 'qs'
import { message } from 'antd';
// import router from '@/router/index'
import baseUrl from '@/assets/js/baseUrl'
import { concatPramas } from '@/lib/utils'
let isAlert = false

// 允许操作cookie
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials = true
console.log(process.env.NODE_ENV,'---------')
console.log(baseUrl,'---------')
const service = axios.create({
  // 用了proxy不用配置baseurl了
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  // baseURL: process.env.VUE_APP_BASE_URL,
  baseURL: baseUrl,
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 60000,
})

// request interceptor
service.interceptors.request.use(
  config => {
    console.log(localStorage.getItem('my_user'),'---------')
    // let user = JSON.parse(localStorage.getItem('my_user'))
    // if(user){
    //   config.headers.Authorization = 'Bearer ' + user.userInfo.token
    // }
    
    // post 请求需要序列化一下
    if (
      !config.notNeedQS &&
      (config.method === 'post' || config.method === 'put')
    ) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.data = qs.stringify(config.data)
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = concatPramas(config)
      config.params = {}
      config.url = url
    }
    config.params = config.params ? config.params : {}
    return config
  },
  error => {
    console.log('request error', error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // 当后端服务器状态码为300以下会走response
  response => {
    const res = response.data
    if (response.config.returnRes) return res
    // 接口状态码为401，说明登录已过期
    // if (+res.code === 401 || +res.code === -1) {
    //   if (!isAlert) {
    //     isAlert = true
    //     const isUniversalLink = sessionStorage.getItem('isUniversalLink')
    //     ElMessageBox.alert('登录过期', '提示', {
    //       confirmButtonText: '确定',
    //       callback: () => {
    //         isAlert = false
    //         localStorage.removeItem('my_user')
    //         user.logout()
    //         // 清除用户信息缓存，刷新当前页面
    //         router.push('/')
    //       },
    //     })
    //   }
    //   return Promise.reject('登录过期')
    // }
    if (!res.msg) return res
    if (res.code !== 200) {
      message.error(res.msg)
      return Promise.reject(res.msg)
    }
    return res
  },
  // 当后端服务器状态码为300以上会走error
  error => {
    // ElMessageBox.alert('网络错误', '提示')
    return Promise.reject(error)
  }
)

export default service
