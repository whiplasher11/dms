import axios from 'axios'
import {Message} from 'element-ui';

import router from '../router';

import store from '../store/index.js'

axios.interceptors.response.use(success => {
    
    if (success.status && success.status == 500) {   //第一个status是http响应码
        Message.error({message: success.data.message})
        return;
    }
    else if (success.data.code==200) {
        Message.success({message: success.data.message})
    }
    else if(success.data.code==401){
        Message.error({message: '请登录或退出重新登录'})
    }
    else if(success.data.code==1102){
        Message.error({message: '用户名或手机号已被注册'})
    }
    else if(success.data.code==1107){
        Message.error({message: '未获得授权，请重新登录或联系管理员购买'})
        window.sessionStorage.setItem('userId','')
        store.state.username=''
    }
    else if(success.data.code==1103){
        Message.error({message: '用户不存在，请注册'})
    }
    else if(success.data.code==1105){
        Message.error({message: '密码有误'})

    }
    return success.data;
}, error => {

    if(!error.response||!error.response.status){
        return error
    }
    if(error.response.status==400){return}

    if(error.response.status==100){return error.response}
    if(error.response.status==500){
        // console.log(error)
        Message.error({message:"未知错误"})
        return error.response
        // router.push('/login')
       
        return error.response}

    if (error.response.status == 504 || error.response.status == 404) {
        Message.error({message: '服务器被吃了( ╯□╰ )'})
    } else if (error.response.status == 403) {
        window.sessionStorage.clear('userId')
        Message.error({message: '权限不足，请联系管理员'})
    } else if (error.response.status == 401) {
        window.sessionStorage.clear('userId')
        Message.error({message: '尚未登录，请登录!!'})
        router.push('/');
    } else {
        if (error.response.data.massage) {
            Message.error({message: error.response.data.msg})
            return
        } else {
            Message.error({message: '请检查网络!'})
            return
        }
    }
    return;
})

//必须保存后 build 才会build进去

// var base = 'http://101.200.243.57:8080';
var base = 'http://localhost:8080';
// var base='http://106.52.85.131:8080'

// var base= 'http://193.112.147.158:8088'
// var base = 'http://gdm.free.idcfengye.com';

export const baseurl=base;

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
            token:localStorage.getItem('token')?(localStorage.getItem('token').split('"')[1]||localStorage.getItem('token')):null,
            authId:sessionStorage.getItem('authId')||''
        }
    }).catch(err=>{
        console.log(err)
    })
}
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',

            token:localStorage.getItem('token')?(localStorage.getItem('token').split('"')[1]||localStorage.getItem('token')):null,
            authId:sessionStorage.getItem('authId')||''

        }
    })
}
export const getRequest = (url, data) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: data,
        headers: {
            authId:sessionStorage.getItem('authId')||'',
            
            'Content-Type': 'application/json;charset=UTF-8',
            token:localStorage.getItem('token')?(localStorage.getItem('token').split('"')[1]||localStorage.getItem('token')):null
        }
    })
}
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params,
        headers: {
            authId:sessionStorage.getItem('authId')||'',

            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            token:localStorage.getItem('token')
        }
    })
}