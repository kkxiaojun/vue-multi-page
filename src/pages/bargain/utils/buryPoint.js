import { postLog } from 'bargain/api/log'

export function postPoint(json) {
  const openId = window.sessionStorage.getItem('openId') || window.sessionStorage.getItem('deviceId')
  const uukey = window.sessionStorage.getItem('uukey')
  const courseType = window.sessionStorage.getItem('course_type') === 0 ? '正式课' : '体验课'
  json.properties.activityType = courseType
  json.properties = JSON.stringify(json.properties)
  if (uukey) {
    const data = Object.assign({ distinctId: openId, userId: '', uukey: uukey || 'no' }, json)
    postLog(data).then(res => {})
  }
}
