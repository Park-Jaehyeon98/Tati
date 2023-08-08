import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://i9b305.p.ssafy.io/api",
  // baseURL: "http://localhost:8080",
});
