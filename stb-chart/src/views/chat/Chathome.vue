<template>
  <div class="flex-container">
    <div class="flex-item">
      <div style="height:80px;line-height:100px;" class="chat-title">
        <div>刷新</div>
        <div>create room</div>
        <div>host infomations</div>
        <div>添加标签</div>
        <div>确定搜索</div>
      </div>
    </div>
    <div class="flex-item">
      <div style="color:#fff;" class="chat">
        <div class="chat-left">
          <div class="chat-body">
            <div
              v-for="(item, index) in homelist"
              :key="index"
              @click="intoRoom(item)"
              class="chat-body-room"
            >
              <span>房间ID:{{ item.room_id }}</span>
              <span>房间名称:{{ item.room_name }}</span
              ><span>房主:{{ item.host_name }}</span>
              <span>人数:0 /{{ item.max }}</span>
              <span>房间类型:{{ item.room_type }}</span>
              <span>简介:{{ item.common }}</span>
            </div>
          </div>
        </div>
        <div class="chat-right">世界窗口</div>
      </div>
    </div>
    <div class="flex-item">
      <div style="height:120px;line-height:100px;">
        <button @click="randSelect">换一批</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      homelist: []
    };
  },
  mounted() {
    this.randSelect();
  },
  created: function() {},
  methods: {
    intoRoom(item) {
      localStorage.setItem("roomid", item.room_id);
      this.$router.push({ name: "chatunit" });
    },
    getRoomList() {},
    randSelect() {
      let roomIDList = [];
      this.homelist.forEach(e => {
        roomIDList.push(e.room_id);
      });
      let config = {
        headers: {
          "stbweb-api": "randselect",
          token: localStorage.getItem("token")
        }
      };
      let param = {
        RoomID: roomIDList
      };
      // 添加请求头
      this.$http.post("/chat", param, config).then(response => {
        if (response.data.success) {
          console.log(response.data.data);
          this.homelist = response.data.data;
          return;
        }
      });
    }
  }
};
</script>
<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.flex-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.flex-item:nth-child(1),
.flex-item:nth-child(3) {
  flex-grow: 0;
  flex-shrink: 0;
  background-color: #ababab;
}

.flex-item:nth-child(2) {
  flex-grow: 1;
  flex-shrink: 1;
  background-color: #000;
  overflow-y: auto;
}

.center {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -10px;
  margin-left: -24px;
}
.chat-title {
  display: flex;
  flex-direction: row;

  div {
    width: 150px;
  }
}
.chat {
  display: flex;
  flex-direction: row;
  height: 100%;
  .chat-left {
    width: 70%;
    .chat-body {
      display: flex;
      flex-wrap: wrap;
      height: 90%;
      margin-top: 30px;
      margin-bottom: 20px;
      div {
        width: 320px;
        height: 150px;
        padding-left: 10px;
      }
      .chat-body-room {
        display: flex;
        flex-direction: column;
        // margin: 20px;
        padding: 20px 20px 20px 20px;
        cursor: pointer;
      }
    }
  }
  .chat-right {
    width: 30%;
    border: 1px solid #d7dae2;
    margin-right: 20px;
  }
}
</style>
