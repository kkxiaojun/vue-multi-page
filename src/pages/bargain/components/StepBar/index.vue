<template>
  <div class="step-bar-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      steps: []
    }
  },
  watch: {
    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index
      })
    }
  }
}
</script>

<style scoped lang="scss">
.step-bar-group {
  display: flex;
  flex-direction: row;
  padding-bottom: 40px;
}
</style>
