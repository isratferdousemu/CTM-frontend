/* -------------------------------------------------------------------------- */
/*                                states Define                               */
/* -------------------------------------------------------------------------- */
import { http } from "@/hooks/httpService";

const state = {
  menus: [],
  menu: {},
  parents: [],
  pageUrls: [],
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
  GET_ALL_MENU: (state, data) => {
    state.menus = data.menus;
  },

  GET_ALL_PARENT: (state, data) => {
    state.parents = data.parents;
  },

  GET_ALL_PAGE_URLS: (state, data) => {
    state.pageUrls = data.page_urls;
  },

  STORE_MENU: (state, data) => {
    if (state.menus.push(data.data)) {
      state.success_message = data.data.message;
      state.success_status = data.status;
    } else {
      state.success_message = "";
    }
  },

  GET_SINGLE_MENU: (state, data) => {
    state.menu = data.menu;
  },

  UPDATE_MENU: (state, data) => {
    if (state.menus.push(data.data)) {
      state.success_message = data.data.message;
      state.success_status = data.status;
    } else {
      state.success_message = "";
    }
  },

  DELETE_MENU: (state, { id, data }) => {
    if (id) {
      state.menus = state.menus.filter((item) => {
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
  /*start get all menus*/
  GetAllMenus: ({ commit }) => {
    return http()
      .get("/admin/menu/get")
      .then((result) => {
        commit("GET_ALL_MENU", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all menus*/

  /*start get all parents*/
  GetAllParents: ({ commit }) => {
    return http()
      .get("/admin/menu/get_parent")
      .then((result) => {
        commit("GET_ALL_PARENT", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all parents*/

  /*start get all page urls*/
  GetAllPageUrls: ({ commit }) => {
    return http()
      .get("admin/menu/get_page_url")
      .then((result) => {
        commit("GET_ALL_PAGE_URLS", result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end get all page urls*/

  /*start store menus*/
  StoreMenu: ({ commit }, data) => {
    return http()
      .post("/admin/menu/insert", data)
      .then((result) => {
        commit("STORE_MENU", result);
      })
      .catch((err) => {
        state.errors = err.response.data.errors;
        state.error_status = err.response.status;
      });
  },
  /*end store menus*/

  /*start get single menu*/
  GetSingleMenu: ({ commit }, id) => {
    return http()
      .get(`/admin/menu/edit/${id}`)
      .then((result) => {
        commit("GET_SINGLE_MENU", result.data);
      })
      .catch((err) => {
        state.errors = err.response.data.errors;
        state.error_status = err.response.status;
      });
  },
  /*end get single menu*/

  /*start update menus*/
  UpdateMenu: ({ commit }, { id, data }) => {
    return http()
      .post(`/admin/menu/update/${id}`, data)
      .then((result) => {
        commit("UPDATE_MENU", result);
      })
      .catch((err) => {
        state.errors = err.response.data.errors;
        state.error_status = err.response.status;
      });
  },
  /*end update menus*/

  /*start destroy menu*/
  DestroyMenu: ({ commit }, id) => {
    return http()
      .delete(`/admin/menu/destroy/${id}`)
      .then((result) => {
        commit("DELETE_MENU", { id: id, data: result.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  /*end destroy menu*/
};

/* -------------------------------------------------------------------------- */
/*                               Getters Define                               */
/* -------------------------------------------------------------------------- */
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
