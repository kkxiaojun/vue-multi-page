<template>
  <div class="exchange">
    <div class="record" v-for="(item, index) in recordList" :key="index">
      <div class="record-list">
        <div class="scholarship">￥{{ item.scholarship | filterMoney }}</div>
        <img class="banner" v-lazy="bannerImg" alt="">
        <div class="content">
          <div class="content-left" @click="getAgree(item, index)">
            <div class="content-left-check-up">
              <span :class="item.protocol ? 'check' : 'uncheck'"></span>
              <span>同意用户协议</span>
            </div>
            <div class="content-left-tips">同意用户协议，并通过验证码校验后提现。</div>
          </div>
          <div class="content-right">
            <div @click="getCash(item)" class="btn" :class="(item.receiveState !== 1 && item.type === 2) || !item.protocol ? 'btn-color3': statusMap[item.receiveState].curClass">
              {{ statusMap[item.receiveState].btnText }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="(item.receiveState !== 1 && item.type === 2)" class="tips color1">您已申请退费，退出活动</div>
      <div class="tips" :class="statusMap[item.receiveState].tipsColor" v-else>{{ statusMap[item.receiveState].tipsText }}</div>
    </div>
    <div class="no-list" v-if="!recordList.length">
      <img :src="shuaiImg" alt="">
      <div>暂无提现记录</div>
    </div>
    <!-- 领取 -->
    <exchange-dialog ref="ExchangeDialog" @updateList="getRecord" />
    <!-- 协议 -->
    <agreement ref="Agreement" @updateList="updateList" />
  </div>
</template>

<script>
import CommonLoginSDK from '@i61/common-login'
import { getScholarshipList } from 'bargain/api'
import ExchangeDialog from './exchangeDialog'
import Agreement from './agreement'
export default {
  components: {
    ExchangeDialog,
    Agreement
  },
  data() {
    return {
      checkImg: require('pages/bargain/assets/cashExchange/check.png'),
      bannerImg: require('pages/bargain/assets/cashExchange/banner.png'),
      shuaiImg: require('pages/bargain/assets/cashExchange/shuai.png'),
      wxUserInfo: {},
      recordList: [],
      statusMap: {
        // 可提现
        1: {
          curClass: 'btn-color1',
          btnText: '提现',
          tipsText: '宝贝的奖学金已到账，快来兑换吧！',
          tipsColor: 'color1'
        },
        // 已提现
        3: {
          curClass: 'btn-color2',
          btnText: '已提现',
          tipsText: '',
          tipsColor: ''
        },
        // 审核中
        0: {
          curClass: 'btn-color4',
          btnText: '审核中',
          tipsText: '宝贝的奖学金已经在路上，请48小时内返回公众号领取',
          tipsColor: 'color2'
        }
      }
    }
  },
  created() {
    const gotoUrl = window.location.origin + window.location.pathname + '#/exchange'
    CommonLoginSDK.getWxUserInfo(process.env.ENV, gotoUrl).then(res => {
      this.wxUserInfo = res
      // this.wxUserInfo.openId = 'omsXu0tJpAooUWPwZ-ZiXdddIVvY'
      this.getRecord()
    })
  },
  methods: {
    // 提现
    getCash(item) {
      // 可提现
      if (item.receiveState === 1 && item.type !== 2) {
        if (item.protocol === 0) {
          this.$toast('请勾选协议')
          return
        }
        this.$refs.ExchangeDialog.show(item, this.wxUserInfo.openId)
      } else {
        // Toast('')
      }
    },
    // 协议
    getAgree(item, index) {
      this.$refs.Agreement.show(item, index)
    },
    updateList(index, isCheck) {
      this.recordList[index].protocol = isCheck ? 1 : 0
      this.$forceUpdate()
      this.getRecord()
    },
    getRecord() {
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      })
      getScholarshipList({ openId: this.wxUserInfo.openId }).then(res => {
        if (res.code === 0) {
          this.recordList = res.data
          this.$toast.clear()
        } else {
          setTimeout(() => {
            this.$toast.clear()
          }, 3000)
        }
      }).catch(e => {
        setTimeout(() => {
          this.$toast.clear()
        }, 3000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.exchange {
  height: 100vh;
  padding: 30px 0;
  background: rgb(243, 243, 243);
}
.no-list {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: -30px;
  text-align: center;
  font-size: 30px;
  color: #6e7171;
  img {
    width: 250px;
    height: 300px;
    padding-bottom: 20px;
  }
}
.record {
  width:690px;
  height:446px;
  margin: 0 auto;
}
.record-list {
  position: relative;
  background:rgba(255,255,255,1);
  border-radius:30px;
  .scholarship {
    position: absolute;
    top: 101px;
    right: 45px;
    font-size: 59px;
    font-weight: 800;
    color: #FBF4CD;
  }
  .banner {
    width: 690px;
    height: 266px;
  }
  .check {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 3px 10px 0 0;
    background:url('~pages/bargain/assets/cashExchange/check.png') no-repeat;
    background-size: 100% 100%;
  }
  .uncheck {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: 3px 10px 0 0;
    background:url('~pages/bargain/assets/cashExchange/uncheck.png') no-repeat;
    background-size: 100% 100%;
  }
  .content {
    height: 110px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    &-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size:28px;
      font-weight:400;
      color:rgba(51,51,51,1);
      &-check-up {
        display: flex;
        align-items: center;
      }
      &-tips {
        padding-top: 3px;
        font-size: 20px;
        font-weight: 400;
        color: #CCCCCC;
      }
    }
    &-right {
      display: flex;
      align-items: center;
      .btn {
        width:200px;
        height:80px;
        line-height: 80px;
        text-align: center;
        border-radius:40px;
        font-size:32px;
        font-weight:500;
        color: #FFFFFF;
      }
    }
    .btn-color1 {
      background:rgba(255,104,23,1);
    }
    .btn-color2 {
      background:rgba(255,191,161,1);
    }
    .btn-color3 {
      background:rgba(204,204,204,1);
    }
    .btn-color4 {
      background:rgba(143,206,255,1);
    }
  }
}
.tips {
  height:60px;
  line-height:60px;
  text-align: right;
  font-size:24px;
  font-weight:400;
  &.color1 {
    color:rgba(255,104,23,1);
  }
  &.color2 {
    color: #999999;
  }
}
</style>
