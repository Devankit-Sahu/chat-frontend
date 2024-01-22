import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-api-j4ga.onrender.com",
});

export default instance;
