import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3030'
});

//instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...

export default instance;