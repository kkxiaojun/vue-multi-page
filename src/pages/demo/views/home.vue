<template>
  <div>
    <div>sdfdfdf</div>
    <div class="img-box">
      <ImgFrame
        :img-url="imgUrl1"
        frame-class="entry-painting-frame"
        insert-img-class="entry-painting-img-box__radius"
        :border-size="6"
      />
    </div>
    <a
      href="https://img2.61info.cn/cms_new/2020/6/18/1592459414388.jpg"
      download
    ></a>
  </div>
</template>

<script>
import { getScholarshipList } from '../api/index'
import ImgFrame from './imgFrame'
export default {
  components: {
    ImgFrame,
  },
  props: {
    cardDetail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loadingImg: require('assets/loading.gif'),
      imgList: [],
      imgUrl: 'https://img2.61info.cn/cms_new/2020/6/18/1592459414388.jpg',
      imgUrl1: 'https://img2.61info.cn/cms_new/2020/6/18/1592459097653.jpg',
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
  width: 296px;
  height: 372px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 2px solid #ddd;
  border-radius: 10px;
  .entry-painting-frame {
    width: 200px;
    box-sizing: border-box;
    padding: 6px;
    background-color: #ffffff;
    border-radius: 10px;
  }
  .entry-painting-img-box__radius {
    border-radius: 10px;
  }
}
</style>
