import axios from 'axios'

import { Toast } from 'vant'

Object.assign(axios.defaults, {
  timeout: 20 * 1000,
  baseURL: process.env.BASE_API,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
})

export default function createAxios(conf = {}, type = 'login') {
  const service = axios.create(conf)
  // request拦截器
  service.interceptors.request.use(config => {
    return config
  })
  service.interceptors.response.use(
    response => {
      const res = response.data
      // if the custom code is not 20000, it is judged as an error.
      if (res.code === 0 || res.code === 200) {
        return res
      } else {
        Toast.fail({
          message: res.msg || res.message,
          className: 'errorToast',
        })
        return Promise.reject(res)
      }
    },
    error => {
      Toast.fail({
        message: '网络错误,请退出重新尝试',
        className: 'errorToast',
      })
      return Promise.reject(error)
    },
  )
  return service
}
