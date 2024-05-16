import { http } from '@/hooks/httpService';
import { httpFile } from '../hooks/httpService';
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
      commit('incrementValue');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  StoreBudget: ({ commit }, data) => {
    return http()
      .post('/admin/budget/add', data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  BudgetVerification: ({ commit }, data) => {
    return http()
      .put(`/admin/budget/approve/${data.id}`, data.formData)
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
  DestroyBudget: ({ commit }, id) => {
    return http()
      .delete(`/admin/budget/delete/${id}`)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  GetSingleBudget: ({ commit }, id) => {
    return http()
      .get(`/admin/budget/show/${id}`)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  UpdateBudget: ({ commit }, data) => {
    return http()
      .put(`/admin/budget/update/${data.id}`, data.formData)
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

  UpdateBudgetData: ({ commit }, data) => {
    return http()
      .put(`/admin/budget/detail/update/${data.id}`, data.formData)
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
