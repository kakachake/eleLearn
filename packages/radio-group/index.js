/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-20 11:36:23
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-20 11:37:30
 */
import RadioGroup from '../radio/src/radio-group.vue'

RadioGroup.install = function(Vue){
    Vue.component(RadioGroup.name, RadioGroup);
}

export default RadioGroup;