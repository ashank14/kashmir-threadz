import axios from "axios";

const api = axios.create({
  baseURL: "https://nonechoic-marlen-lithologically.ngrok-free.dev/",
});

export default api;
