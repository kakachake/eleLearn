<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-18 21:18:15
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-18 22:30:44
 -->
<template>
    <transition name="top">
        <div
            v-if="visible"
            @click.stop = "handleClick"
            :style="{
                'right': styleRight,
                'bottom': styleBottom
            }"
            class="k-backtop"
            >
                <slot>
                    <i class="k-icon-caret-top"></i>
                </slot>
        </div>
    </transition>
</template>

<script>
import _ from 'underscore'
export default {
    name:"backTop",
    props: {
        visibilityHeight:{
            type: Number,
            default: 200
        },
        target: [String],
        right: {
            type: Number,
            default: 40
        },
        bottom: {
            type: Number,
            default: 40
        },
        rate: {
            type: Number,
            default: 2
        },
        back: {
            type: Number,
            default: 0
        }
    },
    computed:{
        styleRight(){
            return this.right+'px'
        },
        styleBottom(){
            return this.bottom+'px'
        }
    },
    data(){
        return {
            visible: false,
            el: null,
            container: null
        }
    },
    mounted(){
        this.init();
        this.throttledScrollHandler = _.throttle(this.onScroll, 300);
        this.container.addEventListener('scroll', this.throttledScrollHandler);
    },
    methods:{
        init(){
            this.container = document;
            this.el = document.documentElement;
            console.log(this.container, this.el);
            if(this.target){
                this.el = document.querySelector(this.target);
                if(!this.el){
                    throw new Error(`taget is not existed: ${this.target}`)
                }
                this.container = this.el
            }
        },
        onScroll(){
            const scrollTop = this.el.scrollTop
            this.visible = scrollTop > this.visibilityHeight;
            console.log('scroll');
        },
        handleClick(){
            let scroll = this.el.scrollTop;
            let back = this.back;
            let rate = this.rate;
            let el = this.el;
            var backTop = function(){
                console.log(scroll);
                scroll -= (scroll - back) / (rate || 2)
                el.scrollTop = scroll;
                
                if(el.scrollTop > back){
                    requestAnimationFrame(backTop)
                }
            }
            backTop()
        }
    }
}

</script>
<style>
.top-enter-active{
    transition: .5s ease;
    animation: myTopVis .5s;
}

.top-leave-active{
    transition: .5s ease;
    animation: myTopUnvis .5s;
}

@keyframes myTopVis
{
    0%   {transform: scale(0)}
    50%  {transform: scale(1.2)}
    100% {transform: scale(1)}
}

@keyframes myTopUnvis
{
    0%   {transform: scale(1)}
    50%  {transform: scale(1.2)}
    100% {transform: scale(0)}
}

</style>