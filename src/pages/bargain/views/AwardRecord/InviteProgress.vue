<template>
  <div class="invite-progress-wrapper">
    <div class="invite-progress-content">
      <div class="invite-progress-item" v-for="(item,index) in progressList" :key="index">
        <div class="user-info-wrapper">
          <img :src="item.headUrl || Avatar" class="avatar" />
          <span class="name">{{item.userName}}：</span>
          <span class="phone">{{item.account}}</span>
        </div>
        <div class="process">
          <StepGroup :active="item.active">
            <Step>
              <div class="register-wrapper">
                <div class="register">已注册</div>
                <div class="date">{{item.registerDate}}</div>
              </div>
            </Step>
            <Step>
              <div class="listen-wrapper">
                <div class="listen" v-if="item.isTryListen">
                  <span>已试听</span>
                  <span>{{item.tryListenDate}}</span>
                </div>
                <div class="unlisten" v-else>参与试听</div>
              </div>
            </Step>
            <Step>试听>40min</Step>
          </StepGroup>
        </div>
      </div>
    </div>
    <div class="tips-wrapper">没有更多了</div>
    <inivteBtn @clickHandle="shareDialogVisible = true"></inivteBtn>
    <sharePoster :shareDialogVisible.sync="shareDialogVisible" posterSource="邀请明细页"></sharePoster>
  </div>
</template>

<script>
import Avatar from '../../assets/images/avatar.png'
import StepGroup from '../../components/StepBar/index.vue'
import Step from '../../components/StepBar/step.vue'
import inivteBtn from '../../components/iniviteBtn'
import sharePoster from '../../components/SharePoster'
import CommonLoginSDK from '@i61/common-login'
import { getInviteStudentInfo, saveLog } from '../../api/index.js'

export default {
  components: {
    inivteBtn,
    sharePoster,
    StepGroup,
    Step
  },
  data() {
    return {
      Avatar,
      shareDialogVisible: false,
      progressList: []
    }
  },
  methods: {
    getStudentInfo() {
      getInviteStudentInfo().then(res => {
        const data = res.data
        this.progressList = data.map(item => {
          item.active = this.computeStep(item)
          return item
        })
      })
    },
    computeStep(data) {
      if (data.isCompleteListen) return 2
      if (data.isTryListen) return 1
    },
    showShareDialog() {
      this.shareDialogVisible = true
    }
  },
  mounted() {
    CommonLoginSDK.hide()
    this.getStudentInfo()
    saveLog({
      eventName: '邀请明细页',
      label: '显示邀请明细页',
      labelId: 'yuan165_laxin_invite',
      invite_source: this.$route.query.prePage || ''
    })
  }
}
</script>

<style scoped lang="scss">
.invite-progress-wrapper {
  width: 100%;
  height: auto;
  margin-top: 30px;
  .invite-progress-content {
    width: 690px;
    height: auto;
    margin: 0 auto;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px 0px rgba(240, 130, 12, 0.1);
    border-radius: 30px;
    .invite-progress-item {
      width: 630px;
      height: 250px;
      margin: 0 auto;
      padding: 25px 0;
      &:not(:last-child) {
        border-bottom: 2px solid #f3f3f3;
      }
      .user-info-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 90px;
        .avatar {
          display: inline-block;
          width: 44px;
          height: 44px;
        }
        .name,
        .phone {
          font-size: 28px;
          color: #333333;
          font-weight: bold;
          margin-left: 14px;
        }
      }
    }
  }
  .tips-wrapper {
    width: 690px;
    height: 140px;
    padding: 30px 0;
    margin: 0 auto;
    color: #ffffff;
    font-size: 24px;
  }
}
.invite_btn {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  height: 140px;
  max-width: 640px;
  background-image: url("~assets/0804ReadPaper/invite_btn02.png");
  background-size: 100% auto;
  background-repeat: no-repeat;
  transform: translate(-50%, 0);
  z-index: 10;
}
</style>
