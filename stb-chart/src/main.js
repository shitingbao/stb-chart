import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { con } from './content';
import echarts from 'echarts';
import { sendSock } from './socket/socket';

Vue.prototype.$echarts = echarts;
Vue.prototype.$conMsg = con;
Vue.prototype.$ws = sendSock;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
