import axios from 'axios'
import cookie from "js-cookie"

const instance = axios.create({
    baseURL:'http://localhost:5000/',
  });

  instance.interceptors.request.use(
    (config) => {
    if (cookie.get('token')) {
      config.headers['Authorization'] = cookie.get('token');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  })

export default instance;