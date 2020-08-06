import axios from 'axios'
import {Message} from 'element-ui';
import router from '../router'



axios.interceptors.response.use(success => {
    
    if (success.status && success.status == 500) {   //第一个status是http响应码
        Message.error({message: success.data.message})
        return;
    }
    else if (success.data.code==200) {
        Message.success({message: success.data.message})
    }
    else if(success.data.code==1102){
        Message.error({message: '用户名或手机号已被注册'})
    }
    else if(success.data.code==1107){
        Message.error({message: '未获得授权，请重新登录或联系管理员购买'})
    }
    else if(success.data.code==1103){
        Message.error({message: '用户不存在，请注册'})
    }
    else if(success.data.code==1105){
        Message.error({message: '密码有误'})

    }
    return success.data;
}, error => {
    if(error.response.status==100){return error.response}
    if(error.response.status==500){
        // console.log(error)
        // Message.error({message:"身份过期，请重新登录"})
       
        return error.response}
    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: '服务器被吃了( ╯□╰ )'})
    } else if (error.response.status == 403) {
        window.sessionStorage.clear('userId')
        Message.error({message: '权限不足，请联系管理员'})
    } else if (error.response.status == 401) {
        window.sessionStorage.clear('userId')
        Message.error({message: '尚未登录，请登录!!'})
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

let base = 'http://gdm.vipgz1.idcfengye.com';


export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        // transformRequest: [function (data) {
        //     let ret = '';
        //     for (let i in data) {
        //         ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
        //     }
        //     return ret;
        // }],
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
export const postRequest = (url, params) => {   // tlq1
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json',
            token:sessionStorage.getItem('token')?(sessionStorage.getItem('token').split('"')[1]||sessionStorage.getItem('token')):null,
            authId:sessionStorage.getItem('authId')||''
        }
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json',

            token:sessionStorage.getItem('token'),
            authId:sessionStorage.getItem('authId')||''

        }
    })
}
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json',
            token:sessionStorage.getItem('token')?(sessionStorage.getItem('token').split('"')[1]||sessionStorage.getItem('token')):null
        }
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            token:sessionStorage.getItem('token')
        }
    })
}