import axios from "axios";
import { getAuthToken } from "@/lib/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
