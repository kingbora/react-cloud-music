import axios from "axios";

axios.defaults.timeout = 5000;

axios.interceptors.request.use(
    config => {
        //
        // config.headers.Authorization = '';
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            // error.response.status === 401
        }
        return Promise.reject(error.response);
    }
);

export default axios;