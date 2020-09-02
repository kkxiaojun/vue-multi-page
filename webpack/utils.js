const glob = require('glob')
const path = require('path')
const fs = require('fs')

function getEntry(globPath, filterStr, splitCode = '/') {
  const entries = {}

  glob.sync(globPath).forEach(item => {
    const entryPathArr = item.split('/').splice(-3, 2)
    const entryName = item.split('/').splice(-2, 1)
    console.log('entryName:', entryName)
    if (filterStr) {
      if (entryPathArr.join('/') === filterStr) {
        entries['index'] = {
          entry: 'src/' + filterStr + '/main.js',
          template: 'src/' + filterStr + '/index.html'
        }
      }
    }
  })
  return entries
}

function getNPMParams() {
  let argv
  try {
    argv = JSON.parse(process.env.npm_config_argv).original
  } catch (ex) {
    argv = process.argv
  }
  console.log('argv', argv)
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
      console.log(`${params.page}不存在，请检查pages下是否有该目录`)
      process.exit()
    }
  } else {
    console.log('输入格式请参考：npm run serve --page=pages/xxxx')
    process.exit()
  }
  return params
}

module.exports = {
  getEntry,
  getNPMParams
}



