<template>
  <div class="home">
    <notice-bar :courseType="orderType"></notice-bar>
    <div :class="['header', isStandardType ? 'standard-header' : 'demo-header']">
      <div class="cut-title">
        <div class="title">
          <span
            v-if="isStandardType"
          >{{entryInfo.topBargainCount}}刀，必得{{entryInfo.topBargainPrice | filterMoney}}元</span>
          <span v-else>仅需{{entryInfo.topBargainCount}}刀，必返全额</span>
        </div>
      </div>
      <div :class="['header-box', isStandardType ? 'standard-header-box' : 'demo-header-box']">
        <div class="apply-status">
          <div v-if="entryInfo.state === 0">
            <div>我已报名</div>
          </div>
          <div v-else-if="entryInfo.state === 1">已结束</div>
          <div v-else-if="entryInfo.state === 2">退出活动</div>
        </div>
        <div v-if="isStandardType" class="course-number">
          <div class="number">{{entryInfo.courseNumber}}</div>
          <div class="course">课时</div>
        </div>
      </div>
    </div>
    <div class="lucky-draw">
      <img :src="luckyDraw" />
      <div class="wechat" @click="openWechat"></div>
    </div>

    <!-- A用户 -->
    <!-- <div v-if="entryInfo.isOwn" class="owner"> -->
    <div class="owner">
      <div v-if="entryInfo.state === 0 || entryInfo.state === 1">
        <div :class="['content-bg', isStandardType ? 'standard-content-bg' : 'demo-content-bg']">
          <div class="content-box">
            <!-- 正常状态 -->
            <div v-if="entryInfo.state === 0">
              <div class="content-title">
                <span v-if="entryInfo.hasBargainCount === 0">分享首刀后，倒计时12小时</span>
                <span v-else>
                  <div class="time_box">{{dateObj.hours}}</div>
                  <div class="time_tip">:</div>
                  <div class="time_box">{{dateObj.minutes}}</div>
                  <div class="time_tip">:</div>
                  <div class="time_box">{{dateObj.seconds}}</div>
                  <div class="time_tip">后砍价结束</div>
                </span>
              </div>
              <div class="small-content-box">
                <div class="title">
                  已砍
                  <span class="common-text-color">{{entryInfo.hasBargainPrice | filterMoney}}</span>
                  元，只要{{entryInfo.topBargainCount}}刀
                  <span
                    class="common-text-color"
                  >必返{{entryInfo.topBargainPrice | filterMoney }}元</span>
                </div>
                <progress-bar
                  :progressNumber="parseInt((entryInfo.hasBargainPrice / entryInfo.topBargainPrice) * 100)"
                ></progress-bar>
                <div class="share" @click="sharePoster"></div>
              </div>
            </div>
            <!-- 已结束 -->
            <div v-else-if="entryInfo.state === 1">
              <div class="content-title">恭喜您获得奖学金</div>
              <div class="small-content-box end-state">
                <div class="money">{{entryInfo.hasBargainPrice | filterMoney}}元</div>
                <div class="get-scholarship-btn" @click="openAdailog(true)">领取奖学金</div>
              </div>
            </div>
          </div>
          <cut-price-record :entryInfo="entryInfo" @shareBtnHandle="sharePoster"></cut-price-record>
          <div class="activity-tip">活动最终解释权归画啦啦所有</div>
        </div>
      </div>

      <!-- 退费成功 -->
      <div
        v-if="entryInfo.state === 2"
        :class="['content-bg', isStandardType ? 'standard-content-bg' : 'demo-content-bg']"
      >
        <refund-box :courseType="entryInfo.type"></refund-box>
        <div class="activity-tip">活动最终解释权归画啦啦所有</div>
      </div>
    </div>

    <!-- 公众号二维码 -->
    <wechat-dialog ref="WechatDialog" />
    <!-- 分享页 -->
    <share-poster ref="SharePoster" />
    <!-- 领取奖励页 -->
    <reward-dialog ref="RewardDialog" />
    <!-- A-有砍刀记录 -->
    <acustomer-dialog ref="AcustomerDialog" @openDialog="openAdailog" />
    <!-- A---退费 -->
    <refund-dialog ref="RefundDialog" />
    <!-- A ---userId未绑定-->
    <un-bind ref="UnBind" />
  </div>
</template>

