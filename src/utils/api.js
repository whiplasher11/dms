import axios from 'axios'
import {Message} from 'element-ui';
import router from '../router'



axios.interceptors.response.use(success => {
    
    if (success.status && success.status == 200 && success.data.code == 1000) {   //第一个status是http响应码
        Message.error({message: success.data.message})
        return;
    }
    if (success.data.code==200) {
        Message.success({message: success.data.message})
    }
    return success.data;
}, error => {
    if(error.response.status==100){return error.response}
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: '服务器被吃了( ╯□╰ )'})
    } else if (error.response.status == 403) {
        Message.error({message: '权限不足，请联系管理员'})
    } else if (error.response.status == 401) {
        Message.error({message: '尚未登录，请登录'})
        router.replace('/');
    } else {
        if (error.response.data.massage) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: '未知错误!'})
        }
    }
    return;
})

let base = '';


export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data) {
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
export const postRequest = (url, params) => {   // tlq1
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token:sessionStorage.getItem('token')
        }
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token:sessionStorage.getItem('token')
        }
    })
}
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token:sessionStorage.getItem('token')
        }
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            token:sessionStorage.getItem('token')
        }
    })
}