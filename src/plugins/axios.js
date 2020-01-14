/*
    AXIOS网络请求模块初始化
*/
import axios from 'axios';

let options = {
    baseURL: '/'
};

// The server-side needs a full url to works
if (process.server) {
    options.baseURL = `http://localhost:8081/`;
}

export default axios.create(options);