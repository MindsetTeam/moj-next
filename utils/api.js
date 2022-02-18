import axios from "axios";

const instance = axios.create({
  // baseURL: "http://192.168.1.106:3000",
  baseURL: process.env.baseURL,
});

instance.defaults.withCredentials = true;

export default instance;
