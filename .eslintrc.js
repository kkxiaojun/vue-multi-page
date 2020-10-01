module.exports = {
  extends: [
    '@vue/standard',
    'plugin:vue/strongly-recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // ...other codes
    'prettier/prettier': 'error',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
