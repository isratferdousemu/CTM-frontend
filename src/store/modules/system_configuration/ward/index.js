import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
    // Module-specific state
    wards: [],
    ward: {},
    success_message: "",
    ward_errors: {},
    error_message: "",
    error_status: "",
    success_status: "",

};

/* -------------------------------------------------------------------------- */
/*                              Mutations Define                              */
/* -------------------------------------------------------------------------- */
const mutations = {
    // Module-specific mutations


    STORE_WARD: (state, data) => {
        if (state.wards.push(data.data)) {
            state.success_message = data.data.message;
            state.success_status = data.status;
        } else {
            state.success_message = "";
        }
    },

    DELETE_UPAZILA: (state, { id, data }) => {
        if (id) {
            state.upazilas.data = state.upazilas.data.filter((item) => {
                return id !== item.id;
            });

            state.success_message = data.message;
        } else {
            state.success_message = "";
        }
    },
    // DELETE_WARD: (state, { id, data }) => {
    //     if (id) {
    //         state.wards.data = state.wards.data.filter((item) => {
    //             return id !== item.id;
    //         });

    //         state.success_message = data.message;
    //     } else {
    //         state.success_message = "";
    //     }
    // },
    updateMyData(state, update_error_value) {
        state.ward_errors = update_error_value;
    },

};


/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {

    StoreWard: ({ commit }, data) => {
        // alert('StoreDivision'+ data);
        return http()
            .post("/admin/ward/insert", data)
            .then((result) => {
                console.log(result.data);
                console.log(commit);
                // alert("Successfully Inserted");
                // this.$router.push({
                //   path: "/system-configuration/division",
                // });
                commit("STORE_WARD", result);
                return result
            })
            .catch((err) => {
                return err
            });
    },
    UpdateWard: ({ commit }, data) => {
        // alert('StoreDivision'+ data);
        return http()
            .post("/admin/ward/update", data)
            .then((result) => {
                console.log(result.data);
                console.log(commit);
                // alert("Successfully Inserted");
                // this.$router.push({
                //   path: "/system-configuration/division",
                // });
                commit("STORE_WARD", result);
                return result;
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.errors) {
                    state.ward_errors = err.response.data.errors;
                    state.error_status = err.response.status;
                } else {
                    console.error("Error:", err);
                    // Handle the error as needed when response or data is not available
                }
            });
    },

    // UpdateUnion: ({ commit }, { id, data }) => {
    //     return http()
    //         .post(`/admin/union/update/${id}`, data)
    //         .then((result) => {
    //             commit("STORE_UNION", result);
    //         })
    //         .catch((err) => {
    //             state.errors = err.response.data.errors;
    //             state.error_status = err.response.status;
    //         });
    // },
    /*end update division*/

    /*start delete division*/
    DestroyWard: ({ commit }, id) => {
        return http()
            .get(`/admin/ward/destroy/${id}`)
            .then((result) => {
                console.log(result);
                // commit("DELETE_WARD", { id: id, data: result.data });
                return result.data;
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    },
    
    async updateError({ commit }, update_error_value) {
        // You can perform asynchronous operations here if needed.
        commit('updateMyData', update_error_value);
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
