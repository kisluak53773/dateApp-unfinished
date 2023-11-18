import axios from "axios";

export const host = axios.create({
  baseURL: "http://localhost:5000/",
});

export const authHost = axios.create({
  baseURL: "http://localhost:5000/",
});

export const refreshHost = axios.create({
  baseURL: "http://localhost:5000",
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
};

const refreshInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    "refresh_token"
  )}`;
  return config;
};

authHost.interceptors.request.use(authInterceptor);
refreshHost.interceptors.request.use(refreshInterceptor);
