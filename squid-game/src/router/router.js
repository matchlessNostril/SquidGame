import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  // url에서 # 제거
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "select-mode",
      components: {
        default: () => import("../views/select-mode.vue"),
      },
    },
  ],
});

export default router;
