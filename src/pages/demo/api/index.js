import { activityAxios } from '@/axios'

// 获取砍刀记录明细
export function getInfo(params) {
  return activityAxios({
    url: '/apply/share/bargain/getInfo',
    method: 'get',
    params
  })
}
