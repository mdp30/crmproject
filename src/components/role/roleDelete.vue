<template>
  <div id="roleDeleteMain">
    <el-dialog title="删除用户" :visible.sync="subStatus" @close="fun(tname)">
      你确定要删除用户
      <span style="color:deepskyblue">{{tableRow.name}}</span>
      吗？
      <div slot="footer" class="dialog-footer">
        <el-button @click="subStatus = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http, role } from "@/api/api.js";
export default {
  mounted() {},
  data() {
    return {
      subStatus: this.status, //对话框状态
      addForm: {
        roleIds: this.tableRow.roleid
      }
    };
  },
  props: ["status", "fun", "tname", "tableRow", "refresh"],
  watch: {
    status() {
      this.subStatus = this.status;
    }
  },
  methods: {
    deleteUser() {
      if (this.tableRow.status != 3) {
        this.$http
          .delete(http + role, {
            params: {
              roleId: this.tableRow.id
            }
          })
          .then(
            val => {
              if (val.data.msg === "成功") {
                this.subStatus = false;
                
                // 提交后刷新列表
                this.refresh();
                this.$message.success("删除成功");
              }
            },
            err => {
              this.$message.error(err.data.message);
            }
          );
      } else {
        this.$message.error("用户已经删除，请勿重复操作");
      }
    }
  }
};
</script>

<style>
</style>