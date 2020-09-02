
import axios from 'axios'

import { Toast } from 'vant'
import CommonLoginSDK from '@i61/common-login'
import AppH5JSSDK from '@i61/app-h5-jssdk'

Object.assign(axios.defaults, {
  timeout: 20 * 1000,
  baseURL: process.env.BASE_API,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
})

export default function createAxios(conf = {}, type = 'login') {
  const service = axios.create(conf)
  // request拦截器
  service.interceptors.request.use(
    config => {
      // // 统一登录
      // if (type === 'login') {
      //   const userToken = window.localStorage.getItem('hllUserToken')
      //   config.headers['user-token'] = userToken || ''
      // }
      // // apptoken
      // if (type === 'appLogin') {
      //   // app环境适配
      //   const appToken = window.sessionStorage.getItem('appToken')
      //   if (appToken) {
      //     config.headers.Authorization = appToken
      //   }
      // }
      return config
    }
  )
  service.interceptors.response.use(
    response => {
      const res = response.data
      // if the custom code is not 20000, it is judged as an error.
      if (res.code === 0 || res.code === 200) {
        return res
      } else {
        Toast.fail({
          message: res.msg || res.message,
          className: 'errorToast'
        })
        // 登录过期
        if (res.code === 621) {
          if (AppH5JSSDK.getIsHualalaApp()) {
            Toast.fail({
              message: '您的账号登录信息已失效，请退出登录重试',
              className: 'errorToast'
            })
            AppH5JSSDK.refreshToken((ssoRes) => {
              console.log('hllUserInfo', ssoRes)
              window.localStorage.setItem('hllUserToken', ssoRes.ssoUserToken)
            }, process.env.ENV)
          } else {
            Toast.fail({
              message: '您的账号登录信息已失效，即将跳转登录页',
              className: 'errorToast'
            })
            setTimeout(() => {
              CommonLoginSDK.loginHandle()
            }, 2000)
          }
        }
        if ([620, 622, 623].includes(res.code)) {
          Toast.fail({
            message: '当前未登录',
            className: 'errorToast'
          })
        }
        return Promise.reject(res)
      }
    },
    error => {
      Toast.fail({
        message: '网络错误,请退出重新尝试',
        className: 'errorToast'
      })
      return Promise.reject(error)
    }
  )
  return service
}
