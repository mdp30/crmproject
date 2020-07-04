import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/mainPage'
import Login from '../login.vue'
import Index from '../components/index'
import Info from '../components/info'
import mgr from '../components/mgr'
import role from '../components/role'
import dept from '../components/dept'
import menu from '../components/menu'

Vue.use(VueRouter)
  const routes = [
  {
      path: '/',
      name: 'main',
      component:Main,
      children:[
        {
          path:'index',
          name:'index',
          component:Index
        },
        {
          path:'info',
          name:'info',
          component:Info
        },
        {
          path:'mgr',
          name:'mgr',
          component:mgr
        },
        {
          path:'role',
          name:'role',
          component:role
        },
        {
          path:'dept',
          name:'dept',
          component:dept
        },
        {
          path:'menu',
          name:'menu',
          component:menu
        }
      ],redirect:'index'
  },
  {
    path: '/login',
    name: 'login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
