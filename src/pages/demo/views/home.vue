<template>
  <div>
    <div>sdfdfdf</div>
  </div>
</template>

<script>
import { getScholarshipList } from '../api/index'
export default {
  data() {
    return {
      loadingImg: require('assets/loading.gif'),
      imgList: [],
    }
  },
  mounted() {
    true ? this.initLoad() : ''
  },
  methods: {
    initMethods() {
      const name = 'dddd'
      Object.defineProterty(Object, 'assign1', {})
      console.log('ss', name)
    },
    initLoad() {
      try {
        // 异步错误-window.onerror
        setTimeout(() => {
          console.log(undefined.map())
        }, 1000)
      } catch (e) {
        console.log('捕获到setTimeout异常：', e)
      }

      for (let index = 1; index <= 14; index++) {
        if (index >= 6) {
          this.imgList.push(require(`assets/demo${index}.jpg`))
        } else {
          this.imgList.push(require(`assets/demo${index}.png`))
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.img-box {
  border: 1px solid #d68585;
  img {
    display: flex;
    width: 600px;
    height: 600px;
  }
  .lazy-image {
    background: url('~assets/loading.gif') no-repeat center;
  }
}
</style>
