/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
const state = {
  // Module-specific state
  someValue: 0,
  phone: "asd",
};

/* -------------------------------------------------------------------------- */
/*                              Mutations Define                              */
/* -------------------------------------------------------------------------- */

const mutations = {
  // Module-specific mutations
  incrementValue(state) {
    state.someValue++;
  },
  setPhone(state, phone) {
    console.log(phone);
    state.phone = phone;
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
  function1({ commit }, data) {
    // alert('Forgot Password store'+);
    // console.log(JSON.stringify(commit.name));
    console.log(JSON.stringify(data));
  },
  // sendOtp() {
  //   const headers = {
  //     Authorization: `Bearer ${this.bearerToken}`,
  //     "Content-Type": "application/json",
  //   };

  //   const data = {
  //     phone: this.form.phone,
  //   };

  //   axios({
  //     method: "post",
  //     url: this.apiUrl,
  //     headers: headers,
  //     data: data,
  //   })
  //     .then((response) => {
  //       this.otpDialog = true;
  //       console.log("Response Data:", response);
  //       console.log("Response Data:", response.data);
  //       if (response.data.success) {
  //         this.step = 2;
  //       }
  //     })
  //     .catch((err) => {
  //       this.loading = false;
  //       // console.log(err.response.data.errors);
  //       this.errors = err.response.data.errors;
  //     });
  // },
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
