<template>
  <van-popup v-model="showRule" round position="bottom" class="rule-popup-box">
    <div class="dialog-close-btn">
      <div @click="showRule = false" class="text"></div>
    </div>
    <div>
      <div class="rule-content">
        <template v-if="orderType === 'standrad'">
          <img :src="img3" alt />
          <img :src="img4" class="second_image" alt />
        </template>
        <template v-else>
          <img :src="img1" alt />
          <img :src="img2" class="second_image" alt />
        </template>
      </div>
      <div class="close-btn" @click="showRule = false">知道了</div>
    </div>
  </van-popup>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    orderType: {
      default: 'standrad'
    }
  },
  data() {
    return {
      showRule: false,
      img1: require('../assets/rules/img_1.png'),
      img2: require('../assets/rules/img_2.png'),
      img3: require('../assets/rules/img_3.png'),
      img4: require('../assets/rules/img_4.png')
    }
  },
  mounted() { },
  methods: {
    show() {
      this.showRule = true
    }
  }
}
</script>
<style lang="scss" scoped>
.rule-popup-box {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 45px;
  padding-bottom: 0;
  box-sizing: border-box;
  .rule-title {
    margin: 60px auto 38px auto;
    font-size: 40px;
    font-weight: bold;
    color: rgba(50, 50, 50, 1);
  }
  .rule-content {
    width: 100%;
    height: 900px;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: left;
    overflow-y: scroll;
    .section {
      margin-bottom: 6px;
    }
    img {
      width: 100%;
    }
    .second_image {
      margin-top: 56px;
    }
    .sub-box {
      font-size: 28px;
      color: #929292;
      .sub-title {
        margin-top: 20px;
        font-weight: bold;
        color: #333333;
      }
    }
  }
  .close-btn {
    width: 300px;
    height: 72px;
    line-height: 72px;
    margin: 30px auto;
    background: rgba(245, 62, 49, 1);
    border-radius: 36px;
    font-size: 32px;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }
  .dialog-close-btn {
    position: absolute;
    top: -100px;
    right: 0;
    padding-bottom: 30px;
    .text {
      width: 60px;
      height: 60px;
      background: url('~pages/bargain/assets/dialog/close.png') no-repeat;
      background-size: 100%;
    }
  }
}
</style>
