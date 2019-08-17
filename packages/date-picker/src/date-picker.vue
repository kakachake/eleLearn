<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 11:33:59
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-17 21:52:40
 -->
<template>
<div>
  <input
    class="k-picker-editor"
    @focus="handleFocus"
    v-clickoutside="handleClose"
    :value="displayValue"
    ref="reference"
    />
  <button ref="btn"></button>
</div>
</template>

<script>
import Vue from 'vue'
import Clickoutside from 'klement/utils/clickoutside'
import Popper from 'klement/utils/vue-popper';
import merge from 'klement/utils/merge';

const NewPopper = {
  props: {
    appendToBody: Popper.props.appendToBody,
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    arrowOffset: Popper.props.arrowOffset
  },
  methods: Popper.methods,
  data() {
    console.log(merge({ visibleArrow: true }, Popper.data()))
    return merge({ visibleArrow: true }, Popper.data());
  },
  beforeDestroy: Popper.beforeDestroy
};

const PLACEMENT_MAP = {
  left: 'bottom-start',
  center: 'bottom',
  right: 'bottom-end'
};

export default {
  mixins:[Popper],

  props:{
    readOnly:{
      type: Boolean,
      default: false
    },
    disabled: {

    },
    defaultValue:{},
    value:{},
    align: {
      type: String,
      default: 'center'
    },
  },

  directives: { Clickoutside },

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
        // console.log('pickerVisible');
        
      }else{
        this.hidePicker()
        // this.emitChange(this.value);
        this.userInput = null;
      }
    },
    parseValue: {
      immediate: true,
      handler(val) {
        if(this.picker) {
          this.picker.value = val;
        }
      }
    }
  },
  methods:{
    handleInput(e){
      // console.log('input=>>>>>',);
      
    },
    handleFocus(e){
      // console.log(e);
      if(!this.pickerVisible){
        this.pickerVisible = true;
      }
      this.$emit('focus', this)
    },
    handleClose(e){
      // console.log(e);
      if (!this.pickerVisible) return;
      this.pickerVisible = false;
    },
    showPicker(){
      if(!this.picker){
        this.mountPicker()
      }

      this.updatePopper();

      this.picker.value = this.parseValue
      this.pickerVisible = this.picker.visible = true;
    },
    hidePicker() {
      if (this.picker) {
        this.pickerVisible = this.picker.visible = false;
      }
    },
    mountPicker(){

      this.picker = new Vue(this.panel).$mount();
      this.picker.defaultValue = this.defaultValue
      // this.popperElm = this.picker.$el;
      this.popperElm = this.picker.$el;
      // console.log(this.popperElm);
      this.picker.selectionMode = this.selectionMode;

      this.$el.appendChild(this.picker.$el)

      this.picker.$on('pick', (date = '', visible = false) => {
        // console.log(date);
        
        this.userInput = null;
        this.pickerVisible = this.picker.visible = visible
        this.emitInput(date);
      })
    },
    emitInput(val) {
        const formatted = val;
        this.$emit('input', formatted);
        // console.log(val);
        
    }
  },
  computed:{
    pickerDisabled() {
      return this.disabled;
    },
    selectionMode() {
      if (this.type === 'week') {
        return 'week';
      } else if (this.type === 'month') {
        return 'month';
      } else if (this.type === 'year') {
        return 'year';
      } else if (this.type === 'dates') {
        return 'dates';
      }

      return 'day';
    },
    displayValue(){
      return this.parseValue
    },
    parseValue() {
      return this.value
    },
    reference() {
      const reference = this.$refs.reference;
      return reference.$el || reference;
    },
  },
  created() {
    this.popperOptions = {
      boundariesPadding: 0,
      gpuAcceleration: false
    };
    this.placement = PLACEMENT_MAP[this.align] || PLACEMENT_MAP.left;
  }
}

</script>
<style>
</style>