import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  upazilas: [],
  upazila: {},
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
};

/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {
  // Module-specific actions

  /*start get all divisions*/
  GetAllUpazilas: ({ commit }) => {
    return http()
      .get("/admin/thana/get")
      .then((result) => {
       
        commit("GET_UPAZILA", result.data.data);
        console.log(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all divisions*/

  /*start get all divisions*/
  GetSearchDivisions: ({ commit },data) => {
    return http()
      .get(`/admin/division/get/${data}`)
      .then((result) => {
        // console.log("hello");
   
        commit("GET_DIVISION", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all divisions*/

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
        state.errors = err.response.data.errors;
        state.error_status = err.response.status;
        console.log(state.errors.code[0]);
        // console.log(state.error_status);
        // console.log(state.errors);
      });
  },
  /*end  store division*/

  /*start edit division */
  EditDivision: ({ commit }, id) => {
    return http()
      .get(`/admin/division/edit/${id}`)
      .then((result) => {
        commit("GET_SINGLE_DIVISION", result.data);
      })
      .catch((err) => {
        state.errors = err.response.data.errors;
        state.error_status = err.response.status;
      });
  },
  /*end edit division */

  /*start update division*/
  UpdateDivision: ({ commit }, { id, data }) => {
    return http()
      .post(`/api/division/update/${id}`, data)
      .then((result) => {
        commit("UPDATE_DIVISION", result);
      })
      .catch((err) => {
        state.errors = err.response.data.errors;
        state.error_status = err.response.status;
      });
  },
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
  /*end delete division*/
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
