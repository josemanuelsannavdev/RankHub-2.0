import axios from "axios";

const gatewayApi = axios.create({
  baseURL: "http://localhost:8762",
});

gatewayApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      globalThis.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default gatewayApi;
