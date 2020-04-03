<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">主页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">功能选择项</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4">
        <span target="_blank">用户管理</span>
      </el-menu-item>
    </el-menu>
    <!-- <div id="nav">
      <router-link to="/about">About</router-link>|
      <router-link to="/chart">chart</router-link>|
      <router-link to="/table">table</router-link>|
      <router-link to="/imageupload">imagesUpLoad</router-link>|
      <router-link to="/chatroom">chatroom</router-link>
      <br />
    </div>
    <router-view />-->
    <div>
      <About></About>
      <Chart></Chart>
      <ChatRoom></ChatRoom>
      <ImageUpload></ImageUpload>
      <Table></Table>
    </div>
  </div>
</template>
<script>
import About from "./About";
import Chart from "./Chart";
import ChatRoom from "./ChatRoom";
import ImageUpload from "./ImageUpload";
import Table from "./Table";
export default {
  components: {
    About,
    Chart,
    ChatRoom,
    ImageUpload,
    Table
  },
  data() {
    return {
      activeIndex: "1"
    };
  },
  mounted() {
    console.log("this is mounted");
  },

  created: function() {
    console.log("this is start create");
  },
  methods: {
    contentMes: function() {
      this.$conMsg("123");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
