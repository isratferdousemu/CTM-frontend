import { http } from "@/hooks/httpService";
import { httpFile } from "../hooks/httpService";

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
      .post("/admin/committee/add", data)
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
      .get(`/admin/committee/show/${id}`)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },

  UpdateCommittee: ({ commit }, data) => {
    return http()
      .put(`/admin/committee/update/${data.id}`, data.formData)
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
      .delete(`/admin/committee/delete/${id}`)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        return err;
      });
  },

  StoreCommitteePermission: ({ commit }, data) => {
    return http()
      .post("/admin/committee-permissions", data)
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

  DeleteCommitteePermission: ({ commit }, id) => {
    return http()
      .delete(`/admin/committee-permissions/${id}`)
      .then((result) => {
        console.log("called", result);

        return result;
      })
      .catch((err) => {
        console.log(err.response);

        const data = {
          errors: err.response.data.errors,
          error_status: err.response.message,
        };
        return err;
      });
  },

  UpdateBeneficiaryDetails: ({ commit }, data) => {
    return httpFile()
      .post(`/admin/beneficiary/update/${data.id}`, data.formData)
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
  DeleteBeneficiary: ({ commit }, data) => {
    return http()
      .put(`/admin/beneficiary/delete/${data.id}`, data.formData)
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
  RollBackBeneficiary: ({ commit }, id) => {
    return http()
      .get(`/admin/beneficiary/restore/${id}`)
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
  RollBackReplaceBeneficiary: ({ commit }, id) => {
    return http()
      .get(`/admin/beneficiary/restore-replace/${id}`)
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
  RollBackInactiveBeneficiary: ({ commit }, id) => {
    return http()
      .get(`/admin/beneficiary/restore-inactive/${id}`)
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
  BeneficiaryReplacement: ({ commit }, data) => {
    return httpFile()
      .post(`/admin/beneficiary/replace/${data.id}`, data.formData)
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
  BeneficiaryExit: ({ commit }, data) => {
    return http()
      .post("/admin/beneficiary/exit", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },
  BeneficiaryShifting: ({ commit }, data) => {
    return http()
      .post("/admin/beneficiary/shift", data)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  },

  BeneficiaryLocationShifting: ({ commit }, data) => {
    return http()
      .post("/admin/beneficiary/locationShiftingSave", data)
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
