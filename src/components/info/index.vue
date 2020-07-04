<template>
  <div id="info">
    <p>账号信息：{{$store.state.userInfo.info.profile.account}}</p>
    <p>
      修改密码：
      <a @click="dialogState = true" style="color:deepskyblue">修改</a>
    </p>
    <p>名字：{{$store.state.userInfo.info.profile.name}}</p>
    <p>生日：{{$store.state.userInfo.info.profile.birthday}}</p>
    <p>性别：{{$store.state.userInfo.info.profile.sex===1?'男':'女'}}</p>
    <p>邮箱：{{$store.state.userInfo.info.profile.email}}</p>
    <p>电话：{{$store.state.userInfo.info.profile.phone}}</p>
    <p>部门：{{$store.state.userInfo.info.profile.dept}}</p>
    <p>
      <el-button type="danger" @click="clearOut">退出</el-button>
    </p>
    <setpass :dialogState="dialogState" :closeState='closeState'></setpass>
  </div>
</template>

<script>
import setpass from "./set.vue";
export default {
  data() {
    return {
      dialogState: false
    };
  },
  methods: {
    clearOut() {
      localStorage.clear();
      location.href = "/login";
    },
    //修改對話框狀態
    closeState(){
      this.dialogState = false
    }
  },
  components: {
    setpass
    }
};
</script>

<style>
</style>