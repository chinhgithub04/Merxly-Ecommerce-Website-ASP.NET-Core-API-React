import axios from "axios";

export const API_URL = "http://localhost:5172/api";

export const api = axios.create({
  baseURL: API_URL,
});

// Tự động thêm token khi user đăng nhập
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
