import Vue from 'vue'
import login from './login.vue'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(login)
}).$mount('#login')
