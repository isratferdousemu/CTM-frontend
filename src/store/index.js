import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { http } from "@/hooks/httpService";
import axios from 'axios'
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
import District from "@/store/modules/system_configuration/district";
import City from "@/store/modules/system_configuration/city";
import Union from "@/store/modules/system_configuration/union";
import Ward from "@/store/modules/system_configuration/ward";
import Thana from "@/store/modules/system_configuration/thana";
import Menu from "@/store/modules/system_configuration/menu";
import Device_registration from "@/store/modules/system_configuration/device_registration";

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
    forgotPasswordErrors: [],
    forgotPasswordErrorMessageOtp: null,
    step: 1,
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
    errors: [],
    error_message: "",
    error_status: "",
    success_status: "",
    loginData:[],
    otpData:[],
    lookupTypes: [
      {id: 1, name: 'Location Type'},
      {id: 2, name: 'Allowance Service'},
      {id: 3, name: 'Office category'},
      {id: 4, name: 'Health Status'},
      {id: 5, name: 'Financial Status'},
      {id: 6, name: 'Social Status'},
      {id: 7, name: 'PMT Scoring'},
      {id: 8, name: 'Education Status'},
      {id: 9, name: 'Religion'},
      {id:10, name: 'Household Asset Own'},
      {id:11, name: 'Disability Type'},
      {id:12, name: 'Disability Level'},
      {id:13, name: 'Bank Name'},
      {id:14, name: 'Branch Name'},
      {id:15, name: 'Complaint Category'},
      {id:16, name: 'Module Name'},
      {id:17, name: 'Organization'},
    ],

  },
  /* -------------------------------------------------------------------------- */
  /*                               Getters Define                               */
  /* -------------------------------------------------------------------------- */
  getters: {
    getOtpresponse(state) {
      return state.otpData
    },
    getLoginresponse(state)  {
      return state.loginData
    },
    GetToken: function (state) {
      return state.token;
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                               Actions Define                               */
  /* -------------------------------------------------------------------------- */
  actions: {
    sendOtpForgetPassword: ({ commit, state }, data) => {
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
    LoginSubmit: ({ commit, state }, data) => {
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
    sendOtp: ({ commit, state }, data) => {
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
    async getLookupByType({ state }, type) {
      return await axios.get("/admin/lookup/get/" + type, {
        headers: {
          Authorization: "Bearer " + state.token,
          "Content-Type": "multipart/form-data",
        }
      }).then((result) => {

        return result.data.data
      });
    },
    },


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
    setOtpresponse(state, otpData) {
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
    Thana,
    District,
    City,
    Union,
    Ward,
    Menu,
    Device_registration,
  },
  plugins: [
    createPersistedState({
      paths: ["userData", "token", "userPermissions", "loginData"],
    }),
  ],
});
