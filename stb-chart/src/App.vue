<template>
  <div id="app">
    <!-- <Home></Home> -->
    <Login></Login>
    <router-view />
  </div>
</template>
<script>
import Login from "./views/Login";
// import Home from "./views/Home";
export default {
  components: {
    Login
    // Home
  },
  mounted() {
    console.log("this is mounted");
  },

  created: function() {
    console.log("this is start create");
  },
  methods: {
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
