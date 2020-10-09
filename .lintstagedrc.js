module.exports = {
  "src/**/*.{js,vue}": [
    "prettier --write",
    "eslint --fix --ext .vue,.js src",
    "git add ."
  ],
}
