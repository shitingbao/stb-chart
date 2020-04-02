<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/chart">chart</router-link>|
      <router-link to="/table">table</router-link>|
      <router-link to="/imageupload">imagesUpLoad</router-link>|
      <router-link to="/chatroom">imagesUpLoad</router-link>
      <br />
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  components: {},
  mounted() {
    console.log("this is mounted");
  },

  created: function() {
    console.log("this is start create");
  },
  methods: {
    contentMes: function() {
      this.$conMsg("123");
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
