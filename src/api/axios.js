import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-bogb.onrender.com/api", // ⚡ твоя бекенд в Render
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default instance;
