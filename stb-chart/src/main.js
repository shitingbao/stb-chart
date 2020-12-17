import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { con } from "./content";
import echarts from "echarts";
// import { sendSock, requireUserWord } from './socket/socket';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue2Editor from "vue2-editor";

axios.defaults.baseURL = "http://localhost:3002";
// axios.defaults.baseURL = "http://124.70.156.31:3002";
// axios.headers = { "Content-Type": "application/x-www-form-urlencoded" };
Vue.use(Vue2Editor);
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.$conMsg = con;
// Vue.prototype.$wsSend = sendSock;
// Vue.prototype.$getUserWord = requireUserWord;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
