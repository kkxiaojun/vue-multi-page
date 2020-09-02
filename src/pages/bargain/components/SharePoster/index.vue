<template>
  <van-overlay :show="visible" :z-index="1000" :lock-scroll="true" @click="handelCancel">
    <div class="wrapper">
      <div class="main-content no-wechat">
        <div class="share">
          <img class="share-img" :src="shareImg" alt="">
          <img class="right" :src="rightImg" alt="">
        </div>
        <img class="pen-img" :src="penImg" alt="">
        <div class="poster-box">
          <div class="main normal" ref="imgBox" v-if="!successImgUrl">
            <img class="avator" :src="infoObj.headUrl" alt="">
            <img class="tpl-img" :src="demoConfig[infoObj.type].posterImg" alt="">
            <img class="code-img" :src="demoConfig[infoObj.type].codeImg" alt="">
          </div>
          <div class="success" @touchstart="pressStart" @touchend.stop.prevent="pressEnd" v-else>
            <img class="tpl-img" :src="successImgUrl" alt="">
          </div>
          <div class="press-img">
            <img class="img" v-lazy="pressImage" alt="">
          </div>
        </div>
        <div class="share-text">转发或分享给朋友，邀请朋友帮忙砍一刀</div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
import { getSharePoster } from 'bargain/api'
import html2canvas from 'html2canvas'

export default {
  data() {
    return {
      // browser: browser,
      visible: false,
      // 合成海报结果
      successImgUrl: '',
      shareUrl: '',
      pressImage: require('pages/bargain/assets/poster/toast.png'),
      codeImg: require('pages/bargain/assets/poster/code.jpg'),
      shareImg: require('pages/bargain/assets/poster/invite.png'),
      rightImg: require('pages/bargain/assets/poster/right.png'),
      penImg: require('pages/bargain/assets/poster/share.png'),
      // 当前海报
      posterImg: require('pages/bargain/assets/poster/bg.png'),
      infoObj: {
        type: 0,
        headUrl: ''
      },
      demoConfig: {
        1: {
          posterImg: require('pages/bargain/assets/poster/demo.png'),
          codeImg: ''
        },
        0: {
          posterImg: require('pages/bargain/assets/poster/standard.png'),
          codeImg: ''
        }
      }
    }
  },
  methods: {
    async show(data, shareData) {
      this.infoObj = data
      // this.infoObj.headUrl = ''
      let base64Data = shareData.qrCode
      if (!base64Data.includes('data:image')) {
        base64Data = 'data:image/png;base64,' + base64Data
      }
      this.demoConfig[this.infoObj.type].codeImg = base64Data
      this.visible = true
      // 合成海报
      if (!this.successImgUrl) {
        this.makePoster()
      }
      // 埋点
      this.postPoint({
        eventName: 'bargain_poster',
        properties: { eventId: '用户分享海报界面', label: '显示海报' }
      })
    },
    pressStart(e) {
      this.timer = setTimeout(() => {
        this.postPoint({
          eventName: 'bargain_poster_press',
          properties: { eventId: '用户分享海报界面', label: '长按保存海报' }
        })
      }, this.touchTime)
    },
    pressEnd(e) {
      clearTimeout(this.timer)
    },
    // 获取海报二维码
    getShare() {
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中~'
      })
      return new Promise((resolve, reject) => {
        const params = {
          id: this.infoObj.id,
          ccId: this.infoObj.ccTeacherId
        }
        getSharePoster(params).then(res => {
          if (res.code === 0) {
            let base64Data = res.data.qrCode
            this.shareUrl = res.data.url
            if (!base64Data.includes('data:image')) {
              base64Data = 'data:image/png;base64,' + base64Data
            }
            this.demoConfig[this.infoObj.type].codeImg = base64Data
          } else {
            this.$toast(res.msg)
            // this.$toast.clear()
          }
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    // 合成海报
    async makePoster() {
      window.scrollTo(0, 0)
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中~'
      })
      const eleImgBox = this.$refs.imgBox
      console.log('doc', eleImgBox)
      await this.loadImage(this.demoConfig[this.infoObj.type].posterImg)
      await this.loadImage(this.demoConfig[this.infoObj.type].codeImg)
      html2canvas(eleImgBox, {
        useCORS: true,
        logging: true,
        backgroundColor: null
      }).then((canvas) => {
        this.successImgUrl = canvas.toDataURL('image/png')
        this.$toast.clear()
      }).catch(e => {
        this.$toast.clear()
      })
    },
    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.onload = () => {
          resolve(img)
        }
        img.error = (e) => {
          reject(e)
        }
      })
    },
    handelCancel() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100%;
  .main-content {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .share {
      position: relative;
      display: flex;
      align-items: center;
      margin-top: -100px;
    }
    .avator {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 360px;
      width:90px;
      height:90px;
      background:rgba(255,255,255,1);
      border:4px solid rgba(255,255,255,1);
      border-radius:50%;
      box-sizing: border-box;
    }
    .share-img {
      width: 341.1px;
      height: 84.1px;
    }
    .pen-img {
      width: 190px;
      height: 130px;
      padding-bottom: 15px;
    }
    .right {
      position: absolute;
      right: -144px;
      top: -22px;
      width: 144px;
      height: 64px;
    }
    .share-wechat {
      .share-img {
        position: absolute;
        top: 60px;
        right: 50px;
        width: 164px;
        height: 64px;
      }
    }
  }
  .poster-box {
    position: relative;
    // margin-top: 45px;
    .main {
      height: 100%;
      width:426px;
      height:758px;
      background:rgba(255,255,255,1);
      border:8px solid rgba(255,255,255,1);
      border-radius:20px;
      box-sizing: border-box;
    }
    .success {
      width:426px;
      height:758px;
      border-radius:20px;
    }
    .tpl-img {
      width: 100%;
      // height: 100%;
      user-select:none;
      border-radius:20px;
    }
    .code-img {
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 85px;
      display: flex;
      justify-content: center;
      align-items: center;
      width:220px;
      height:220px;
      background:rgba(255,255,255,1);
      border:5px solid rgba(255,228,80,1);
      box-shadow:0px 7px 22px 8px rgba(214,193,76,0.3);
      border-radius:30px;
    }
    .press-img {
        position: absolute;
        width: 300px;
        height: 223.7px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        user-select:none;
        color: #fff;
        .img {
          width: 100%;
          height: 100%;
        }
      }
  }
  .share-text {
    font-size: 32px;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 48px;
    padding-top: 15px;
  }
  .info {
    margin-top: 35px;
    font-size:36px;
    font-weight:normal;
    color:#FFFFFF;
    &-text {
      color: #FFE758;
    }
  }
  .ml80 {
    margin-left: 100px;
  }
  .share {
    display: flex;
  }
  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    i {
      font-size: 60px;
      color: #fff;
    }
  }
}
</style>
