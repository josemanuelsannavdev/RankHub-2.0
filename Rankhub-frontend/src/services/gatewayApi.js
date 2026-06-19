import axios from "axios";
import { clearSessionToken, getSessionToken } from "./session";

const gatewayApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8762",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

gatewayApi.interceptors.request.use((config) => {
  const token = getSessionToken();
  if (token && !config.headers?.Authorization) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
});

gatewayApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSessionToken();
    }
    return Promise.reject(error);
  },
);

export default gatewayApi;
