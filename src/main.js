import "./assets/css/main.css"
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);
import '@mdi/font/css/materialdesignicons.css'
const vuetify = new Vuetify({

});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
