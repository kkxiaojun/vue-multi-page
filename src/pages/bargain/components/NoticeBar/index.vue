<template>
  <div class="swiper-bar">
    <div class="notice-bar-icon"></div>
    <van-swipe
      :autoplay="3000"
      :show-indicators="false"
      vertical
      :touchable="false"
      :height="60"
      class="swipe-box"
    >
      <van-swipe-item v-for="(item,index) in option.swiper[courseType]" :key="index">{{item}}</van-swipe-item>
    </van-swipe>
    <div class="rule" @click="handleRules">活动规则</div>
    <rules ref="rules"></rules>
  </div>
</template>

<script>
import icon from '../../assets/images/volum.png'
import optionMixins from 'bargain/optionMixins'
import rules from '../rules'
export default {
  name: 'NoticeBar',
  mixins: [optionMixins],
  components: {
    rules
  },
  props: {
    courseType: {
      type: String,
      require: true,
      default: 'standard'
    }
  },
  data() {
    return {
      icon
    }
  },
  methods: {
    handleRules() {
      this.$refs.rules.show()
      this.postPoint({
        eventName: 'activity_tule',
        properties: { eventId: '砍价活动页', label: '点击“活动规则”' }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-bar {
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 104, 24, 1);
  font-size: 28px;
  font-weight: 500;
  .notice-bar-icon {
    background-image: url('~bargain/assets/home/noticeBarIcon.png');
    width: 42px;
    height: 42px;
    background-size: 100% auto;
  }
  .swipe-box {
    width: 560px;
    height: 30PX;
    font-size: 28px;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    line-height: 30PX;
  }
  .van-swipe-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rule {
    width: 116px;
    display: flex;
    flex-basis: 116px;
    flex-shrink: 0;
    position: relative;
    color: rgba(255, 255, 255, 1);
    &::after {
      position: absolute; // 用了绝对定位
      content: ' ';
      pointer-events: none;
      right: 0;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid #ebedf0;
      background: rgba(224, 224, 224, 1);
    }
  }
}
</style>
