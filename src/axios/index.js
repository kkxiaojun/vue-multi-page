import createAxios from './createAxios'

// h5的业务axios
export const baseAxios = createAxios({
  baseURL: process.env.BASE_API
})

// hll-activity活动
export const activityAxios = createAxios({
  baseURL: process.env.BASE_API + '/hll-activity'
})

// 埋点
export const pointAxios = createAxios({
  baseURL: process.env.BASE_API + '/hll-activity-track'
})

// app的登录
export const tokenLoginRequest = createAxios({
  baseURL: process.env.LOGIN_TOKEN_API
}, 'appLogin')
