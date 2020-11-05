import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Commoditylist from "../views/business/Commoditylist.vue";
import Chathome from "../views/chat/Chathome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/commoditylist",
    name: "commoditylist",
    component: Commoditylist
  },
  {
    path: "/chathome",
    name: "chathome",
    component: Chathome
  }
];

const router = new VueRouter({
  routes
});

export default router;
