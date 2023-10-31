import axios from 'axios';
import { backend_utils } from './api-utils';

export const server = axios.create({
    baseURL: backend_utils.backend_url,
});

server.interceptors.request.use(
    (config) => {
        console.log(config);

        // const token = Cookies.get('devify:AccessToken');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const getAxios = async (path: string, option = {}) => {
    try {
        let response = await server.get(path, option);
        return response.data;
    } catch (e: any) {
        if (e.response && e.response.data) {
            return e.response.data;
        }
        throw e;
    }
};

export const getAxiosAvatar = async (path: string, option = {}) => {
    try {
        let response = await server.get(path, option);
        return response;
    } catch (e: any) {
        if (e.response && e.response.data) {
            return e.response;
        }
        throw e;
    }
};

export const postAxios = async (path: string, option = {}) => {
    try {
        let response = await server.post(path, option);
        return response.data;
    } catch (e: any) {
        if (e.response && e.response.data) {
            return e.response.data;
        }
        throw e;
    }
};

export const postAxiosFile = async (path: string, data = {}, headers = {}) => {
    try {
        const response = await server.post(path, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...headers
            }
        });
      return response.data;
    } catch (e: any) {
      if (e.response && e.response.data) {
        return e.response.data;
      }
      throw e;
    }
  };
  

export const putAxios = async (path: string, option = {}) => {
    try {
        let response = await server.put(path, option);
        return response;
    } catch (e: any) {
        if (e.response && e.response.data) {
            return e.response.data;
        }
        throw e;
    }
};

export const deleteAxios = async (path: string, option = {}) => {
    try {
        let response = await server.delete(path, option);
        return response.data;
    } catch (e: any) {
        if (e.response && e.response.data) {
            return e.response.data;
        }
        throw e;
    }
};
