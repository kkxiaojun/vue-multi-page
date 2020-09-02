<template>
  <van-overlay class-name="self-dialog" :show="isvisible" :z-index="100" @click="hide">
    <div class="flex-box animate__zoomIn animate__animated">
      <div class="close-btn">
        <div @click="hide" class="text"></div>
      </div>
      <div class="wrapper" @click.stop>
        <div class="head" v-if="!isFinish">
          <div class="head1">砍价已达到</div>
          <div class="head2">{{ info.hasBargainPrice | filterMoney }}<span class="yuan">元</span></div>
        </div>
        <div class="head" v-else>
          <div class="head1">恭喜您获得奖学金</div>
          <div class="head2">{{ info.hasBargainPrice | filterMoney}}<span class="yuan">元</span></div>
        </div>
        <div class="bar" v-if="!isFinish">
          <div class="active" :style="{ 'width': progress + '%' }"></div>
        </div>
        <div v-if="!isFinish" class="bar-text">{{ progress + '%' }}</div>
        <div class="btn" @click="handleConfirm">{{ !isFinish ? '喊朋友来砍刀' : '领取奖学金' }}</div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  data() {
    return {
      isvisible: false,
      kan1: require('pages/bargain/assets/dialog/kan1.png'),
      text: '领取奖学金',
      // 计算 289 * progress
      progress: 80,
      info: {}
    }
  },
  computed: {
    isFinish() {
      return this.info.state === 1
    }
  },
  methods: {
    show(data) {
      this.info = data
      this.progress = parseInt((data.hasBargainPrice / data.topBargainPrice) * 100)
      this.isvisible = true
      this.postPoint({
        eventName: 'share_pop',
        properties: { eventId: '用户分享弹窗', label: '显示用户分享弹窗' }
      })
    },
    hide() {
      this.postPoint({
        eventName: 'close_bargain_pop',
        properties: { eventId: '用户分享弹窗', label: '关闭砍价弹窗' }
      })
      this.isvisible = false
    },
    handleConfirm() {
      this.isvisible = false
      if (this.isFinish) {
        this.postPoint({
          eventName: 'receive_scholarship',
          properties: { eventId: '用户分享弹窗', label: '领取奖学金' }
        })
        this.$emit('openDialog', this.isFinish)
      } else {
        this.postPoint({
          eventName: 'invite_friends_help_bargain2',
          properties: { eventId: '用户分享弹窗', label: '喊朋友来砍刀' }
        })
        this.$emit('openDialog', this.isFinish)
      }
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
    .close-btn {
      display: flex;
      justify-content: flex-end;
      padding-bottom: 30px;
      .text {
        width: 60px;
        height: 60px;
        background: url('~pages/bargain/assets/dialog/close.png') no-repeat;
        background-size: 100%;
      }
    }
  }
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:568px;
    height:630px;
    padding-top: 40px;
    box-sizing: border-box;
    background:url('~pages/bargain/assets/dialog/kan1.png') no-repeat;
    background-size: 100% 100%;
    // border-radius:30px;
    .head {
      color:rgba(255,255,255,1);
      .head1 {
        font-size: 32px;
        font-weight: 400;
        color: #f1efef;
        padding: 10px 0;
      }
      .head2 {
        font-size:76px;
        font-weight:500;
        padding: 10px 0;
      }
      .yuan {
        font-size: 28px;
      }
    }
    .bar {
      width:88%;
      height:30px;
      background:rgba(255,247,204,1);
      border:4px solid rgba(255,236,143,1);
      border-radius:15px;
      .active {
        // width:289px;
        height:30px;
        border:4px solid rgba(255,236,143,1);
        background:linear-gradient(0deg,rgba(255,181,37,1) 0%,rgba(255,239,135,1) 100%);
        box-shadow:0px 6px 10px 0px rgba(100,9,19,0.3);
        border-radius:15px;
        box-sizing: border-box;
      }
    }
    .bar-text {
      color: #fff;
      font-size: 32px;
      padding-top: 20px;
    }
    .btn {
      position: absolute;
      bottom: 40px;
      width:380px;
      height:72px;
      line-height: 70px;
      background:linear-gradient(0deg,rgba(255,182,38,1) 0%,rgba(255,240,135,1) 100%);
      box-shadow: 0 0.05333rem 0 0 #ffb626, 0 0.13333rem 0 0 #e89c1a;
      border-radius:36px;
      font-size:36px;
      font-weight:bold;
      color:rgba(245,62,49,1);
    }
  }
}
</style>
