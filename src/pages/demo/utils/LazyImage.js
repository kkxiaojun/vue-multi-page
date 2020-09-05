export default class LazyImage {
  constructor(selector) {
    // 图片列表（nodeList）类数组
    this.lazyImages = Array.from(document.querySelectorAll(selector))
    this.init()
  }

  init() {
    // IntersectionObserver 判断图片是否出现在可视区域内
    if (!('IntersectionObserver' in window)) {
      this.initObserverShow()
    } else {
      this.initImageShow()
      // 添加节流函数
      this._throttleFn = this.throttle(this.initImageShow)
      document.addEventListener('scroll', this._throttleFn)
    }
  }

  // getBoundingClientRect 方案
  initImageShow() {
    // 需要懒加载的图片集合
    let len = this.lazyImages.length
    for (let i = 0; i < len; i++) {
      const lazyImage = this.lazyImages[i]
      const rect = lazyImage.getBoundingClientRect()
      // 图片出现在视窗的时候加载图片
      if (rect.top < document.documentElement.clientHeight) {
        // 真实地址
        lazyImage.src = lazyImage.dataset.src
        // 移除掉已显示
        this.lazyImages.splice(i, 1)
        len--
        i--
        // 如果全部都加载完 则去掉滚动事件监听
        if (this.lazyImages.length === 0) {
          document.removeEventListener('scroll', this._throttleFn)
        }
      }
    }
  }

  // IntersectionObserver 方案
  initObserverShow() {
    const lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        // 如果元素可见
        if (entry.isIntersecting) {
          const lazyImage = entry.target
          // 设置img的真实图片地址data-src
          lazyImage.src = lazyImage.dataset.src
          lazyObserver.unobserve(lazyImage)
        }
      })
    })
    // 监听每一个lazeImage
    this.lazyImages.forEach(function(lazyImage) {
      lazyObserver.observe(lazyImage)
    })
  }

  /**
   *
   * @param {function} func
   * @param {*Number} delay
   * @param {*Number} immediate
   */
  throttle(func, delay = 15, immediate = 30) {
    let timeout = null
    const context = this
    return function() {
      const args = arguments
      timeout && clearTimeout(timeout)
      // 是否立即执行
      if (immediate) {
        // 已执行，则delay秒后才执行，清除timeout
        const callNow = !timeout
        timeout = setTimeout(function() {
          timeout = null
        }, delay)
        callNow && func.apply(context, args)
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args)
        }, delay)
      }
    }
  }
}
