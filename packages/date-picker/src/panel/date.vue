<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 11:38:21
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-15 18:52:38
 -->
<template>
<transition name="k-zoom-in-top" @after-enter="handleEnter" @after-leave="handleLeave">
  <div
    v-show="visible" 
    style="margin:0 auto;" class="k-picker-panel k-date-picker k-popper">
      <div class="k-picker-panel__content">
        date-table
          <date-table 
            
            :date="date">
          </date-table>
      </div>
  </div>
</transition>
</template>

<script>
import DateTable from '../basic/date-table';
export default {
  data(){
    return {
      date: new Date(),
      visible: false
    }
  },
  components:{
    DateTable
  },
  methods:{
      handleEnter() {
        document.body.addEventListener('keydown', this.handleKeydown);
      },
      handleLeave() {
        this.$emit('dodestroy');
        document.body.removeEventListener('keydown', this.handleKeydown);
      },
  }
}

</script>
<style>
</style>