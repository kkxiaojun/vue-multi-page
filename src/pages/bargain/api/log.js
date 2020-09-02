import { pointAxios } from '@/axios'

export function postLog(data) {
  return pointAxios({
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    url: '/activity/track/log',
    data
  })
}
