<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-11 09:44:10
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-11 09:50:44
 -->
<template>
  <div class="k-button-group">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'KButtonGroup'
  };
</script>
<style lang="scss" scoped>
    @import './style/lib/button.css'
</style>
