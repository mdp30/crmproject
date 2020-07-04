<template>
  <div id="login" style="width:500px;margin:150px auto">
    <el-form :model="login" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="name">
        <el-input v-model="login.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="login.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { http, login } from "./api/api.js";
export default {
  data() {
    return {
      login: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      if (this.login.user == "") {
        this.$message.error("请输入账号");
      } else if (this.login.password == "") {
        this.$message.error("请输入密码");
      } else {
        this.$http
          .post(
            http + login,
            {
              username: this.login.user,
              password: this.login.password
            },
            { emulateJSON: true }
          )
          .then(
            data => {
              if (data.data.success) {

                localStorage.token = data.data.data.token;
                location.href = "/";
              } else {
                this.$message.error(data.data.msg);
              }
            },
            err => {
              this.$message.error(data.data.message);
            }
          );
      }
    }
  }
};
</script>

<style>
</style>