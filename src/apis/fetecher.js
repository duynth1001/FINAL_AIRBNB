import axios from "axios";
import { CURRENT_USER } from "../constants";
const fetcher = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    TokenCybersoft: import.meta.env.VITE_TOKEN,
  },
});
fetcher.interceptors.request.use((config) => {
  if (localStorage.CURRENT_USER == "undefined") {
    localStorage.clear();
  }
  const user = JSON.parse(localStorage.getItem(CURRENT_USER));
  if (user) {
    // thêm Authorization vào header
    config.headers["token"] = `${user.token}`;
  }
  return config;
});
fetcher.interceptors.response.use((response) => {
  return response;
});

export default fetcher;
