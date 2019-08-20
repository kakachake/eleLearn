/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-20 10:26:35
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-20 10:30:48
 */

 export default {
     methods: {
         dispatch(name, eventName, params){
             let parent = this.$parent || this.$root //两者的区别在于，如果存在多级子组件，通过parent访问得到的是最近的父组件，而root 访问得到的是根父组件
         }
     },
 }