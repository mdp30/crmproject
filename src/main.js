import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import resource from 'vue-resource'
import echart from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = echart
Vue.use(ElementUI)
Vue.use(resource)
Vue.use(router)

  //路由拦截
  // router.beforeEach((to, from, next) => {
  
  //   if(Object.is(to.name,'login')) {
  //     next();
  //     return
  //   }
    
  //   if(localStorage.token) {
  
  //     //设置token请求头
  //     Vue.http.headers.common['Authorization']=localStorage.token
  
  //     next()
  //   }else {
  //     router.push({name:'login'})
  //   }
  
  //   });



  // 拦截ajax请求
  Vue.http.interceptors.push((res,next)=>{
    if(localStorage.token) {
  
          //设置token请求头
          Vue.http.headers.common['Authorization']=localStorage.token
      
          next()
        }else {
          // router.push({name:'login'})
          location.href = '/login'
        }
        next((res)=>{
          if(res.status===401){
            // router.push({name:'login'})
            location.href = '/login'
          }
          return res
        })
  })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
