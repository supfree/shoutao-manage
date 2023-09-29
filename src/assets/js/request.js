import axios from 'axios';
// const baseURL = 'https://gs.rc0534.com/api/';
const imageUrl = 'https://gs.rc0534.com/';
const http = axios.create({
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
  baseURL: '/api' // 设置默认api地址
})
// 添加请求拦截器
http.interceptors.request.use(config => {
  console.log('config', config);
  // 在发送请求之前做些什么
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
http.interceptors.response.use(response => {
  console.log('response', response);
  // 对响应数据做点什么
  if (response.status === 200) {
    return response.data
  } else {
    console.log(response.data);
  }
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error, 111)
})

export function post(url, data) {
  return http({
    method: 'post',
    url,
    data
  })
}

export function get(url, params) {
  return http({
    method: 'get',
    url,
    params
  })
}

export { imageUrl }