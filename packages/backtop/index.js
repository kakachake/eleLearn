/*
 * @Description: b
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-18 21:18:29
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-18 21:19:46
 */
import backTop from './src/backtop.vue'

backTop.install = function(Vue) {
    Vue.component(backTop.name, backTop);
}

export default backTop;
