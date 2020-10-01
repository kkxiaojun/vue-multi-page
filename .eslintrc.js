module.exports = {
  extends: ['@vue/standard', 'plugin:vue/strongly-recommended'],
  rules: {
    // ...other codes
    // 'prettier/prettier': 'error',
    trailingComma: 1, // 多行使用拖尾逗号（默认none）
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
