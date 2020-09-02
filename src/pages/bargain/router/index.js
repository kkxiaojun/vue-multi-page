import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
  path: '*',
  name: '',
  redirect: '/owner'
},
{
  path: '/owner',
  name: 'owner',
  component: () => import('../views/owner.vue'),
  meta: {
    title: '砍价活动'
  }
},
{
  path: '/friend',
  name: 'friend',
  component: () => import('../views/friend.vue'),
  meta: {
    title: '砍价活动'
  }
},
{
  path: '/exchange',
  name: 'exchange',
  component: () => import('../views/cashExchange/index.vue'),
  meta: {
    title: '砍价活动-提现'
  }
}]

const router = new VueRouter({
  routes
})

router.beforeEach(async(to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || '砍价'
  next()
})

export default router
