import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
    // Module-specific state
    roles: [],
    role: {},
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

    STORE_ROLE: (state, data) => {
        if (state.roles.push(data.data)) {
          state.success_message = data.data.message;
          state.success_status = data.status;
          state.errors = {};
          state.error_status = "";
        } else {
          state.success_message = "";
        }
    },

    GET_SINGLE_ROLE: (state, data) => {
        state.role = data.data;
    },

    UPDATE_ROLE: (state, data) => {
        if (state.roles.push(data.data)) {
            state.success_message = data.data.message;
            state.success_status = data.status;
            state.errors = {};
            state.error_status = "";
            console.log(state.success_status);
        } else {
            state.success_message = "";
        }
    },

    DELETE_ROLE: (state, { id, data }) => {
        if (id) {
            state.roles.data = state.roles.data.filter((item) => {
                return id !== item.id;
            });

            state.success_message = data.message;
        } else {
            state.success_message = "";
        }
    },

    UPDATE_ROLE_STATUS: (state, data) => {
        state.role = data;
    },
};

/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {
    // Module-specific actions

    /*start  store role*/
    StoreRole: ({ commit }, data) => {
        // alert('StoreDivision'+ data);
        return http()
            .post("/admin/role/insert", data)
            .then((result) => {
                commit("STORE_ROLE", result);
            })
            .catch((err) => {
                state.errors = err.response.data.errors;
                state.error_status = err.response.status;
            });
    },
    /*end  store role*/

    /*start edit role */
    EditRole: ({ commit }, id) => {
        return http()
            .get(`/admin/role/edit/${id}`)
            .then((result) => {
                commit("GET_SINGLE_ROLE", result.data);
            })
            .catch((err) => {
                state.errors = err.response.data.errors;
                state.error_status = err.response.status;
            });
    },
    /*end edit role */

    /*start update role*/
    UpdateRole: ({ commit }, data ) => {
        return http()
            .post(`/admin/role/update`, data)
            .then((result) => {
                commit("UPDATE_ROLE", result);
            })
            .catch((err) => {
                state.errors = err.response.data.errors;
                state.error_status = err.response.status;
            });
    },
    /*end update role*/

    /*start delete role*/
    DestroyRole: ({ commit }, id) => {
        return http()
            .delete(`/admin/role/destroy/${id}`)
            .then((result) => {
                commit("DELETE_ROLE", {id:id, data:result.data})
            })
            .catch((err) => {
                return err
            });
    },
    /*end delete role*/
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
