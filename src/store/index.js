import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// import axios from 'axios'

import ApplicationSelection from "./ApplicationSelection";
import BeneficiaryManagement from "./BeneficiaryManagement";
import BudgetManagement from "./BudgetManagement";
import EmergencyPaymentManagement from "./EmergencyPaymentManagement";
import GrievanceManagement from "./GrievanceManagement";
import ManageAllotment from "./ManageAllotment";
import MEReporting from "./MEReporting";
import PayrollManagement from "./PayrollManagement";
import SystemConfiguration from "./SystemConfiguration";
import TrainingManagement from "./TrainingManagement";
import Division from "@/store/modules/system_configuration/division";
// Import other modules as needed
import axios from 'axios';

axios.defaults.baseURL = `http://127.0.0.1:8000/api/v1`;

Vue.use(Vuex);
export default new Vuex.Store({
  namespaced: true,
  /* -------------------------------------------------------------------------- */
  /*                                states Define                               */
  /* -------------------------------------------------------------------------- */
  state: {
    headerTitle: "Dashboard",
    Drawer: true,
    notification: [],
    notificationUnseen: 0,
    notificationTime: 0,
  },
  /* -------------------------------------------------------------------------- */
  /*                               Getters Define                               */
  /* -------------------------------------------------------------------------- */
  getters: {
    data: (state) => state.data,
  },
  /* -------------------------------------------------------------------------- */
  /*                               Actions Define                               */
  /* -------------------------------------------------------------------------- */
  actions: {
    async getData({ commit }) {
      const data = await fetch("http://api.icndb.com/jokes/random/15");
      commit("SET_DATA", await data.json());
    },
    // submitPassword() {
    //   this.loading = true
    //   this.axios.post("/admin/forgot-password/submit", this.form)
    //     .then((response) => {
    //       this.loading = false;
    //       console.log(response, 'final')
    //       // console.log(response.data.permissions)
    //       if (response.data.success) {
    //         // this.otpDialog = true
    //         // this.startCountdown();
    //         this.$router.push({
    //           path: "/",
    //         })
    //       }
    //     })
    //     .catch((err) => {
    //       this.loading = false;
    //       console.log(err.response.data)
    //       this.errors = err.response.data.errors
    //     })
    // },
  },
  /* -------------------------------------------------------------------------- */
  /*                              Mutations Define                              */
  /* -------------------------------------------------------------------------- */
  mutations: {
    setDrawer(state, payload) {
      state.Drawer = payload;
    },
    setHeaderTitle(state, payload) {
      state.headerTitle = payload;
    },
    addNotification(state, payload) {
      state.notification.unshift(payload);
    },
    setNotification(state, payload) {
      state.notification = payload;
    },
    setNotificationUnseen(state, payload) {
      state.notificationUnseen = payload;
    },
    setNotificationTime(state, payload) {
      state.notificationTime = payload;
    },
  },
  // use modules
  modules: {
    ApplicationSelection,
    BeneficiaryManagement,
    BudgetManagement,
    EmergencyPaymentManagement,
    GrievanceManagement,
    ManageAllotment,
    MEReporting,
    PayrollManagement,
    SystemConfiguration,
    TrainingManagement,
    Division,
  },
  plugins: [
    createPersistedState({
      paths: ["userData", "token", "userPermissions"],
    }),
  ],
});