<script>
import { getInfo, applyLink, getSharePoster } from 'bargain/api/index'
import { wxShareInit } from '@/utils/wxShare'
import CommonLoginSDK from '@i61/common-login'
import optionMixins from 'bargain/optionMixins'
import noticeBar from '../components/NoticeBar'
import progressBar from '../components/progressBar'
import cutPriceRecord from '../components/cutPriceRecord'
import RefundDialog from './dialog/Acustomer/refund'
import WechatDialog from '../components/WechatDialog'
import SharePoster from '../components/SharePoster'
import AcustomerDialog from './dialog/Acustomer/Aindex'
import RewardDialog from '../components/RewardDialog'
import refundBox from '../components/refundBox'
import UnBind from './dialog/Acustomer/unbind'
export default {
  name: 'home',
  components: {
    noticeBar,
    progressBar,
    cutPriceRecord,
    WechatDialog,
    SharePoster,
    AcustomerDialog,
    RewardDialog,
    refundBox,
    RefundDialog,
    UnBind
  },
  mixins: [optionMixins],
  data() {
    return {
      progressNumber: 60,
      entryInfo: {
        actualPay: 0, // 订单支付价格
        ccTeacherId: 0, // ccTeacherId
        courseNumber: 0, // 用户套餐课时数
        hasBargainCount: 0, // 已砍次数
        hasBargainPrice: 0, // 已砍价格，单位分
        id: 0, // 砍刀记录id
        isBargain: false, // 当天是否已参与过砍刀
        isOwn: false, // 是否所属用户
        nickName: '我是谁', // 用户名字
        remainTime: 2, // 砍刀活动剩余结束时间，单位ms
        state: 1, // 状态 0：正常 1：已结束 2：退费
        topBargainCount: 2, // 可砍次数
        topBargainPrice: 120, // 最高返现价格，单位分
        type: 1 // 类型0：正式课 1：体验课
      },
      luckyDraw: require('bargain/assets/home/luckyDraw.png'),
      isOwner: true,
      cutPriceRecordList: [],
      wxUserInfo: {},
      sceneId: '',
      uukey: '',
      remainTime: 0,
      shareData: {},
      applyInfo: {}
    }
  },
  created() {
    this.sceneId = this.$route.query.sceneId || window.sessionStorage.getItem('sceneId', this.uukey)
    this.uukey = this.$route.query.uukey || window.sessionStorage.getItem('uukey', this.sceneId)
    // 存储
    window.sessionStorage.setItem('uukey', this.uukey)
    window.sessionStorage.setItem('sceneId', this.sceneId)
    this.init()
  },
  computed: {
    orderType() {
      return this.entryInfo.type === 0 ? 'standard' : 'demo'
    },
    isStandardType() {
      return this.entryInfo.type === 0
    },
    dateObj() {
      let hours = parseInt(this.remainTime / 3600)
      let minutes = parseInt((this.remainTime % 3600) / 60)
      let seconds = parseInt(this.remainTime % 3600 % 60)

      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
      return {
        hours,
        minutes,
        seconds
      }
    }
  },
  methods: {
    init() {
      // console.log('process.env.ENV', process.env.ENV)
      const ENV = process.env.ENV
      const gotoUrl = window.location.origin + window.location.pathname + '#/owner'
      CommonLoginSDK.init({
        env: ENV,
        gotoUrl,
        isShow: false,
        wxAutoLogin: true,
        wxAutoLoginRedirectUrl: gotoUrl,
        success: (res) => {
          console.log(res)
          this.wxUserInfo = res
          window.localStorage.setItem('wxUserInfo', JSON.stringify(res))

          this.getBargainInfo()
        },
        error: (res) => {
          if (res.code === 611) {
            CommonLoginSDK.loginHandle()
            return
          }
        }
      })
    },
    getBargainInfo() {
      getInfo({
        openId: this.wxUserInfo.openId,
        sceneId: this.sceneId,
        userId: this.wxUserInfo.userId
      }).then(res => {
        if (res.code === 0) {
          this.entryInfo = res.data
          // 设置默认头像
          if (!this.entryInfo.headUrl) {
            this.entryInfo.headUrl = require('bargain/assets/logo.png')
          }
          // this.entryInfo.type = 1
          // this.entryInfo.state = 0
          // this.entryInfo.isOwn = true
          // this.entryInfo.remainTime = 3643000
          this.initAfterInfo(res.data)
          if (this.entryInfo.remainTime > 0) {
            this.remainTime = parseInt(res.data.remainTime / 1000)
            setInterval(() => {
              if (this.remainTime < 0) {
                return
              }
              this.remainTime = this.remainTime - 1
            }, 1000)
          }
        }
      }).catch(e => {
        if (e && e.data === '活动所属用户未绑定账号，请关注并绑定公众号') {
          this.$refs.UnBind.show()
        }
      })
    },
    initAfterInfo(data) {
      window.sessionStorage.setItem('course_type', data.type)
      this.getShareLink()
      this.openDialog()
      this.getApplyInfo()
      this.postPoint({
        eventName: 'bargain_activity_page',
        properties: { eventId: '砍价活动页', label: '显示砍价活动页' }
      })
    },
    openAdailog(isFinish) {
      if (isFinish) {
        this.showRewardDialog()
      } else {
        this.sharePoster()
      }
    },
    openWechat() {
      window.scrollTo(0, 0)
      this.$refs.WechatDialog.show()
      this.postPoint({
        eventName: 'regular_follow_official_account_withdrawal',
        properties: { eventId: '砍价活动页', label: '点击“关注公众号提现”' }
      })
    },
    // 海报
    sharePoster() {
      this.$refs.SharePoster.show(this.entryInfo, this.shareData)
      this.postPoint({
        eventName: 'share_friends_first_machete',
        properties: { eventId: '砍价活动页', label: '点击“分享好友砍首刀”' }
      })
    },
    // 领取奖励
    showRewardDialog() {
      this.$refs.RewardDialog.show()
    },
    gotoFreeCourse() {
      // 跳转至转介绍0元
    },
    // 弹出逻辑
    openDialog() {
      // A--为自己首次砍刀
      if (this.entryInfo.isOwn) {
        // A--有砍刀记录-1. 进行中 2. 完成-弹出
        if (this.entryInfo.state !== 2 && this.entryInfo.hasBargainCount) {
          this.$refs.AcustomerDialog.show(this.entryInfo)
        }
        // A--退费
        if (this.entryInfo.state === 2) {
          this.$refs.RefundDialog.show()
        }
      } else {
        this.$refs.UnBind.show(this.entryInfo)
      }
    },
    getApplyInfo() {
      applyLink({
        bargainId: this.entryInfo.id
      }).then(res => {
        if (res.code !== 0) {
          this.$toast(res.msg)
          return
        }
        this.applyInfo = res.data
      })
    },
    getApplyLink() {
      window.location.href = this.applyInfo.link
      this.postPoint({
        eventName: 'get_0yuan_immediately',
        properties: { eventId: '好友砍价活动页', label: '立即0元领' }
      })
    },
    getShareLink() {
      if (this.shareData.url) {
        return
      }
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中~'
      })
      const params = {
        id: this.entryInfo.id,
        ccId: this.entryInfo.ccTeacherId
      }
      getSharePoster(params).then(res => {
        if (res.code === 0) {
          this.shareData = res.data
          // 进度不同，文案不同
          const progress = parseInt((this.entryInfo.hasBargainPrice / this.entryInfo.topBargainPrice) * 100)
          wxShareInit({
            title: progress <= 80 ? '在吗？帮忙点一点，你我都有奖' : '就差你啦，我马上就能得返现！快来帮我点>>',
            link: res.data.url
          })
          this.$toast.clear()
        } else {
          this.$toast(res.msg)
        }
      }).catch(e => {
        this.$toast('获取二维码失败!')
        // this.$toast.clear()
      })
    }
  }
}
</script>

