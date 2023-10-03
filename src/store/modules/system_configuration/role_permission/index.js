import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
    // Module-specific state
    roles: [],
    modules: [],
    all_modules: [],
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
    GET_ALL_ROLES: (state, data) => {
        state.roles = data.data;
    },

    GET_ALL_PERMISSION: (state, data) => {
        state.modules = data.data;
        state.all_modules = data.result;
    },
};

/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {
    // Module-specific actions
    GetAllRole: ({commit}) => {
        return http().get("/admin/role/permission/roles/unassign").then((result) => {
            commit('GET_ALL_ROLES', result.data);
        }).catch((err) => {
            console.log(err);
        })
    },

    GetAllPermission: ({commit}) => {
        return http().get("/admin/role/permission/modules").then((result) => {
            commit("GET_ALL_PERMISSION", result.data);
        }).catch((err) => {
            console.log(err);
        })
    },
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
