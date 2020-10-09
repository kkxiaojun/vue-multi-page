
module.exports = {
  "src/**/*.{js,vue}": filenames => {
    let files = null
    console.log('filenames', filenames)
    if (filenames.length < 10) {
      files = filenames.join(' ')
    } else {
      files = 'src/pages/**/*.{js,vue}'
    }
    return [
      `eslint --fix ${files}`,
      `prettier --write ${files}`,
      `git add .`,
    ];
  },
}
