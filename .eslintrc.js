module.exports = {
  extends: ['plugin:vue/strongly-recommended', 'plugin:prettier/recommended'],
  rules: {
    // ...other codes
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSpacing: true,
        jsxBracketSameLine: true,
      },
    ],
    'vue/max-attributes-per-line': 0,
    'vue/html-indent': 0,
    'vue/require-prop-types': 0,
    'vue/html-self-closing': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/no-template-shadow': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/require-prop-type-constructor': 0,
    'vue/html-closing-bracket-spacing': 0,
    quotes: [1, 'single'],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
