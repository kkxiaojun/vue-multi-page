import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import './plugins'
import Vant, {
  Lazyload
} from 'vant'
import './style/index.scss'

import VueRouter from 'vue-router'
import router from './router'
import Fingerprint from 'fingerprintjs'
import {
  postPoint
} from './utils/buryPoint'
window.localStorage.setItem('deviceId', new Fingerprint().get())
Vue.prototype.postPoint = postPoint

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vant)
// options 为可选参数，无则不传
Vue.use(Lazyload, {
  preLoad: 1.3
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

Vue.filter('filterMoney', function(value) {
  if (!value) {
    return value
  }
  const money = value / 100
  return /^[1-9]\d*$/.test(money) ? money : money.toFixed(2)
})

if (process.env.ENV !== 'prod') {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  new VConsole()
}
