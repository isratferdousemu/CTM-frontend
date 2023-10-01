import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  city: [],
  city: {},
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

  GET_CITY: (state, data) => {
    state.city = data;
  },

  STORE_CITY: (state, data) => {
    state.city = data.data;
    state.errors = {};
    // if (state.city.push(data.data)) {
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

  GET_SINGLE_CITY: (state, data) => {
    state.city = data;
  },

  UPDATE_CITY: (state, data) => {
    if (state.city.push(data.data)) {
      state.success_message = data.data.message;
      state.success_status = data.status;
    } else {
      state.success_message = "";
    }
  },

  DELETE_CITY: (state, { id, data }) => {
    if (id) {
      state.city.data = state.city.data.filter((item) => {
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

  /*start get all city*/
  GetAllCity: ({ commit }) => {
    return http()
      .get("/admin/city/get")
      .then((result) => {
        console.log(result.data);
        commit("GET_CITY", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all city*/

  /*start get all city*/
  GetSearchCity: ({ commit }, data) => {
    return http()
      .get(`/admin/city/get/${data}`)
      .then((result) => {
        // console.log("hello");
        console.log(result.data);
        commit("GET_CITY", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all city*/

  /*start  store city*/
  StoreCity: ({ commit }, data) => {
    // alert('StoreCity'+ data);
    return http()
      .post("/admin/city/insert", data)
      .then((result) => {
        console.log(result.data);
        console.log(commit);
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
  /*end  store city*/

  /*start edit city */
  EditCity: ({ commit }, id) => {
    return http()
      .get(`/admin/city/edit/${id}`)
      .then((result) => {
        commit("GET_SINGLE_CITY", result.data);
      })
      .catch((err) => {
        state.errors = err.response.data.errors;
        state.error_status = err.response.status;
      });
  },
  /*end edit city */

  /*start update city*/
  UpdateCity: ({ commit }, data) => {
    return http()
      .post(`/admin/city/update/`, data)
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
  /*end update city*/

  /*start delete city*/
  DestroyCity: ({ commit }, id) => {
    return http()
      .get(`/admin/city/destroy/${id}`)
      .then((result) => {
        return result
      })
      .catch((err) => {
      return err
      });
  },
  /*end delete city*/
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
