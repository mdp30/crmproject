<template>
  <div id="dept">
    <!--功能按钮区-->
    <el-button
      v-for="item in $store.state.userInfo.menuList[this.$route.path]"
      :key="item.id"
      type="primary"
      v-show="item.status==1"
      @click="menuListBtn(item.code)"
    >{{item.name}}</el-button>
    <!--用户信息列表区-->
    <div 
    class="userList" 
    v-if="tableData"
    style="padding:10px"
    >
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :highlight-current-row='highlightFlag'
        @cell-click="cellSelect"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="fullname" label="部门全称" sortable width="180"></el-table-column>
        <el-table-column prop="simplename" label="部门简称" sortable width="180"></el-table-column>
        <el-table-column prop="id" label="当前部门id"></el-table-column>
      </el-table>
    </div>
    <!--功能框区-->
    <!--添加用户对话框-->
    <dept-add 
    :status="buttonType.deptAdd" 
    :fun="closeDialog" 
    tname="deptAdd" 
    :refresh="reset"
    :tableRow="tableRow"></dept-add>
    <!--修改部门对话框-->
    <dept-edit
      :status="buttonType.deptEdit"
      :fun="closeDialog"
      tname="deptEdit"
      :tableRow="tableRow"
      :refresh="reset"
    ></dept-edit>
     <!--删除部门对话框-->
    <dept-delete
      :status="buttonType.deptDelete"
      :fun="closeDialog"
      tname="deptDelete"
      :tableRow="tableRow"
      :refresh="reset"
    ></dept-delete>
  </div>
</template>

<script>
import { http, deptList } from "@/api/api.js";
import deptAdd from "./deptAdd";
import deptEdit from "./deptEdit";
import deptDelete from "./deptDelete";
export default {
  mounted() {
    this.getDeptList(1);
  },
  data() {
    return {
      highlightFlag:true,//高亮状态
      tableData: "", //用户信息列表
      buttonType: {
        deptAdd: false,
        deptEdit: false,
        deptDelete: false
      },
      tableRow: "",
      deptAddDialogState: false
    };
  },
  components: {
    deptAdd,
    deptEdit,
    deptDelete
  },
  methods: {
    // 对话框状态管理
    closeDialog(type) {
      this.buttonType[type] = false;
      this.tableRow = '' 
      this.highlightFlag = false
    },
    //表格行选中
    cellSelect(row) {
      this.highlightFlag = true
      this.tableRow = row;
    },
    //功能按钮操作
    menuListBtn(type) {
      if (type === "deptAdd") {
        //打开添加用户对话框
        this.buttonType[type] = true;
      } else {
        if (this.tableRow === "") {
          this.$message.error("请选择要操作的用户");
        } else {
          //打开用户状态窗口
          this.buttonType[type] = true;
        }
      }
    },
    //重置搜索列表
    reset() {
      this.getDeptList();
      this.tableRow = "";
    },
    //获取用户列表
    getDeptList() {
      this.$http
        .get(http + deptList)
        .then(
          val => {
            this.tableData = val.data.data;
            
          },
          err => {
            console.log(err);
          }
        );
    }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.searchCon {
  padding: 10px 0;
}
</style>