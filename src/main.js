/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-10 17:03:48
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-10 17:23:38
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')