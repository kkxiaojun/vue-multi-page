
import AppH5JSSDK from '@i61/app-h5-jssdk'
import CommonLoginSDK from '@i61/common-login'
import { Toast } from 'vant'
export default {
  methods: {
    // 初始化token：途径：1. app内 2. h5的url参数
    initLoginToken(callback) {
      AppH5JSSDK.initToken(process.env.VUE_APP_SELF_ENV).then(res => {
        if (res.ssoUserToken || window.localStorage.getItem('hllUserToken')) {
          window.localStorage.setItem('hllUserToken', res.ssoUserToken || window.localStorage.getItem('hllUserToken'))
          // 成功获取token
          callback && callback()
        } else {
          // app内重新获取统一登录的token
          this.refreshAppToken(callback)
        }
      }).catch(e => {
        // app内重新获取统一登录的token
        this.refreshAppToken(callback)
      })
      // 非画啦啦app环境
      if (!AppH5JSSDK.getIsHualalaApp()) {
        CommonLoginSDK.on('success', (res) => {
          if (res.loginStatus === '未登录') {
            CommonLoginSDK.loginHandle()
          } else {
            callback && callback()
          }
        })
      }
    },
    // 刷新-app-token
    refreshAppToken(callback) {
      if (AppH5JSSDK.getIsHualalaApp() && window.localStorage.getItem('a_hllUserInfo')) {
        const hllUserInfo = JSON.parse(window.localStorage.getItem('a_hllUserInfo'))
        AppH5JSSDK.refreshToken(res => {
          let params = res
          // FIXME: ios返回的json string, android返回的是json Object
          if (typeof res !== 'object') {
            params = JSON.parse(res)
          }
          window.sessionStorage.setItem('appToken', params.accessToken)
          initToken({
            token: params.accessToken,
            deviceId: hllUserInfo.deviceId
          }).then(res => {
            if (!res.success) {
              Toast(res.msg)
              return
            }
            window.localStorage.setItem('hllUserToken', res.data)
            callback && callback()
          }).catch(e => {
            Toast(e)
          })
        })
      }
    }
  }
}
