import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
    // Module-specific state
    allowanceProgrames: [],
    allowancePrograme: {},
    allowanceGender: [],
    allowanceAge: [],
    allowanceAmount: [],
    allowanceField: [],
    additionalFields: [],
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

    /*get all additional field start*/
    GET_ALL_ADDITIONAL_FIELD: (state, data) => {
        state.additionalFields = data;
    },
    /*get all additional field end*/

    /*store allowance program start*/
    STORE_ALLOWANCE_PROGRAM: (state, data) => {
        if (state.allowanceProgrames.push(data.data)) {
            state.success_message = data.data.message;
            state.success_status = data.status;
            state.errors = {};
            state.error_status = "";
        } else {
            state.success_message = "";
        }
    },
    /*store allowance program end*/

    /*edit allowance program start*/
    GET_EDIT_ALLOWANCE_PROGRAM: (state, data) => {
        state.allowancePrograme = data.allowance;
        state.allowanceField = data.allowance_field;
        state.allowanceAge = data.allowance_age_limit;
        state.allowanceAmount = data.allowance_amount;
    },
    /*edit allowance program end*/

    /*update allowance program start*/
    UPDATE_ALLOWANCE_PROGRAM: (state, data) => {
        if (state.allowanceProgrames.push(data.data)) {
            state.success_message = data.data.message;
            state.success_status = data.status;
            state.errors = {};
            state.error_status = "";
        } else {
            state.success_message = "";
        }
    }
    /*update allowance program end*/
};

/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {
    // Module-specific actions

    /*Get All Additional Field start*/
    GetAllAdditionalField: ({commit}) => {
        return http().get('/admin/allowance/get_additional_field').then((result) => {
            commit('GET_ALL_ADDITIONAL_FIELD', result.data.data);
        }).catch((err) => {
            console.log(err);
        })
    },
    /*Get All Additional Field end*/

    /*store allowance program start*/
    StoreAllowanceProgram: ({commit}, data) => {
        return http().post('/admin/allowance/insert', data).then((result) => {
            commit('STORE_ALLOWANCE_PROGRAM', result);
        }).catch((err) => {
            state.errors = err.response.data.errors
            state.error_status = err.response.status
        })
    },
    /*store allowance program end*/

    /*edit allowance program start*/
    GetEditAllowanceProgram: ({commit}, id) => {
        return http().get(`/admin/allowance/edit/${id}`).then((result) => {
            commit('GET_EDIT_ALLOWANCE_PROGRAM', result.data);
        }).catch((err) => {
            console.log(err);
        })
    },
    /*edit allowance program end*/

    /*update allowance program start*/
    UpdateAllowanceProgram: ({commit}, {id, data}) => {
        return http().post(`/admin/allowance/update/${id}`, data).then((result) => {
            commit('UPDATE_ALLOWANCE_PROGRAM', result);
        }).catch((err) => {
            state.errors = err.response.data.errors
            state.error_status = err.response.status
        })
    }
    /*update allowance program end*/
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
