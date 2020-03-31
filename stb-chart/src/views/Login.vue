<template>
  <div>
    <el-input placeholder="请输入内容" v-model="username" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
    <el-button type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
// import { initWebSocket, sendSock, requireUserWord } from "../socket/socket.js";
export default {
  methods: {
    login() {
      let config = {
        headers: { "stbweb-api": "login" }
      };
      let param = {
        Name: this.username,
        Pwd: this.pwd
      };
      // 添加请求头
      this.$http.post("/login", param, config).then(response => {
        console.log(response.data);
      });
    }
  },
  mounted() {},
  data() {
    return {
      username: "",
      pwd: ""
    };
  },
  name: "Login",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
