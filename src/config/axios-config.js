import axios from "axios";
axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: "https://chat-api-io54.onrender.com",
});

export default instance;
