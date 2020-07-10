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

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
