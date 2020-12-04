export default {
  methods: {
    initLogin(callback) {
      const gotoUrl =
        window.location.origin + window.location.pathname + '#/home'
      CommonLoginSDK.init({
        env: process.env.ENV,
        redirectUrl: gotoUrl,
        isShow: false,
        wxAutoLogin: true,
        wxAutoLoginRedirectUrl: gotoUrl,
        success: res => {
          console.log('登录成功--------', res)
          if (res.success) {
            window.sessionStorage.setItem('userId', res.userId)
            callback && callback(res)
          } else {
            this.$toast('即将跳转至登录页...')
            setTimeout(() => {
              CommonLoginSDK.loginHandle()
            }, 2400)
          }
          // 登录成功
        },
        error: err => {
          console.log('登录失败---------', err)
          if (err.loginStatus === '未登录') {
            this.$toast('即将跳转至登录页...')
            setTimeout(() => {
              CommonLoginSDK.loginHandle()
            }, 2400)
          }
        },
      })
    },
  },
}
