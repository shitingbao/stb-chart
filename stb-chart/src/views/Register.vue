<template>
  <div v-if="isLogin">
    <el-input placeholder="请输入用户名" v-model="username" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
    <el-button type="primary" @click="register">注册</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    register() {
      let config = {
        headers: { "stbweb-api": "register" }
      };
      let param = {
        Name: this.username,
        Password: this.strToHexCharCode(this.pwd)
      };
      // 添加请求头
      this.$http.post("/register", param, config).then(response => {
        if (!response.data.success) {
          console.log("err:", response.data);
          return;
        }
        this.$router.push({ path: "/login" });
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
      pwd: "",
      isLogin: true
    };
  },
  name: "Register",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
