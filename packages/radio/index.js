/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-20 09:33:49
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-20 10:02:56
 */
import radio from './src/radio.vue'

radio.install = function(Vue){
    Vue.component(radio.name, radio)
}

export default radio;