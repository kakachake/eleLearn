<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 11:38:21
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-16 12:59:16
 -->
<template>
<transition name="k-zoom-in-top" @after-enter="handleEnter" @after-leave="handleLeave">
  <div
    v-show="visible" 
    style="margin:0 auto;" class="k-picker-panel k-date-picker k-popper">
      <div class="k-picker-panel__body-wrapper">
        <div class="k-picker-panel__body">
          <div class="k-date-picker__header">
            <button
              type="button"
              
              class="k-picker-panel__icon-btn k-date-picker__prev-btn k-icon-d-arrow-left">
            </button>
            <button
              type="button"
              
              v-show="currentView === 'date'"
              class="k-picker-panel__icon-btn k-date-picker__prev-btn k-icon-arrow-left">
            </button>
            <span
              
              role="button"
              class="k-date-picker__header-label">{{ yearLabel }}</span>
            <span
              
              v-show="currentView === 'date'"
              role="button"
              class="k-date-picker__header-label"
              :class="{ active: currentView === 'month' }">{{t(`el.datepicker.month${ month + 1 }`)}}</span>
            <button
              type="button"
              
              class="k-picker-panel__icon-btn k-date-picker__next-btn k-icon-d-arrow-right">
            </button>
            <button
              type="button"
              
              v-show="currentView === 'date'"
              class="k-picker-panel__icon-btn k-date-picker__next-btn k-icon-arrow-right">
            </button>          
          </div>
          <div class="k-picker-panel__content">
              <date-table 
                v-show = "currentView === 'date'"
                :value = "value"
                :date="date"
                :default-value="defaultValue ? new Date(defaultValue) : null"
                :disabled-date="disabledDate">
              </date-table>
          </div>
        </div>
      </div>
  </div>
</transition>
</template>

<script>
import DateTable from '../basic/date-table';
import { getWeekNumber } from 'klement/utils/date-util'
import { t } from 'klement/locale/index'


export default {
  data(){
    return {
      date: new Date(),
      visible: false,
      currentView: 'date',
      isabledDate: '',
      defaultValue: null,
      disabledDate: '',
      value: '',
    }
  },
  components:{
    DateTable
  },
  created(){
    console.log( t('el.datepicker.year'));
    
  },
  methods:{
      handleEnter() {
        document.body.addEventListener('keydown', this.handleKeydown);
      },
      handleLeave() {
        this.$emit('dodestroy');
        document.body.removeEventListener('keydown', this.handleKeydown);
      },
      t(...args){
        return t.apply(this, args);
      }
  },
  computed: {
    year(){
      return this.date.getFullYear();
    },
    
    month() {
      return this.date.getMonth();
    },

    week() {
      return getWeekNumber(this.date);
    },

    mouthDate() {
      return this.date.getDate()
    },

    yearLabel() {
      const yearTranslation = this.t('el.datepicker.year')
      if(this.currentView === 'year') {
        const startYear = Math.floor(this.year/10)*10;
        if(yearTranslation) {
          return startYear + ' ' + yearTranslation + ' - ' + (startYear + 9) + ' ' + yearTranslation;
        }
      }
      return this.year + ' ' + yearTranslation
      
    }
  }
}

</script>
<style>
</style>