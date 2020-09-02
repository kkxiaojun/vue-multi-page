<template>
  <div class="list-wrapper">
    <div class="list-content">
      <div class="list-item" v-for="(item,index) in awardList" :key="index">
        <div class="user-info-wrapper">
          <div class="user-info">
            <span class="user-name">{{item.userName}}</span>
            <span class="user-time">{{item.redPackSourceDesc}}</span>
          </div>
          <div class="date-time">{{item.rewardTime}}</div>
        </div>
        <div class="amount">获得{{item.redPackPrice}}元</div>
      </div>
    </div>
    <div class="tips-wrapper">没有更多了</div>
    <inivteBtn @clickHandle="showShareDialog"></inivteBtn>
    <sharePoster :shareDialogVisible.sync="shareDialogVisible" posterSource="奖励明细页"></sharePoster>
  </div>
</template>

<script>
import inivteBtn from '../../components/iniviteBtn'
import sharePoster from '../../components/SharePoster'
import CommonLoginSDK from '@i61/common-login'
import { saveLog, getInviteDetail } from '../../api/index'

export default {
  components: {
    inivteBtn,
    sharePoster
  },
  data() {
    return {
      shareDialogVisible: false,
      awardList: []
    }
  },
  mounted() {
    CommonLoginSDK.hide()
    this.getAwardDetail()
    saveLog({
      eventName: '奖励明细页',
      label: '显示奖励明细页',
      labelId: 'yuan165_laxin_reward',
      reward_source: this.$route.query.prePage || ''
    })
  },
  methods: {
    getAwardDetail() {
      getInviteDetail().then(res => {
        if (res.code === 0) {
          const data = res.data
          this.awardList = data
        }
      })
    },
    showShareDialog() {
      this.shareDialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.list-wrapper {
  width: 100%;
  height: auto;
  margin-top: 30px;
  .list-content {
    width: 690px;
    height: auto;
    margin: 0 auto;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px 0px rgba(240, 130, 12, 0.1);
    border-radius: 30px;
    .list-item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 630px;
      height: 120px;
      margin: 0 auto;
      &:not(:last-child) {
        border-bottom: 2px solid #f3f3f3;
      }
      .amount {
        font-size: 28px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .user-info-wrapper {
        .user-info {
          .user-name {
            width: 190px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 28px;
            font-weight: bold;
            margin-right: 16px;
          }
          .user-time {
            color: #666666;
            font-size: 28px;
          }
        }
        .date-time {
          text-align: left;
          margin-top: 19px;
          font-size: 20px;
          color: #999999;
        }
      }
    }
  }
  .tips-wrapper {
    width: 690px;
    margin: 0 auto;
    color: #ffffff;
    font-size: 24px;
    margin-top: 19px;
  }
}
</style>
