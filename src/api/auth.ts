import api from "./axios-instance";

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await api.post("auth/login", credentials);
  return response.data;
};

export const registerUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await api.post("auth/register", credentials);
  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await api.get("auth/me");
  return response.data;
};
