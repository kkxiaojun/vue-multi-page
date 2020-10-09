const { getEntry, getNPMParams } = require('./webpack/utils')
const entry = getEntry('src/pages/**/*.html', getNPMParams().page)
console.log('entry', entry)
module.exports = {
  "src/**/*.{js,vue}": [
    "prettier --write",
    "lint",
    "git add ."
  ],
}
