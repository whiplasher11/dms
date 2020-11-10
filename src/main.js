import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {postRequest} from "./utils/api";   //(tlq2)
import {postKeyValueRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.min.css'
import Print from './utils/print.js'

import animate from 'animate.css'

Vue.prototype.postRequest = postRequest;
Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.getRequest = getRequest;
Vue.config.productionTip = false

Vue.use(ElementUI,{size:'small'});
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
Vue.use(vuescroll);
Vue.use(animate)
Vue.use(Print)
// Vue.prototype.myprint=Print

Vue.filter('formatdocType',function(value){
    var tvalue=value+""
    if(tvalue==undefined||tvalue=='null'||!tvalue||tvalue==""){return '暂无'}
    else {
        if(tvalue=="official") return "文书"
        if(tvalue=="personnel") return "人事"
        if(tvalue=="science") return "科技"
    }
});

Vue.filter('formatFiveKJ',function(value){
    var tvalue=value+""
    if(tvalue==undefined||tvalue=='null'||!tvalue||tvalue==""){return '暂无'}
    else {
        var h=tvalue
        while(h.length<5){
            h='0'+h
        }
        // console.log(h)
        return h
    }
});

Vue.filter('formatThreeKJ',function(value){
    var tvalue=value+""
    if(tvalue==undefined||tvalue=='null'||!tvalue||tvalue==""){return '暂无'}
    else {
        var h=tvalue
        while(h.length<3){
            h='0'+h
        }
        // console.log(h)
        return h
    }
});

Vue.filter('formatFourNum',function(value){
    var tvalue=value+""
    if(tvalue==undefined||tvalue=='null'||!tvalue||tvalue==""){return '暂无'}
    else {
        var h=tvalue
        while(h.length<4){
            h='0'+h
        }
        // console.log(h)
        return h
    }
});
Vue.filter('deadlineFormat',function(value){
    if(value=='永久'||value=='备查'||value=='长期') return value
    else return (value+'年')
    
});
Vue.filter('formatKeyWordKey',function(value){
    return Object.keys(value)[0]||"暂无"
    
});
Vue.filter('formatKeyWordValue',function(value){
    return Object.values(value)[0]||"暂无"
    
});
Vue.filter('formatTime',function(value){
    console.log(value)
    console.log(typeof(value))
    var tvalue=value+""
    if(tvalue=='null'||!tvalue){return ''}
 
    return tvalue.substring(0,10)
    
});
Vue.filter('formatEndTime',function(value){
    console.log(value)
    console.log(typeof(value))
    var tvalue=value+""
    if(!tvalue||tvalue=='null'){return '未购'}
    return tvalue.substring(0,10)
    
});

Vue.filter('formatSortYear',function(value){
    var t=value
    // t=t+""
    // t=eval(t)
    // // t=t.replace(/\"/g, "");.
    // console.log(t)
    // console.log(typeof(t))
    
    // t=t.replace("\"","").replace("\"","")

    // t=parseInt(t)
    return t
    
});

Vue.filter('formatAuthCode',function(value){
    if(!value){
        return '暂无'
    }
    var h=JSON.stringify(value)
    while(h.length<5){
        h='0'+h
    }
    return h
    
});
// router.beforeEach((to, from, next) => {
//     if (to.path == '/') {
//         next();
//     }else {
//         if (window.sessionStorage.getItem("user")) {
//             initMenu(router, store);
//             next();
//         }else{
//             next('/?redirect='+to.path);
//         }
//     }
// })
Vue.prototype.baseurl="http://101.200.243.57:8080"

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
