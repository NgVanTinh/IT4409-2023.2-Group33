import { del, edit, get, post } from "../utils/request";

export const login = async (email, password) => {
  const result = await get(`users?email=${email}&password=${password}`);
  return result;
};

export const register = async (records) => {
  const result = await post(`users?`, records);
  return result;
};

export const checkExist = async (key, value) => {
  const result = await get(`users?${key}=${value}`);
  return result;
};
