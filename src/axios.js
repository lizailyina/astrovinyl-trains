import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.headers.api_key = process.env.REACT_APP_API_KEY;
  return config;
});

export default instance;