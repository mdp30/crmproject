<template>
  <div id="roleAddMain">
    <el-dialog title="修改用户" :visible.sync="subStatus" @close="fun(tname)">
      {{addForm}}
      <el-form ref="form" :model="addForm" label-width="80px" v-if="deptOptions">
        <el-form-item label="角色名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="addForm.tips"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-cascader
            v-model="addForm.deptid"
            :options="deptOptions"
            :show-all-levels="false"
            :props="props"
          ></el-cascader>
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
import { http, deptList, role } from "@/api/api.js";
export default {
  mounted() {
    this.getDeptLlist();
  },
  data() {
    return {
      subStatus: this.status, //对话框状态
      addFormType: {
         tips: "",
        name: "",
        deptid: ""
      },
      addForm: "",
      deptOptions: "",
      props: {
        value: "id",
        label: "simplename",
        children: "children"
      }
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
    // 获取部门列表
    getDeptLlist() {
      this.$http.get(http + deptList).then(
        val => {
          this.deptOptions = this.deptNullClear(val.data.data);
        },
        err => {}
      );
    },
    // 递归清空部门信息
    deptNullClear(v) {
      for (var i = 0; i < v.length; i++) {
        if (v[i].children.length == 0) {
          v[i].children = null;
        } else {
          this.deptNullClear(v[i].children);
        }
      }
      return v;
    },
    // 修改用户
    upUser() {
      let itemFlag = true;
      for (let i in this.addFormType) {
        if (this.addForm[i] == "") {
          itemFlag = false;
        }
      }
      if (itemFlag) {
        // 处理部门id,是数组的话则处理
        if (Array.isArray(this.addForm.deptid)) {
          this.addForm.deptid = this.addForm.deptid[
            this.addForm.deptid.length - 1
          ];
        }

        this.$http.post(http + role, JSON.stringify(this.addForm), { emulateJSON: true }).then(
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
    },
    setDate(t) {
      // 处理时间格式
      var newTime = new Date(t);
      return (
        newTime.getFullYear() +
        "-" +
        (newTime.getMonth() + 1) +
        "-" +
        newTime.getDate()
      );
    }
  }
};
</script>

<style>
</style>