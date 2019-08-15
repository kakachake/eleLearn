<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-10 17:05:42
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-15 11:48:16
 -->
<template>
    <button 
        :type="nativeType" 
        class="k-button"
        @click="handleClick"
        :class="[
            type ? 'k-button--' + type : '',
            size ? 'k-button--' + size : '',
            {
                'is-loading':loading,
                'is-plain': plain,
                'is-disabled': disabled,
                'is-circle': circle,
                'is-round': round,
                'is-long':long
            }
        ]"
    >
        <i class="el-icon-loading" v-if="loading"></i>
        <i :class="icon" v-if="icon && !loading"></i>
        <span v-if="$slots.default"><slot></slot></span>
    </button>
</template>

<script>
export default {
    name: 'KButton',
    props:{
        type: {
            type: String,
            default: 'default'
        },
        size: String,
        icon: {
            type: String,
            default: ''
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        autofocus: Boolean,
        round: Boolean,
        circle: Boolean,
        long: Boolean
    },
    methods:{
        handleClick(evt){
            if(this.$props.disabled){
                return ;
            }
            this.$emit('click', evt)
        }
    }
}

</script>
<style lang="scss" scoped>
// @import '../../theme/lib/button.css';
</style>