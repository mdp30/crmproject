<template>
  <div id="menuAddMain">
    <el-dialog title="添加菜单" :visible.sync="subStatus" @close="fun(tname)">
      <el-alert
        v-if="tableRow===''"
        title="当前添加的是一级菜单"
        type="info"
        show-icon
        :closable="false"
        style="margin:10px"
      ></el-alert>
      <el-alert
        v-else
        :title="'当前创建的是 '+tableRow.name+' 下的子菜单'"
        type="info"
        show-icon
        :closable="false"
        style="margin:10px"
      ></el-alert>
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
            <el-radio label="0">是</el-radio>
            <el-radio label="1">按钮</el-radio>
          </el-radio-group>
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
import { http, menu } from "@/api/api.js";
export default {
  data() {
    return {
      subStatus: this.status, //对话框状态
      addForm: {
        name:'',
        code:'',
        component:'',
        url:'',
        status:'',
        isMenu:''
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
    // 上传添加或修改菜单
    upDept() {
      //判断是否输入完整
      let itemFlag = true;
      for (let i in this.addForm) {
        if (this.addForm[i] == "") {
          itemFlag = false;
        }
      }
      if (itemFlag) {
        // 设置pcode
        if(this.tableRow == ''){
          this.addForm.pcode = 0
        }else{
          this.addForm.pcode = this.tableRow.code 
        }

        //排序值
        this.addForm.num = 0;

        this.$http
          .post(http + menu, JSON.stringify(this.addForm), {
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
        delete this.addForm.pcode;
        delete this.addForm.pid;
      } else {
        this.$message.error("请补全信息");
      }
    }
  }
};
</script>

<style>
</style>