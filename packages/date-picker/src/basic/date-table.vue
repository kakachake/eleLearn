<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 11:38:33
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-15 18:46:06
 -->
<template>

    <table
        cellspacing="0"
        cellpadding="0"
        class="k-date-table"
    >
        <tbody
            class="k-date-table__row"
        >
            <tr>
                <th v-for="(week, key) in WEEKS" :key = "key">{{week}}</th>
            </tr>
        </tbody>
    </table>

</template>

<script>

const WEEKS = ['日', '一', '二', '三', '四', '五', '六'];

export default {
    props:{
        firstDayOfWeek: {
            default: 7,
            type: Number,
            validator: val => val >= 1 && val <= 7
        },
    },
    computed:{
        WEEKS() {
            const week = this.firstDayOfWeek;
            return WEEKS.concat(WEEKS).slice(week, week + 7);
        }
    }
}

</script>
<style>
</style>