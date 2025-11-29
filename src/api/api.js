import axios from "axios";

const api = axios.create({
  baseURL: "http://3.135.235.62:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
