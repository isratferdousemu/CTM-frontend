import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  lookups: [],
  lookup: {},
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
    state.lookups = data;
  },

  SET_lookup: (state, data) => {
    state.lookups = data;
  },
  
  STORE_DIVISION: (state, data) => {
    state.lookups = data.data;
    state.errors = {};
    // if (state.lookups.push(data.data)) {
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
    state.lookup = data;
  },

  UPDATE_DIVISION: (state, data) => {
    if (state.lookups.push(data.data)) {
      state.success_message = data.data.message;
      state.success_status = data.status;
    } else {
      state.success_message = "";
    }
  },

  DELETE_DIVISION: (state, { id, data }) => {
    if (id) {
      state.lookups.data = state.lookups.data.filter((item) => {
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

  /*start get all lookups*/
  GetAlllookups: ({ commit }) => {
    return http()
      .get("/admin/lookup/get")
      .then((result) => {
        console.log(result.data);
        commit("GET_DIVISION", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all lookups*/

  /*start get all lookups*/
  GetSearchlookups: ({ commit },data) => {
    return http()
      .get(`/admin/lookup/get/${data}`)
      .then((result) => {
        // console.log("hello");
        console.log(result.data);
        commit("GET_DIVISION", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all lookups*/

  /*start  store lookup*/
  StoreLookup: ({ commit }, data) => {
    // alert('Storelookup'+ data);
    return http()
      .post("/admin/lookup/insert", data)
      .then((result) => {
        console.log(result.data);
        console.log(commit);
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
  /*end  store lookup*/

  /*start update lookup*/
  UpdateLookup: ({ commit }, data ) => {
    return http()
      .post(`/admin/lookup/update/`, data)
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
  /*end update lookup*/

  /*start delete lookup*/
  DestroyLookup: ({ commit }, id) => {
    return http()
      .get(`/admin/lookup/destroy/${id}`)
      .then((result) => {
        return result
      })
      .catch((err) => {
      return err
      });
  },
  /*end delete lookup*/
  
  /*Set division*/
  Setlookup: ({ commit }, data) => {   
    console.log("lookup"); 
    console.log(data); 
    commit("SET_lookup", data);
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
