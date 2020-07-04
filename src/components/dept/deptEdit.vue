<template>
  <div id="mgrAddMain">
    <el-dialog title="修改菜单" :visible.sync="subStatus" @close="fun(tname)">
    
      <el-form ref="form" :model="addForm" label-width="80px" v-if="addForm">
        <el-form-item label="部门全称">
          <el-input v-model="addForm.fullname"></el-input>
        </el-form-item>
        <el-form-item label="部门简称">
          <el-input v-model="addForm.simplename"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subStatus = false">取 消</el-button>
        <el-button type="primary" @click="upUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http, dept } from "@/api/api.js";
export default {
  data() {
    return {
      subStatus: this.status, //对话框状态
      addFormType: {
        simplename: "", //部门简称
        fullname: "" //部门全程
      },
      addForm: "",
    };
  },
  props: ["status", "fun", "tname", "tableRow", "refresh"],
  watch: {
    status() {
      this.subStatus = this.status;
    },
    tableRow() {
      var json = {};
      for (let i in this.tableRow) {
        this.$set(json, i, this.tableRow[i].toString());
      }
      this.addForm = json;
    }
  },
  methods: {
    // 修改用户
    upUser() {
      let itemFlag = true;
      for (let i in this.addFormType) {
        if (this.addForm[i] == "") {
          itemFlag = false;
        }
      }
      if (itemFlag) {
        this.$http.post(http + dept, JSON.stringify(this.addForm), { emulateJSON: true }).then(
          val => {
            if (val.data.msg === "成功") {
              //成功后改变状态并清空表单数据
              this.subStatus = false;
              for (let i in this.addForm) {
                this.addForm[i] = "";
              }
              // 修改成功后刷新并提示
              this.refresh();
              this.$message.success("修改成功");
            }
          },
          err => {
            this.$message.error(err.data.message);
          }
        );
      } else {
        this.$message.error("请补全信息");
      }
    }
  }
};
</script>

<style>
</style>