<template>
  <div id="app">
    <!-- <Home></Home> -->
    <Login></Login>
    <router-view />
  </div>
</template>
<script>
import Login from "./views/Login";
// import Home from "./views/Home";
export default {
  components: {
    Login
    // Home
  },
  mounted() {},

  created: function() {},
  methods: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
}
</style>
