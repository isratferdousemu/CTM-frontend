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
import Division from "@/store/modules/system_configuration/division";
import Menu from "@/store/modules/system_configuration/menu";

// Import other modules as needed

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
    token: null,
    roles: [],
    rolesAll: [],
    permissions: [],
    userPermissions: [],
    userData: null,
    //practice
    forms: [],
    division: {},
    success_message: "",
    errors: {},
    error_message: "",
    error_status: "",
    success_status: "",
    loginData:[],
    otpData:[]

  },
  /* -------------------------------------------------------------------------- */
  /*                               Getters Define                               */
  /* -------------------------------------------------------------------------- */
  getters: {
    data: (state) => state.data,
    getLoginresponse(state){
      return state.loginData
    },
       getOtpresponse(state){
      return state.otpData
    },
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

    LoginSubmit: ({ commit,state }, data) => {
    return http()
    .post("admin/login/otp", data)
    .then((result) => {
      commit("setOtpresponse", result);
    })
    .catch((err) => {
      state.errors = err.response.data.errors;
      state.error_status = err.response.status;
    });
  },
   sendOtp: ({ commit,state }, data) => {
    return http()
    .post("admin/login", data)
    .then((result) => {
      commit("setOtp", result);

    })
    .catch((err) => {
      state.errors = err.response.data.errors;
      state.error_status = err.response.status;
    });
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

    //Authentication
    setToken(state, token) {
      state.token = token;
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
    LoginSubmit: (state, data) => {
    if (state.forms.push(data.data)) {
      state.loginData = data.data;
      // state.success_status = data.status;
    } else {
      state.success_message = "";
    }
  },
   setOtp(state, loginData) {
      state.loginData = loginData
    },
    setOtpresponse(state, otpData){
       state.otpData = otpData
    }

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
    Menu,
  },
  plugins: [
    createPersistedState({
      paths: ["userData", "token", "userPermissions"],
    }),
  ],
});
