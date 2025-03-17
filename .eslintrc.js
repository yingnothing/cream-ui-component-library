import '@rushstack/eslint-patch/modern-module-resolution'

module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  overrides: [
    {
      files: ['src/**/**/*.vue', 'src/**/**/*.jsx'],
      rules: {
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
}
