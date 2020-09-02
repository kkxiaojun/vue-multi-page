import AppH5JSSDK from '@i61/app-h5-jssdk'
import CommonLoginSDK from '@i61/common-login'
import { loginWithToken } from '../api/login'
import { Toast } from 'vant'

export function initLoginType() {
  if (!AppH5JSSDK.getIsHualalaApp()) {
    // 统一登录
    const gotoUrl = window.location.origin + window.location.pathname + window.location.hash
    CommonLoginSDK.init({
      redirectUrl: gotoUrl,
      zIndex: 5,
      env: process.env.ENV,
      // wxAutoLogin: true,
      // wxAutoLoginRedirectUrl: gotoUrl,
      success: (res) => {
        console.log(res)
        if (!window.localStorage.getItem('hllUserToken')) {
          Toast.fail({
            message: '即将跳转登录页',
            className: 'errorToast'
          })
          setTimeout(() => {
            CommonLoginSDK.loginHandle()
          }, 2000)
        }
      },
      error: (err) => {
        console.log(err)
        Toast.fail({
          message: '即将跳转登录页',
          className: 'errorToast'
        })
        setTimeout(() => {
          CommonLoginSDK.loginHandle()
        }, 2000)
      }
    })
  }
  if (AppH5JSSDK.judgeExistFunc('refreshToken')) {
    window.localStorage.setItem('a_hllUserInfo', AppH5JSSDK.getQueryName('hllUserInfo'))
  }
}

export function initHllUserToken() {
  // 初始化
  initLoginType()
  return new Promise((resolve, reject) => {
    AppH5JSSDK.initToken(process.env.ENV).then(res => {
      if (res.ssoUserToken || window.localStorage.getItem('hllUserToken')) {
        if (!window.localStorage.getItem('hllUserToken')) {
          window.localStorage.setItem('hllUserToken', res.ssoUserToken)
        }
        // 成功获取token
        resolve(res.ssoUserToken)
      } else {
        if (window.localStorage.getItem('a_hllUserInfo')) {
          // 重新获取统一登录的token
          const hllUserInfo = JSON.parse(window.localStorage.getItem('a_hllUserInfo'))
          refreshAppToken(hllUserInfo).then(res => {
            resolve(res)
          })
            .catch(e => {
              Toast(e)
              reject(e)
            })
        } else {
          Toast('获取accessToken失败！请尝试重新登录')
          reject(res)
        }
      }
    }).catch(e => {
      if (window.localStorage.getItem('a_hllUserInfo')) {
        const hllUserInfo = JSON.parse(window.localStorage.getItem('a_hllUserInfo'))
        refreshAppToken(hllUserInfo).then(res => {
          window.localStorage.setItem('hllUserToken', res)
          resolve(res)
        })
          .catch(e => {
            Toast(e)
            reject(e)
          })
      } else {
        Toast('获取accessToken失败！请尝试重新登录')
        reject(e)
      }
    })
  })
}

function refreshAppToken(info) {
  return new Promise((resolve, reject) => {
    AppH5JSSDK.refreshToken(res => {
      let params = res
      if (typeof res !== 'object') {
        params = JSON.parse(res)
      }
      window.sessionStorage.setItem('appToken', params.accessToken)
      loginWithToken({
        token: params.accessToken,
        deviceId: info.deviceId
      }).then(res => {
        if (!res.success) {
          reject(res.msg)
          return
        }
        window.localStorage.setItem('hllUserToken', res.data)
        resolve(res.data)
      }).catch(e => {
        reject(e)
      })
    })
  })
}
