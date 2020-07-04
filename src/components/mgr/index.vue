<template>
  <div id="mgr">
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
          <el-button type="primary" @click="getUserList(1)">查询</el-button>
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="昵称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="账号">
                <span>{{ props.row.account }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ props.row.statusName }}</span>
              </el-form-item>
              <el-form-item label="手机">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ props.row.email }}</span>
              </el-form-item>
              <el-form-item label="部门名称">
                <span>{{ props.row.deptName }}</span>
              </el-form-item>
              <el-form-item label="角色名称">
                <span>{{ props.row.roleName }}</span>
              </el-form-item>
              <el-form-item label="性别">
                <span>{{ props.row.sexName }}</span>
              </el-form-item>
              <el-form-item label="生日">
                <span>{{ props.row.birthday }}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.createTime }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="昵称" prop="name"></el-table-column>
        <el-table-column label="账号" prop="account"></el-table-column>
        <el-table-column label="状态" prop="statusName"></el-table-column>
      </el-table>
    </div>
    
    <div class="pagination" v-if="total">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="changePage"
      ></el-pagination>
    </div>
    <!--功能框区-->
    <!--添加用户对话框-->
    <mgr-add 
    :status="buttonType.mgrAdd"
    :fun='closeDialog'
    tname='mgrAdd'
    :refresh='reset'
    ></mgr-add>
    <!--修改用户对话框-->
    <mgr-edit 
    :status="buttonType.mgrEdit"
    :fun='closeDialog'
    tname='mgrEdit'
    :tableRow='tableRow'
    :refresh='reset'
    ></mgr-edit>
    <!--分配角色对话框-->
    <mgr-setRole
    :status="buttonType.mgrSetRole"
    :fun='closeDialog'
    tname='mgrSetRole'
    :tableRow='tableRow'
    :refresh='reset'
    ></mgr-setRole>
     <mgr-delete
    :status="buttonType.mgrDelete"
    :fun='closeDialog'
    tname='mgrDelete'
    :tableRow='tableRow'
    :refresh='reset'
    ></mgr-delete>
  </div>
  
</template>

<script>
import { http, userList } from "@/api/api.js";
import mgrAdd from './mgrAdd'
import mgrEdit from './mgrEdit'
import mgrSetRole from './mgrSetRole'
import mgrDelete from './mgrDelete'
export default {
  mounted() {
    this.getUserList(1);
  },
  data() {
    return {
      tableData: "", //用户信息列表
      total: "", //用户信息总数
      currentPage: 1,
      pageSize: 8,
      searchName: "",
      buttonType: {
        mgrAdd: false,
        mgrEdit: false,
        mgrDelete: false,
        mgrSetRole: false
      },
      tableRow: "",
      mgrAddDialogState:false
    };
  },
  components:{
    mgrAdd,
    mgrEdit,
    mgrSetRole,
    mgrDelete
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
      if (type === "mgrAdd") {
        //打开添加用户对话框
        this.buttonType[type] = true
      } else {
        if (this.tableRow === "") {
          this.$message.error("请选择要操作的用户");
        } else {
          if (type === "mgrFreeze") {
            if(this.tableRow.status===2){
              this.$message.error("当前用户已经是禁用状态");
            }else{
              //冻结用户
              this.buttonType[type] = true
            }
          } else if (type === "mgrUnfreeze") {
            if(this.tableRow.status===1){
              this.$message.error("当前用户已经是启用状态");
            }else{
              //解冻用户
              this.buttonType[type] = true
            }
          } else {
            //打开用户状态窗口
            this.buttonType[type] = true
          }
        }
      }
    },
    //重置搜索列表
    reset() {
      this.searchName = "";
      this.getUserList(this.currentPage);
      this.tableRow = ''
    },
    // 页面切换触发重新获取当前页
    changePage(page) {
      this.currentPage = page
      this.getUserList(page);
    },
    //获取用户列表
    getUserList(page) {
      this.$http
        .get(http + userList, {
          params: {
            page: page,
            limit: this.pageSize,
            name: this.searchName
          }
        })
        .then(
          val => {
            this.tableData = val.data.data.records;
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