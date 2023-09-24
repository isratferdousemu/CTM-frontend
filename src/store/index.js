import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { http } from "@/hooks/httpService";
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
// Import other modules as needed
import Division from "./modules/system_configuration/division/index.js";

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
    forgotPasswordErrors: [],
    forgotPasswordErrorMessageOtp: null,
    step: 1,
    token: null,
    roles: [],
    rolesAll: [],
    permissions: [],
    userPermissions: [],
    userData: null,
  },
  /* -------------------------------------------------------------------------- */
  /*                               Getters Define                               */
  /* -------------------------------------------------------------------------- */
  getters: {
    data: (state) => state.data,
  },
  GetToken: function (state) {
    return state.token;
  },
  /* -------------------------------------------------------------------------- */
  /*                               Actions Define                               */
  /* -------------------------------------------------------------------------- */
  actions: {
    async getData({ commit }) {
      const data = await fetch("http://api.icndb.com/jokes/random/15");
      commit("SET_DATA", await data.json());
    },
    sendOtp: ({ commit, state }, data) => {
      return http()
        .post("admin/forgot-password", data)
        .then((result) => {
          commit("setStep", 2);
          // console.log(state.step);
          // console.log(result);
        })
        .catch((err) => {
          // console.log(err);
          commit("setforgotPasswordErrors", err.response.data.errors);
        });
    },
    forgotPasswordSubmit: ({ commit, state }, data) => {
      return http()
        .post("admin/forgot-password/submit", data)
        .then((result) => {
          // console.log(result);
          this.$router.push({
            path: "/login",
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.success == false) {
            // this.error_message_otp = err.response.data.message;
            commit(
              "setforgotPasswordErrorMessageOtp",
              err.response.data.message
            );
          } else {
            // this.errors = err.response.data.errors;
            commit("setforgotPasswordErrors", err.response.data.errors);
          }
        });
    },
    login({ commit }, data) {
      commit('setToken', data.token);
      console.log('state permission', data.permissions);
      commit('setUserPermissions', data.permissions);
      commit('setUser', data.user);
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', []);
    },
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
    setforgotPasswordErrors(state, payload) {
      state.forgotPasswordErrors = payload;
    },
    setforgotPasswordErrorMessageOtp(state, payload) {
      state.forgotPasswordErrorMessageOtp = payload;
    },
    setStep(state, payload) {
      state.step = payload;
    },
    //Authentication
    setToken(state, token) {
      state.token = token;
      state.token = '1|lt5Vo6QK300ypBrCXNascL540T9SEU03KQTBFL4Nccd6b3fd';
    },
    setRoles(state, data) {
      state.roles = data;
    },
    GetAllRole(state, data) {
      state.rolesAll = data;
    },
    setPermissions(state, data) {
      state.permissions = data;
    },
    setUserPermissions(state, data) {
      state.userPermissions = data;
    },
    setUser(state, userData) {
      state.userData = userData;
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
