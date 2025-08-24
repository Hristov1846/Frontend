import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-bogb.onrender.com/api", // ⚡️ твоят бекенд в Render
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
