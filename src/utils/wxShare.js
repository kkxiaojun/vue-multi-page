import AppH5JSSDK from '@i61/app-h5-jssdk'

const SHARE_IMG_URL = 'https://hualala-common.oss-cn-shenzhen.aliyuncs.com/test/hll-activity/5e9cfd3f5730322eb2f46a0f.png'
const env = process.env.ENV
const jsApiObj = {
  onMenuShareTimeline: {
    success: () => {
      console.log('分享朋友圈：callback success')
    },
    cancel: () => {
      console.log('取消分享朋友圈：callback cancal')
    }
  },
  onMenuShareAppMessage: {
    success: () => {
      console.log('分享给好友：callback success')
    },
    cancel: () => {
      console.log('取消分享给好友: callback cancal')
    }
  }
}
const shareParams = {
  title: '就差你啦，我马上就能得返现！快来帮我点',
  desc: '帮我砍一刀，【免费】送你一套少儿美术培优课程',
  link: window.location.origin + window.location.pathname,
  imgUrl: SHARE_IMG_URL
}
export function wxShareInit(shareObj) {
  AppH5JSSDK.wxShareInit(env, jsApiObj, Object.assign(shareParams, shareObj)).then(res => {
    console.log('abc', res)
  }).catch(e => {
    console.log(e)
  })
}
