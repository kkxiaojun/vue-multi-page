module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/strongly-recommended', 'plugin:prettier/recommended'],
  rules: {
    // ...other codes
    'prettier/prettier': 'error',
    'space-before-function-paren': [2, { anonymous: 'never', named: 'never' }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
