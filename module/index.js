/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-14 21:30:01
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-14 21:51:53
 */
import Button from '../packages/button/index'
import ButtonGroup from '../packages/button-group/index';


const components = [
    Button,
    ButtonGroup
]

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    Button
}