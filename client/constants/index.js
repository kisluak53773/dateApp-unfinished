import { refreshHost } from "@/api";
import jwtDecode from "jwt-decode";

export const options = [
  { value: "Мужской", label: "Мужской" },
  { value: "Женский", label: "Женский" },
];

export const selectStyles = {
  control: (styles) => ({ ...styles, width: "50vw", cursor: "pointer" }),
};

export const getValueSelect = (value) =>
  value ? options.find((option) => option.value === value) : "";

export const refreshToken = async () => {
  const { data } = await refreshHost("auth/refresh");
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  return jwtDecode(data.access_token);
};

export const objectToFormData = (obj) => {
  const formData = new FormData();
  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};
