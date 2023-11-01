/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
import {http} from "@/hooks/httpService";

const state = {
  // Module-specific state
  allotments: [],
  allotment: {},
  allowances: [],
  allowanceAmounts: [],
  educationGender: [],
  districts: [],
  locations: [],
  financial_years: [],
  is_disable_class: '',
  success_message: "",
  errors: {},
  error_message: "",
  error_status: "",
  success_status: "",
};

/* -------------------------------------------------------------------------- */
/*                              Mutations Define                              */
/* -------------------------------------------------------------------------- */

const mutations = {
  // Module-specific mutations

  GET_ALLOWANCE_PROGRAM: (state, data) => {
    state.allowances = data;
  },

  GET_ALLOWANCE_PROGRAM_AMOUNT: (state, data) => {
    state.allowanceAmounts = data.data;
    state.is_disable_class = data.is_disable;
    state.educationGender = data.education_gender;
  },

  GET_ALL_DISTRICT: (state, data) => {
    state.districts = data;
  },

  GET_ALL_LOCATION: (state, data) => {
    state.locations = data;
  },

  GET_FINANCIAL_YEAR: (state, data) => {
    state.financial_years = data;
  },
};
/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {
  // Module-specific actions

  /*get all active allowance program start*/
  getAllAllowanceProgram: ({commit}) => {
    return http().get('/admin/allotment/get_allowance_program').then((result) => {
      commit('GET_ALLOWANCE_PROGRAM', result.data.data);
    }).catch((err) => {
      state.errors = err.response.errors
    })
  },
  /*get all active allowance program end*/

  /*get allowance program amount start*/
  getAllowanceProgramAmount: ({commit}, id) => {
    return http().get(`/admin/allotment/get_allowance_amount/${id}`).then((result) => {
      commit('GET_ALLOWANCE_PROGRAM_AMOUNT', result.data);
      console.log(result.data);
    }).catch((err) => {
      state.errors = err.response.errors;
    })
  },
  /*get allowance program amount end*/

  /*get all districts start*/
  getAllDistrict: ({commit}) => {
    return http().get('/admin/allotment/get_district').then((result) => {
      commit('GET_ALL_DISTRICT', result.data.data);
    }).catch((err) => {
      state.errors = err.response.errors
    })
  },
  /*get all districts end*/

  /*get all office location start*/
  getAllOfficeLocation: ({commit}, id) => {
    return http().get(`/admin/allotment/get_location/${id}`).then((result) => {
      commit('GET_ALL_LOCATION', result.data.data);
    }).catch((err) => {
      state.errors = err.response.errors
    })
  },
  /*get all office location end*/

  /*get all financial year start*/
  getAllFinancialYear: ({commit}) => {
    return http().get('/admin/allotment/get_financial_year').then((result) => {
        commit('GET_FINANCIAL_YEAR', result.data.data);
    }).catch((err) => {
      state.errors = err.response.errors
    })
  },
  /*get all financial year end*/
};
/* -------------------------------------------------------------------------- */
/*                               Getters Define                               */
/* -------------------------------------------------------------------------- */
const getters = {
  // Module-specific getters
};

export default {
  namespaced: true, // Ensures the module is isolated
  state,
  mutations,
  actions,
  getters,
};
