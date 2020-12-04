const glob = require('glob')
const path = require('path')
const fs = require('fs')
const log = require('../utils/log')

/**
 * @param {*String} filterPath
 * @param {*String} filterStr
 */
function getEntry(filterPath, filterStr) {
  console.log(filterPath, filterStr)
  const globPath = filterPath
  const files = glob.sync(globPath)
  let dirname
  const entries = {}
  for (let i = 0; i < files.length; i++) {
    dirname = path.dirname(files[i]);
    const regx = new RegExp(`${filterStr.replace("/", "\\/")}$`);
    // if (dirname.includes(filterStr)) {
    if (regx.test(dirname)) {
      entries.index = {
        entry: dirname + '/main.js',
        template: dirname + '/index.html',
      }
      break
    }
  }
  // console.log(entries)
  return entries
}

function getNPMParams() {
  let argv
  try {
    argv = JSON.parse(process.env.npm_config_argv).original
  } catch (ex) {
    argv = process.argv
  }
  // console.log('argv', argv)
  const params = {}
  argv &&
  argv.forEach(item => {
    const arr = item.split(/=/gi)
    if (item.slice(0, 2) === '--' && arr.length === 2) {
      params[arr[0].slice(2)] = arr[1]
    }
  })
  if (params && params.page) {
    if (!fs.existsSync(path.resolve(__dirname, '../src/', params.page))) {
      log.error(`${params.page}不存在，请检查pages下是否有该目录`)
      process.exit()
    }
  } else {
    log.info('输入格式请参考：npm run serve --page=pages/xxxx')
    process.exit()
  }
  return params
}

module.exports = {
  getEntry,
  getNPMParams,
}