<style scoped lang="scss">
@mixin commonBackground {
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.home {
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  .header {
    width: 100%;
    height: 777px;
    @include commonBackground;
    overflow: hidden;
    .cut-title {
      margin: 92px auto 8px auto;
      width: 520px;
      height: 250px;
      @include commonBackground;
      background-image: url('~bargain/assets/home/cutTitle.png');
      .title {
        padding-top: 195px;
        font-weight: bold;
        color: rgba(144, 70, 31, 1);
      }
    }
    .header-box {
      position: relative;
      z-index: 10;
      margin: 0 auto;
      width: 710px;
      height: 340px;
      @include commonBackground;
      .apply-status {
        padding-top: 12px;
        font-size: 36px;
        font-weight: bold;
        color: rgba(255, 104, 23, 1);
        line-height: 48px;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .user-name {
          display: inline-block;
          width: 112px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          vertical-align: middle;
        }
      }
      .course-number {
        padding: 90px 60px 0 0;
        text-align: right;
        .number {
          display: inline;
          font-size: 80px;
          font-weight: 800;
          color: rgba(255, 104, 24, 1);
        }
        .course {
          display: inline;
          margin-left: 11px;
          font-size: 36px;
          font-weight: 800;
          color: rgba(52, 52, 52, 1);
        }
      }
    }

    .standard-header-box {
      background-image: url('~bargain/assets/home/standard/headerBox.png');
    }
    .demo-header-box {
      background-image: url('~bargain/assets/home/demo/headerBox.png');
    }
  }
  .lucky-draw {
    margin-top: -561px;
    position: relative;
    width: 100%;
    height: 632px;
    img {
      width: 100%;
    }
  }
  .standard-header {
    background-image: url('~bargain/assets/home/standard/headerBg.png');
  }
  .demo-header {
    background-image: url('~bargain/assets/home/demo/headerBg.png');
  }

  .content-bg {
    position: relative;
    margin-top: -20px;
    padding: 20px 30px 0 30px;
    box-sizing: border-box;
    overflow: hidden;

    &::before {
      content: '';
      display: inline-block;
      position: absolute;
      width: 24px;
      height: 24px;
      background: #feb400;
      border-radius: 50%;
      left: 50px;
      top: 40px;
    }
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 24px;
      height: 24px;
      background: #feb400;
      border-radius: 50%;
      right: 50px;
      top: 40px;
    }
    .content-box {
      margin-bottom: 40px;
      min-height: 395px;
      background: rgba(254, 208, 0, 1);
      box-shadow: 0px 0px 9px 0px rgba(191, 52, 0, 0.44);
      border-radius: 30px;
      border: 1px solid transparent;

      .content-title {
        padding-top: 30px;
        color: rgba(245, 62, 50, 1);
        font-weight: 600;

        .share {
          margin: 60px auto 50px;
          width: 380px;
          height: 80px;
          @include commonBackground;
          background-image: url('~bargain/assets/home/shareToCut.png');
        }
      }
      .time_box,
      .time_tip {
        display: inline-block;
      }
      .time_box {
        width: 53px;
        height: 50px;
        background: linear-gradient(0deg, #cf000e 0%, #f0004a 100%);
        border-radius: 10px;
        line-height: 50px;
        text-align: center;
        font-size: 36px;
        font-weight: 500;
        color: #ffe985;
      }
      .time_tip {
        margin: 0 15px;
      }

      .small-content-box {
        width: 650px;
        min-height: 296px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 1);
        border: 4px solid rgba(254, 186, 0, 1);
        border-radius: 30px;
        margin-bottom: 22px;
        margin-top: 20px;

        &.end-state {
          font-size: 60px;
          font-weight: 800;
          color: #f53e32;
          text-align: center;
          line-height: 54px;
          .get-scholarship-btn {
            width: 380px;
            height: 80px;
            line-height: 80px;
            text-align: center;
            background-image: url('~bargain/assets/home/scholarshipBtn.png');
            background-size: 100% auto;
            font-size: 34px;
            font-family: Source Han Sans SC;
            font-weight: bold;
            color: #ffffff;
            margin: 0 auto;
          }
          .money {
            margin: 76px auto 50px;
          }
        }

        .title {
          height: 100px;
          line-height: 100px;
          font-size: 32px;
          font-weight: bold;
          color: #343434;
        }
        .share {
          margin: 0 auto;
          width: 380px;
          height: 80px;
          @include commonBackground;
          background-image: url('~bargain/assets/home/shareToCut.png');
        }
      }
    }
    .activity-tip {
      padding: 40px 0 30px 0;
      font-size: 24px;
      font-weight: 400;
      color: #f3f3f3;
    }
  }
  .other-people {
    .activity-tip {
      padding-top: 0;
    }
  }
  .standard-content-bg {
    background: #ff6818;
  }
  .demo-content-bg {
    background: #ee4a78;
  }
  .wechat {
    position: absolute;
    z-index: 20;
    right: 24px;
    bottom: 10px;
    width: 150px;
    height: 150px;
    background-image: url('~bargain/assets/dialog/wx.png');
    @include commonBackground;
  }
}

