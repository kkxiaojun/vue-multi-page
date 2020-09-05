import { activityAxios } from '@/axios'

// 获取奖学金列表
export function getScholarshipList(params) {
  return activityAxios({
    url: '/apply/share/bargain',
    method: 'get',
    params
  })
}
