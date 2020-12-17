<template>
  <div class="flex-container">
    <div class="flex-item">
      <div style="height:80px;line-height:100px;" class="chat-title">
        <div>刷新</div>
        <el-button type="text" @click="opendialog">create room</el-button>

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
              @click="intoRoom(item.room_id)"
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
    <el-dialog
      title="创建房间"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      NumTotle
      <el-input v-model="NumTotle" placeholder="总人数"></el-input>
      RoomType<el-input v-model="RoomType" placeholder="房间类型"></el-input>
      Common
      <el-input v-model="Common" placeholder="简介"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createRoom">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      homelist: [],
      dialogVisible: false,
      NumTotle: 3,
      RoomType: "",
      Common: ""
    };
  },
  mounted() {
    this.randSelect();
  },
  created: function() {},
  methods: {
    handleClose() {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    intoRoom(room_id) {
      localStorage.setItem("roomid", room_id);
      this.$router.push({ name: "chatunit" });
    },
    opendialog() {
      this.dialogVisible = true;
    },
    createRoom() {
      this.dialogVisible = false;
      let config = {
        headers: {
          "stbweb-api": "create",
          token: localStorage.getItem("token")
        }
      };
      let param = {
        RoomName: localStorage.getItem("username"),
        NumTotle: this.NumTotle,
        RoomType: this.RoomType,
        Common: this.Common
      };
      // 添加请求头
      this.$http.post("/chat", param, config).then(response => {
        if (response.data.success) {
          this.intoRoom(response.data.room_id);
          return;
        }
      });
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
