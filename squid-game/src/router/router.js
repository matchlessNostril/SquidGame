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
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main.vue"),
    },
    {
      path: "/gameList",
      name: "game-list",
      components: {
        default: () => import("../views/game-list.vue"),
      },
    },
    {
      path: "/Puzzle",
      name: "puzzle",
      components: {
        default: () => import("../views/game/puzzle.vue"),
      },
    },
    {
      path: "/UpDown",
      name: "updown",
      components: {
        default: () => import("../views/game/up-down.vue"),
      },
    },
    {
      path: "/MukChiPa",
      name: "muk-chi-pa",
      components: {
        default: () => import("../views/game/muk-chi-pa.vue"),
      },
    },
    },
  ],
});

export default router;
