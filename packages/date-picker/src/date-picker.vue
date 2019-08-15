<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 11:33:59
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-15 18:51:39
 -->
<template>
<div>
  <input
    class="k-picker-editor"
    @focus="handleFocus"
    @blur="handleClose"
    />
</div>
</template>

<script>
import Vue from 'vue'

export default {
  props:{
    readOnly:{
      type: Boolean,
      default: false
    },
    disabled: {

    }
  },

  data(){
    return {
      pickerVisible: false
    }
  },
  watch:{
    pickerVisible(val) {
      if(this.readOnly || this.pickerDisabled) return ;
      if(val){
        this.showPicker();
        console.log('pickerVisible');
        
      }else{
        this.hidePicker()
      }
    }
  },
  methods:{
    handleFocus(e){
      console.log(e);
      if(!this.pickerVisible){
        this.pickerVisible = true;
      }
      this.$emit('focus', this)
    },
    handleClose(e){
      console.log(e);
      if (!this.pickerVisible) return;
      this.pickerVisible = false;
    },
    showPicker(){
      if(!this.picker){
        this.mountPicker()
      }

      this.pickerVisible = this.picker.visible = true;
    },
    hidePicker() {
      if (this.picker) {
        this.pickerVisible = this.picker.visible = false;
      }
    },
    mountPicker(){

      this.picker = new Vue(this.panel).$mount();
      this.popperElm = this.picker.$el;
      console.log(this.popperElm);
      this.$el.appendChild(this.picker.$el)
      
    }
  },
  computed:{
    pickerDisabled() {
      return this.disabled;
    },
  }
}

</script>
<style>
</style>