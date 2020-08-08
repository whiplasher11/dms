import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import FriendChat from './views/chat/FriendChat.vue'
import HrInfo from './views/HrInfo.vue'
import Register from './views/Register.vue'
import Main from './components/main/Main.vue'
import Login from './components/main/Login.vue'
import newBatch from './components/main/NewBatch.vue'
import DocIn from './components/main/DocIn.vue'
import ModifyOrgan from './components/main/ModifyOrgan.vue'
import KeyWordManage from './components/main/KeyWordManage.vue'
import DocInputDetail from './components/main/docInputDetail.vue'
import Manage from './components/main/UserManage.vue'
Vue.use(Router)

export default new Router({
    // mode:'history',
    routes: [

        
        {
            path: '/login',
            name: 'loginAndRegi',
            component: Login,
            hidden: true
        }, 
        {
            path: '/login',
            name: 'loginAndRegi',
            component: Login,
            hidden: true
        }, 
        {
            path: '/manage/userManage',
            name: 'hsit',
            component: Manage,
            hidden: true
        }, 
        {
            path: '/work/docInputd',
            name: 'docInputd',
            component: DocInputDetail,
            hidden: true
        }, 
        {
            path: '/work/modifyOrgan',
            name: 'modifyOrgan',
            component: ModifyOrgan,
            hidden: true
        }, 
        {
            path: '/work/newBatch',
            name: 'ma',
            component: newBatch,
 
        },

        {
            path: '/work/docInput',
            name: 'docInput',
            component: DocIn,
        },
        {
            path: '/work/keyWM',
            name: 'ma',
            component: KeyWordManage,
 
        },

        {
            path: '/home',
            name: 'm',
            component: Main,
            hidden: true
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            hidden: true
        },
        {
            path: '/register',
            name: 'r',
            component: Register,
            hidden: true
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            hidden: true,
            meta: {
                roles: ['admin', 'user']
            },
            children: [
                {
                    path: '/chat',
                    name: '在线聊天',
                    component: FriendChat,
                    hidden: true
                }, {
                    path: '/hrinfo',
                    name: '个人中心',
                    component: HrInfo,
                    hidden: true
                }
            ]
        },
         {
            path: '*',
            redirect: '/login'
        }
    ]
})