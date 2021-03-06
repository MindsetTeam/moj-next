import axios from "axios";

const instance = axios.create({
  baseURL: process.env.baseURL,
});

instance.defaults.withCredentials = true;

export default instance;
