import "./assets/css/main.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import { useApiRequest } from "@/hooks/apiRequestHook";
import "@/Directives/v-tooltip";
Vue.use(Vuetify);
const vuetify = new Vuetify({});

//mixins import
import HeaderMixins from "./mixins/HeaderMixins";
Vue.mixin(HeaderMixins);

Vue.config.productionTip = false;
import axios from "axios";

axios.defaults.baseURL = `http://127.0.0.1:8000/api/v1`;

// Register the ApiRequestPlugin globally
const apiRequest = useApiRequest();

Vue.mixin({
  data() {
    return {
      apiRequest,
    };
  },
});

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
