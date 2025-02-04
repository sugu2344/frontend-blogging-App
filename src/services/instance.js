import axios from "axios";

const baseURL = "http://127.0.0.1:7777/user";

const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;
