/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-20 10:26:35
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-20 10:39:27
 */

 export default {
     methods: {
         dispatch(componentName, eventName, params){
             let parent = this.$parent || this.$root //两者的区别在于，如果存在多级子组件，通过parent访问得到的是最近的父组件，而root 访问得到的是根父组件
             let name = parent.$options.name;

             while(parent && (!name || name != componentName)) {
                 parent = parent.$parent;

                 if(parent){
                     name = parent.$options.name;
                 }
             }
             if(parent) {
                 parent.$emit.apply(parent, [eventName].concat(params)) //找到之后通过$emit触发事件
             }
         }
     },
 }