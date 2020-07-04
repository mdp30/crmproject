<template>
  <div id="roleSetMain">
    <el-dialog 
    title="分配角色" 
    :visible.sync="subStatus" 
    @close="fun(tname)">
      <el-form ref="form" :model="addForm" label-width="80px" v-if="roleTree">
        <el-select v-model="addForm.roleIds" placeholder="未分配请选择">
          <el-option
            v-for="item in roleTree.treeData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subStatus = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { http, roleTree, role } from "@/api/api.js";
export default {
  mounted() {
    this.getRoleTree()
  },
  data() {
    return {
      subStatus: this.status, //对话框状态
      roleTree: "",
      addForm: {
        roleIds: this.tableRow.roleid
      }
    };
  },
  props: ["status", "fun", "tname", "tableRow", "refresh"],
  watch: {
    status() {
      this.subStatus = this.status;
    },
    tableRow() {
      this.addForm.roleIds = this.tableRow.roleid;
    }
  },
  methods: {
    // 获取角色列表
    getRoleTree() {
      this.$http
        .get(http + roleTree, {
          params: {
            idUser: this.$store.state.userInfo.info.profile.id
          }
        })
        .then(
          val => {
            this.roleTree = val.data.data;
          },
          err => {
            console.log(err.data.message);
          }
        );
    },
    // 设置权限
    setRole() {
      if (this.addForm.roleIds) {
        this.$http
          .get(http + role, {
            params: {
              userId: this.tableRow.id,
              roleIds: this.addForm.roleIds
            }
          })
          .then(
            val => {
              if (val.data.msg === "成功") {
                //成功后改变状态并清空表单数据
                this.subStatus = false;
                for (let i in this.addForm) {
                  this.addForm[i] = "";
                }
                // 提交后刷新列表
                this.refresh();
                this.$message.success("角色分配成功");
              }
            },
            err => {
              this.$message.error(err.data.message);
            }
          );
      } else {
        this.$message.error("请选择角色");
      }
    }
  }
};
</script>

<style>
</style>