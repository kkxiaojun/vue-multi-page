export default class LazyImage {
  constructor(selector) {
    // this.selector = 'lazy-image'
    // 图片列表
    this.lazyImages = Array.prototype.slice.call(document.querySelectorAll(selector))
    this.init()
  }

  initImageShow() {
    let len = this.lazyImages.length
    for (let i = 0; i < len; i++) {
      const lazyImage = this.lazyImages[i]
      const rect = lazyImage.getBoundingClientRect()
      // 出现在视窗的时候加载图片
      if (rect.top < document.documentElement.clientHeight) {
        lazyImage.src = lazyImage.dataset.src
        // 移除掉已经显示的
        this.lazyImages.splice(i, 1)
        len--
        i--
        if (this.lazyImages.length === 0) {
          // 如果全部都加载完 则去掉滚动事件监听
          document.removeEventListener('scroll', this._throttleFn)
        }
      }
    }
  }

  initObserverShow() {
    const lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        // {
        //   time: 3893.92,
        //   boundingClientRect: DOMRectReadOnly {
        //     bottom: 920,
        //     height: 1024,
        //     left: 0,
        //     right: 1024,
        //     top: 0,
        //     width: 920
        //   },
        //   intersectionRatio: 0.54,
        //   target: element
        //   isIntersecting: true
        // }
        // 如果元素可见
        if (entry.isIntersecting) {
          const lazyImage = entry.target
          // 设置img的真实图片地址data-src
          lazyImage.src = lazyImage.dataset.src
          // lazyImage.classList.remove(this.selector)
          lazyObserver.unobserve(lazyImage)
        }
      })
    })
    // 监听每一个lazeImage
    this.lazyImages.forEach(function(lazyImage) {
      lazyObserver.observe(lazyImage)
    })
  }
  throttle(fn, delay = 15, mustRun = 30) {
    let t_start = null
    let timer = null
    const context = this
    return function() {
      const t_current = +(new Date())
      const args = Array.prototype.slice.call(arguments)
      clearTimeout(timer)
      if (!t_start) {
        t_start = t_current
      }
      if (t_current - t_start > mustRun) {
        fn.apply(context, args)
        t_start = t_current
      } else {
        timer = setTimeout(() => {
          fn.apply(context, args)
        }, delay)
      }
    }
  }

  init() {
    // IntersectionObserver 判断图片是否出现在可视区域内
    if ('IntersectionObserver' in window) {
      const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
          // {
          //   time: 3893.92,
          //   boundingClientRect: DOMRectReadOnly {
          //     bottom: 920,
          //     height: 1024,
          //     left: 0,
          //     right: 1024,
          //     top: 0,
          //     width: 920
          //   },
          //   intersectionRatio: 0.54,
          //   target: element
          //   isIntersecting: true
          // }
          // 如果元素可见
          if (entry.isIntersecting) {
            const lazyImage = entry.target
            // 设置img的真实图片地址data-src
            lazyImage.src = lazyImage.dataset.src
            // lazyImage.classList.remove(this.selector)
            lazyObserver.unobserve(lazyImage)
          }
        })
      })
      // 监听每一个lazeImage
      this.lazyImages.forEach(function(lazyImage) {
        lazyObserver.observe(lazyImage)
      })
    } else {
      this.initImageShow()
      this._throttleFn = this.throttle(this.initImageShow)
      document.addEventListener('scroll', this._throttleFn)
    }
  }
}
