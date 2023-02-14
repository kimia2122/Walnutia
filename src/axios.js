import axios from "axios";
import history from './History/history'
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
      
    }else{
      console.log("there is no token");
      history.replace('/Login')
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;