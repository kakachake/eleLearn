/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-10 20:18:23
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-16 10:28:23
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('pack',resolve('packages'))
      .set('klement', resolve('module'))
      // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  }
};
