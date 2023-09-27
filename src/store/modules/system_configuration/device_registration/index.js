/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
import { http } from "@/hooks/httpService";

const state = {
    devices: [],
    device: {},
    users: [],
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
    GET_ALL_DEVICE: (state, data) => {
        state.devices = data.data;
    },

    GET_ALL_USERS: (state, data) => {
        state.users = data;
    },

    STORE_DEVICE: (state, data) => {
        if (state.devices.push(data.data)) {
            state.success_message = data.data.message;
            state.success_status = data.status;
        } else {
            state.success_message = "";
        }
    },

    GET_SINGLE_DEVICE: (state, data) => {
        state.device = data.device;
    },

    UPDATE_DEVICE: (state, data) => {
        if (state.devices.push(data.data)) {
            state.success_message = data.data.message;
            state.success_status = data.status;
        } else {
            state.success_message = "";
        }
    },

    DELETE_DEVICE: (state, { id, data }) => {
        if (id) {
            state.devices = state.devices.filter((item) => {
                return id !== item.id;
            });

            state.success_message = data.message;
        } else {
            state.success_message = "";
        }
    },

    ACTIVATE_DEVICE: (state, data) => {
        if(state.devices.push(data.data))
        {
            state.success_message = data.data.message;
            state.success_status = data.status;
        }else{
            state.success_message = '';
        }
    }
};

/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {
    /*start get all device*/
    GetAllDevice: ({ commit }) => {

        return http()
            .get("/admin/device/get")
            .then((result) => {
                commit("GET_ALL_DEVICE", result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    /*end get all device*/

    /*start get all users*/
    GetAllUsers: ({commit}) => {
        return http().get('/admin/device/get_users').then((result) => {
            commit('GET_ALL_USERS', result.data.users);
        }).catch((err) => {
            console.log(err);
        })
    },
    /*end get all users*/

    /*start store menus*/
    StoreDevice: ({ commit }, data) => {
        return http()
            .post("/admin/device/insert", data)
            .then((result) => {
                commit("STORE_DEVICE", result);
            })
            .catch((err) => {
                state.errors = err.response.data.errors;
                state.error_status = err.response.status;
            });
    },
    /*end store device*/

    /*start get single device*/
    GetSingleDevice: ({ commit }, id) => {
        return http()
            .get(`/admin/device/edit/${id}`)
            .then((result) => {
                commit("GET_SINGLE_DEVICE", result.data);
            })
            .catch((err) => {
                state.errors = err.response.data.errors;
                state.error_status = err.response.status;
            });
    },
    /*end get single device*/

    /*start update device*/
    UpdateDevice: ({ commit },  data ) => {
        return http()
            .post(`/admin/device/update`, data)
            .then((result) => {
                commit("UPDATE_DEVICE", result);
            })
            .catch((err) => {
                state.errors = err.response.data.errors;
                state.error_status = err.response.status;
            });
    },
    /*end update device*/

    /*start destroy device*/
    DestroyDevice: ({ commit }, id) => {
        return http()
            .delete(`/admin/device/destroy/${id}`)
            .then((result) => {
                commit("DELETE_DEVICE", { id: id, data: result.data });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    /*end destroy device*/

    /*start device activated*/
    ActivateDevice: ({commit}, id) => {
        return http().post(`/admin/device/status/${id}`).then((result) => {
            commit('ACTIVATE_DEVICE', result)
        }).catch((err) => {
            console.log(err);
        })
    }
    /*end device activated*/
};

/* -------------------------------------------------------------------------- */
/*                               Getters Define                               */
/* -------------------------------------------------------------------------- */
const getters = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
