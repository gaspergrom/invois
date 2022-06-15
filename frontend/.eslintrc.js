const rulesDirPlugin = require('eslint-plugin-rulesdir')
rulesDirPlugin.RULES_DIR = '_eslint/rules'

module.exports = {
  root: true,
  env: {
    node: true
  },
  rules: {
    'no-useless-constructor': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-param-reassign': 'off',
    'import/named': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    'vue/no-unused-components': 'off',
    'rulesdir/no-unused-components': 'error'
  },
  plugins: [
    'rulesdir'
  ],
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue']
  }
}
