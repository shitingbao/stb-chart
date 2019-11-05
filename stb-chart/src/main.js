import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { con } from './content';
import echarts from 'echarts';
import { sendSock } from './socket/socket';
// import { Button, Select } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$echarts = echarts;
Vue.prototype.$conMsg = con;
Vue.prototype.$wsSend = sendSock;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
// Vue.use(Button);
// Vue.use(Select);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
