import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  divisions: [],
  division: {},
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

  GET_DIVISION: (state, data) => {
    state.divisions = data;
  },
  
  SET_DIVISION: (state, data) => {
    state.divisions = data;
  },
  

  STORE_DIVISION: (state, data) => {
    state.divisions = data.data;
    state.errors = {};
    // if (state.divisions.push(data.data)) {
    //   state.success_message = data.data.message;
    //   state.success_status = data.status;
    // } else {
    //   state.success_message = "";
    // }
  },

  RESET_ERRORS: (state) => {
    state.errors = {};
    state.error_status = "";
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

  DELETE_DIVISION: (state, { id, data }) => {
    if (id) {
      state.divisions.data = state.divisions.data.filter((item) => {
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
  GetAllDivisions: ({ commit }) => {
    return http()
      .get("/admin/division/get")
      .then((result) => {
        console.log(result.data);
        commit("GET_DIVISION", result.data.data);
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
        console.log(result.data);
        commit("GET_DIVISION", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all divisions*/

  /*start  store division*/
  StoreDivision: ({ commit }, data) => {
    // alert('StoreDivision'+ data);
    return http()
      .post("/admin/division/insert", data)
      .then((result) => {
        console.log(result.data);
        console.log(commit);
        commit("RESET_ERRORS");
      })
      .catch((err) => {
        // state.errors = err.response.data.errors;
        // state.error_status = err.response.message;
        const data = {
          errors: err.response.data.errors,
          error_status: err.response.message,
        };
        return data;
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
  UpdateDivision: ({ commit }, data ) => {
    return http()
      .post(`/admin/division/update/`, data)
      .then((result) => {
        console.log(result);
        commit("RESET_ERRORS");        
      })
      .catch((err) => {
        state.errors = err.response.data.errors;
        state.error_status = err.response.message;
        const data = {
          errors: err.response.data.errors,
          error_status: err.response.message,
        };
        return data;
      });
  },
  /*end update division*/

  /*start delete division*/
  DestroyDivision: ({ commit }, id) => {
    return http()
      .get(`/admin/division/destroy/${id}`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end delete division*/

  /*Set division*/
  SetDivision: ({ commit }, data) => {    
    commit("SET_DIVISION", data);
  },
  /*Set division*/
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
