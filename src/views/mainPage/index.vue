<template>
  <div id="index">
    <el-container>
      <!--侧边栏容器-->
      <el-aside style="width:auto">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          v-if="$store.state.menu.menu&&$store.state.userInfo.info"
          router
        >
          <el-menu-item index="index">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu
            v-for="(item,index) in $store.state.menu.menu"
            :key="index"
            :index="item.path"
          >
            <template slot="title">
              <i :class="iconType[item.id]"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item
              :index="subItem.path"
              v-for="(subItem,index) in item.children"
              :key="index"
              :disabled="$store.state.userInfo.info.permissions.indexOf(subItem.path) == -1"
            >
              <i :class="iconType[subItem.id]"></i>
              <span slot="title">{{subItem.name}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--内容-->
      <el-main v-if="$store.state.userInfo.info&&$store.state.userInfo.menuList">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <!--侧边栏按钮-->
              <div class="radio">
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                  <el-radio-button :label="false">展开</el-radio-button>
                  <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="text-align:right;padding-right:40px;">
              当前账号:
              <router-link to="info" style="color:deepskyblue">{{$store.state.userInfo.info.name}}</router-link>
            </div>
          </el-col>
        </el-row>
        <div class="subView">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { http, listForRouter, userInfo, menuList } from "@/api/api.js";

export default {
  data() {
    return {
      isCollapse: false,
      iconType: {
        1: "el-icon-setting",
        2: "el-icon-coin",
        4: "el-icon-user",
        12: "el-icon-lock",
        21: "el-icon-office-building",
        17: "el-icon-s-order",
        22: "el-icon-notebook-2",
        41: "el-icon-tickets",
        46: "el-icon-edit-outline",
        42: "el-icon-document-copy",
        45: "el-icon-folder-opened"
      }
    };
  },
  mounted() {
    this.getMenuList();
    this.getmenu();
    this.getUserInfo();
  },
  methods: {
    //获取菜单列表
    getmenu() {
      this.$http.get(http + listForRouter).then(
        v => {
          //修改导航状态树
          this.$store.commit("setmenu", v.data.data);
        },
        err => {
          this.$router.push("/login");
        }
      );
    },
    //获取用户信息
    getUserInfo() {
      this.$http.get(http + userInfo).then(
        v => {
          //修改用户信息状态树
          this.$store.commit("setinfo", v.data.data);
        },
        err => {
          // this.$router.push('/login')
        }
      );
    },
    //获取获取功能项操作信息
    getMenuList() {
      this.$http.get(http + menuList).then(
        data => {
          var data = data.data.data;
          var menuListObj = {};
          // 遍历出功能项的对象
          // key:url val:功能菜单数组
          data.forEach(v => {
            v.children.forEach(val => {
              this.$set(menuListObj, val.url, val.children);
            });
          });
          this.$store.commit("setmenuList", menuListObj);
        },
        err => {
          // this.$router.push('/login')
        }
      );
    }
  }
};
</script>

<style lang="scss">
.el-menu-vertical-demo {
  &:not(.el-menu--collapse) {
    width: 200px;
    min-height: 600px;
  }
  min-height: 600px;
}
</style>