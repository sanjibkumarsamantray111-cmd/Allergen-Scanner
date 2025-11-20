// src/ap// src/api/api.js
import axios from "axios";

// Base URL: from .env file or fallback
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://alleregen-scanner-app.onrender.com";

// Create a global axios instance
const API = axios.create({
  baseURL: `${BASE_URL}/api`,
});


export default API;