// apiRequestHook.js
import axios from "axios";
import { ref } from "vue";

export function useApiRequest() {
  const loading = ref(false);
  const error = ref(null);

  // Replace 'YOUR_API_BASE_URL' with your actual API base URL
  const apiBaseUrl = process.env.VUE_APP_BASE_API_URL_BACKEND;

  // Create an Axios instance without default headers
  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
      "Content-Type": "application/json", // Adjust content type as needed
    },
  });
  async function fetchData(url, method = "get", data = null, token = null) {
    loading.value = true;
    error.value = null;

    try {
      const config = {
        method,
        url,
        data,
        headers: {},
      };

      // Add authorization header if a token is provided
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const response = await axiosInstance(config);

      return response.data;
    } catch (err) {
      console.error("API Request Error:", err);
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    error,
    fetchData,
  };
}

/* -------------------------------------------------------------------------- */
/*                                using manual                                */
/* -------------------------------------------------------------------------- */

/* await this.apiRequest.fetchData(url,method,data,token) */
