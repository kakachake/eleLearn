/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 21:25:53
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-15 22:04:37
 */
 
export const on = (function(){
    return function(element, event, handler){
        if(element && event && handler){
            element.addEventListener(event, handler, false); //禁止冒泡执行
        }
    }
})()