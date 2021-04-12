import Vue from 'vue'
import Router from 'vue-router'
import Main from './components/main/Main.vue'
import Temp from'./components/main/Recover.vue'
import Login from './components/main/Login.vue'
import newBatch from './components/main/NewBatch.vue'
import DocIn from './components/main/DocIn.vue'
import ModifyOrgan from './components/main/ModifyOrgan.vue'
import KeyWordManage from './components/main/KeyWordManage.vue'
import docInputDetail2 from './components/main/docInputDetail2.vue'
import Manage from './components/main/Manage.vue'
import Print from './components/main/print.vue'
import { resolve } from 'core-js/fn/promise'

Vue.use(Router)

export default new Router({
    // mode:'history',
    base: process.env.BASE_URL,
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
            path: '/admin/userManage',
            name: 'hsit',
            component: resolve => require(['./components/main/Manage.vue'],resolve),
            hidden: true
        }, 
        {
            path: '/work/print',
            name: 'print',
            component: Print,
            hidden: true,
            meta:{
                hideflg:true
            }
        }, 
        {
            path: '/work/docInputd',
            name: 'docInputd',
            component: resolve => require(['./components/main/docInputDetail2.vue'],resolve),
            hidden: true,

        }, 
        {
            path: '/work/modifyOrgan',
            name: 'modifyOrgan',
            component: resolve => require(['./components/main/ModifyOrgan.vue'],resolve),
            hidden: true
        }, 
        {
            path: '/work/newBatch',
            name: 'ma',
            component: resolve => require(['./components/main/NewBatch.vue'],resolve),

 
        },

        {
            path: '/work/docInput',
            name: 'docInput',
            component: resolve => require(['./components/main/DocIn.vue'],resolve),

        },
        {
            path: '/work/keyWM',
            name: 'ma',
            component: resolve => require(['./components/main/KeyWordManage.vue'],resolve),

 
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
            path: '*',
            redirect: '/home'
        }
    ]
})