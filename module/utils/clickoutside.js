/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 21:25:28
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-15 22:34:47
 */
import Vue from 'vue'
import { on } from './dom';

const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;

on(document, 'mousedown', e => (startClick = e));

on(document, 'mouseup', e => {
    nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
})


function createDocumentHandler(el, binding, vnode){
    console.log(el);
    
    return function( mouseup = {}, mousedown = {}){
        console.log(vnode);
        if(!vnode || 
            !vnode.context ||
            !mouseup.target ||
            !mousedown.target ||
            el.contains(mouseup.target) ||
            el.contains(mousedown.target) ||
            el === mouseup.target ||
            el === mousedown.target ||
            (vnode.context.popperElm &&
            (vnode.context.popperElm.contains(mouseup.target) ||
            vnode.context.popperElm.contains(mousedown.target)))) return;
        if (binding.expression && 
            el[ctx].methodName &&
            vnode.context[el[ctx].methodName]){
                vnode.context[el[ctx].methodName]()
        }else{
            el[ctx].bindingFn && el[ctx].bindingFn();
        }
    }
}

/**
 * v-clickoutside
 * @desc 点击元素外面才会触发的事件
 * @example
 * ```vue
 * <div v-clickoutside="handleClose">
 * ```
 */
export default {
    bind(el, binding, vnode) {
        nodeList.push(el);
        const id = seed++;
        el[ctx] = {
            id,
            documentHandler: createDocumentHandler(el, binding, vnode),
            methodName: binding.expression,
            bindingFn: binding.value
        }
    }
}