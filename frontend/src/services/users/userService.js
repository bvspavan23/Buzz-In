import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFromStorage } from "../../utils/getUserFromStorage";
//! Get the token
const token = getUserFromStorage();
//! Login
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/api/v1/users/login`, {
    email,
    password,
  });
  //Return a promise
  return response.data;
}
export const registerAPI = async ({ name,email, password }) => {
  const response = await axios.post(`${BASE_URL}/api/v1/users/register`, {
    name,
    email,
    password,
  });
  //Return a promise
  return response.data;
}