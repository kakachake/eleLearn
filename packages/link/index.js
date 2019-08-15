/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 09:12:15
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-15 09:13:37
 */
import Link from './src/link.vue'


Link.install = function(Vue){
    Vue.component(Link.name, Link);
}

export default Link;