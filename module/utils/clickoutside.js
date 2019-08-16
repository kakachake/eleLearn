/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-15 21:25:28
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-16 10:42:36
 */
import Vue from 'vue'
import { on } from './dom';

const nodeList = [];
const ctx = '@@clickoutsideContext';

let startClick;
let seed = 0;


//监听鼠标按下和抬起事件，并记录事件值event
on(document, 'mousedown', e => (startClick = e)); 

on(document, 'mouseup', e => {
    nodeList.forEach(node => node[ctx].documentHandler(e, startClick));
})


function createDocumentHandler(el, binding, vnode){ //首先传入三个值初始化函数，闭包保存三个值
    // console.log(el);
    
    return function( mouseup = {}, mousedown = {}){  //目的是为了查看鼠标点击事件是否在当前元素上，若在则不执行
        // console.log(vnode);
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
            vnode.context.popperElm.contains(mousedown.target)))) return; //若当前鼠标点击事件不符当前判断条件则该元素上的事件不执行
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
    bind(el, binding, vnode) { //绑定el
        nodeList.push(el); //将元素值保存到nodelist数组
        const id = seed++;
        el[ctx] = { //保存上下文信息
            id, 
            documentHandler: createDocumentHandler(el, binding, vnode),  //通过闭包，创建检测函数，每次鼠标点击都会触发
            methodName: binding.expression, //保存需要触发的事件名称
            bindingFn: binding.value //保存函数
        }
    },

    update(el, binding, vnode) {
        el[ctx].documentHandler = createDocumentHandler(el, binding, vnode);
        el[ctx].methodName = binding.expression;
        el[ctx].bindingFn = binding.value;
    },
    
    unbind(el) {
    let len = nodeList.length;

    for (let i = 0; i < len; i++) {
        if (nodeList[i][ctx].id === el[ctx].id) {
        nodeList.splice(i, 1);
        break;
        }
    }
    delete el[ctx];
    }
}