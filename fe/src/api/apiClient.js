import axios from "axios";

export const apiClient = axios.create({
  // baseURL: "https://i9b305.p.ssafy.io/api",
  baseURL: "https://localhost:8080",
  // baseURL: "http://192.168.31.57:8080",
});
