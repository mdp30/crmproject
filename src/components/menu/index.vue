<template>
  <div id="menu">
    <!--功能按钮区-->
    <el-button
      v-for="item in $store.state.userInfo.menuList[this.$route.path]"
      :key="item.id"
      type="primary"
      v-show="item.status==1"
      @click="menuListBtn(item.code)"
    >{{item.name}}</el-button>
    <!--用户信息列表区-->
    <div class="userList" v-if="tableData" style="padding:10px">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :highlight-current-row="highlightFlag"
        @cell-click="cellSelect"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" label="菜单名称" sortable width="180"></el-table-column>
        <el-table-column prop="url" label="链接" sortable width="180"></el-table-column>
        <el-table-column prop="isMenuName" label="是否是菜单"></el-table-column>
        <el-table-column prop="status" label="状态" :formatter="statusTransform"></el-table-column>
        <el-table-column prop="id" label="菜单id"></el-table-column>
      </el-table>
    </div>
    <!--功能框区-->
    <!--添加用户对话框-->
    <menu-add
      :status="buttonType.menuAdd"
      :fun="closeDialog"
      tname="menuAdd"
      :refresh="reset"
      :tableRow="tableRow"
    ></menu-add>
    <!--修改部门对话框-->
    <menu-edit
      :status="buttonType.menuEdit"
      :fun="closeDialog"
      tname="menuEdit"
      :tableRow="tableRow"
      :refresh="reset"
    ></menu-edit>
    <!--删除部门对话框-->
    <menu-delete
      :status="buttonType.menuDelete"
      :fun="closeDialog"
      tname="menuDelete"
      :tableRow="tableRow"
      :refresh="reset"
    ></menu-delete>
  </div>
</template>

<script>
import { http, menuList } from "@/api/api.js";
import menuAdd from "./menuAdd";
import menuEdit from "./menuEdit";
import menuDelete from "./menuDelete";
export default {
  mounted() {
    this.getMenuList(1);
  },
  data() {
    return {
      highlightFlag: true, //高亮状态
      tableData: "", //用户信息列表
      buttonType: {
        menuAdd: false,
        menuEdit: false,
        menuDelete: false
      },
      tableRow: "",
      menuAddDialogState: false
    };
  },
  components: {
    menuAdd,
    menuEdit,
    menuDelete
  },
  methods: {
    // 状态输出转换
    statusTransform(row, column, cellValue, index) {
      if (cellValue == 0) {
        return "弃用";
      } else if (cellValue == 1) {
        return "启用";
      } else {
        return "禁用";
      }
    },
    // 对话框状态管理
    closeDialog(type) {
      this.buttonType[type] = false;
      this.tableRow = "";
      this.highlightFlag = false;
    },
    //表格行选中
    cellSelect(row) {
      this.highlightFlag = true;
      this.tableRow = row;
    },
    //功能按钮操作
    menuListBtn(type) {
      if (type === "menuAdd") {
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
      this.getMenuList();
      this.tableRow = "";
    },
    //获取用户列表
    getMenuList() {
      this.$http.get(http + menuList).then(
        val => {
          this.tableData = val.data.data;
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