import Vue from 'vue'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 添加一个请求拦截器
axios.interceptors.request.use((config) => config, (error) => error)

// 添加一个响应拦截器
axios.interceptors.response.use((res) => res.data, (error) => error)

Vue.prototype.http = axios