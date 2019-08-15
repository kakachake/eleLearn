/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 11:34:15
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-15 16:49:45
 */
import DatePicker from './src/picker/date-picker';

DatePicker.install = function install(Vue) {
    Vue.component(DatePicker.name, DatePicker);
};

export default DatePicker