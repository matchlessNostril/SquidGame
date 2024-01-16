import Vue from "vue";
import vuetify from "./plugins/vuetify";
import router from "./router/router";
import App from "./App.vue";
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
