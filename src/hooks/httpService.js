import store from "@/store";
import axios from "axios";

// APi Base Url
const apiUrl = process.env.VUE_APP_BASE_API_URL_BACKEND;

export function http() {
  console.log("from" + store.state.token);
  return axios.create({
    baseURL: apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + store.state.token,
    },
  });
}

export function httpFile() {
  return axios.create({
    baseURL: apiUrl,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + store.state.token,
    },
  });
}
