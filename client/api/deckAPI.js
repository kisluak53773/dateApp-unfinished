import { host, authHost } from ".";
import axios from "axios";

export const getDeck = async (interestingGender) => {
  const { data } = await axios.get("/api/card", { interestingGender });
  return data;
};
