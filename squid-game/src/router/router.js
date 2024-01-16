import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

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
      // 이미 로그인 한 사용자는 접근 불가
      meta: { authLimit: false },
    },
    {
      path: "/signInUp",
      name: "sing-in-up",
      components: {
        default: () => import("../views/sign-in-up.vue"),
      },
      meta: { authLimit: false },
    },
    {
      path: "/emailSignIn",
      name: "email-sign-in",
      components: {
        default: () => import("../views/email-sign-in.vue"),
      },
      meta: { authLimit: false },
    },
    {
      path: "/emailSignUp",
      name: "email-sign-up",
      components: {
        default: () => import("../views/email-sign-up.vue"),
      },
      meta: { authLimit: false },
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main.vue"),
      // 로그인한 사용자만 접근 가능
      meta: { authLimit: true },
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
    {
      path: "/gameResult",
      name: "game-result",
      component: () => import("../views/game-result.vue"),
    },
  ],
});

// 라우터 이동에 개입하여 meta 조건 확인
router.beforeEach((to, from, next) => {
  // meta에 authLimit이 설정되지 않은 경우 early return
  if (
    to.matched.length === 0 ||
    !to.matched[0].meta.hasOwnProperty("authLimit")
  ) {
    next();
    return;
  }

  // authLimit
  const authLimit = to.matched[0].meta.authLimit;
  // 로그인 되어 있는지
  const checkAuth = store.getters.getUserAuthStatus;

  // 로그인 한 사용자는 접근 불가능한데, 로그인이 된 경우
  if (!authLimit && checkAuth) {
    next("/main");
    return;
  }

  // 로그인 한 사용자만 접근 가능한데, 로그인이 안 된 경우
  if (authLimit && !checkAuth) {
    next("/signInUp");
    return;
  }

  next();
});

export default router;
