import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import Vant from 'vant'
import './style/index.scss'
import lazyImage from '@/directives/lazyImage'

import VueRouter from 'vue-router'
import router from './router'
import { map } from 'core-js/fn/array'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vant)

Vue.directive('imgLazy', lazyImage)

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

// try catch 局限性：1. 语法错误 2. 异步错误 3. 且对于代码的侵入性较强
try {
  map.info
} catch (error) {
  
}

// 异步异常
window.onerror = function(message, source, lineno, colno, error) {
  console.log('---onerror捕获到异常---：', { message, source, lineno, colno, error })
  return true
}

// window.onerror
// mesage 为错误信息提示
// source 为错误脚本地址
// lineno 为错误的代码所在行号
// colno 为错误的代码所在列号
// error 为错误的对象信息，比如 error.stack 获取错误的堆栈信息
// 异步异常

// 除了对语法错误和网络错误（因为网络请求异常不会事件冒泡）无能为力以外，无论是异步还是非异步，onerror 都能捕获到运行时错误。

// 因为 window.onerror 事件是通过事件冒泡获取 error 信息的，而网络加载错误是不会进行事件冒泡的。

// window.addEventListener 不同于 window.onerror，它通过事件捕获获取 error 信息，从而可以对网络资源的加载异常进行处理

window.addEventListener('error', (error) => {
  console.log('---addEventListener捕获到异常---：', error)
}, true)
