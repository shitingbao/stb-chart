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
        <el-menu-item index="about">待定</el-menu-item>
        <el-menu-item index="chart">待定</el-menu-item>
        <el-menu-item index="chatroom">聊天室</el-menu-item>
        <el-menu-item index="imageupload">图片文字转换</el-menu-item>
        <el-menu-item index="table">待定</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">待定0</template>
          <el-menu-item index="2-4-1">待定1</el-menu-item>
          <el-menu-item index="2-4-2">待定2</el-menu-item>
          <el-menu-item index="2-4-3">待定3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4">
        <span>用户管理</span>
      </el-menu-item>
    </el-menu>
    <div>
      <About v-if="selectPage=='about'"></About>
      <Chart v-if="selectPage=='chart'"></Chart>
      <ChatRoom v-if="selectPage=='chatroom'"></ChatRoom>
      <ImageUpload v-if="selectPage=='imageupload'"></ImageUpload>
      <Table v-if="selectPage=='table'"></Table>
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
      activeIndex: "1",
      selectPage: ""
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
      this.selectPage = key;
      console.log("key:", key);
      console.log("keyPath:", keyPath);
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
