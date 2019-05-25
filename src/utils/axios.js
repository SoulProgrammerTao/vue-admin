import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { baseURL } from '@/config/env'

const myAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

// 请求前的拦截器
// myAxios.interceptors.request.use(function (conf) {
//   let token = sessionStorage.getItem(Config.token)
//   if (token) {
//     conf.headers.Authorization = 'Bearer ' + token
//   }
//   return conf
// })

const XHR = ({ loading = false }) => {
  if (loading) {
    // Vue.$indicator.open()
  }

  // 固定参数
  const myParams = {
    // MerchantCode: 'boyi'
  }

  // 无 loading 请求回调
  const sucFunN = res => {
    return res.data
  }
  const errFunN = err => {
    console.log(err)
    processError(err.response.status)
  }

  // 有 loading 请求回调
  const sucFunL = res => {
    return res.data
  }
  const errFunL = err => {
    console.log(err)
    processError(err.response.status)
  }

  // 接口返回异常处理

  const sucFun = loading ? sucFunL : sucFunN
  const errFun = loading ? errFunL : errFunN

  return { myParams, sucFun, errFun }
}

const getData = ({ method = 'post', url = '', data = {}, loading = false }) => {
  let { myParams, sucFun, errFun } = XHR({ loading })
  let params = { ...myParams, ...data }
  return new Promise((resolve, reject) => {
    if (method.toLowerCase() === 'get') {
      return myAxios.get(url, { params }).then(
        res => {
          resolve(res.data)
          sucFun
        }).catch(
        err => {
          reject(err)
          errFun
        })
    } else if (method.toLowerCase() === 'post') {
      return myAxios.post(url, qs.stringify(params)).then(
        res => {
          resolve(res.data)
          sucFun
        }).catch(
        err => {
          reject(err)
          errFun
        })
    }
  }) 
}

// 无 loading Get 请求
const axiosGet = function (url = '', data = {}) {
  return getData({ method: 'GET', url: url, data: data, loading: false })
}
// 有 loading Get 请求
const axiosGeting = function (url = '', data = {}) {
  return getData({ method: 'GET', url: url, data: data, loading: true })
}
// 无 loading Post 请求
const axiosPost = function (url = '', data = {}) {
  return getData({ method: 'POST', url: url, data: data, loading: false })
}
// 有 loading Post 请求
const axiosPosting = function (url = '', data = {}) {
  return getData({ method: 'POST', url: url, data: data, loading: true })
}

Vue.$axiosGet = Vue.prototype.$axiosGet = axiosGet
Vue.$axiosGeting = Vue.prototype.$axiosGeting = axiosGeting
Vue.$axiosPost = Vue.prototype.$axiosPost = axiosPost
Vue.$axiosPosting = Vue.prototype.$axiosPosting = axiosPosting
