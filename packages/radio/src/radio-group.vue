<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-20 11:24:43
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-20 11:32:30
 -->
<template>
  <div
    class = "el-radio-group"
    role = "radiogroup"
    >
      <slot>
          
      </slot>
  </div>
</template>

<script>
export default {
    name: 'kRadioGroup',
    props:{
        value:{},
        size: String,
        fill: String,
        disabled: Boolean
    },

    computed:{
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        radioGroupSize() {
            return this.size;
        }        
    },

    created(){
        this.$on('handleChange', value=>{
            this.$emit('change', value);
        })
    }
}

</script>
<style>
</style>