/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-10 17:03:48
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-15 11:48:35
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Klement from '../module/index'
import '../packages/theme/lib/index.css' 
// import Button from '../packages/button/index'

Vue.use(Klement)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
