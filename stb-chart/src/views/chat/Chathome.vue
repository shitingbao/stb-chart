<template>
  <div class="chat">
    <div class="chat-title">
      <div>select</div>
      <div>create room</div>
      <div>host infomations</div>
    </div>
    <div class="chat-import">
      <div class="chat-left">
        <div class="chat-body">
          <div
            v-for="(item, index) in homelist"
            :key="index"
            @click="intoRoom"
            class="chat-body-room"
          >
            <span
              >homeID:{{ item.homeID }} homeName:{{ item.homeName }} num:{{
                item.num
              }}
              /{{ item.maxNum }}</span
            >

            <span>homeCommon:{{ item.homeCommon }}</span>
          </div>
        </div>
        <div class="block">
          <span class="demonstration">大于 7 页时的效果</span>
          <el-pagination layout="prev, pager, next" :total="1000">
          </el-pagination>
        </div>
      </div>
      <div class="chat-right">世界窗口</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      homelist: [
        {
          homeID: "uxtd",
          homeName: "mantou",
          homeCommon: "my mantou",
          num: 5,
          maxNum: 8
        },
        {
          homeID: "uxtd",
          homeName: "mantou",
          homeCommon: "my mantou",
          num: 5,
          maxNum: 8
        },
        {
          homeID: "uxtd",
          homeName: "mantou",
          homeCommon: "my mantou",
          num: 5,
          maxNum: 8
        },
        {
          homeID: "uxtd",
          homeName: "mantou",
          homeCommon: "my mantou",
          num: 5,
          maxNum: 8
        },
        {
          homeID: "uxtd",
          homeName: "mantou",
          homeCommon: "my mantou",
          num: 5,
          maxNum: 8
        }
      ]
    };
  },
  mounted() {},
  created: function() {},
  methods: {
    intoRoom(item) {
      console.log("item", item);
    }
  }
};
</script>
<style lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  .chat-title {
    display: flex;
    flex-direction: row;
    height: 60px;
    div {
      width: 150px;
    }
  }
  .chat-import {
    display: flex;
    flex-direction: row;
    .chat-body {
      display: flex;
      flex-wrap: wrap;
      div {
        width: 450px;
        height: 150px;
      }
      .chat-body-room {
        display: flex;
        flex-direction: column;
        margin: 10px;
        cursor: pointer;
      }
    }
    .chat-right {
      width: 500px;
      border: 1px solid #d7dae2;
    }
  }
}
</style>
