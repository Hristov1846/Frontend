// src/api/axios.js
import axios from "axios";

// Тук слагаме URL на бекенда от Render
const instance = axios.create({
  baseURL: "https://backend-bogb.onrender.com/api", // 👈 Твоят бекенд
  withCredentials: true, // включено за cookies, ако се ползват
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
