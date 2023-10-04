import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
    // Module-specific state
    roles: [],
    modules: [],
    all_modules: [],
    rolePermission: [],
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

    STORE_ROLE_PERMISSION: (state, data) => {
        if (data.data) {
            state.success_message = data.data.message;
            state.success_status = data.status;
            state.errors = {};
            state.error_status = "";
        } else {
            state.success_message = "";
        }
    },

    GET_EDIT_ROLE_PERMISSION: (state, data) => {
        state.rolePermission = data;
    },

    updateValue: (state, data) => {
        state.rolePermission = data;
    }
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

    StoreRolePermission: ({commit}, data) => {
        return http().post("/admin/role/permission/assign", data).then((result) => {
            commit("STORE_ROLE_PERMISSION", result);
        }).catch((err) => {
            state.errors = err.response.data.errors;
            state.error_status = err.response.status;
        })
    },

    EditAllPermission: ({commit}, id) => {
        return http().get(`/admin/role/permission/role_permission_edit/${id}`).then((result) => {
            commit("GET_EDIT_ROLE_PERMISSION", result.data.role_permission);
        }).catch((err) => {
            console.log(err);
        })
    }
};

/* -------------------------------------------------------------------------- */
/*                               Getters Define                               */
/* -------------------------------------------------------------------------- */
const getters = {
    // Module-specific getters
    rolePermissions: (state) =>{
        return state.rolePermission;
    }
};

export default {
    namespaced: true, // Ensures the module is isolated
    state,
    mutations,
    actions,
    getters,
};
