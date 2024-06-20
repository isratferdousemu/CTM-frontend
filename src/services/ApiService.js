import axios from "axios";
import store from "@/store";
const ApiService = {
  init() {
    const token = store.getters.GetToken;
    axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL_BACKEND;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  // GET Request
  get(resource, params) {
    return axios.get(`${resource}`, params);
  },
  // POST Request
  async post(resource, params) {
    return await axios
      .post(`${resource}`, params)
      .then((res) => {
        return res;
      })
      .catch((errors) => {
        return errors.response;
      });
  },
  // UPDATE Request
  async update(resource, params) {
    return await axios
      .put(`${resource}`, params)
      .then((res) => {
        return res;
      })
      .catch((errors) => {
        return errors.response;
      });
  },
  // Delete Request
  async delete(resource) {
    return axios
      .delete(resource)
      .then((res) => {
        return res;
      })
      .catch((errors) => {
        return errors.response;
      });
  },
  // Common lookup coulmn data request
  async getDropData(routeUrl, query_Data) {
    let options2 = {
      params: query_Data,
    };
    const url = routeUrl;
    return axios
      .get(url, options2)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error.response;
      });
  },

};

export default ApiService;
