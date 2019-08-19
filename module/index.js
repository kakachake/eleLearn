/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-14 21:30:01
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-19 12:26:59
 */
import Button from '../packages/button/index';
import ButtonGroup from '../packages/button-group/index';
import Link from '../packages/link/index';
import DatePicker from '../packages/date-picker/index';
import BackTop from '../packages/backtop/index';
import Message from '../packages/message/index';

const components = [
    Button,
    ButtonGroup,
    Link,
    DatePicker,
    BackTop,
    Message
]

const install = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$message = Message;
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    Button,
    Link,
    BackTop,
    DatePicker
}