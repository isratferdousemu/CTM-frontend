import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  upazilas: [],
  upazila: {},
  success_message: "",
  thana_errors: {},
  error_message: "",
  error_status: "",
  success_status: "",

};

/* -------------------------------------------------------------------------- */
/*                              Mutations Define                              */
/* -------------------------------------------------------------------------- */
const mutations = {
  // Module-specific mutations

  GET_UPAZILA: (state, data) => {
    state.upazilas = data;
  },

  STORE_UPAZILA: (state, data) => {
    if (state.upazilas.push(data.data)) {
      state.success_message = data.data.message;
      state.success_status = data.status;
    } else {
      state.success_message = "";
    }
  },

  GET_SINGLE_DIVISION: (state, data) => {
    state.division = data;
  },

  UPDATE_DIVISION: (state, data) => {
    if (state.divisions.push(data.data)) {
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
    UPDATE_ERROR(state, newData) {
      state.thana_errors = newData;
    },
};

/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {
  // Module-specific actions



  /*start  store division*/
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
        state.thana_errors = err.response.data.errors;
        state.error_status = err.response.status;

        // console.log(state.error_status);
        // console.log(state.errors);
      });
  },
  UpdateUpazila: ({ commit }, data) => {
    // alert('StoreDivision'+ data);
    return http()
      .post("/admin/thana/update", data)
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
        state.thana_errors = err.response.data.errors;
        state.error_status = err.response.status;

        // console.log(state.error_status);
        // console.log(state.errors);
      });
  },
  

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
