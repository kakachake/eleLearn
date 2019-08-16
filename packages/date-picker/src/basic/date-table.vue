<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 11:38:33
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-16 14:00:12
 -->
<template>

    <table
        cellspacing="0"
        cellpadding="0"
        class="k-date-table"
    >
        <tbody>
            <tr>
                <th v-if="showWeekNumber">周数</th>
                <th v-for="(week, key) in WEEKS" :key = "key">{{week}}</th>
            </tr>
            <tr 
            class="k-date-table__row"
            >

            </tr>
        </tbody>
    </table>

</template>

<script>
import { getFirstDayOfMonth, getDayCountOfMonth, getStartDateOfMonth, nextDate } from 'klement/utils/date-util.js'
import { coerceTruthyValueToArray } from 'klement/utils/util.js'
import { stat } from 'fs';

const WEEKS = ['日', '一', '二', '三', '四', '五', '六'];


export default {
    data(){
        return {
            tableRows: [[], [], [], [], [], []]
        }
    },
    props:{
        firstDayOfWeek: {
            default: 7,
            type: Number,
            validator: val => val >= 1 && val <= 7
        },
        value:{},

        date:{},

        disabledDate: {},
        
        selectionMode: {
            default: 'day'
        },
        showWeekNumber: {
            type: Boolean,
            default: false
        },
    },
    computed:{
        offsetDay(){
            const week = this.firstDayOfWeek;
            return week > 3 ? 7 - week : -week
        },

        WEEKS() {
            const week = this.firstDayOfWeek;
            return WEEKS.concat(WEEKS).slice(week, week + 7);
        },

        year() {
            return this.date.getFullYear();
        },

        month() {
            return this.date.getMonth();
        },

        startDate(){
            return getStartDateOfMonth(this.year, this.month) //获取当前月一号所在周的上周的周天日期
        },

        rows() {
            const date = new Date(this.year, this.month, 1); //获取一号时间戳
            let day = getFirstDayOfMonth(date); //获取一号周几
            const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth());//获取当月的天数
            const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1));//获取上月的天数

            day = (day === 0 ? 7 : day) //0为星期天

            const offset = this.offsetDay;//获取偏移量，初始为周天在第一位
            const rows = this.tableRows;//获取初始数组
            let count = 1;
            const startDate = this.startDate;//获取当前月一号所在周的上周的周天日期
            const disabledDate = this.disabledDate;
            const selectedDate = this.selectionMode === 'dates' ? coerceTruthyValueToArray(this.value) : []; //将选中的日期转为数组格式
            const now = new Date().getTime() //获取当前日期

            for(let i = 0;i < 6; i++){
                const row = rows[i];

                if(this.showWeekNumber){
                    //周数显示
                }
                for(let j = 0; j < 7; j++){
                    let cell = row[this.showWeekNumber?j+1:j]
                    if(!cell){
                        cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
                    }

                    const index = i * 7 + j;
                    const time = nextDate(startDate, index - offset).getTime();
                    // cell.inRange = time >= getDateTimestamp(this.minDate) && time <= getDateTimestamp(this.maxDate); //时间范围
                    // cell.start = this.minDate && time === getDateTimestamp(this.minDate); //时间范围起点
                    // cell.end = this.maxDate && time === getDateTimestamp(this.maxDate); //时间范围终点
                    const isToday = time === now;

                    if (isToday) {
                        cell.type = 'today';
                    }
                }
            }
            return row;
        }
    }
}

</script>
<style>
</style>