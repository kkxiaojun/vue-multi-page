<template>
  <div>
    <img :src="loadingImg" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingImg: require('assets/loading.gif')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
