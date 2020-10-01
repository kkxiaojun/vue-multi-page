// 引入默认图片
import loadingImg from '@/assets/loading.gif'
let timer = null

// 创建一个监听器
const observer = new IntersectionObserver(entries => {
  // entries是所有被监听对象的集合
  entries.forEach(entry => {
    // 当被监听元素到临界值且未加载图片时触发。
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      if (!entry.target.isLoaded) {
        const lazyImage = entry.target
        // 设置img的真实图片地址data-src
        lazyImage.src = lazyImage.dataSrc
        observer.unobserve(lazyImage)
      }
    }
  })
})

export default {
  // insert bind
  // 共同点： dom插入都会调用，bind在inserted之前
  // 不同点：
  //     bind 时父节点为 null
  //     inserted 时父节点存在。
  //     bind是在dom树绘制前调用，inserted在dom树绘制后调用

  // inserted时元素已经插入页面，能够直接获取到dom元素的位置信息
  inserted(el, binding, vnode) {
    clearTimeout(timer)
    // 初始化时展示默认图片
    el.src = loadingImg
    // 将需要加载的图片地址绑定在dom上
    el.dataSrc = binding.value

    observer.observe(el)
    // 在组件卸载的时候停止监听
    const vm = vnode.context
    timer = setTimeout(() => {
      vm.$on('hook:beforeDestroy', () => {
        observer.disconnect()
      })
    }, 20)
  },
  // 图片更新触发
  update(el, binding) {
    el.isLoaded = false
    el.dataSrc = binding.value
  },
}
