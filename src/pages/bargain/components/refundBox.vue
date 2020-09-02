<template>
  <div class="refund-box">
    <div v-if="courseType === 0" class="box">
      <img :src="standardBox" alt="">
    </div>
    <div v-else class="box">
      <img :src="demoBox" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'refundBox',
  props: {
    courseType: {
      default: 0
    }
  },
  data() {
    return {
      standardBox: require('bargain/assets/home/standard/refundBox.png'),
      demoBox: require('bargain/assets/home/demo/refundBox.png')
    }
  }

}
</script>

<style lang="scss" scoped>
.refund-box {
  padding-top: 15px;
  .box {
    margin: 0 auto;
    width: 690px;
    height: 580px;
    img {
      width: 100%;
    }
  }
}
</style>>
