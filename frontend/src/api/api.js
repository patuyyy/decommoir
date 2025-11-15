import axios from "axios";

const api = axios.create({
  baseURL: "http://be.decommoir.online:3000",
});

export default api;
