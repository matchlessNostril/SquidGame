import Vue from "vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import store from "./store";
import VueHammer from "vue-hammerjs"; // puzzle 게임 모바일 swipe 라이브러리
import { squidGameAuth } from "./plugins/firebase";
import App from "./App.vue";
new Vue({
  vuetify,
  router,
  store,
  VueHammer,
  created() {
    // onAuthStateChanged : 사용자의 로그인 상태가 변경될 때마다 호출
    // user에는 현재 인증된 사용자 정보가 담겨 있음
    squidGameAuth.onAuthStateChanged((user) => {
      // user가 비어있다면 로그아웃된 상태
      if (user) {
        // 자동 로그인
        store.dispatch("autoSignIn", user);
      }
    });
  },
  render: (h) => h(App),
}).$mount("#app");
