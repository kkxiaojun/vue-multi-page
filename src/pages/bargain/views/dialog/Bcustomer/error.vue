<template>
  <van-overlay class-name="self-dialog" :show="visible" :z-index="100" @click.stop>
    <div class="flex-box animate__zoomIn animate__animated">
      <div class="close-btn" v-if="curType !== 'error'" :class="isKan ? '' : 'pb30'">
        <div @click="hide" class="text"></div>
      </div>
      <div class="wrapper" @click.stop>
        <img :src="entryInfo.headUrl" class="avator" alt />
        <!-- <img class="fire-img" :src="fireImg" alt=""> -->
        <!-- <div class="head1">快来帮我砍一刀吧</div> -->
        <!-- <div class="head2">哎呀，您今日已经砍过啦</div> -->
        <div class="head2" v-if="curType === 'error'">
          很遗憾，
          <div>
            <span>{{ entryInfo.nickName }}</span>已退出砍价活动。
          </div>
        </div>
        <div class="head2" v-else>
          很遗憾，
          <div>
            <span>{{ entryInfo.nickName }}</span>参加的画啦啦
          </div>
          <div>砍刀活动已过期。</div>
        </div>
        <div class="btn" @click="goToUrl">我也要免费课程</div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      userInfo: '',
      fireImg: require('pages/bargain/assets/dialog/fire.png'),
      text: '领取奖学金',
      // 计算 289 * progress
      progress: 100,
      isKan: false,
      curType: 'error',
      entryInfo: {}
    }
  },
  methods: {
    show(type, entryInfo) {
      this.entryInfo = entryInfo
      this.curType = type
      this.isKan = false
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    goToUrl() {
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
    width: 540px;
    height: 522px;
    background: rgba(255, 255, 255, 1);
    border: 8px solid rgba(255, 192, 79, 1);
    box-shadow: 0px 20px 0px 0px rgba(255, 163, 45, 1);
    border-radius: 30px;
    // border-radius:30px;
    .user {
      color: #f53e31;
      font-size: 36px;
    }
    .avator {
      position: absolute;
      top: 0;
      transform: translateY(-50%);
      width: 108px;
      height: 108px;
      background: rgba(255, 255, 255, 1);
      border: 4px solid rgba(255, 192, 79, 1);
      border-radius: 50%;
      box-sizing: border-box;
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
  .kan-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 568px;
    height: 630px;
    background: url('~pages/bargain/assets/dialog/bg2.png') no-repeat;
    background-size: 100% 100%;
    // border-radius:30px;
    .head1 {
      font-size: 76px;
      font-weight: bold;
      color: rgba(245, 62, 49, 1);
    }
    .head2 {
      font-size: 32px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      padding-top: 25px;
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
