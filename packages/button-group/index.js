/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-14 21:50:13
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-14 21:50:34
 */
import KButtonGroup from '../button/src/button-group';

/* istanbul ignore next */
KButtonGroup.install = function(Vue) {
  Vue.component(KButtonGroup.name, KButtonGroup);
};

export default KButtonGroup;
