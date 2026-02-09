import axios from "axios";
const api = axios.create({
  baseURL: "https://evangadi-forum-g3-m2gx.onrender.com",
  withCredentials: false, // true ONLY if using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 * Attaches JWT to every request
 */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
