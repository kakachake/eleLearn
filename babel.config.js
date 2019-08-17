/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-10 17:03:48
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-17 21:35:43
 */
module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      '@babel/plugin-transform-modules-commonjs',
      {
        allowTopLevelThis: true,
      },
    ],
  ],
}
