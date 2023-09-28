import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  districts: [],
  district: {},
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
    state.districts = data;
  },

  SET_DISTRICT: (state, data) => {
    state.districts = data;
  },
  
  STORE_DIVISION: (state, data) => {
    state.districts = data.data;
    state.errors = {};
    // if (state.districts.push(data.data)) {
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
    state.district = data;
  },

  UPDATE_DIVISION: (state, data) => {
    if (state.districts.push(data.data)) {
      state.success_message = data.data.message;
      state.success_status = data.status;
    } else {
      state.success_message = "";
    }
  },

  DELETE_DIVISION: (state, { id, data }) => {
    if (id) {
      state.districts.data = state.districts.data.filter((item) => {
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

  /*start get all districts*/
  GetAllDistricts: ({ commit }) => {
    return http()
      .get("/admin/district/get")
      .then((result) => {
        console.log(result.data);
        commit("GET_DIVISION", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all districts*/

  /*start get all districts*/
  GetSearchDistricts: ({ commit },data) => {
    return http()
      .get(`/admin/district/get/${data}`)
      .then((result) => {
        // console.log("hello");
        console.log(result.data);
        commit("GET_DIVISION", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all districts*/

  /*start  store district*/
  StoreDistrict: ({ commit }, data) => {
    // alert('StoreDistrict'+ data);
    return http()
      .post("/admin/district/insert", data)
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
  /*end  store district*/

  /*start edit district */
  EditDistrict: ({ commit }, id) => {
    return http()
      .get(`/admin/district/edit/${id}`)
      .then((result) => {
        commit("GET_SINGLE_DIVISION", result.data);
      })
      .catch((err) => {
        state.errors = err.response.data.errors;
        state.error_status = err.response.status;
      });
  },
  /*end edit district */

  /*start update district*/
  UpdateDistrict: ({ commit }, data ) => {
    return http()
      .post(`/admin/district/update/`, data)
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
  /*end update district*/

  /*start delete district*/
  DestroyDistrict: ({ commit }, id) => {
    return http()
      .get(`/admin/district/destroy/${id}`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end delete district*/
  
  /*Set division*/
  SetDistrict: ({ commit }, data) => {   
    console.log("District"); 
    console.log(data); 
    commit("SET_DISTRICT", data);
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
