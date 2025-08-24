import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-bogb.onrender.com/api", // адреса на бекенда
  withCredentials: true,
});

export default api;
