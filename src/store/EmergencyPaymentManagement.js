/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  beneficiaries: [],
  selectedBeneficiaries: [],
  pagination: {
    perPage: 10,
    currentPage: 1,
    totalItems: 0,
  },
  loading: false,
};

/* -------------------------------------------------------------------------- */
/*                               Getters Define                               */
/* -------------------------------------------------------------------------- */
const getters = {
  beneficiaries: (state) => state.beneficiaries,
  selectedBeneficiaries: (state) => state.selectedBeneficiaries,
  pagination: (state) => state.pagination,
  loading: (state) => state.loading,
};

/* -------------------------------------------------------------------------- */
/*                              Mutations Define                              */
/* -------------------------------------------------------------------------- */

const mutations = {
  SET_BENEFICIARIES(state, beneficiaries) {
    state.beneficiaries = beneficiaries.map((beneficiary) => ({
      ...beneficiary,
      isSelected: !!state.selectedBeneficiaries.find(
        (item) => item.id === beneficiary.id
      ),
    }));
  },
  SET_SELECTED_BENEFICIARIES(state, selectedBeneficiaries) {
    state.selectedBeneficiaries = selectedBeneficiaries;
  },
  SET_PAGINATION(state, pagination) {
    state.pagination = {
      ...state.pagination,
      ...pagination,
    };
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
};
/* -------------------------------------------------------------------------- */
/*                               Actions Define                               */
/* -------------------------------------------------------------------------- */
const actions = {
  async fetchBeneficiaries({ commit, state }, queryParams) {
    console.log({ state: queryParams });
    commit("SET_LOADING", true);
    try {
      const response = await ApiService.get(
        "/admin/emergency/get-existing-beneficiaries-info",
        {
          params: {
            ...queryParams,
            page: state.pagination.currentPage,
            per_page: state.pagination.perPage,
          },
        }
      );
      commit("SET_BENEFICIARIES", response.data.data || response.data);
      commit(
        "SET_PAGINATION",
        response.data.pagination || {
          totalItems: response.data.total,
          perPage: state.pagination.perPage,
          currentPage: state.pagination.currentPage,
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      commit("SET_LOADING", false);
    }
  },
  selectBeneficiary({ commit, state }, beneficiary) {
    const selected = state.selectedBeneficiaries.slice();
    if (selected.find((item) => item.id === beneficiary.id)) {
      const index = selected.findIndex((item) => item.id === beneficiary.id);
      selected.splice(index, 1);
    } else {
      selected.push(beneficiary);
    }
    commit("SET_SELECTED_BENEFICIARIES", selected);
  },
};

export default {
  namespaced: true, // Ensures the module is isolated
  state,
  mutations,
  actions,
  getters,
};
