import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://192.168.31.56:8080/",
});
