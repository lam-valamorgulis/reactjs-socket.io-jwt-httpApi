import axios from "axios";
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../utils/localStorage";

const baseUrl = "http://localhost:8000/";

const Instance = axios.create({
  timeout: 20000,
  baseURL: baseUrl,
  headers: {
    Accept: "application/json, application/octet-stream",
    "Content-Type": "application/json",
    "x-is-dashboard": true,
  },
});

Instance.interceptors.request.use(
  (config) => {
    const accessToken = getTokenFromLocalStorage("jwt_token");

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(response.data);
    }
  },

  async (error) => {
    const { response } = error;

    const statusCode = response?.status;
    if (statusCode === 401) {
      removeTokenFromLocalStorage("jwt_token");
      window.location.href = "/login";
    }
    if (statusCode === 403) {
      window.location.href = "/";
    }

    const errorObj = response?.data?.error || "Error";
    if (errorObj) {
      return Promise.reject(new Error(errorObj.message || error));
    }
    return Promise.reject(error);
  }
);

export default Instance;
