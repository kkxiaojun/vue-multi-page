<template>
  <div>
    <img :src="loadingImg" alt="">
    <div class="img-box" v-for="(item, index) in imgList" :key="index">
      <img :src="item" loading="lazy" alt="demo">
      <!-- <img loading="lazy" width="400" height="400" :src="item" alt="..." /> -->
      <!-- <iframe :src="item" loading="lazy"></iframe> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingImg: require('assets/loading.gif'),
      imgList: []
    }
  },
  mounted() {
    this.initLoad()
  },
  methods: {
    initLoad() {
      for (let index = 1; index <= 13; index++) {
        if (index >= 6) {
          this.imgList.push(require(`assets/demo${index}.jpg`))
        } else {
          this.imgList.push(require(`assets/demo${index}.png`))
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.img-box {
  img {
    width: 600px;
    height: 600px;
  }
}
</style>
