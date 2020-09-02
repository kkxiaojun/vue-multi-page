<template>
  <van-overlay class-name="self-dialog" :show="visible" :z-index="100" @click.stop>
    <div class="flex-box animate__zoomIn animate__animated">
      <!-- <div class="close-btn pd30">
        <div @click="hide" class="text"></div>
      </div>-->
      <div class="wrapper" @click.stop>
        <div class="head2">该活动链接{{entryInfo.nickName ? `归属于${entryInfo.nickName}` : '尚未绑定归属人'}}。</div>
        <div class="head2">请去“画啦啦VIP课堂服务号”</div>
        <div class="head2">绑定自己学员账号发起活动。</div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'Bkan',
  data() {
    return {
      visible: false,
      userInfo: '',
      fireImg: require('pages/bargain/assets/dialog/fire.png'),
      // 计算 289 * progress
      progress: 100,
      curType: 'error',
      showText: '',
      entryInfo: {}
    }
  },
  methods: {
    show(entryInfo) {
      this.entryInfo = entryInfo || {}
      this.visible = true
    },
    hide() {
      this.visible = false
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
    .pd30 {
      padding-bottom: 30px;
    }
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
    width: 540px;
    height: 320px;
    background: rgba(255, 255, 255, 1);
    border: 8px solid rgba(255, 192, 79, 1);
    box-shadow: 0px 20px 0px 0px rgba(255, 163, 45, 1);
    border-radius: 30px;
    .pd30 {
      padding-bottom: 30px;
    }
    .head1 {
      position: absolute;
      top: 0;
      font-size: 42px;
      font-weight: 500;
      color: rgba(245, 62, 49, 1);
      padding-top: 80px;
      // padding: 50px 0 20px 0;
    }
    .head2 {
      font-size: 32px;
      font-weight: 400;
      color: #333333;
    }
    .btn {
      position: absolute;
      bottom: 40px;
      width: 380px;
      height: 72px;
      line-height: 72px;
      background: linear-gradient(
        0deg,
        rgba(245, 62, 49, 1) 0%,
        rgba(255, 121, 55, 1) 100%
      );
      border-radius: 36px;
      box-shadow: 0 0.05333rem 0 0 #f53e31, 0 0.13333rem 0 0 #e2190b;
      border-radius: 36px;
      font-size: 36px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>
