<template>
  <div class="progress">
    <div class="progress-box">
      <div class="color-progress" :style="onProgress"></div>
    </div>
    <div class="progress-percent">{{parseInt(progressNumber)}}%</div>
  </div>
</template>

<script>
export default {
  name: 'progressBar',
  props: {
    progressNumber: {
      type: Number,
      require: true,
      default: 0
    }
  },
  computed: {
    onProgress() {
      if (this.progressNumber >= 100) {
        return { width: '100%' }
      } else {
        return { width: `${this.progressNumber}%` }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.progress {
  height: 80px;
  .progress-box {
    margin: 0 auto;
    width:520px;
    height:30px;
    background:rgba(255,247,204,1);
    border:4px solid rgba(255,236,144,1);
    border-radius:15px;
    .color-progress {
      height: 100%;
      width: 100%;
      max-width: 100%;
      border-radius:30px;
      background: #FF6817 repeat-x;
    }
  }
  .progress-percent {
    font-size:20px;
    color: #FF6818;
    text-align: center;
  }
}

</style>>
