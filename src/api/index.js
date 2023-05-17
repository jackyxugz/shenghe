import axios from 'axios'
import {getToken} from '@/utils/setToken'
import {Message} from 'element-ui'


axios.defaults.baseURL = `http://139.196.42.209:5004/api`;
// 添加请求拦截器
axios.interceptors.request.use(config=>{
    config.headers['token'] = getToken();  //获取token
    return config
})
// 添加响应拦截器
axios.interceptors.response.use(response=>{
    let {code,msg} = response.data;
    if(code !=20000){
        Message({
            type: 'warning',
            message:msg || 'error',
            duration:2000,
            showClose: true,
        });
    }
    return response
},err=>{
    // 对响应错误做点什么
   return Promise.reject(err);
})

export default axios
