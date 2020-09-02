<template>
  <div>
    <div :class="['invite_btn', type === 2 ? 'invite_btn02' : '']" @click="clickHandle"></div>
  </div>
</template>
<script>
export default {
  name: '',
  props: {
    type: {
      default: 1
    }
  },
  components: {},
  data() {
    return {}
  },
  mounted() { },
  methods: {
    clickHandle() {
      this.$emit('clickHandle')
    }
  }
}
</script>
<style lang="scss" scoped>
.invite_btn {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 140px;
  max-width: 640PX;
  background-image: url("~assets/0804ReadPaper/invite_btn01.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  transform: translate(-50%, 0);
  z-index: 99;

  &.invite_btn02 {
  background-image: url("~assets/0804ReadPaper/invite_btn02.png");

  }
}
</style>
