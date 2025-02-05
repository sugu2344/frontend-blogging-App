import axios from "axios";

const baseURL = "http://127.0.0.1:7777/user"; // Change the base URL to your backend URL

const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`, // Add the token in the Authorization header
  },
  withCredentials: true,
});

export default instance;
