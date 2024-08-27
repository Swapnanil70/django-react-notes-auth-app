// We are going to write an interceptor that will add the access token to the request headers
// We will use axios interceptors to add the access token to the request headers

// Check and study about axios interceptors later
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Arrow function used to get the token from the local storage and add it to the request headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // way to pass the token to the backend
            // automatically handled by axios, study more about this 
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api; // we will use this api object to make requests to the backend