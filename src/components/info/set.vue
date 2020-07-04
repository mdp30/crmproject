<template>
  <div id="setpass">
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" @close="clearContent">
      <el-form ref="form" :model="pass" label-width="120px">
        {{pass}}
        <el-form-item label="旧密码">
          <el-input v-model="pass.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="pass.password"></el-input>
        </el-form-item>
        <el-form-item label="重复新密码">
          <el-input v-model="pass.rePassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setpass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http, updatePwd } from "@/api/api.js";
export default {
  data() {
    return {
      pass: {
        oldPassword: "",
        password: "",
        rePassword: ""
      },
      dialogFormVisible: this.dialogState
    };
  },
  props: ["dialogState", "closeState"],
  watch: {
    dialogState(a, b) {
      this.dialogFormVisible = this.dialogState;
    }
  },
  methods: {
    // 向服务端发起修改
    setpass() {
      if (this.pass.oldPassword == "") {
        this.$message.error("请输入旧密码");
      } else if (this.pass.password == "") {
        this.$message.error("请输入新密码");
      } else if (this.pass.rePassword == "") {
        this.$message.error("请重复输入新密码");
      } else if (this.pass.rePassword != this.pass.password) {
        this.$message.error("两次输入新密码不一致");
      } else {
        this.$http
          .post(
            http + updatePwd,
            {
              oldPassword: this.pass.oldPassword, 
              password: this.pass.password,
              rePassword: this.pass.rePassword
            },
            { emulateJSON: true }
          )
          .then(
            data => {
              // console.log(data.data);
              if (data.data.msg ==="成功") {

                this.$message.success('修改成功');
                this.dialogFormVisible = false
                //如果密码修改成功跳转重新登陆
                // localStorage.token = data.data.data.token;
                // location.href = "/login";
              } else {
                this.$message.error(data.data.msg);
              }
            },
            err => {
              this.$message.error(data.data.message);
            }
          );
      }
    },
    // 对话框关闭清空表单
    clearContent(){
      for(let i in this.pass){
        this.pass[i] = ''
      }
      //调用父组件同名函数
      this.closeState()
    },
    
  }
};
</script>

<style>
</style>