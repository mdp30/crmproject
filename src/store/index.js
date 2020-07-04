import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import userInfo from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  
  },
  actions: {
  },
  modules: {
    menu,
    userInfo
  }
})
