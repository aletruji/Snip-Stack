import axios from 'axios';

const isDev =
  window.location.hostname.includes("localhost") ||
  window.location.hostname.includes("127.0.0.1");

const API_BASE_URL = isDev
  ? "http://localhost:8080/api"
  : "https://api.snippet-app.com/api"

  console.log("apiUrl verwendet:", API_BASE_URL);
  console.log("force rebuild: 2025-07-12-5");

  

const api = axios.create({
baseURL: API_BASE_URL,

  headers: {
    "Content-Type": "application/json"
  }
});
console.log("API baseURL aktiv:", api.defaults.baseURL);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
   console.log("Axios adding token:", token);
   console.log("window.location.hostname:", window.location.hostname);
console.log("API_BASE_URL gesetzt auf:", API_BASE_URL);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
