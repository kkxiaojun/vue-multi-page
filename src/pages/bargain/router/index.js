import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '*',
    name: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    meta: {
      title: 'page'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async(to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || 'demo'
  next()
})

export default router
