import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  ubions: [],
  upazila: {},
  success_message: "",
  union_errors: {},
  error_message: "",
  error_status: "",
  success_status: "",

};

/* -------------------------------------------------------------------------- */
/*                              Mutations Define                              */
/* -------------------------------------------------------------------------- */
const mutations = {
  // Module-specific mutations


  STORE_UNION: (state, data) => {
    if (state.unions.push(data.data)) {
      state.success_message = data.data.message;
      state.success_status = data.status;
    } else {
      state.success_message = "";
    }
  },

   UPDATE_ERROR(state, newData) {
      state.union_errors = newData;
    },
};

/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {
  // Module-specific actions



  /*start  store division*/
  StoreUnion: ({ commit }, data) => {
    // alert('StoreDivision'+ data);
    return http()
      .post("/admin/union/insert", data)
      .then((result) => {
        console.log(result.data);
        console.log(commit);
        // alert("Successfully Inserted");
        // this.$router.push({
        //   path: "/system-configuration/division",
        // });
        commit("STORE_UNION", result);
      })
      .catch((err) => {
        // state.union_errors = err.response.data.errors;
        // state.error_status = err.response.status;
        if (err.response && err.response.data && err.response.data.errors) {
          state.union_errors = err.response.data.errors;
          state.error_status = err.response.status;
        } else {
          console.error("Error:", err);
          // Handle the error as needed when response or data is not available
        }
      });
  },
  UpdateUnion: ({ commit }, data) => {
    // alert('StoreDivision'+ data);
    return http()
      .post("/admin/union/update", data)
      .then((result) => {
        console.log(result.data);
        console.log(commit);
        // alert("Successfully Inserted");
        // this.$router.push({
        //   path: "/system-configuration/division",
        // });
        commit("STORE_UNION", result);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.errors) {
          state.union_errors = err.response.data.errors;
          state.error_status = err.response.status;
        } else {
          console.error("Error:", err);
          // Handle the error as needed when response or data is not available
        }

        // console.log(state.error_status);
        // console.log(state.errors);
      });
  },
  

  DestroyUnion: ({ commit }, id) => {
    return http()
      .get(`/admin/union/destroy/${id}`)
      .then((result) => {
        console.log(result);
        commit("DELETE_UPAZILA", { id: id, data: result.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end delete upazila*/
  async updateError({ commit }, newData) {
    // You can perform asynchronous operations here if needed.
    commit('UPDATE_ERROR', newData);
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
