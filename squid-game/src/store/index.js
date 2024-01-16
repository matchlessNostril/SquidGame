import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: auth,
  },
  // 구글 로그인 같은 외부 API를 사용할 때는, 도메인이 바뀌면 상탯값이 없어지기 때문에 Vuex-persist 사용
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
    }).plugin,
  ],
});
