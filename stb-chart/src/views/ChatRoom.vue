<template>
  <div>
    <button @click="connect()">连接</button>
    <el-input v-model="input" placeholder="请输入你的姓名"></el-input>
    <el-input v-model="word" placeholder="内容"></el-input>
    <button @click="send()">发送</button>
    <ul>
      <li v-for="(item,index) in wordData" :key="index">{{item }}</li>
    </ul>
  </div>
</template>

<script>
import { initWebSocket, sendSock, requireUserWord } from "../socket/socket.js";
export default {
  methods: {
    connect() {
      if (this.input == "") {
        alert("青输入您的姓名");
        return;
      }
      initWebSocket(this.input);
    },
    send() {
      if (this.input == "") {
        alert("青输入您的姓名");
        return;
      }
      if (this.word == "") {
        alert("不能发送内容为空的信息");
        return;
      }
      let ts = {
        User: this.input,
        Data: this.word,
        DateTime: new Date()
      };

      sendSock(ts);
    }
  },
  mounted() {},
  data() {
    return {
      input: "",
      wordData: requireUserWord(),
      word: ""
    };
  },
  name: "ChatRoom",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
