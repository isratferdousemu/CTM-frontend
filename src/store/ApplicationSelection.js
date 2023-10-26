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
  filterCutOff: ({ commit }, data) => {
    return http()
      .post("/admin/poverty/poverty-cut-off/filter", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;

      });
  },
  updateCuttOff: ({ commit }, data) => {
    return http()
      .post("/admin/poverty/poverty-cut-off/update", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;

      });
  },
  updateDistrictFixedEffect: ({ commit }, data) => {
    return http()
      .post("/admin/poverty/district-fixed-effect/update", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;

      });
  },
  StoreVariable: ({ commit }, data) => {
    return http()
      .post("/admin/poverty/variable/insert", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;

      });
  },
  updateVariable: ({ commit }, data) => {
    return http()
      .post("/admin/poverty/variable/update", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;

      });
  },
  StoreSubVariable: ({ commit }, data) => {
    return http()
      .post("/admin/poverty/sub-variable/insert", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;

      });
  },
  updateSubVariable: ({ commit }, data) => {
    return http()
      .post("/admin/poverty/sub-variable/update", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;

      });
  },
  DestroyVariable: ({ commit }, data) => {
    return http()
      .post("/admin/poverty/variable/destroy", data)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
  DestroySubVariable: ({ commit }, data) => {
    return http()
      .post("/admin/poverty/sub-variable/destroy", data)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        return err;
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
