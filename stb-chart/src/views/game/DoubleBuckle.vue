<template>
  <div class="game">
    <div>
      <p>剩{{brand.Data.user2.length}}张</p>
    </div>
    <div class="game-middle">
      <div>
        <p>剩{{brand.Data.user3.length}}张</p>
      </div>
      <div class="game-middle-show">
        <div>不出</div>
        <div class="game-middle-show-cent">
          <div>不出</div>
          <div>44</div>
        </div>
        <div>66</div>
      </div>
      <div>
        <p>剩{{brand.Data.user4.length}}张</p>
      </div>
    </div>
    <div>
      <button>出</button>
      <button>不出</button>
      <p>{{brand.Data.user1}}</p>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      brand: {
        NextUser: "user4",
        ShowDataUser: "user2",
        Data: {
          user1: [3, 4, 5, 6],
          user2: [0, 0, 0, 0, 0],
          user3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          user4: [0, 0, 0]
        },
        ShowData: [1, 2, 3],
        UserShowStatues: {
          user1: true,
          user2: true,
          user3: true
        },
        Success: true
      },
      username: "user1"
    };
  },
  mounted() {},
  created: function() {},
  methods: {}
};
</script>
<style lang="scss">
.game {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .game-middle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid red;
    .game-middle-show {
      display: flex;
      border: 1px solid red;
      width: 800px;
      height: 500px;
      flex-direction: column;
      justify-content: space-between;
      .game-middle-show-cent {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
}
</style>
