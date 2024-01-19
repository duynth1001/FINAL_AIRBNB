import axios from "axios";
import { CURRENT_USER } from "../constants";
const fetcher = axios.create({
  baseURL: 'https://airbnbnew.cybersoft.edu.vn/api',
  headers: {
    TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1MyIsIkhldEhhblN0cmluZyI6IjA1LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNDg2NzIwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzE1MDE0ODAwfQ.5ch0U3B88fGDn067ipN5mT-pHyAOZTzdwpBiwr4p5Aw',
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
