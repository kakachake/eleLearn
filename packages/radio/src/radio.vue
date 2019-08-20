<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-20 09:34:32
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-20 10:27:01
 -->
<template>
  <label
    class="el-radio"
    :class="[
        border && radioSize ? 'el-radio--'+radioSize : '',
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
        <span class="el-radio__input" 
            :class="{
                'is-disable': isDisabled,
                'is-checked': model === label
            }">
            <span class="el-radio__inner"></span>
            <input 
                ref = "radio"
                type = "radio"
                class = "el-radio__original"
                :value="label"
                v-model="model"
                @focus="focus = true"
                @blur=" focus = false "
                @change = "handleChange"
                :name = "name"
                :disabled = "isDisabled"
                tabindex="-1"
                >
        </span>
        <span class="el-radio__label" @keydown.stop>
            <slot></slot>
            <template v-if="!$slot.default">
                {{label}}
            </template>
        </span>
  </label>
</template>

<script>
import Emitter from 'klement/mixins/emitter'

export default {
    name: 'kRadio'

}

</script>
<style>
</style>