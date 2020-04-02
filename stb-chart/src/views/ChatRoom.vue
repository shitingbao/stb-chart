<template>
  <div>
    <el-input v-model="word" placeholder="内容"></el-input>
    <button @click="send()">发送</button>
    <ul>
      <li v-for="(item,index) in wordData" :key="index">{{item }}</li>
    </ul>
  </div>
</template>

<script>
import { sendSock, requireUserWord } from "../socket/socket.js";
export default {
  methods: {
    send() {
      if (this.word == "") {
        alert("不能发送内容为空的信息");
        return;
      }
      let ts = {
        User: localStorage.getItem("username"),
        Data: this.word,
        DateTime: new Date()
      };

      sendSock(ts);
    }
  },
  mounted() {},
  data() {
    return {
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
