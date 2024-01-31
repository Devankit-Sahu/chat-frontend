import axios from "axios";
const instance = axios.create({
  baseURL: "https://chat-api-io54.onrender.com",
});
instance.defaults.withCredentials = true;

export default instance;
