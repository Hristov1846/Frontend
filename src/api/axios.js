import axios from "axios";

// ⚡️ ТУК е адреса на твоя бекенд от Render
const API_URL = "https://backend-bogb.onrender.com/api";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ако използваш cookies/token
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
