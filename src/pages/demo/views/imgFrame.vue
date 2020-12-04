<template>
  <img
    ref="frameImg"
    :class="['my-frame-img', insertImgClass]"
    @load="imgLoadSuccess($event)"
    @error="onerrorImg"
    :src="imgUrl"
    alt="画作"
  />
</template>

<script>
export default {
  name: 'Index',
  props: {
    imgUrl: {
      type: String,
      default: '',
    },
    frameClass: {
      type: String,
      default: '',
    },
    insertImgClass: {
      type: String,
      default: '',
    },
    borderSize: {
      type: Number,
      default: -1,
    },
  },
  methods: {
    onerrorImg() {
      Log.debug('img load error')
    },
    imgLoadSuccess() {
      this.$nextTick(() => {
        const img = this.$refs.frameImg
        let borderSize = this.borderSize
        if (img) {
          const width = img.clientWidth
          const height = img.clientHeight
          if (!borderSize) {
            borderSize = 0
          }
          if (width > 2 && height > 2) {
            this.createFrame({
              width: width - borderSize + 'px',
              height: height - borderSize + 'px',
            })
          }
        }
      })
    },
    createFrame({ width, height }) {
      const div = document.createElement('div')
      const img = this.$refs.frameImg
      const img_p = img.parentElement || img.parentNode
      const newImg = img.cloneNode(true)
      // newImg.style.width = width
      // newImg.style.height = height
      if (width > height) {
        div.style.width = width
      } else {
        div.style.height = height
      }
      let frameClass = this.frameClass
      div.classList.add('my-frame-box')
      div.classList.add(frameClass)
      newImg.classList.add('img-event-none')
      div.appendChild(newImg)
      img_p.appendChild(div)
      img.remove()
      this.$emit('onsuccess', true)
    },
  },
}
</script>

<style>
.my-frame-img {
  max-height: 100%;
  max-width: 100%;
  box-sizing: border-box;
  object-fit: contain;
}
.my-frame-box {
  width: auto;
  height: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0px 0px 20px 0px rgba(85, 85, 85, 0.5);
}
.img-event-none {
  pointer-events: none;
}
</style>
