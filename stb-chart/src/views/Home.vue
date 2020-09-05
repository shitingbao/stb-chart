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
        <el-menu-item index="excel">excel操作</el-menu-item>
        <el-menu-item index="chart">echart例子</el-menu-item>
        <el-menu-item index="chatroom">聊天室</el-menu-item>
        <el-menu-item index="imageupload">图片文字提取</el-menu-item>
        <el-menu-item index="comparison">文件内容比较</el-menu-item>
        <el-menu-item index="game">game</el-menu-item>
        <el-menu-item index="excelToCsv">excelToCsv</el-menu-item>
        <el-menu-item index="test">test</el-menu-item>
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
      <ExcelOpera v-if="selectPage === 'excel'"></ExcelOpera>
      <Chart v-if="selectPage === 'chart'"></Chart>
      <ChatRoom v-if="selectPage === 'chatroom'"></ChatRoom>
      <ImageUpload v-if="selectPage === 'imageupload'"></ImageUpload>
      <FileComparison v-if="selectPage === 'comparison'"></FileComparison>
      <Test v-if="selectPage === 'test'"></Test>
      <DoubleBuckle v-if="selectPage == 'game'"></DoubleBuckle>
      <ExcelToCsv v-if="selectPage == 'excelToCsv'"></ExcelToCsv>
    </div>
  </div>
</template>
<script>
import ExcelOpera from "./library/ExcelOpera";
import Chart from "./library/Chart";
import ChatRoom from "./library/ChatRoom";
import ImageUpload from "./library/ImageUpload";
import FileComparison from "./library/FileComparison";
import Test from "./library/Test";
import ExcelToCsv from "./library/ExcelToCsv";
import DoubleBuckle from "./game/DoubleBuckle";
export default {
  components: {
    ExcelToCsv,
    DoubleBuckle,
    ExcelOpera,
    Chart,
    ChatRoom,
    ImageUpload,
    FileComparison,
    Test
  },
  data() {
    return {
      activeIndex: "1",
      selectPage: ""
    };
  },
  mounted() {},

  created: function() {},
  methods: {
    contentMes: function() {
      this.$conMsg("123");
    },
    handleSelect(key, keyPath) {
      this.selectPage = key;
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
