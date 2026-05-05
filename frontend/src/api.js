import axios from "axios";

const API = axios.create({
  baseURL: "http://ultimate-task-manager-production.up.railway.app/api"
});

// 🔐 Attach auth headers automatically
API.interceptors.request.use((config) => {
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (role) config.headers.role = role;
  if (userId) config.headers.userid = userId;
  if (token) config.headers.authorization = token;

  return config;
});

export default API;