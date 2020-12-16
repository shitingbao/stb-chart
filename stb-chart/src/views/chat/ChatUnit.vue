<template>
  <!-- 版本方法原版在socket.js文件中 -->
  <div class="container">
    <el-button
      class="reconnect"
      v-if="reconnect"
      type="primary"
      @click="reConnect"
      plain
      >重新连接</el-button
    >

    <div class="header">
      <h2>公共聊天室</h2>
    </div>
    <div class="main">
      <div class="main-chat" v-for="(item, index) in userWord" :key="index">
        <div
          :class="
            item.User == username ? 'main-chat-title-mine' : 'main-chat-title'
          "
        >
          <span class="word-name">{{ item.User }}</span
          ><span>{{ item.DateTime }}</span>
        </div>
        <div
          :class="
            item.User == username ? 'main-chat-word-mine' : 'main-chat-word'
          "
        >
          <span
            :class="
              item.User == username ? 'word word-right' : 'word word-left'
            "
            >{{ item.Data }}</span
          >
        </div>
      </div>
    </div>
    <div class="footer">
      <el-input v-model="word" placeholder="内容"></el-input>
      <el-button type="primary" @click="send()" plain>发送</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatUnit",
  props: {
    msg: String
  },
  data() {
    return {
      reconnect: false,
      word: "",
      host: "localhost:3002/room/chat",
      userWord: [
        { User: "shitingbao", DateTime: "2020-09-11", Data: "123" },
        {
          User: "aa",
          DateTime: "2020-09-11",
          Data:
            "123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123"
        },
        { User: "aa", DateTime: "2020-09-11", Data: "123" },
        { User: "aa", DateTime: "2020-09-11", Data: "123" },
        { User: "aa", DateTime: "2020-09-11", Data: "123" }
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
      this.initWebSocket(
        localStorage.getItem("token") + "&" + localStorage.getItem("roomid")
      );
      setTimeout(() => {
        loading.close();
        this.reconnect = false;
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
    initWebSocket(sec) {
      var that = this;
      var wsuri = "ws://" + this.host;
      this.websock = new WebSocket(wsuri, sec);
      this.websock.onmessage = function(e) {
        // console.log("接收的数据为：", e.data.User);
        that.userWord.push(JSON.parse(e.data));
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
        this.reconnect = true;
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
      this.reconnect = true;
      console.log("connection closed (" + e.code + ")");
    },
    websocketOpen() {
      this.reconnect = false;
      console.log("连接成功");
    }
  },
  mounted() {
    let sec =
      localStorage.getItem("token") + "&" + localStorage.getItem("roomid"); //注意这个间隔符，websocket中的sec参数不能用分号等特殊符号
    this.initWebSocket(sec);
    this.username = localStorage.getItem("username");
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  // width: 100%;
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
    // background: #ccc;
    // background: url("../../assets/jpg.jpg") no-repeat;
    // background-size: 60% 100%;
    flex: 1;
    overflow: auto;
    margin-left: 350px;
    margin-right: 350px;
    .main-chat {
      display: flex;
      flex-direction: column;
      padding: 5px;
      .main-chat-title {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
      }
      .main-chat-word {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        // width: 15px;
      }
      .main-chat-title-mine {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
      .main-chat-word-mine {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        // width: 15px;
      }
    }
  }
}
.word {
  padding: 5px;
  background: #ccc;
  border-radius: 5px;
  // display: inline-block;
  font-size: 14px;
  color: #303030;
  line-height: 1.6;
  font-family: "微软雅黑";
  // width: 400px;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.word-left {
  text-align: left;
}
.word-right {
  text-align: right;
}
.word-name {
  padding-right: 10px;
}
.reconnect {
  padding: 20px;
  // background: orange;
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 5px;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
