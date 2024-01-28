import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-api-p1om.onrender.com",
});

export default instance;
