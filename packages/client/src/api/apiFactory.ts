import axios from 'axios';
import { DefaultApiFactory } from './generated';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    console.info(response);
    return response;
  },
  (error) => {},
);
1;
export const api = DefaultApiFactory(undefined, undefined, axiosInstance);
