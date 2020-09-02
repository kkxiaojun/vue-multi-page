<template>
  <div class="strategy">
    <!-- 正式课 -->
    <div v-if="entryInfo.type === 0" class="strategy-box">
      <div class="step cell-bottom-line">
        <div class="point"></div>
        <div class="first-step">01</div>
        <div class="title">转发或分享</div>
      </div>
      <div class="cell-bottom-line">
        <div class="step">
          <div class="point"></div>
          <div class="first-step">02</div>
        </div>
        <img :src="secondStepImg" alt />
        <div class="cut-tip">
          <div>
            分享砍价链接
            <br />给好友
          </div>
          <div>
            好友点进链接
            <br />即可帮砍
          </div>
          <div>
            {{entryInfo.topBargainCount}}刀
            <br />必返{{entryInfo.topBargainPrice | filterMoney}}元
          </div>
        </div>
      </div>
      <div class="cell-bottom-line">
        <div class="step">
          <div class="point"></div>
          <div class="first-step">03</div>
        </div>
        <img :src="thirdStepImg" alt />
        <div class="cut-tip">
          <div>
            分享砍价邀请
            <br />海报至朋友圈
          </div>
          <div>
            好友长按扫码
            <br />进入页面帮砍
          </div>
          <div>
              {{entryInfo.topBargainCount}}刀
            <br />必返{{entryInfo.topBargainPrice | filterMoney}}元
          </div>
        </div>
      </div>
      <div class="tip">温馨提示：支付成功后，需72小时内发起砍价参与活动； 自分享给好友砍首刀后，活动倒计时12小时，如您购买课 程在晚上，建议白天</div>
    </div>
    <!-- 体验课 -->
    <div v-else class="strategy-box">
      <div class="cell-bottom-line">
        <div class="step">
          <div class="point"></div>
          <div class="first-step">01</div>
          <div class="step-title">转发邀请页面;</div>
        </div>
      </div>
      <div class="cell-bottom-line">
        <div class="step special-step">
          <div style="display: flex; align-items: center;">
            <div class="point"></div>
            <div class="first-step">02</div>
          </div>
          <div class="copy-tag">复制口令</div>
        </div>
        <img :src="secondStepImg" alt />
        <div class="cut-tip">
          <div>复制口令，转发或分享海报给朋友</div>
          <div>
            再邀请3个
            <br />好友砍刀
          </div>
          <div>
            3人砍刀
            <br />即可得9.9 元
          </div>
        </div>
      </div>
      <div class="tip">温馨提示： 分享给朋友为你砍首刀后，活动倒计时12小时； 如您购买课程在晚上，建议白天开启邀请朋友砍刀。</div>
    </div>
    <div v-if="entryInfo.state === 0" class="call-friend-to-cut" @click="cutHandle"></div>
  </div>
</template>

<script>
export default {
  name: 'cutStrategy',
  props: {
    entryInfo: {
      default: {}
    }
  },
  data() {
    return {
      secondStepImg: require('bargain/assets/home/standard/secondStep.png'),
      thirdStepImg: require('bargain/assets/home/standard/thirdStep.png')
    }
  },
  methods: {
    cutHandle() {
      this.$emit('shareBtnHandle')
    }
  }
}
</script>

<style scoped lang="scss">
@mixin commonBackground {
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.strategy {
  .strategy-box {
    padding: 20px 40px 40px 40px;
    .special-step {
      align-items: center;
      justify-content: space-between;
    }
    .step {
      display: flex;
      align-items: center;
      height: 100px;
      .point {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background: #ff6817;
      }
      .first-step {
        margin: 0 20px 0 10px;
        font-size: 52px;
        font-weight: 800;
        color: #ff6817;
      }
      .title {
        font-size: 32px;
        font-weight: 500;
        color: #343434;
      }
      .step-title {
        font-size: 32px;
        font-weight: 500;
        color: #333333;
      }
      .copy-tag {
        width: 180px;
        height: 60px;
        line-height: 60px;
        background: #ffdfdf;
        border-radius: 30px;
        font-size: 28px;
        font-weight: 500;
        color: #f43d31;
      }
    }
    .tip {
      padding: 30px 10px 0 0;
      text-align: left;
      font-size: 24px;
      font-weight: 400;
      color: #999999;
    }
  }
  .call-friend-to-cut {
    margin: 30px auto 36px auto;
    width: 380px;
    height: 80px;
    @include commonBackground;
    background-image: url('~bargain/assets/home/callFriendToCut.png');
  }
}
.cell-bottom-line {
  img {
    width: 609px;
    height: 160px;
  }
  .cut-tip {
    display: flex;
    justify-content: space-between;
    padding: 18px 0 30px 0;
    font-size: 24px;
    text-align: left;
    font-weight: 500;
    color: #333333;
    div:first-child {
      width: 230px;
    }
    div:nth-child(2) {
      width: 229px;
    }
    div:last-child {
      width: 150px;
    }
  }
}
</style>
