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
    {
      path: "/signInUp",
      name: "sing-in-up",
      components: {
        default: () => import("../views/sign-in-up.vue"),
      },
    },
    {
      path: "/emailSignIn",
      name: "email-sign-in",
      components: {
        default: () => import("../views/email-sign-in.vue"),
      },
    },
    {
      path: "/emailSignUp",
      name: "email-sign-up",
      components: {
        default: () => import("../views/email-sign-up.vue"),
      },
    },
    },
  ],
});

export default router;
