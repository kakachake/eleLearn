/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-14 21:10:08
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-14 22:22:48
 */
import KButton from './src/KButton.vue';

KButton.install = function(Vue){ //单独引用时
    Vue.component(KButton.name, KButton);
};

export default KButton;