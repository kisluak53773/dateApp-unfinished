import { host, authHost } from ".";
import jwtDecode from "jwt-decode";
import { objectToFormData } from "@/constants";

export const signupUser = async (obj) => {
  const formData = objectToFormData(obj);
  const { data } = await host.post("auth/local/signup", formData);
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh-token", data.refreshToken);
  return jwtDecode(data.access_token);
};

export const signinUser = async (email, password) => {
  const { data } = await host.post("auth/local/singin", {
    email,
    password,
  });
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  return jwtDecode(data.access_token);
};

export const logoutUser = async () => {
  const { data } = await authHost.post("auth/logout");
  return data;
};
