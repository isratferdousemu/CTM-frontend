import "./assets/css/main.css";
import "./assets/css/header.css";
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
import Helpers from "@/helpers/helpers";
import Swal from "sweetalert2";
// vue-sweetalert
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
//services
import ApiService from "./services/ApiService";
// import VueTablerIcons from "vue-tabler-icons";
// Vue.use(VueTablerIcons);

// vue-sweetalert configuration
Vue.use(VueSweetalert2, {
  confirmButtonColor: "#1C3B68",
  cancelButtonColor: "#bd3635",
});
Vue.prototype.$swal = Swal;
import i18n from "./i18n";
Vue.directive("can", {
  bind(el, binding, vnode) {
    // console.log('directive', el,binding, vnode)
    if (
      binding.value != "common" &&
      store.state &&
      store.state.userData &&
      store.state.userData.roleNames &&
      store.state.userPermissions.findIndex(
        (per) =>
          per.name === binding.value ||
          per.module_name === binding.value ||
          per.sub_module_name === binding.value
      ) === -1 &&
      !store.state.userData.roleNames.includes("super-admin")
    ) {
      const comment = document.createComment(" ");
      Object.defineProperty(comment, "setAttribute", {
        value: () => undefined,
      });
      vnode.elm = comment;
      if (vnode.componentInstance) {
        vnode.componentInstance.$el = comment;
      }
      if (vnode.componentInstance) {
        vnode.componentInstance.$el = comment;
      }

      if (el.parentNode) {
        el.parentNode.replaceChild(comment, el);
      }
      // el.removeChild()
    }
  },
});
// Custom global method to check if a string is in English or Bengali
Vue.prototype.$checkLanguage = function (str) {
  let isEnglish = false;
  let isBangla = false;
  let hasSpecialChars = false;

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);

    // if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
    //   isEnglish = true;
    // } else if (charCode >= 2432 && charCode <= 2559) {
    //   isBangla = true;
    // }
    if (
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122) || // English letters
      charCode < 2432 ||
      charCode > 2559 || // Exclude Bangla letters
      charCode === 32
    ) {
      isEnglish = true;
    } else if (charCode >= 2432 && charCode <= 2559) {
      isBangla = true;
      console.log("Bangla");
      if (
        (charCode >= 2432 && charCode <= 2509) || // Bengali script general category
        (charCode >= 2534 && charCode <= 2543) || // Digits in Bengali script
        charCode === 2494 || // Bengali full stop
        charCode === 2404 || // Bengali comma
        charCode === 2405 || // Bengali full stop (alternate)
        charCode === 2406 || // Bengali comma (alternate)
        charCode === 32
      ) {
        hasSpecialChars = true;
      }
    }
  }

  if (isEnglish && !isBangla) {
    return "English";
  } else if (isBangla && !isEnglish) {
    return "Bangla";
  } else if ((isBangla && !isEnglish) || hasSpecialChars) {
    return "BanglaSpecialChar";
  } else {
    return "Mixed or Other";
  }
};

Vue.config.productionTip = false;
Vue.use(Vuetify);

const vuetify = new Vuetify({});
const options = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};

Vue.use(Toast, options);

// Register the Apiservice globally
ApiService.init();
window.ApiService = ApiService;

//mixins import
Vue.mixin(HeaderMixins);

const plugins = {
  install() {
    Vue.helpers = Helpers;
    Vue.prototype.$helpers = Helpers;
  },
};
Vue.use(plugins);

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL_BACKEND;

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

new Vue({
  router,
  store,
  vuetify,
  i18n,

  render: function (h) {
    return h(App);
  },
}).$mount("#app");
