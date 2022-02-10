import axios from 'axios';
import { DefaultApiFactory } from './generated';

const axiosInstance = axios.create();

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
    if (error.response.status === 401) {
      // Remove login flg
      localStorage.clear();
      window.location.reload();
      console.error('API unauthorized');
    }
    return Promise.reject(error);
  },
);

export const api = DefaultApiFactory(undefined, undefined, axiosInstance);
