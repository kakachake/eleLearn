<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 09:11:39
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-15 10:00:17
 -->
<template>
  <a
    :class="[
      'k-link',
      type ? `k-link--${type}`:'',
      {
        'is-disabled': disabled,
        'is-underline': underline
      }
    ]" 
    :href="disabled ? null: href"
    v-bind="$attrs"
    >
    
    <i :class="icon" v-if="icon"></i>

    <span v-if="$slots.default" class="k-link--inner">
      <slot></slot>
    </span>

    <template v-if="$slots.icon"><slot v-if="$slots.icon" name="icon"></slot></template>
  </a>
</template>

<script>
export default {
    name: 'KLink',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      underline: {
        type: Boolean,
        default: true
      },
      disabled: Boolean,
      href: String,
      icon: String
    },
  
    methods: {
      handleClick(event) {
        if (!this.disabled) {
          if (!this.href) {
            this.$emit('click', event);
          }
        }
      }
    }
}

</script>
<style>
</style>