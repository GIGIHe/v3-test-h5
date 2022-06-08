import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../layout/Home.vue"
import NoFound from "../components/NoFound.vue"
const router = new createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/echartsmap",
      name: "EchartsMap",
      component: () => import("../components/EchartsMap.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NoFound",
      component: NoFound,
    },
  ],
})
export default router
