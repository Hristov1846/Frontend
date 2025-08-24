import axios from "axios";

// ⚡️ Backend URL от Render
const API_URL = "https://backend-bogb.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
