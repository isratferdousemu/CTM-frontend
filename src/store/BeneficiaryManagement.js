import { http } from "@/hooks/httpService";

/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  someValue: 0,
};

/* -------------------------------------------------------------------------- */
/*                              Mutations Define                              */
/* -------------------------------------------------------------------------- */

const mutations = {
  // Module-specific mutations
  incrementValue(state) {
    state.someValue++;
  },
};
/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {
  // Module-specific actions
  async fetchData({ commit }) {
    try {
      // Simulate an async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      commit("incrementValue");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  
  StoreCommittee: ({ commit }, data) => {
    return http()
      .post("/admin/committee/insert", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  
  /*start get single menu*/
  GetSingleCommittee: ({ commit }, id) => {
    return http()
      .get(`/admin/committee/${id}`)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },

  UpdateCommittee: ({ commit }, data) => {
    return http()
      .post("/admin/committee/update", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        const data = {
          errors: err.response.data.errors,
          error_status: err.response.message,
        };
        return err;
      });
  },

  DestroyCommittee: ({ commit }, id) => {
    return http()
      .get(`/admin/committee/destroy/${id}`)
      .then((result) => {
        console.log(result);
        return result
      })
      .catch((err) => {
        return err
      });
  },

};
/* -------------------------------------------------------------------------- */
/*                               Getters Define                               */
/* -------------------------------------------------------------------------- */
const getters = {
  // Module-specific getters
  doubledValue: (state) => state.someValue * 2,
};

export default {
  namespaced: true, // Ensures the module is isolated
  state,
  mutations,
  actions,
  getters,
};
