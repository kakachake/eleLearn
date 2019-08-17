/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 16:48:53
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-17 11:59:48
 */
import Picker from '../date-picker.vue'
import DatePanel from '../panel/date.vue'


const getPanel = function() { //扩展其他
    return DatePanel
}


export default {
    mixins: [Picker],
    name: 'KDatePicker',
    props: {
        type: {
            type: String,
            default: 'date'
        },
    },
    created() {
        this.panel = getPanel()
    }
}