const path = require('path')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const { getEntry, getNPMParams } = require('./webpack/utils')
const entry = getEntry('src/pages/**/*.html', getNPMParams().page)
const IS_PRODUCTION = process.env.ENV === 'prod'
const ENV_CONFIG = require('./config/env')
const port = 8888
const pageName = getNPMParams().page.split('/')[1]

module.exports = {
  publicPath: './',
  lintOnSave: !IS_PRODUCTION,
  // 根据入口构建
  pages: entry,
  // 自定义输出
  outputDir: 'dist/' + pageName,
  devServer: {
    port: port,
    disableHostCheck: true,
    // compress: true // GZIP
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        utils: path.resolve(__dirname, 'src/utils'), // 公用的函数
        pages: path.resolve(__dirname, 'src/pages'), // 多页面目录
        assets: path.resolve(__dirname, 'src/assets'), // 图片资料
        components: path.resolve(__dirname, 'src/components'), // 公用组件
      },
    },
  },
  chainWebpack: config => {
    // 注入环境变量
    config.plugin('define').tap(args => {
      args[0]['process.env'] = JSON.stringify(
        ENV_CONFIG[process.env.PROCESS_ENV.toLocaleUpperCase()],
      )
      return args
    })
    if (!IS_PRODUCTION) {
      // 启用缓存
      config.plugin('hardSource').use(new HardSourceWebpackPlugin())

      // 控制台显示
      config.plugin('FriendlyErrorsWebpackPlugin').use(
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              `请访问: http://localhost:${port}/${pageName}.html#/home`,
            ],
          },
        }),
      )
    }

    if (IS_PRODUCTION) {
      // 开启gzip，需要配置nginx
      config.plugin('compressionPlugin').use(
        new CompressionWebpackPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240, // 大于10K才压缩gzip
          minRatio: 0.8, // 压缩比例(minRatio = Compressed Size / Original Size)
        }),
      )
      // 清除生产环境清除控制台输出
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.drop_console = true
        return args
      })
    }
  },
  // 生产环境关闭sourceMap
  // productionSourceMap: !IS_PRODUCTION,
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 75, // 换算的基数(设计图750的根字体为75)
            selectorBlackList: ['.van'], // 要忽略的选择器并保留为px。
            // 要忽略的选择器并保留为px。 selectorBlackList: ['.van'], // 要忽略的选择器并保留为px。
            propList: ['*'], // 可以从px更改为rem的属性。
            minPixelValue: 2, // 设置要替换的最小像素值。
          }),
        ],
      },
    },
  },
}
