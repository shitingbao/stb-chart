<template>
  <!-- 版本方法原版在socket.js文件中 -->
  <div>
    <el-button v-if="sockStart" type="primary" @click="reConnect" plain>重新连接</el-button>
    <el-input v-model="word" placeholder="内容"></el-input>
    <button @click="send()">发送</button>
    <ul>
      <li v-for="(item,index) in userWord" :key="index">{{item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ChatRoom",
  props: {
    msg: String
  },
  data() {
    return {
      word: "",
      host: "localhost:3002/sockets/chat",
      userWord: [],
      username: "",
      websock: {},
      sockStart:
        this.websock == undefined ||
        this.websock.readyState === this.websock.CLOSE
    };
  },
  methods: {
    //重新连接
    reConnect() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.initWebSocket(localStorage.getItem("token"));
      setTimeout(() => {
        loading.close();
      }, 1000);
    },
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
      this.sendSock(ts);
    },
    //new WebSocket的第二个参数为特殊参数，后台另外处理
    initWebSocket(user) {
      var wsuri = "ws://" + this.host;
      this.websock = new WebSocket(wsuri, user);
      this.websock.onmessage = function(e) {
        console.log("接收的数据为：", e.data);
        this.userWord.push(e.data);
      };
      this.websock.onclose = function(e) {
        this.websocketclose(e);
      };
      this.websock.onopen = function() {
        this.websocketOpen();
      };
      //连接发生错误的回调方法
      this.websock.onerror = function() {
        console.log("WebSocket连接发生错误");
      };
    },
    // 实际调用的方法
    sendSock(agentData) {
      if (this.websock.readyState === this.websock.OPEN) {
        //若是ws开启状态
        this.websocketsend(agentData);
      } else if (this.websock.readyState === this.websock.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function() {
          this.sendSock(agentData);
        }, 1000);
      } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function() {
          this.sendSock(agentData);
        }, 1000);
      }
    },
    //数据发送
    websocketsend(agentData) {
      this.websock.send(JSON.stringify(agentData));
    },
    //关闭
    websocketclose(e) {
      console.log("connection closed (" + e.code + ")");
    },
    websocketOpen() {
      console.log("连接成功");
    }
  },
  mounted() {
    this.initWebSocket(localStorage.getItem("token"));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
