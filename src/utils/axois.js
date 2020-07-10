import axios from "axios";
import router from "../router";
import qs from "qs";
import Vue from "vue";
Vue.prototype.$qs=qs

import { Message } from "element-ui";
//cps.easy-packing.com/cps/
//const baseURL = location.href.indexOf('https:') != -1 ? "https://127.0.0.1:8080/" : "https://127.0.0.1:8080/";
// const baseURL = location.href.indexOf('https:') != -1 ? "https://cps.easy-packing.com/cps/" : "https://cps.easy-packing.com/cps/";
const baseURL = "http://localhost:8080";

const axios1 = axios.create({
  baseURL,
  timeout: 55000,
  responseType: "json",
  withCredentials: true,
  changeOrigin: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    // token: localStorage.getItem("token") || ""
    token: JSON.stringify(localStorage.getItem("token")||"")   //会在所有请求之前就get，这时候还没有token

  }
});
const CancelToken = axios.CancelToken;
const requestMap = new Map();

// 请求前置拦截器
axios1.interceptors.request.use(
  config => {
    // 防重复提交
    const keyString = qs.stringify(
      Object.assign(
        {},
        {
          url: config.url,
          method: config.method
        },
        config.data
      )
    );
    console.log("axios中")

    console.log(JSON.stringify(localStorage.getItem("token")||""))
 
    // if (requestMap.get(keyString)) {
    //   // 取消当前请求
    //   config.cancelToken = new CancelToken(cancel => {
    //     cancel("请不要频繁点击");
    //   });
    // }
    requestMap.set(keyString, true);
    Object.assign(config, {
      _keyString: keyString
    });
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 返回响应拦截器
axios1.interceptors.response.use(
  res => {
    // 重置requestMap
    const config = res.config;
    requestMap.set(config._keyString, false);

    if (Number(res.data.code) == 0) {
      return res.data.data;
    } else {
      if (
        res.data.msg.indexOf("token is invalid") !== -1 ||
        res.data.msg.indexOf("运行时异常:null") !== -1
      ) {
        // Message.warning("登录信息已过期，请重新登录");
        // router.push("/login");
      } else {
        Message.error(res.data.msg);
      }
    }
    // todo 弹窗提示等
    return null;
  },
  error => {
    Message.error("数据加载失败，请刷新重试！");
    //404等问题可以在这里处理
    return null;
  }
);

// function getCookie(cname) {
//   var name = cname + "=";
//   var ca = document.cookie.split(";");
//   console.log("获取cookie,现在循环");
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     console.log(c);
//     while (c.charAt(0) == " ") c = c.substring(1);
//     if (c.indexOf(name) != -1) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }
// let cookie = getCookie("token");
// localStorage.setItem("token", cookie);

/**
 * @description
 * 请求
 * @param url
 * @param data
 * @param method
 */
const request = (url, data = {}, method = "post") => {
  let Public = {
    //公共参数
    // 'srAppid': ""
    // 参数携带token
    // token: cookie
  };
  // alert("调用一次")
  const func={}

  console.log("aaa",axios1)
  console.log(JSON.stringify(localStorage.getItem("token")||""))

  // axios1.headers={
  //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  //   token: Object.assign("123")
  // }
  // axios1.request.headers={
  //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  //   token: Object.assign("123")
  // }

  axios1.defaults.headers['token']=(localStorage.getItem("token")||"")
  // axios1.defaults.headers['token']=(JSON.stringify(localStorage.getItem("token")||""))//token is invalid 因为带了引号


  return axios1({
    method,
    url,
    data: Object.assign({}, Public, data),
    params: method.toUpperCase() === "GET" && data,

  });

};

export { request };
