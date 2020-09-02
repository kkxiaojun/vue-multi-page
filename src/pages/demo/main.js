import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible/flexible'
import Vant from 'vant'
import './style/index.scss'

import VueRouter from 'vue-router'
import router from './router'

// Vue.config.optionMergeStrategies.beforeRouteEnter
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vant)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

if (process.env.ENV !== 'prod') {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  new VConsole()
}
