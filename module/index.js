/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-14 21:30:01
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-20 11:37:47
 */
import Button from '../packages/button/index';
import ButtonGroup from '../packages/button-group/index';
import Link from '../packages/link/index';
import DatePicker from '../packages/date-picker/index';
import BackTop from '../packages/backtop/index';
import Message from '../packages/message/index';
import Radio from '../packages/radio/index';
import RadioGroup from '../packages/radio-group/index';

const components = [
    Button,
    ButtonGroup,
    Link,
    DatePicker,
    BackTop,
    Message,
    Radio,
    RadioGroup
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
    DatePicker,
    Radio,
    RadioGroup
}