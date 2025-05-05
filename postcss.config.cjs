module.exports = {
  /* eslint-disable @typescript-eslint/no-require-imports */
  plugins: [
    // 循环定义css变量
    require('postcss-each-variables'),
    // 嵌套
    require('postcss-nested'),
    // 循环生成css规则
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')],
      },
    }),
  ],
}
