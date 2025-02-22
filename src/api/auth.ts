import { getAuthToken } from "@/lib/storage";
import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const registerUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, credentials);
  return response.data;
};

export const fetchUserProfile = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("Unauthorized");

  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
