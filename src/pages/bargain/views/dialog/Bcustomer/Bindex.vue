<template>
  <van-overlay class-name="self-dialog" :show="visible" :z-index="100" @click="hide">
    <div class="flex-box animate__zoomIn animate__animated">
      <div class="close-btn" :class="isKan ? '' : 'pb30'">
        <div @click="hide" class="text"></div>
      </div>
      <div v-if="!isKan" class="wrapper" @click.stop>
        <img :src="entryInfo.headUrl" class="avator" alt="">
        <img class="fire-img" :src="fireImg" alt="">
        <div class="head1">快来帮我砍一刀吧</div>
        <div class="no-check" v-if="errorText">
          <div class="no-error">
            <van-icon name="warning-o" />砍价失败!
          </div>
          <div>可能网络不好哦，重试一下</div>
        </div>
        <div class="btn" @click="showKan">砍一刀</div>
      </div>
      <div v-else class="kan-wrapper" @click.stop>
        <div class="head2">手气不错哦，你已帮{{ successObj.nickName }}砍了</div>
        <div class="head1">{{ successObj.bargainPrice | filterMoney }}元</div>
        <div class="btn" @click="goToUrl">我也要免费课程</div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { bargain } from 'bargain/api'
export default {
  data() {
    return {
      visible: false,
      kan1: require('pages/bargain/assets/dialog/kan1.png'),
      fireImg: require('pages/bargain/assets/dialog/fire.png'),
      text: '领取奖学金',
      errorText: '',
      entryInfo: {},
      // 计算 289 * progress
      progress: 100,
      isKan: false,
      successObj: {
        bargainPrice: 12356,
        nickName: ''
      }
    }
  },
  methods: {
    show(entryInfo) {
      this.entryInfo = entryInfo
      this.isKan = false
      this.visible = true
      this.postPoint({
        eventName: 'friend_bargain_pop_page',
        properties: { eventId: '显示好友砍价弹窗页', label: '显示好友砍价弹窗页' }
      })
    },
    hide() {
      this.postPoint({
        eventName: 'friend_bargain_pop_page',
        properties: { eventId: '好友砍价弹窗页', label: 'friend_close_bargain_pop' }
      })
      this.visible = false
      if (this.isKan) {
        this.$emit('updateHome')
      }
    },
    showKan() {
      const wxUserInfo = JSON.parse(window.sessionStorage.getItem('wxUserInfo'))
      const data = {
        openId: wxUserInfo.openId,
        sceneId: window.sessionStorage.getItem('sceneId')
      }
      // const data = {
      //   openId: 'omsXu0th-PPtSrAP3PIfh90tSz38',
      //   sceneId: '99991598686885880030837'
      // }
      this.$toast.loading({
        mask: true,
        message: '砍价中...'
      })
      bargain(data).then(res => {
        if (res.code === 0) {
          this.successObj = res.data
          this.errorText = ''
          this.isKan = true
        } else {
          this.errorText = '可能网络不好哦，重试一下'
          this.isKan = false
        }
        this.$toast.clear()
      }).catch(e => {
        this.errorText = '可能网络不好哦，重试一下'
        this.isKan = false
      })
      this.postPoint({
        eventName: 'friend_one_chop',
        properties: { eventId: '好友砍价弹窗页', label: '点击“砍一刀”' }
      })
    },
    goToUrl() {
      this.postPoint({
        eventName: 'friend_want_free_experience_courses',
        properties: { eventId: '好友砍价弹窗页', label: '我也要免费课程' }
      })
      this.$emit('gotoCourse')
    }
  }
}
</script>

<style lang="scss" scoped>
.self-dialog {
  position: fixed;
  height: 100%;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .flex-box {
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
    margin-top: -120px;
    .close-btn {
      display: flex;
      justify-content: flex-end;
      .text {
        width: 60px;
        height: 60px;
        background: url('~pages/bargain/assets/dialog/close.png') no-repeat;
        background-size: 100%;
      }
    }
    .pb30 {
      padding-bottom: 30px;
    }
  }
  .fire-img {
    width: 480px;
    height: 280px;
  }
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:540px;
    height:622px;
    background:rgba(255,255,255,1);
    border:8px solid rgba(255,192,79,1);
    box-shadow:0px 20px 0px 0px rgba(255,163,45,1);
    border-radius:30px;
    // border-radius:30px;
    .no-check {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: 28px;
      font-weight: 400;
      color: #333333;
    }
    .no-error {
      display: flex;
      align-items: center;
    }
    .avator {
      position: absolute;
      top: 0;
      transform: translateY(-50%);
      width:108px;
      height:108px;
      background:rgba(255,255,255,1);
      border:4px solid rgba(255,192,79,1);
      border-radius:50%;
      box-sizing: border-box;
    }
    .head1 {
      position: absolute;
      top: 0;
      font-size:42px;
      font-weight:500;
      color:rgba(245,62,49,1);
      padding-top: 80px;
      // padding: 50px 0 20px 0;
    }
    .head2 {
      font-size:32px;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
    .btn {
      position: absolute;
      bottom: 40px;
      width:380px;
      height:72px;
      line-height: 72px;
      background:linear-gradient(0deg,rgba(245,62,49,1) 0%,rgba(255,121,55,1) 100%);
      border-radius:36px;
      box-shadow: 0 0.05333rem 0 0 #f53e31, 0 0.13333rem 0 0 #e2190b;
      border-radius:36px;
      font-size:36px;
      font-weight:bold;
      color:rgba(255,255,255,1);
    }
  }
  .kan-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:568px;
    height:630px;
    background:url('~pages/bargain/assets/dialog/bg2.png') no-repeat;
    background-size: 100% 100%;
    // border-radius:30px;
    .head1 {
      font-size:76px;
      font-weight:bold;
      color:rgba(245,62,49,1);
    }
    .head2 {
      font-size:32px;
      font-weight:500;
      color:rgba(51,51,51,1);
      padding-top: 25px;
    }
    .btn {
      position: absolute;
      bottom: 40px;
      width:380px;
      height:72px;
      line-height: 72px;
      background:linear-gradient(0deg,rgba(245,62,49,1) 0%,rgba(255,121,55,1) 100%);
      border-radius:36px;
      box-shadow: 0 0.05333rem 0 0 #f53e31, 0 0.13333rem 0 0 #e2190b;
      border-radius:36px;
      font-size:36px;
      font-weight:bold;
      color:rgba(255,255,255,1);
    }
  }
}
</style>
