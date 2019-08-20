/*
 * @Description: 
 * @Version: 2.0
 * @Autor: kakachake
 * @Date: 2019-08-10 17:03:48
 * @LastEditors: kakachake
 * @LastEditTime: 2019-08-19 19:33:39
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Klement from '../module/index'
import '../packages/theme/lib/index.css' 
import kMessage from 'kmessage'
// import Button from '../packages/button/index'


Vue.prototype.$kMessage = kMessage;

Vue.use(Klement)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