.demo-apply-link {
  background-image: url('~bargain/assets/home/demo/demoApply.png');
  background-size: 100% auto;
  width: 650px;
  height: 630px;
  position: relative;

  .apply-btn {
    width: 380px;
    height: 72px;
    line-height: 72px;
    background: linear-gradient(0deg, #f53e32 0%, #ff7937 100%);
    border-radius: 36px;
    font-size: 36px;
    color: #ffffff;
    font-weight: bold;
    position: absolute;
    top: 444px;
    left: 50%;
    margin-left: -190px;
  }

  .apply-tip {
    position: absolute;
    top: 520px;
    left: 50%;
    width: 500px;
    height: 88px;
    margin-left: -250px;
    background-image: url('~bargain/assets/home/demo/apply-tip.png');
    @include commonBackground;
  }
}

.standard-apply-link {
  background-image: url('~bargain/assets/home/standard/applyBg.png');
  background-size: 100% auto;
  width: 650px;
  height: 546px;
  position: relative;

  .apply-btn {
    width: 380px;
    height: 72px;
    line-height: 72px;
    background: linear-gradient(0deg, #f53e32 0%, #ff7937 100%);
    border-radius: 36px;
    font-size: 36px;
    color: #ffffff;
    font-weight: bold;
    position: absolute;
    top: 444px;
    left: 50%;
    margin-left: -190px;
  }
}
</style>
