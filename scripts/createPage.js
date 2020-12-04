const fs = require('fs-extra')
const path = require('path')
const log = require('../utils/log')

log.info('【请输入页面名称，例如：pageDemo】')
process.stdin.on('data', async chunk => {
    const inputName = String(chunk).replace(/\s*/g, '')
    const pageTarget = path.resolve(__dirname, '../', 'src/pages', inputName)
    const pageSource = path.resolve(__dirname, '../', 'pageTemplate')
    if(!fs.existsSync(pageTarget)) {
        log.info(`【sourceUrl】${pageSource}`)
        log.info(`【targeturl】${pageTarget}`)
        copyPublicFolder(pageSource, pageTarget)
    }else{
        log.err('【页面已存在，请重新创建】')
    }
    process.stdin.emit('end')
})

process.stdin.on('end', () => {
    process.exit()
})

/**
 * 复制文件夹
 * @param {*string} source
 * @param {*string} target 
 */
function copyPublicFolder(source, target) {
    try {
        fs.copySync(source, target)
        log.succes('【页面创建成功】')
      } catch (err) {
        log.error('【页面创建失败】')
    }
}
 
 