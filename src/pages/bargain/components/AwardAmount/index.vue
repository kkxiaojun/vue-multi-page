<template>
  <div :class="isNeedBg ? 'award-amount-package amount-package-bg' : 'award-amount-package'">
    <div class="lucky-bag">
      <div class="award-amount">
        <p class="title">我的奖金</p>
        <p class="amount">
          <span class="mark">￥</span>
          <span class="money">{{summary.redPackPrice}}</span>
        </p>
        <div class="more-btn">
          <span
            class="message"
            v-show="$route.name == 'progress'"
            @click="navidate('awardList')"
          >查看更多奖励 ></span>
        </div>
      </div>
      <div class="invite-record">
        <div class="invite-record-amount">
          <div class="invite-card">
            <p>
              <span class="number">{{summary.registerUserCount}}</span>人
            </p>
            <span class="label">已注册</span>
          </div>
          <div class="invite-card">
            <p>
              <span class="number">{{summary.tryListenUserCount}}</span>人
            </p>
            <span class="label">有效体验</span>
          </div>
        </div>
        <div class="progress-wrapper">
          <span
            class="progress"
            v-show="['home','awardList'].includes($route.name)"
            @click="navidate('progress')"
          >查看邀请进度 ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getInviteSummary } from '../../api/index.js'
export default {
  props: {
    isNeedBg: {
      default: true
    },
    originPage: {
      default: '首页'
    }
  },
  data() {
    return {
      summary: {
        redPackPrice: 0,
        registerUserCount: 0,
        tryListenUserCount: 0
      }
    }
  },
  methods: {
    navidate(routeName) {
      this.$router.push(`/${routeName}?prePage=${this.originPage}`)
    },
    getSummary() {
      getInviteSummary().then(res => {
        if (res.code === 0) {
          this.summary = Object.assign({}, this.summary, res.data)
        }
      })
    }
  },
  mounted() {
    this.getSummary()
  }
}
</script>

<style scoped lang="scss">
@mixin commonBackground {
  background-repeat: no-repeat;
  background-position: center center;
}
@mixin fontStyle {
  color: rgba(245, 62, 49, 1);
  font-weight: bold;
}

.amount-package-bg {
  background-image: url("../../assets/images/bg.png");
  // background-size: 100% auto;
  background-size: cover;
}
.award-amount-package {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 700px;
  @include commonBackground;
  .lucky-bag {
    position: relative;
    width: 726px;
    height: 90%;
    margin: 20px auto;
    background-image: url("../../assets/images/luckyBag.png");
    background-size: contain;
    @include commonBackground;
    .award-amount {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      left: 0;
      right: 0;
      width: 100%;
      height: 315px;
      .title {
        width: 150px;
        height: 35px;
        font-weight: bold;
        font-size: 28px;
        margin: 15px 0;
        @include fontStyle;
      }
      .amount {
        @include fontStyle;
        .mark {
          font-size: 40px;
        }
        .money {
          width: 130px;
          height: 61px;
          font-size: 60px;
        }
      }
      .more-btn {
        display: inline-block;
        width: 200px;
        height: 44px;
        padding-bottom: 50px;
        .message {
          display: inline-block;
          width: 200px;
          height: 44px;
          line-height: 44px;
          margin: 15px 0 25px 0;
          color: rgba(255, 104, 23, 1);
          border: 2px solid rgba(255, 104, 23, 1);
          border-radius: 22px;
        }
      }
    }
    .invite-record {
      position: absolute;
      top: calc(100% - 315px);
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 200px;
      .invite-record-amount {
        display: flex;
        flex-direction: row;
        width: 100%;
        // flex: 1;
        flex: 0.9;
        .invite-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          height: 100%;
          line-height: 100%;
          color: #ffffff;
          .number {
            color: #fcc306;
            font-size: 60px;
          }
          .label {
            margin-top: 20px;
            font-size: 32px;
          }
        }
      }
      .progress-wrapper {
        height: 44px;
        .progress {
          width: 225px;
          height: 44px;
          color: #ffffff;
          font-weight: bold;
          padding: 10px 15px;
          border: 2px solid rgba(255, 255, 255, 1);
          border-radius: 22px;
        }
      }
    }
  }
}
</style>
