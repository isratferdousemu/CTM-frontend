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
import axios from "axios";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import HeaderMixins from "./mixins/HeaderMixins";

Vue.config.productionTip = false;
Vue.use(Vuetify);

const vuetify = new Vuetify({});
const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
};
Vue.use(Toast, options);
//mixins import
Vue.mixin(HeaderMixins);


axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL_BACKEND;
// axios.defaults.baseURL = `http://127.0.0.1:8000/api/v1`;
Vue.prototype.$axios = axios;

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
