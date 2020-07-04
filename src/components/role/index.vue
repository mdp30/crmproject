<template>
  <div id="role">
    <!--功能按钮区-->
    <el-button
      v-for="item in $store.state.userInfo.menuList[this.$route.path]"
      :key="item.id"
      type="primary"
      v-show="item.status==1"
      @click="menuListBtn(item.code)"
    >{{item.name}}</el-button>
    <!--昵称搜索区-->
    <div class="searchCon">
      <el-row>
        <el-col :span="18">
          <el-input v-model="searchName" placeholder="请输入昵称关键字"></el-input>
        </el-col>
        <el-col :span="3" style="text-align:center">
          <el-button type="primary" @click="getRoleList()">查询</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <!--用户信息列表区-->
    <div class="userList" v-if="tableData">
      <el-table 
      :data="tableData" 
      style="width: 100% " 
      height="500" 
      @cell-click="cellSelect"
      :highlight-current-row='true'	
      >
        
        <el-table-column label="角色名称" prop="name"></el-table-column>
        <el-table-column label="部门名称" prop="deptName"></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
      </el-table>
    </div>
    
    <!--功能框区-->
    <!--添加角色对话框-->
    <role-add 
    :status="buttonType.roleAdd"
    :fun='closeDialog'
    tname='roleAdd'
    :refresh='reset'
    ></role-add>
    <!--修改角色对话框-->
    <role-edit 
    :status="buttonType.roleEdit"
    :fun='closeDialog'
    tname='roleEdit'
    :tableRow='tableRow'
    :refresh='reset'
    ></role-edit>
    <!--角色配置对话框-->
    <role-set
    :status="buttonType.roleSet"
    :fun='closeDialog'
    tname='roleSet'
    :tableRow='tableRow'
    :refresh='reset'
    ></role-set>
    <!--删除角色-->
     <role-delete
    :status="buttonType.roleDelete"
    :fun='closeDialog'
    tname='roleDelete'
    :tableRow='tableRow'
    :refresh='reset'
    ></role-delete>
  </div>
  
</template>

<script>
import { http, roleList } from "@/api/api.js";
import roleAdd from './roleAdd'
import roleEdit from './roleEdit'
import roleSet from './roleSet'
import roleDelete from './roleDelete'
export default {
  mounted() {
    this.getRoleList();
  },
  data() {
    return {
      tableData: "", //用户信息列表
      searchName: "",
      buttonType: {
        roleAdd: false,
        roleEdit: false,
        roleDelete: false,
        roleSet: false
      },
      tableRow: "",
      roleAddDialogState:false
    };
  },
  components:{
    roleAdd,
    roleEdit,
    roleSet,
    roleDelete
  },
  methods: {
    // 对话框状态管理
    closeDialog(type){  
      this.buttonType[type]=false
    },
    //表格行选中
    cellSelect(row) {
      this.tableRow = row;
    },
    //功能按钮操作
    menuListBtn(type) {
      if (type === "roleAdd") {
        //打开添加用户对话框
        this.buttonType[type] = true
      } else {
        if (this.tableRow === "") {
          this.$message.error("请选择要操作的用户");
        } else  {
            //打开用户状态窗口
            this.buttonType[type] = true         
        }
      }
    },
    //重置搜索列表
    reset() {
      this.searchName = "";
      this.getRoleList();
      this.tableRow = ''
    },
    
    //获取角色列表
    getRoleList() {
      this.$http
        .get(http + roleList, {
          params: {
            name: this.searchName
          }
        })
        .then(
          val => {
            this.tableData = val.data.data;
            this.total = val.data.data.total;
            // console.log(val.data.data);
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