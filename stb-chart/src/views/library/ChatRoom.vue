<template>
  <!-- 版本方法原版在socket.js文件中 -->
  <!-- <div class="chat-room">
    <div class="chat-room-head">
      <el-button v-if="sockStart" type="primary" @click="reConnect" plain
        >重新连接</el-button
      >
    </div>

    <div class="chat-room-word">
      <div v-for="(item, index) in userWord" :key="index">{{ item }}</div>
    </div>
    <div class="chat-room-send">
      <el-input v-model="word" placeholder="内容"></el-input>
      <button @click="send()">发送</button>
    </div>
  </div> -->
  <div class="container">
    <div class="header">
      公共聊天室<el-button
        v-if="sockStart"
        type="primary"
        @click="reConnect"
        plain
        >重新连接</el-button
      >
    </div>
    <div class="main">
      <div class="main-chat" v-for="(item, index) in userWord" :key="index">
        <div class="main-chat-title">
          <span>{{ item.name }}</span
          ><span>{{ item.date }}</span>
        </div>
        <div class="main-chat-word">{{ item.data }}</div>
      </div>
    </div>
    <div class="footer">
      <el-input v-model="word" placeholder="内容"></el-input>
      <el-button type="primary" @click="send()" plain>发送</el-button>
      <!-- <button @click="send()">发送</button> -->
    </div>
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
      host: "124.70.156.31:3002/sockets/chat",
      userWord: [
        { name: "shitingbao", date: "2020-09-11", data: "123" },
        { name: "aa", date: "2020-09-11", data: "123" },
        { name: "aa", date: "2020-09-11", data: "123" },
        { name: "aa", date: "2020-09-11", data: "123" },
        { name: "aa", date: "2020-09-11", data: "123" }
      ],
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
      var that = this;
      var wsuri = "ws://" + this.host;
      this.websock = new WebSocket(wsuri, user);
      this.websock.onmessage = function(e) {
        console.log("接收的数据为：", e.data);
        that.userWord.push(e.data);
      };
      this.websock.onclose = function(e) {
        that.websocketclose(e);
      };
      this.websock.onopen = function() {
        that.websocketOpen();
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

<style scoped lang="scss">
.container {
  display: flex;
  width: 100%;
  height: 800px;
  flex-direction: column;
  // background: url("../../assets/aa.jpg") no-repeat;
  // background-size: 100% 100%;
  .header {
    height: 50px;
  }
  .footer {
    display: flex;
    flex-direction: row;
    height: 40px;
    margin-left: 400px;
    margin-right: 400px;
  }
  .main {
    background: #ccc;
    // background: url("../../assets/jpg.jpg") no-repeat;
    // background-size: 60% 100%;
    flex: 1;
    overflow: auto;
    margin-left: 400px;
    margin-right: 400px;
    .main-chat {
      display: flex;
      flex-direction: column;

      .main-chat-title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
      }
      .main-chat-word {
        display: flex;
      }
    }
  }
}
</style>
