<template>
  <div class="login">
    <div>
      <el-input placeholder="请输入内容" v-model="username" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
    <el-button type="primary" @click="register">注册</el-button>
  </div>
</template>

<script>
// import { initWebSocket } from "../socket/socket.js";
export default {
  methods: {
    register() {
      this.isLogin = false;
      this.$router.push({ path: "/register" });
    },
    login() {
      let config = {
        headers: { "stbweb-api": "login" }
      };
      let param = {
        Name: this.username,
        Pwd: this.strToHexCharCode(this.pwd)
      };
      // 添加请求头
      this.$http.post("/login", param, config).then(response => {
        if (!response.data.success) {
          console.log("err:", response.data);
          return;
        }

        localStorage.setItem("username", this.username);
        // this.$router.push({ path: "/home" });
        this.$router.push({ name: "home" });
        console.log(response.data);
      });
    },
    strToHexCharCode(str) {
      if (str === "") return "";
      var hexCharCode = [];
      for (var i = 0; i < str.length; i++) {
        hexCharCode.push(str.charCodeAt(i).toString(16));
      }
      return hexCharCode.join("");
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
.login {
  display: flex;
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  background: yellow;
}
</style>
