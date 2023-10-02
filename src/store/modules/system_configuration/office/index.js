import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  office: [],
  office: {},
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

  GET_OFFICE: (state, data) => {
    state.office = data;
  },

  STORE_OFFICE: (state, data) => {
    state.office = data.data;
    state.errors = {};
    // if (state.office.push(data.data)) {
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

  GET_SINGLE_OFFICE: (state, data) => {
    state.office = data;
  },

  UPDATE_OFFICE: (state, data) => {
    if (state.office.push(data.data)) {
      state.success_message = data.data.message;
      state.success_status = data.status;
    } else {
      state.success_message = "";
    }
  },

  DELETE_OFFICE: (state, { id, data }) => {
    if (id) {
      state.office.data = state.office.data.filter((item) => {
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

  /*start get all office*/
  GetAllOffice: ({ commit }) => {
    return http()
      .get("/admin/office/get")
      .then((result) => {
        console.log(result.data);
        return result.data;
        // commit("GET_OFFICE", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all office*/


  /*start get all office*/
  GetSearchOffice: ({ commit }, data) => {
    return http()
      .get(`/admin/office/get/${data}`)
      .then((result) => {
        // console.log("hello");
        console.log(result.data);
        commit("GET_OFFICE", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all office*/

  /*start  store office*/
  StoreOffice: ({ commit }, data) => {
    // alert('StoreOffice'+ data);
    return http()
      .post("/admin/office/insert", data)
      .then((result) => {
        console.log(result.data);
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
  /*end  store office*/

  /*start edit office */
  EditOffice: ({ commit }, id) => {
    return http()
      .get(`/admin/office/edit/${id}`)
      .then((result) => {
        commit("GET_SINGLE_OFFICE", result.data);
      })
      .catch((err) => {
        state.errors = err.response.data.errors;
        state.error_status = err.response.status;
      });
  },
  /*end edit office */

  /*start update office*/
  UpdateOffice: ({ commit }, data) => {
    return http()
      .post(`/admin/office/update/`, data)
      .then((result) => {
        console.log(result);
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
  /*end update office*/

  /*start delete office*/
  DestroyOffice: ({ commit }, id) => {
    return http()
      .get(`/admin/office/destroy/${id}`)
      .then((result) => {
        return result
      })
      .catch((err) => {
      return err
      });
  },
  /*end delete office*/
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
