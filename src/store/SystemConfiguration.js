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

  STORE_DIVISION: (state, data) => {
    if (state.divisions.push(data.data)) {
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

  DELETE_DIVISION: (state, { id, data }) => {
    if (id) {
      state.divisions = state.divisions.filter((item) => {
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
      .get("/api/division")
      .then((result) => {
        commit("GET_DIVISION", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all divisions*/

  /*start  store division*/
  StoreDivision: ({ commit }, data) => {
    return http()
      .post("/api/division/store", data)
      .then((result) => {
        commit("STORE_DIVISION", result);
      })
      .catch((err) => {
        state.errors = err.response.data.errors;
        state.error_status = err.response.status;
      });
  },
  /*end  store division*/

  /*start edit division */
  EditDivision: ({ commit }, id) => {
    return http()
      .get(`/api/division/edit/${id}`)
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
  DestroyDivision: ({ commit }, id) => {
    return http()
      .get(`/api/division/destroy/${id}`)
      .then((result) => {
        commit("DELETE_DIVISION", { id: id, data: result.data });
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
