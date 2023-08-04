import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://i9b305.p.ssafy.io/api",
  // baseURL: "http://192.168.31.58:8080",
});
