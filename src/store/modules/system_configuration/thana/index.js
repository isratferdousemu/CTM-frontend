import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  upazilas: [],
  upazila: {},
  success_message: "",
  upazila_errors: {},
  error_message: "",
  error_status: "",
  success_status: "",

};

/* -------------------------------------------------------------------------- */
/*                              Mutations Define                              */
/* -------------------------------------------------------------------------- */
const mutations = {
  // Module-specific mutations


  STORE_UPAZILA: (state, data) => {
    if (state.upazilas.push(data.data)) {
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
  updateMyData(state, update_error_value) {
    state.union_errors = update_error_value;
  },

};


/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {

  StoreUpazila: ({ commit }, data) => {
    // alert('StoreDivision'+ data);
    return http()
      .post("/admin/thana/insert", data)
      .then((result) => {
        console.log(result.data);
        console.log(commit);
        // alert("Successfully Inserted");
        // this.$router.push({
        //   path: "/system-configuration/division",
        // });
        commit("STORE_UPAZILA", result);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          state.thana_errors = err.response.data.errors;
          state.error_status = err.response.status;
        } else {
          console.error("Error:", err);
          // Handle the error as needed when response or data is not available
        }
      });
  },
  UpdateUpazila: ({ commit }, data) => {
    // alert('StoreDivision'+ data);
    return http()
      .post("/admin/upazila/update", data)
      .then((result) => {
        console.log(result.data);
        console.log(commit);
        // alert("Successfully Inserted");
        // this.$router.push({
        //   path: "/system-configuration/division",
        // });
        commit("STORE_UPAZILA", result);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          state.upazila_errors = err.response.data.errors;
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
  DestroyUpazila: ({ commit }, id) => {
    return http()
      .get(`/admin/thana/destroy/${id}`)
      .then((result) => {
        console.log(result);
        commit("DELETE_UPAZILA", { id: id, data: result.data });
      })
      .catch((err) => {
        console.log(err);
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
