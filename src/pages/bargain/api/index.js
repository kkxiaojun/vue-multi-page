import { activityAxios } from '@/axios'

// 获取砍刀记录明细
export function getInfo(params) {
  return activityAxios({
    url: '/apply/share/bargain/getInfo',
    method: 'get',
    params
  })
}

// 砍刀
export function bargain(data) {
  return activityAxios({
    url: '/apply/share/bargain/bargain',
    method: 'post',
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    data
  })
}

// 获取砍刀流水明细
export function getBargainDetail(params) {
  return activityAxios({
    url: '/apply/share/bargain/getBargainDetail',
    method: 'get',
    params
  })
}

// 获取奖学金列表
export function getScholarshipList(params) {
  return activityAxios({
    url: '/apply/share/bargain/getScholarshipList',
    method: 'get',
    params
  })
}

// 提现
export function receiveScholarship(params) {
  return activityAxios({
    url: '/apply/share/bargain/receiveScholarship',
    method: 'get',
    params
  })
}

// 获取分享链接
export function getSharePoster(params) {
  return activityAxios({
    url: '/apply/share/bargain/getShareLink',
    method: 'get',
    params
  })
}

// 生成报名体验课链接
export function applyLink(params) {
  return activityAxios({
    url: '/apply/share/bargain/applyLink',
    method: 'get',
    params
  })
}

// 提现获取需发短信的手机号
export function getUserPhone(params) {
  return activityAxios({
    url: '/apply/share/bargain/getPhone',
    method: 'get',
    params
  })
}

// 提现获取验证码
export function getPhoneCode(params) {
  return activityAxios({
    url: '/apply/share/bargain/getCode',
    method: 'get',
    params
  })
}

// 更新用户协议
export function updateProtocol(data) {
  return activityAxios({
    url: '/apply/share/bargain/updateProtocol',
    method: 'post',
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    data
  })
}
