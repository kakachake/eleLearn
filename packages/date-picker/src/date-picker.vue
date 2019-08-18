<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 11:33:59
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-18 12:57:51
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
</div>
</template>

<script>
import Vue from 'vue'
import Clickoutside from 'klement/utils/clickoutside'
import Popper from 'klement/utils/vue-popper';
import merge from 'klement/utils/merge';
import { parse } from 'path';
import { formatDate } from 'klement/utils/date-util';

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

const DEFAULT_FORMATS = {
  date: 'YYYY-MM-DD',
  month: 'YYYY-MM',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  time: 'HH:mm:ss',
  week: 'yyyywWW',
  timerange: 'HH:mm:ss',
  daterange: 'YYYY-MM-DD',
  monthrange: 'YYYY-MM',
  datetimerange: 'YYYY-MM-DD HH:mm:ss',
  year: 'YYYY'
};

const PLACEMENT_MAP = {
  left: 'bottom-start',
  center: 'bottom',
  right: 'bottom-end'
};

const DATE_FORMATTER = function(value, format) {
  return formatDate(value, format);
}

const formatAsFormatAndType = (value, customFormat, type) => { //格式化时间按照类型和format
  // console.log('value=>>>>>',value)
  if (!value) return null;
  const formatter = (
    TYPE_VALUE_RESOLVER_MAP[type] ||
    TYPE_VALUE_RESOLVER_MAP['default']
  ).formatter;
  const format = customFormat || DEFAULT_FORMATS[type];
  return formatter(value, format);
}

///parse 把String型的字符串转换成特定格式的date类型  
///format 把Date型的字符串转换成特定格式的String类型

const TYPE_VALUE_RESOLVER_MAP = {
  default:{
    formater(value){
      if(!value) return '';
      return '' + value;
    },
    parser(text) {
      if(text === undefined || text == '') return null;
      return text
    }
  },
  date: {
    formatter: DATE_FORMATTER,
    // parser: DATE_PARSER
  },
}


export default {
  mixins:[NewPopper],

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
    format: String,
    rangeSeparator: {
      default: '-'
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

      this.picker.value = this.parsedValue
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
      const formattedValue = formatAsFormatAndType(this.parsedValue, this.format, this.type, this.rangeSeparator);
      // console.log('formattedValue=>>>>',this.parsedValue)
      if(this.value){
        console.log(this.value);
        
        return formattedValue
      }
    },
    parsedValue() {
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