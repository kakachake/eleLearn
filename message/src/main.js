/*
 * @Description: ;
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-19 10:13:21
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-19 14:03:29
 */
import Vue from 'vue';
import main from './main.vue';
let MessageConstructor = Vue.extend(main);
let instance;
let instances = [];
let seed = 1;

const Message = function(options){ //创建message
    if(Vue.prototype.$isServer) return;
    options = options || {};
    if(typeof options === 'string') {
        options = {
            message: options
        }
    }   //this.$message('string')的情况
    let userOnClose = options.onClose; //保存用户的close回调
    let id = 'message_' + seed++; //设置当前message id
    options.onClose = function (){ //重新设置onClose函数
        Message.close(id, userOnClose) //将用户的close作为回调传入
    }
    instance = new MessageConstructor({
        data: options
    })
    instance.id = id;
    instance.$mount();
    if(options.site !== 'center'){
        let verticalOffset = options.offset || 20;
        instances.forEach(item => {
            verticalOffset += item.$el.offsetHeight + 16;
        })
        console.log(instances);
        instance.verticalOffset = verticalOffset
    }
    document.body.appendChild(instance.$el);
    instance.visible = true;
    instances.push(instance);
    return instance;
};

['success', 'warning', 'info', 'error', 'loading'].forEach(type => {
    Message[type] = options => {
        if(typeof options === 'string') {
            options = {
                message: options
            }
        }
        options.type = type;
        return Message(options)
    }
})

Message.close = function(id, userOnClose) {
    let len = instances.length;
    instances.forEach((instance, idx)=>{
        if( instance.id === id){
            if(typeof userOnClose === 'function'){
                userOnClose()
            }
            let verticalOffset = instance.verticalOffset;
            console.log(verticalOffset);
            
            instances.splice(idx, 1);
            if(len === 1)
            {
                return 
            }else{
                let startHeight = verticalOffset
                for(let i = idx, len = instances.length; i < len; i++){
                    verticalOffset = instances[i].verticalOffset
                    instances[i].verticalOffset = startHeight;
                    startHeight = verticalOffset
                } 
            }
        }
    })
}

Message.closeAll = function() {
    for (let i = instances.length - 1; i >= 0; i--) {
      instances[i].close();
    }
};

export default Message;