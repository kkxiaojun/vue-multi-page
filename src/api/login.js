import { baseAxios } from '../axios/index'
// 签名登录
export function loginWithToken(params) {
  return baseAxios({
    url: '/v1/student/getYearSummaryToken',
    method: 'post',
    params,
  })
}
