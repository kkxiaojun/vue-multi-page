import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import Vant from 'vant'

import VueRouter from 'vue-router'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vant)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

// 异常处理
Vue.config.errorHandler = (err, vm, info) => {
  console.log('---error---', err)
  console.log('error-vm', vm)
  console.log('info', info)
}

// 异步异常
window.onerror = function(message, source, lineno, colno, error) {
  console.log('---onerror捕获到异常---：', { message, source, lineno, colno, error })
  return true
}

// 异步异常
window.addEventListener('error', (error) => {
  console.log('---addEventListener捕获到异常---：', error)
}, true)
