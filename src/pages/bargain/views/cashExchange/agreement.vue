<template>
  <van-overlay class-name="self-agree-dialog" :lock-scroll="false" :show="visible" @click="hide">
    <div class="flex-box animate__zoomIn animate__animated">
      <div class="close-btn">
        <div @click="hide" class="text"></div>
      </div>
      <div class="wrapper" @click.stop>
        <div class="title1">画啦啦砍价活动用户协议</div>
        <div class="rules-box" v-if="curItem.bargainType == 3">
          <div class="step">
            <div class="step-title">一、活动限制</div>
            <div class="line">1、支付成功后，用户72小时内可发起砍价活动，超出时间未发起，则视为自愿放弃参与本次活动且自愿放弃奖学金返还机会；</div>
            <div class="line">2、自发起活动首次砍价起，砍价限时为12小时，12小时后活动自动结束，实际返还奖学金金额不超过实际砍价金额；</div>
            <div class="line">3、每人每天仅限砍价一次，具体以微信账号、手机号、设备号等识别。</div>
          </div>
          <div class="step">
            <div class="step-title">二、提现说明</div>
            <div class="line">1、砍价限时结束后，用户需要申请提取奖学金，自成功申请起，48小时内返还至微信钱包；</div>
            <div>2、用户需关注公众号【画啦啦VIP课堂服务号】并【绑定账号】，方可进行提取。</div>
          </div>
          <div class="step">
            <div class="step-title">三、退费说明</div>
            <div class="line">仅限未上课用户进行退费（未上课指未进入过体验课课堂），退费规则如下：</div>
            <div class="line">1、奖学金未发放，则退费金额=支付金额；</div>
            <div class="line">2、奖学金已发放，则退费金额=支付金额-奖学金金额。</div>
          </div>
          <div class="step">
            <div class="step-title">四、特别说明</div>
            <div class="line1">画啦啦可根据活动的实际情况优化或调整规则，若发现参与该活动的用户存在不正当行为（包括但不限于众包砍价、代理砍价、作弊、扰乱系统、网络攻击等），画啦啦有权取消其活动所得并终止其参与该活动的资格。画啦啦少儿美术对本次活动拥有最终解释权。</div>
          </div>
        </div>
        <div class="rules-box" v-else>
          <div class="step">
            <div class="step-title">一、活动限制</div>
            <div class="line">1、支付成功后，用户72小时内可发起砍价活动，超出时间未发起，则视为自愿放弃参与本次活动且自愿放弃奖学金返还机会；</div>
            <div class="line">2、自发起活动首次砍价起，砍价限时为12小时，12小时后活动自动结束，实际返还奖学金金额不超过实际砍价金额；</div>
            <div class="line">3、每人每天仅限砍价一次，具体以微信账号、手机号、设备号等识别。</div>
          </div>
          <div class="step">
            <div class="step-title">二、提现说明</div>
            <div class="line">1、砍价限时结束后，用户需要申请提取奖学金，自成功申请起，48小时内返还至微信钱包；</div>
            <div class="line">2、用户需关注公众号【画啦啦VIP课堂服务号】并【绑定账号】，方可进行提取。</div>
          </div>
          <div class="step">
            <div class="step-title">三、退费说明</div>
            <div class="line">如取消订单，已砍金额将自动失效，退费算法如下：</div>
            <div class="line">1、未上正式课且未发放奖学金，则退费金额=实付课时包金额【奖学金不予发放】；</div>
            <div class="line">2、未上正式课但已发放奖学金，则退费金额=实付课时包金额-奖学金；</div>
            <div class="line">3、已上正式课但未发放奖学金，则退费金额=（实付课时包金额/总课时）*未消课时数【奖学金不予发放】；</div>
            <div class="line">4、已上正式课且已发放奖学金，则退费金额=「（实付课时包金额-已发放奖学金）/总课时」*未消课时数；</div>
            <div class="line">5、说明：设备及画具包费用不属于课时包费用；总课时不包含赠送课时。</div>
          </div>
          <div class="step">
            <div class="step-title">四、特别说明</div>
            <div class="line1">画啦啦可根据活动的实际情况优化或调整规则，若发现参与该活动的用户存在不正当行为（包括但不限于众包砍价、代理砍价、作弊、扰乱系统、网络攻击等），画啦啦有权取消其活动所得并终止其参与该活动的资格。画啦啦少儿美术对本次活动拥有最终解释权。</div>
          </div>
        </div>
        <div class="line-in"></div>
        <div class="footer">
          <div class="message" @click="changeCheck" v-if="isCheck">
            <span class="check"></span>
            <span>同意用户协议</span>
          </div>
          <div class="message" @click="changeCheck" v-else>
            <span class="uncheck"></span>
            <span>同意用户协议</span>
          </div>
          <div class="btn" :class="isCheck === 1 && (curItem.receiveState === 1 && curItem.type !== 2) ? '' : 'bg'" @click="apply">确认</div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { updateProtocol } from 'bargain/api'
export default {
  data() {
    return {
      visible: false,
      isCheck: 0,
      curItem: '',
      curIndex: 0,
      wxCode: require('@/assets/wx_code.jpg')
    }
  },
  methods: {
    show(curItem, index) {
      this.curIndex = index
      this.isCheck = curItem.protocol
      this.curItem = curItem
      console.log('curItem.receiveState === 1 && curItem.type !== 2', !(curItem.receiveState === 1 && curItem.type !== 2) && this.isCheck === 1)
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    changeCheck() {
      this.isCheck = this.isCheck ? 0 : 1
    },
    apply() {
      if (!(this.curItem.receiveState === 1 && this.curItem.type !== 2)) {
        return
      }
      if (!this.isCheck) {
        this.$toast('请认真阅读用户协议，并同意！')
        return
      }
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '更新协议中...'
      })
      updateProtocol({
        protocol: this.isCheck,
        orderId: this.curItem.orderId,
        type: this.curItem.bargainType
      }).then(res => {
        if (res.code === 0) {
          this.$toast.clear()
          this.visible = false
          this.$emit('updateList', this.curIndex, this.isCheck)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.self-agree-dialog {
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
    height:830px;
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
      font-size:36px;
      font-weight:bold;
      line-height: 60px;
    }
    .title2 {
      font-size:28px;
      font-weight:bold;
      color: #333;
    }
    .step {
      letter-spacing: 3px;
      .step-title {
        padding: 10px;
        font-size:28px;
        font-weight:bold;
        color: #252525;
      }
      .line {
        padding-bottom: 20px;
        font-size: 24px;
        font-weight: 500;
        line-height: 34px;
        color: #565555;
      }
      .line1 {
        letter-spacing: 3px;
        text-indent: 2em;
        line-height: 34px;
        color: #565555;
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
  .line-in {
    width:100%;
    height:2px;
    background:rgba(243,243,243,1);
  }
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
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
