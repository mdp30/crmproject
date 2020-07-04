<template>
  <div id="mgrAddMain">
    <el-dialog title="修改用户" :visible.sync="subStatus" @close="fun(tname)">
      <el-form ref="form" :model="addForm" label-width="100px" v-if="addForm">
        <el-form-item label="菜单名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编码">
          <el-input v-model="addForm.code"></el-input>
        </el-form-item>
        <el-form-item label="组件">
          <el-input v-model="addForm.component"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="addForm.url"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="addForm.status">
            <el-radio label="0">弃用</el-radio>
            <el-radio label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否是菜单">
          <el-radio-group v-model="addForm.isMenu">
            <el-radio label="0">按钮</el-radio>
            <el-radio label="1">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subStatus = false">取 消</el-button>
        <el-button type="primary" @click="upMenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http, menu } from "@/api/api.js";
export default {
  data() {
    return {
      subStatus: this.status, //对话框状态
      addFormType: {
        name: "",
        code: "",
        component: "",
        url: "",
        status: "",
        isMenu: ""
      },
      addForm: ""
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
    // 修改菜单
    upMenu() {
      let itemFlag = true;
      for (let i in this.addFormType) {
        if (this.addForm[i] == "") {
          itemFlag = false;
        }
      }
      if (itemFlag) {
        this.$http
          .post(http + menu, JSON.stringify(this.addForm), {
            emulateJSON: true
          })
          .then(
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