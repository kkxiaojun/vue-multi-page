<template>
  <div class="award-record-wrapper">
    <div class="rule" @click="navigate">
      <div>规则</div>
    </div>
    <div class="award-amount-wrapper">
      <award-amount :originPage="$route.name === 'progress' ? '邀请明细页': '奖励明细页'"></award-amount>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import AwardAmount from '../../components/AwardAmount'

export default {
  components: {
    AwardAmount
  },
  methods: {
    navigate() {
      this.$router.push('/rules?prePage=' + (this.$route.name === 'progress' ? '邀请明细页' : '奖励明细页'))
    }
  }
}
</script>

<style lang="scss" scoped>
.award-record-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fc8817;
  .rule {
    position: absolute;
    width: 50px;
    height: 80px;
    background: rgba(0, 0, 0, 0.24);
    border-radius: 20px 0px 0px 20px;
    top: 40px;
    right: 0;
    text-align: center;
    z-index: 10;
    div {
      font-size: 24px;
      font-family: HYZhengYuan;
      font-weight: normal;
      color: rgba(255, 255, 255, 1);
      width: 24px;
      margin: 0 auto;
      margin-top: 10px;
    }
  }
}
</style>
