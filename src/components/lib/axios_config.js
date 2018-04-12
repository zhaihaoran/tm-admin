import axios from 'axios'
import {
    Message
} from 'element-ui';
import {
    baseURL
} from '@comp/lib/api_maps'
// 全局配置
axios.defaults.baseURL = baseURL;
axios.defaults.url = 'api/adminConsole/';
axios.defaults.method = 'post';
axios.defaults.withCredentials = true;

// --- 接口拦截
/* 请求拦截 */
axios.interceptors.request.use(config => {
    // 在请求发送前做什么
    return config;
}, err => {
    return Promise.reject(err)
})

/* 响应拦截 */
axios.interceptors.response.use(res => {
    // 登陆超时,清空session
    if (res.data.code == 105) {
        sessionStorage.clear();
        return res;
    } else if (res.data.code == 1) {
        return res;
    } else {
        console.log("error", res.data);
        return res;
    }
}, err => {
    return Promise.reject(err)
})
