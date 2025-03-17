module.exports = {
  /* eslint-disable @typescript-eslint/no-require-imports */
  plugins: [
    require('postcss-each-variables'),
    require('postcss-nested'),
    require('postcss-each')({
      plugins: {
        beforeEach: [require('postcss-for'), require('postcss-color-mix')],
      },
    }),
  ],
}
