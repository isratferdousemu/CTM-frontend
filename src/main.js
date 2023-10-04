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


import i18n from "./i18n";
// // Check if the language is stored in localStorage

// Custom global method to check if a string is in English or Bengali
Vue.prototype.$checkLanguage = function (str) {
  let isEnglish = false;
  let isBangla = false;

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);

    // if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
    //   isEnglish = true;
    // } else if (charCode >= 2432 && charCode <= 2559) {
    //   isBangla = true;
    // }
    if (
      ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) || // English letters
      (charCode < 2432 || charCode > 2559) // Exclude Bangla letters
    ) {
      isEnglish = true;
    } else if (charCode >= 2432 && charCode <= 2559) {
      isBangla = true;
      console.log('Bangla');
    }


  }

  if (isEnglish && !isBangla) {
    return 'English';
  } else if (isBangla && !isEnglish) {
    return 'Bangla';
  } else {
    return 'Mixed or Other';
  }
};

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
// Set the initial locale during the creation of the VueI18n instance



// Mount the Vue app once i18n is fully initialized


new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: function (h) {
    return h(App);
  },
}).$mount("#app");

