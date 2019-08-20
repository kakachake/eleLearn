<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-20 09:34:32
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-20 11:29:03
 -->
<template>
  <label
    class="k-radio"
    :class="[
        border && radioSize ? 'k-radio--'+radioSize : '',
        {
            'is-disabled': isDisabled,
            'is-focus': focus,
            'is-bordered': focus,
            'is-checked': model === label
        }
    ]"
    role = "radio"
    :tabindex="tabIndex"
    >
        <span class="k-radio__input" 
            :class="{
                'is-disable': isDisabled,
                'is-checked': model === label
            }">
            <span class="k-radio__inner"></span>
            <input 
                ref = "radio"
                type = "radio"
                class = "k-radio__original"
                :value="label"
                v-model="model"
                @focus="focus = true"
                @blur=" focus = false "
                @change = "handleChange"
                :name = "name"
                :disabled = "isDisabled"
                tabindex="-1"
                v-show="false"
                >
        </span>
        <span class="k-radio__label" @keydown.stop>
            <slot></slot>
            <template v-if="!$slots.default">
                {{label}}
            </template>
        </span>
  </label>
</template>

<script>
import Emitter from 'klement/mixins/emitter'

export default {
    name: 'kRadio',
    
    mixins:[Emitter],

    props: {
        value: {},
        label: {},
        disabled: Boolean,
        name: String,
        border: Boolean,
        size: String
    },

    data() {
        return {
            focus: false
        }
    },

    computed: {
        isGroup() {
            let parent = this.$parent;
            while(parent) {
                if(parent.$options.name !== 'kRadioGroup'){
                    parent = parent.$parent;
                } else {
                    this._radioGroup = parent;
                    return true
                }
            }
            return false
        },
        model: {
            get() {
                return this.isGroup ? this._radioGroup.value : this.value;
            },
            set(val) {
                if(this.isGroup) {
                    this._radioGroup.$emit('input', val)
                } else {
                    this.$emit('input', val);
                }
            }
        },
        radioSize() {
            return this.isGroup 
                ? this._radioGroup.radioGroupSize || this.size
                : this.size
        },
        isDisabled() {
            return this.isGroup
                ? this._radioGroup.disabled || this.disabled
                : this.disabled
        },
        tabIndex() {
            
        }
    },

    methods:{ 
        handleChange() {
            this.$nextTick(()=>{
                this.$emit('change', this.model)
                this.isGroup && this._radioGroup.$emit('handleChange', this.model)
            })
        }
    }
}

</script>
<style>
</style>