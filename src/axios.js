import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.headers.api_key = "ce2388e0cb51404085a152e1a79d8375";
  return config;
});

export default instance;