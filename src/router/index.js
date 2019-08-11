/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-10 17:10:06
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-10 17:29:50
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter)


const routes = [
    {
        path:"/",
        redirect:"helloworld"
    },{
        name:"helloworld",
        path:"/helloworld",
        component: ()=> import('../pages/HelloWorld.vue')
    }
]

var router =  new VueRouter({
    routes
})

export default router;