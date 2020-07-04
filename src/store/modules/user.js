export default {
  state: {
    info:'',
    menuList:''
  },
  mutations: {
    setinfo(state,newData){
      state.info = newData
      
    },
    setmenuList(state,newData){
      state.menuList = newData
      
    }
  }
}