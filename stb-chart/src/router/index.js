import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/home',
		name: 'home',
		component: Home
	},
	{
		path: '/chatroom',
		name: 'chatroom',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/ChatRoom.vue')
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/chart',
		name: 'chart',
		component: () => import('../views/Chart.vue')
	},
	{
		path: '/table',
		name: 'table',
		component: () => import('../views/table.vue')
	},
	{
		path: '/imageupload',
		name: 'imageupload',
		component: () => import('../views/ImageUpload.vue')
	}
];

const router = new VueRouter({
	routes
});

export default router;