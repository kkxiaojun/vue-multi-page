<template>
  <div class="step-bar-wrapper">
    <!-- <img :src="active ? activeArrow: inactiveArrow" class="arrow" v-if="!isLast" /> -->
    <img :src="active ? activeArrow: inactiveArrow" class="arrow" v-if="!isFirst" />
    <div class="icon-wrapper">
      <img :src="active? finish: unfinish" class="icon" />
      <div class="slot-text">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import finish from '../../assets/images/finished.png'
import unfinish from '../../assets/images/notfinished.png'
import activeArrow from '../../assets/images/arrow-active.png'
import inactiveArrow from '../../assets/images/arrow-inactive.png'
export default {
  name: 'step-bar',
  data() {
    return {
      finish,
      unfinish,
      activeArrow,
      inactiveArrow,
      index: 0
    }
  },
  computed: {
    // isLast() {
    //   const parent = this.$parent
    //   return parent.steps[parent.steps.length - 1] === this
    // },
    isFirst() {
      const parent = this.$parent
      return parent.steps[0] === this
    },
    active() {
      return this.$parent.active >= this.index
    }
  },
  beforeCreate() {
    this.$parent.steps.push(this)
  }
}
</script>

<style scoped lang="scss">
.step-bar-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 30px 0;
  .icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon {
      display: inline-block;
      width: 44px;
      height: 44px;
    }
    .slot-text {
      width: 100px;
      margin-top: 17px;
      color: #999999;
      font-size: 24px;
    }
  }
  .arrow {
    display: inline-block;
    width: 167px;
    height: 18px;
    margin: 14px 0;
  }
}
</style>
