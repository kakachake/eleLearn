<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-19 10:13:27
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-19 13:59:21
 -->
<template>

      <div
        :class="[
            'k-message',
            site==='center'?'k-message--center':'',
            {
                'is-center': center,
                'is-closable' : showClose,
                'is-mask': true
            },
        ]"
        :style="positionStyle"
        >
        <transition name="k-message-fade" @after-leave = "handleAfterLeave">
            <div 
                v-show="visible"
                :class="[
                    'k-message__main',
                    customClass,
                    type&&!iconClass?`k-message--${type}`:'',
                ]"
                
                
                @mouseenter="clearTimer"
                @mouseleave="startTimer"

                >
                    <i :class="iconClass" v-if="iconClass"></i>
                    <i :class="typeClass" v-else></i>
                    <slot v-if="message">
                        <p v-if = "!dangerouslyUseHTMLString" class="k-message__content"> {{message}} </p>
                        <p v-else v-html = "message" class="k-message__content">  </p>
                    </slot>
                    <i v-if="showClose" class="k-message__closeBtn k-icon-close" @click="close"></i>
            </div>
        </transition>
    </div>
</template>

<script>
import { clearTimeout, setTimeout } from 'timers';
export default {
    name:"kMessage",
    data(){
        return {
            visible: false,
            message: '',
            duration: 3000,
            type: 'loading',
            iconClass: '',
            customClass: '',
            onClose: null,
            showClose: false,
            closed: false,
            verticalOffset: 20,
            timer: null,
            dangerouslyUseHTMLString: false,
            center: false,
            site: 'top'
        }
    },
    computed: {
        typeClass() {
            return this.type && !this.iconClass ? `k-message__icon k-icon-${this.type}` : '';
        },
        positionStyle() {
            if(this.site === 'center'){
                return 
            }else{
                return {
                    'top' : `${ this.verticalOffset }px`
                }
            }
        }
    },
    methods:{
        handleAfterLeave(){
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },

        close(){
            this.closed = true;
            this.visible = false;
            if(typeof this.onClose === 'function') {
                this.onClose(this)
            }
        },

        clearTimer(){
            clearTimeout(this.timer)
        },

        startTimer(){
            if(this.duration > 0) {
                this.timer = setTimeout(()=>{
                    if(!this.closed){
                        this.close()
                    }
                }, this.duration)
            }
        },

        keydown(e){
            if(e.keyCode === 27){
                this.close()
            }
        }
    },
    mounted(){
        if(this.duration) this.startTimer();
        document.addEventListener('keydown', this.keydown);
        // this.$nextTick(()=>{
        //     this.visible = true
        // })
    },

    beforeDestroy(){
        document.removeEventListener('keydown', this.keydown)
    }
}

</script>
<style>
</style>