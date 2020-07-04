<template>
  <div id="deptAddMain">
    <el-dialog title="修改用户" :visible.sync="subStatus" @close="fun(tname)">
      <el-alert
        v-if="tableRow===''"
        title="当前创建公司一级部门,如需创建子部门请提前选择要创建的父级部门"
        type="info"
        show-icon
        :closable="false"
        style="margin:10px"
      ></el-alert>
      <el-alert
        v-else
        :title="'当前创建的是 '+tableRow.fullname+' 下的部门,如需创建子部门请提前选择要创建的父级部门'"
        type="info"
        show-icon
        :closable="false"
        style="margin:10px"
      ></el-alert>
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
        <el-button type="primary" @click="upDept">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http, deptList, dept } from "@/api/api.js";
export default {
  data() {
    return {
      subStatus: this.status, //对话框状态
      addForm: {
        simplename: "", //部门简称
        fullname: "" //部门全程
      },
      deptOptions: "",
      props: {
        value: "id",
        label: "simplename",
        children: "children"
      }
    };
  },
  props: ["status", "fun", "tname", "refresh", "tableRow"],
  watch: {
    status() {
      this.subStatus = this.status;
    }
  },
  methods: {
    // 上传添加或修改用户
    upDept() {
      //判断是否输入完整
      let itemFlag = true;
      for (let i in this.addForm) {
        if (this.addForm[i] == "") {
          itemFlag = false;
        }
      }
      if (itemFlag) {
        
        //设置pid
        if (this.tableRow == "") {
          this.addForm.pid = 0;
        } else {
          this.addForm.pid = this.tableRow.id;
        }
        //排序值
        this.addForm.num = 0;

        this.$http
          .post(http + dept, JSON.stringify(this.addForm), {
            emulateJSON: true
          })
          .then(
            val => {
              if (val.data.success) {
                //成功后改变状态并清空表单数据
                this.subStatus = false;
                for (let i in this.addForm) {
                  this.addForm[i] = "";
                }
                // 提交后刷新列表并提示
                this.refresh();
                this.$message.success("添加部门成功");
              }
            },
            err => {
              this.$message.error(err.data.message);
            }
          );
        delete this.addForm.num;
        delete this.addForm.pid;
      } else {
        this.$message.error("请补全信息");
      }
    },
    setDate(t) {
      // 处理时间格式
      var newTime = new Date(t);
      return t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();
    }
  }
};
</script>

<style>
</style>