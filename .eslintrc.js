module.exports = {
  extends: ['@vue/standard', 'plugin:vue/strongly-recommended'],
  rules: {
    // ...other codes
    'prettier/prettier': 'error',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
