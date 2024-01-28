import axios from "axios";
axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: "https://chat-api-p1om.onrender.com",
});

export default instance;
