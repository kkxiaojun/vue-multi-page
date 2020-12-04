<template>
  <div class="home">home</div>
</template>

<script>
import CommonLoginSDK from '@i61/common-login'
import AppH5JSSDK from '@i61/app-h5-jssdk'
import indexExtends from '@/utils/loginExtends'

export default {
  name: 'Home',
  extends: indexExtends,
  data() {
    return {}
  },
  mounted() {
    this.initLogin(res => {
      console.log('【登录成功】')
    })
  },
  methods: {},
}
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
