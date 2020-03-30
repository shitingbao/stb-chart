<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/chart">chart</router-link>|
      <router-link to="/table">table</router-link>|
      <router-link to="/imageupload">imagesUpLoad</router-link>|
      <router-link to="/ChatRoom">imagesUpLoad</router-link>
      <br />
      <!-- get请求测试 -->
      <!-- <button @click="getMsg()">getclicktest</button> -->
      <!-- 外部js方法测试 -->
      <!-- <button @click="contentMes()">content</button> -->
      <!-- <button @click="wsSendData()">wsSendData</button> -->
      <!-- <el-button>Default</el-button> -->
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    console.log("this is mounted");
  },

  created: function() {
    console.log("this is start create");
  },
  methods: {
    // wsSendData() {
    //   this.$wsSend("my name is shitingbao");
    // },

    show: function(msg) {
      console.log(this.showMsg + msg);
    },
    getMsg: function() {
      console.log("start get");
      let that = this;
      //get请求
      that.$http
        .get("http://localhost:8088/")
        .then(res => {
          console.log("this data is:", res);
        }) //执行成功后执行，res为反馈的数据
        .catch(function(err) {
          console.log("this error is:", err);
        }); //失败后执行的逻辑
    },
    contentMes: function() {
      this.$conMsg("123");
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
