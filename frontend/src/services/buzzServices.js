import axios from "axios";
const BASE_URL = "http://localhost:5000";
import { getUserFromStorage } from "../utils/getUserFromStorage";
const token = getUserFromStorage();
export const buzzAPI = async (id) => {
  const response = await axios.get(`${BASE_URL}/api/buzzes/${id}`);
  return response.data;
}

export const getBuzzRooms = async () => {
  const response = await axios.get(`${BASE_URL}/api/buzzes`);
  return response.data;
};
export const getMyBuzzRooms = async () => {
  const response = await axios.get(`${BASE_URL}/api/admin/buzzes`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createBuzzAPI = async ({name, roomId}) => {
  const response = await axios.post(`${BASE_URL}/api/create-buzz`,{
    name,
    roomId
  },{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}