import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import router from "@/router";

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache',
};

Object.assign(axios.defaults.headers.common, defaultHeaders);

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
});

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`;
    }

    return config
  },
  error => {
    Promise.reject(error)
  }
);


service.interceptors.response.use(
  response => response.data,

  error => {
    // 关闭Message Box
    try {
      MessageBox.close();
    } catch (e) {
    }

    let status = 0;
    try {
      status = error.response.status;
    } catch (e) {
      Message({
        message: '连接超时',
        type: 'error',
        duration: 3 * 1000
      });
      store.dispatch('user/fedLogOut').then(() => {
        router.push({path: '/'})
      });
      return Promise.reject('连接超时')
    }
    if (status === 401) {
      Message({
        message: '登录失效，请重新登录',
        type: 'error',
        duration: 3 * 1000
      });
      store.dispatch('user/fedLogOut').then(() => {
        router.push({path: '/'})
      });
      return Promise.reject('登录失效')
    }

    let resp = error.response.data;
    let message = resp._error.message;
    let issues = resp._issues;
    if (issues)
      message = '提交参数不对';

    Message({
      message: message,
      type: 'error',
      duration: 3 * 1000
    });

    return Promise.reject(message)
  }
);

export default service
