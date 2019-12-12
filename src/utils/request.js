import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'
import {Loading} from 'element-ui'
import {dataPrepared} from './index'

let loading = null
let loadTotal = 0

function ajaxBefore() {
  if (loading == null) {
    loading = Loading.service({
      lock: true,
      text: '请求执行中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0)'
    })
  }
  loadTotal++
}

function ajaxAfter() {
  if (loading) {
    loadTotal--
    if (loadTotal === 0) {
      loading.close()
      loading = null
    }
  }
}

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    console.log(config)
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
      config.headers['Accept'] = 'application/json'
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {

    const res = response.data;
    console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    ajaxAfter()
    return res
    /*   if (res.code !== 200) {
         Message({
           message: res.message || 'Error',
           type: 'error',
           duration: 5 * 1000
         })
         // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
         if (res.code === 401) {
           // to re-login
           MessageBox.confirm('没授权异常', '前往登录', {
             confirmButtonText: 'Re-Login',
             cancelButtonText: 'Cancel',
             type: 'warning'
           }).then(() => {
             store.dispatch('user/resetToken').then(() => {
               location.reload()
             })
           })
         }
         return Promise.reject(new Error(res.message || 'Error '))
       } else {
         return res
       }*/
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

async function http(params = {}) {
  ajaxBefore()
  const data = await service(params)
  ajaxAfter()
  return data
}

export default http
