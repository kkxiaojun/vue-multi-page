<template>
  <van-overlay class-name="self-dialog" :lock-scroll="false" :show="visible" @click="hide">
    <div class="flex-box animate__zoomIn animate__animated">
      <div class="close-btn">
        <div @click="hide" class="text"></div>
      </div>
      <div class="wrapper" @click.stop>
        <div class="title1">学员手机号验证</div>
        <div class="phone">{{ phone }}</div>
        <div class="phone-code" v-if="!isVirtual">
           <van-field
              class="phone-input"
              v-model="phoneCode"
              placeholder="请输入验证码"
            />
            <div class="phone-btn" @click="queryPhoneCode">{{ [0, 60].includes(totalTime) ? '获取验证码' : totalTime + 's' }}</div>
        </div>
        <div class="footer">
          <div class="btn" :class="phoneCode || isVirtual ? '' : 'bg'" @click="apply">提现</div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { receiveScholarship, getPhoneCode, getUserPhone } from 'bargain/api'

export default {
  data() {
    return {
      visible: false,
      isVirtual: false,
      curItem: '',
      openId: '',
      phone: '-',
      phoneCode: '', // 验证码-用户输入
      curPhoneCode: '', //
      totalTime: 60,
      timer: null,
      wxCode: require('@/assets/wx_code.jpg')
    }
  },
  methods: {
    show(curItem, openId) {
      this.isVirtual = false
      this.phoneCode = ''
      this.totalTime = 60
      this.timer = null
      this.curItem = curItem
      this.openId = openId
      this.visible = true
      this.queryUserPhone()
    },
    // 手机验证码
    queryPhoneCode() {
      getPhoneCode({
        openId: this.openId,
        phone: this.phone
      }).then(res => {
        if (res.code === 0) {
          this.curPhoneCode = res.data
          this.setTime()
        }
      })
    },
    // 获取手机号
    queryUserPhone() {
      getUserPhone({
        openId: this.openId,
        orderId: this.curItem.orderId,
        type: this.curItem.bargainType
      }).then(res => {
        if (res.code === 0) {
          this.phone = res.data
          // 虚拟号，国外
          if (/^123/.test(this.phone)) {
            this.isVirtual = true
          }
        }
      })
    },
    setTime() {
      if (this.totalTime <= 0) {
        this.timer = null
        clearTimeout(this.timer)
        this.totalTime = 60
      } else {
        this.totalTime--
        setTimeout(() => {
          this.setTime()
        }, 1000)
      }
    },
    hide() {
      this.visible = false
    },
    apply() {
      if (!this.isVirtual) {
        if (this.totalTime === 60) {
          this.$toast('请获取验证码！')
          return
        }
        if (!this.phoneCode) {
          this.$toast('请输入验证码！')
          return
        }
        // if (this.phoneCode !== this.curPhoneCode) {
        //   this.$toast('验证码错误！')
        //   return
        // }
      }
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '提现中...'
      })
      receiveScholarship({
        openId: this.openId,
        orderId: this.curItem.orderId,
        type: this.curItem.bargainType,
        phone: this.phone,
        code: 123
      }).then(res => {
        if (res.code === 0) {
          this.$toast.clear()
          this.visible = false
          this.$toast('提现成功')
          this.$emit('updateList')
        }
      })
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
  background-color: rgba(0,0,0,.9);
  .flex-box {
    display: flex;
    flex-direction: column;
    // align-content: center;
    // text-align: center;
    margin-top: -120px;
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
    // align-items: center;
    width:600px;
    height:470px;
    padding: 40px 0;
    background:rgba(255,255,255,1);
    border-radius:30px;
    box-sizing: border-box;
    overflow: hidden;
    .rules-box {
      height: 620px;
      margin: 20px 0;
      overflow: auto;
      padding: 0 40px;
    }
    .title1 {
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      color: #333333;
    }
    .phone {
      width: 500px;
      height: 80px;
      line-height: 80px;
      margin: 30px auto;
      text-align: center;
      background: #F5F5F5;
      border-radius: 10px;
      font-size: 36px;
      font-weight: 400;
      color: #333333;
    }
    .title2 {
      font-size:28px;
      font-weight:bold;
      color: #333;
    }
    .phone-code {
      width: 500px;
      height: 490px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      .phone-input {
        width: 316px;
        height: 80px;
        background: #F5F5F5;
        border-radius: 10px;
        font-size: 24px;
        font-weight: 400;
        color: #999999;
      }
      .phone-btn {
        width: 164px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        background: #5AD679;
        border-radius: 10px;
        font-size: 24px;
        font-weight: 400;
        color: #FFFFFF;
        &.send {
          background: #ADF0BD !important;
        }
      }
    }
    .btn {
      width:280px;
      height:72px;
      line-height: 72px;
      text-align: center;
      background:rgba(255,104,23,1);
      border-radius:36px;
      font-size:32px;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
  }
  .bg {
    background:rgba(255,191,161,1) !important;
  }
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    .message {
      display: flex;
      align-items: center;
      padding: 20px 0 43px 0;
      font-size:28px;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
  }
}
</style>
