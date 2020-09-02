<template>
  <div class="price-record">
    <div class="record-tab">
      <div class="tab" @click="changeTab('record')">
        <div :class="[tabName === 'record' ? 'active' : 'noActive']">砍刀记录</div>
        <div class="divide" v-if="tabName === 'record'"></div>
      </div>
      <div class="tab" @click="changeTab('strategy')">
        <div :class="[tabName === 'strategy' ? 'active' : 'noActive']">砍刀攻略</div>
        <div class="divide" v-if="tabName === 'strategy'"></div>
      </div>
    </div>
    <div class="tab-content">
      <div v-if="tabName === 'record'">
        <!-- 无砍刀记录 -->
        <div v-if="!entryInfo.hasBargainCount">
          <div class="cut-icon"></div>
          <div>
            <span>砍</span>
            <span class="common-text-color">{{entryInfo.topBargainCount}}</span>刀，100%
            <span class="common-text-color">返现{{entryInfo.topBargainPrice | filterMoney}}元</span>
          </div>
        </div>
        <!-- 有砍刀记录 -->
        <div v-if="entryInfo.hasBargainCount">
          <record-list :entryInfo="entryInfo"></record-list>
        </div>
        <div v-if="entryInfo.state === 0" class="call-friend-to-cut" @click="cutHandle"></div>
      </div>
      <div v-if="tabName === 'strategy'">
        <cut-strategy :entryInfo="entryInfo" @shareBtnHandle="cutHandle"></cut-strategy>
      </div>
    </div>
  </div>
</template>

<script>
import recordList from '../components/recordList'
import cutStrategy from '../components/cutStrategy'
export default {
  name: 'cutPriceRecord',
  components: {
    recordList,
    cutStrategy
  },
  props: {
    entryInfo: {
      default: {}
    }
  },
  data() {
    return {
      tabName: 'record' // or 'strategy'
    }
  },
  methods: {
    changeTab(tabName) {
      this.tabName = tabName
      if (this.tabName === 'record') {
        this.postPoint({
          eventName: 'machete record',
          properties: { eventId: '砍价活动页', label: '点击“砍刀记录”' }
        })
      } else {
        this.postPoint({
          eventName: 'machete_strategy',
          properties: { eventId: '砍价活动页', label: '点击“砍刀攻略”' }
        })
      }
    },
    cutHandle() {
      this.postPoint({
        eventName: 'shout_friends_chop',
        properties: { eventId: '砍价活动页', label: '点击“喊好友砍一刀”' }
      })
      this.$emit('shareBtnHandle')
    }
  }
}
</script>

<style scoped lang="scss">
@mixin commonBackground {
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.price-record {
  box-sizing: border-box;
  border-radius: 30px;
  text-align: center;
  background: rgba(255, 255, 255, 1);
  .record-tab {
    display: flex;
    align-items: center;
    height: 118px;
    font-size: 36px;
    border-radius: 30px 30px 0 0;
    background: rgba(255, 232, 220, 1);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #EE4A78;
      bottom: -10px;
      left: -10px;
    }
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #EE4A78;
      bottom: -10px;
      right: -10px;
    }
    .tab {
      width: 50%;
      .active {
        color: rgba(255, 104, 24, 1);
      }
      .noActive {
        color: rgba(255, 191, 162, 1);
      }
      .divide {
        margin: 0 auto;
        width: 30px;
        height: 6px;
        background: #ff6818;
      }
    }
  }
  .tab-content {
    box-sizing: inherit;
    overflow: hidden;
    .cut-icon {
      margin: 40px auto 20px auto;
      width: 226px;
      height: 164px;
      @include commonBackground;
      background-image: url('~bargain/assets/home/cutIcon.png');
    }
    .common-text-color {
      font-size: 32px;
    }
    .call-friend-to-cut {
      margin: 30px auto 36px auto;
      width: 380px;
      height: 80px;
      @include commonBackground;
      background-image: url('~bargain/assets/home/callFriendToCut.png');
    }
  }
}
</style>
