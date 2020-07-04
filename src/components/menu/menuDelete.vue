<template>
  <div id="menuDelMain">
    <el-dialog title="删除菜单" :visible.sync="subStatus" @close="fun(tname)">
      你确定要删除菜单
      <span style="color:deepskyblue">{{tableRow.name}}</span>
      吗？
      <div slot="footer" class="dialog-footer">
        <el-button @click="subStatus = false">取 消</el-button>
        <el-button type="primary" @click="deleteMenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http, menu } from "@/api/api.js";
export default {
  mounted() {},
  data() {
    return {
      subStatus: this.status, //对话框状态
      addForm: {
        menutIds: this.tableRow.id
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
    deleteMenu() {
      
        this.$http
          .delete(http + menu, {
            params: {
              id: this.tableRow.id
            }
          })
          .then(
            val => {
              if (val.data.success) {
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
      } 
    
  }
};
</script>

<style>
</style>