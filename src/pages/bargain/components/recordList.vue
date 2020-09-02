<template>
  <div class="record-list">
    <div v-if="recordList.length === 0">暂无砍刀记录</div>
    <div v-for="(item, index) in recordList" :key="index" class="record-item cell-bottom-line">
      <img :src="item.headUrl" alt />
      <div class="cut-detail">
        <div class="name">{{item.nickName}}</div>
        <div class="date">{{item.bargainTime}}</div>
      </div>
      <div class="cut-momey">
        <span>砍掉</span>
        <span class="common-text-color">{{item.bargainPrice | filterMoney}}</span>元
      </div>
    </div>
  </div>
</template>

<script>
import { getBargainDetail } from '../api/index'
export default {
  name: 'recordList',
  props: {
    entryInfo: {
      default: {}
    }
  },
  watch: {
    entryInfo: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log('handler -> val', val)
        getBargainDetail({
          bargainId: val.id
        }).then(res => {
          this.recordList = res.data
        })
      }
    }
  },
  data() {
    return {
      recordList: []
    }
  }
}
</script>

<style scope lang="scss">
.record-list {
  padding: 20px 40px;
  font-size: 28px;
  color: #373737;
  font-weight: 400;
  .record-item {
    height: 118px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 80px;
      height: 80px;
      margin-right: 40px;
      border-radius: 40px;
    }
    .cut-detail {
      text-align: left;
      width: 190px;
      .name {
        color: #383838;
        margin-bottom: 4px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .date {
        font-size: 24px;
        color: #cccccc;
      }
    }
    .cut-momey {
      flex-grow: 1;
      text-align: right;
      font-size: 32px;
    }
  }
}
</style>
