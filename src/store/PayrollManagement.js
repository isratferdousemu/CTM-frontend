import { http } from '@/hooks/httpService';

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
  SetBeneficiaries: ({ commit }, data) => {
    return http()
      .post('/admin/payroll/set-beneficiaries', data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  SubmitPreviewSendBeneficiaries: ({ commit }, data) => {
    return http()
      .post('/admin/payroll/submit-payroll', data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
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
