<template>
  <van-overlay class-name="self-reward-dialog" :show="visible" :z-index="1000" @click="hide">
    <div v-if="visible" class="flex-box animate__animated animate__zoomIn">
      <div class="close-btn">
        <div @click="hide" class="text"></div>
      </div>
      <div class="wrapper" @touchstart="pressStart" @touchend.stop.prevent="pressEnd">
        <div class="check-box">
          <span class="check"></span>
          <span class="title1">领取成功</span>
        </div>
        <img class="wechat-code" :src="wxCode" alt="">
        <div class="title2">请关注“<span class="active">画啦啦VIP课堂服务号</span>”, </div>
        <div class="title2">点击右下角“个人中心</div>
        <div class="title2">”——“兑换奖学金”</div>
        <!-- <div class="title2">长按保存图片到相册，</div>
        <div class="title2">用微信扫一扫识别关注</div> -->
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      timer: null,
      touchTime: 600,
      wxCode: require('@/assets/wx_code.jpg')
    }
  },
  methods: {
    show() {
      this.visible = true
      // 埋点
      this.postPoint({
        eventName: 'scan_code_add_official_account_pop',
        properties: { eventId: '扫码添加公众号弹窗', label: '显示扫码添加公众号弹窗' }
      })
    },
    pressStart(e) {
      this.timer = setTimeout(() => {
        this.postPoint({
          eventName: 'scan_code_add_official_account_pop',
          properties: { eventId: '扫码添加公众号弹窗', label: '显示扫码添加公众号弹窗' }
        })
      }, this.touchTime)
    },
    pressEnd(e) {
      clearTimeout(this.timer)
    },
    hide() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.self-reward-dialog {
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
    margin-top: -150px;
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
    width:600px;
    height:630px;
    padding: 40px 46px;
    background:rgba(255,255,255,1);
    border-radius:30px;
    box-sizing: border-box;
    // margin-top: -100px;
    .check-box {
      display: flex;
      align-items: center;
    }
    .check {
      display: inline-block;
      width: 41.8px;
      height: 41.8px;
      margin: 3px 10px 0 0;
      background:url('~pages/bargain/assets/cashExchange/check.png') no-repeat;
      background-size: 100% 100%;
    }
    .wechat-code {
      padding: 20px 0;
      width:256px;
      height:256px;
    }
    .title1 {
      font-size:40px;
      font-weight:bold;
      color: #333;
    }
    .title2 {
      font-size: 36px;
      font-weight: 400;
      color: #333333;
    }
    .active {
      color: #FF6817;
    }
  }
}
</style>
