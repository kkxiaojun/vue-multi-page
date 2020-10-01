module.exports = {
  'src/**/*.{js,vue}': filenames => {
    console.log('filenames', filenames)
    let files = null
    if (filenames.length < 10) {
      files = filenames.join(' ')
    } else {
      files = 'src/**/*.{js,vue}'
    }
    return [`eslint --fix ${files}`, `prettier --write ${files}`, `git add .`]
  },
  'pages/**/*.{js,vue}': filenames => {
    console.log('filenames111', filenames)
    let files = null
    if (filenames.length < 10) {
      files = filenames.join(' ')
    } else {
      files = 'pages/**/*.{js,vue}'
    }
    return [`eslint --fix ${files}`, `prettier --write ${files}`, `git add .`]
  },
}
