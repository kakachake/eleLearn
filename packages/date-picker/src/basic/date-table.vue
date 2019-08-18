<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 11:38:33
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-18 12:50:38
 -->
<template>

    <table
        cellspacing="0"
        cellpadding="0"
        class="k-date-table"
        @click="handleClick"
    >
        <tbody>
            <tr>
                <th v-if="showWeekNumber">周数</th>
                <th v-for="(week, key) in WEEKS" :key = "key">{{week}}</th>
            </tr>
            <tr 
            class="k-date-table__row"
            v-for="(row, key) in rows"
            :key = "key"
            >
                <td 
                v-for="(cell, key) in row"
                :key = "key"
                :class="getCellClasses(cell)"
                >
                    <div>
                        <span>
                            {{ cell.text }}
                        </span>
                        <span class="lunarday">
                            {{ cell.lunarday }}
                        </span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script>
import { getFirstDayOfMonth, getDayCountOfMonth, getStartDateOfMonth, nextDate, getDateTimestamp } from 'klement/utils/date-util.js'
import { getLunarDay } from 'klement/utils/getlunarday'
import { coerceTruthyValueToArray, arrayFind } from 'klement/utils/util.js'
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
            default: 1,
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
    methods:{
        cellMatchesDate(cell, date) {
            const value = new Date(date);
            return this.year === value.getFullYear() &&
            this.month === value.getMonth() &&
            Number(cell.text) === value.getDate();
        },
        getCellClasses(cell){
            
            let classes = [];
            if((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
                classes.push('available');
                if(cell.type === 'today') {
                    classes.push('today')
                }
            }else{
                classes.push(cell.type);
            }

            if (cell.selected) {
                classes.push('selected');
            }

            if (this.selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today') && this.cellMatchesDate(cell, this.value)) {
                classes.push('current');
            }


            return classes.join(' ')
        },
        getDateOfCell(row, column){
            const offsetFromStart = row * 7 + column - this.numberOfDaysFromPreviousMonth;
            return nextDate(new Date(this.year, this.month, 1), offsetFromStart);
        },
        
        handleClick(){
            let target = event.target;
            
            if (target.tagName === 'SPAN') {
            target = target.parentNode.parentNode;
            }
            if (target.tagName === 'DIV') {
            target = target.parentNode;
            }

            if (target.tagName !== 'TD') return;

            const row = target.parentNode.rowIndex - 1;
            const column = target.cellIndex;
            const cell = this.rows[row][column];
            
            if (cell.disabled) return;
            // console.log(cell);
            
            const newDate = this.getDateOfCell(row, column);
            // console.log(newDate);
            
            if(this.selectionMode === 'day'){
                this.$emit('pick', newDate)
            }else if(this.selectionMode === 'dates') {
                const value = this.value || [];
                const newValue = cell.selected
                    ? removeFromArray(value, date => date.getTime() === newDate.getTime)
                    : [...value, newDate];
                this.$emit('pick', newValue);
            }
        }
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

        numberOfDaysFromPreviousMonth(){
            const date = new Date(this.year, this.month, 1); //获取一号时间戳
            let day = getFirstDayOfMonth(date); //获取一号周几
            return day - this.firstDayOfWeek >= 0? day - this.firstDayOfWeek : 7 + day - this.firstDayOfWeek;
        },

        rows() {
            

            console.log('date=>>>>>>',this.date);
            console.log('value=>>>>>>',this.value);
            
            const date = new Date(this.year, this.month, 1); //获取一号时间戳
            let day = getFirstDayOfMonth(date); //获取一号周几
            const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth());//获取当月的天数
            const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1));//获取上月的天数

            day = (day === 0 ? 7 : day) //0为星期天

            const offset = this.offsetDay;//获取偏移量，初始为周天在第一位
            // console.log(offset);
            
            const rows = this.tableRows;//获取初始数组
            // console.log(this.tableRows);
            
            let count = 1;
            const startDate = this.startDate;//获取当前月一号所在周的上周的周天日期
            const disabledDate = this.disabledDate;
            const selectedDate = this.selectionMode === 'dates' ? coerceTruthyValueToArray(this.value) : []; //将选中的日期转为数组格式
            // console.log('selectedDate=>>>>>',selectedDate );
            
            const now = getDateTimestamp(new Date()) //获取当前日期,精确到天
            const numberOfDaysFromPreviousMonth = this.numberOfDaysFromPreviousMonth;
            
            for(let i = 0;i < 6; i++){
                const row = rows[i];

                if(this.showWeekNumber){
                    //周数显示
                }
                for(let j = 0; j < 7; j++){
                    let cell = row[this.showWeekNumber ? j + 1 : j];
                    if(!cell){
                        cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false, lunarday:''};
                    }

                    cell.type = 'normal'

                    const index = i * 7 + j;
                    const time = nextDate(date, index - numberOfDaysFromPreviousMonth)
                    cell.lunarday = getLunarDay(time.getFullYear(),time.getMonth()+1, time.getDate())
                    // cell.inRange = time >= getDateTimestamp(this.minDate) && time <= getDateTimestamp(this.maxDate); //时间范围
                    // cell.start = this.minDate && time === getDateTimestamp(this.minDate); //时间范围起点
                    // cell.end = this.maxDate && time === getDateTimestamp(this.maxDate); //时间范围终点
                    const isToday = time.getTime() === now;

                    if (isToday) {
                        cell.type = 'today';
                    }

                    if(i >= 0 && i <= 1){
                        
                        if( j + i * 7 >= numberOfDaysFromPreviousMonth) {
                            cell.text = count++;
                        }else{
                            cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - j) + 1;
                            cell.type = 'prev-month';
                        }   
                    }else{
                        if(count <= dateCountOfMonth) {
                            cell.text = count++;
                        }else{
                            cell.text = count++ - dateCountOfMonth;
                            cell.type = 'next-month';
                        }
                    }
                    let cellDate = new Date(time);
                    cell.selected = arrayFind(selectedDate, date => date.getTime() === cellDate.getTime())
                    
                    this.$set(row, this.showWeekNumber ? j + 1 : j, cell);
                    // console.log("row=>>>>", row, count);
                }
            // console.log("rows=>>>>", rows, count);
            }
            return rows;
        }
    }
}

</script>
<style>
</style>