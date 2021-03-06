import Vue from 'vue'
import Vuex from 'vuex'
import { Notification } from 'element-ui';
import {getRequest} from "../utils/api";
import '../utils/stomp'
import '../utils/sockjs'

Vue.use(Vuex)

const now = new Date();

const store = new Vuex.Store({

    state: {
        hi:2,
        username:'',
        admin:"",
        tempDocSeq:'',
        tempDocId:'',
        tempDoc:'',
        alreadyDocs:[],
        alreadyDocss:[
            {
                userId:7,
        authId:12,
        batchId:22,
        docDate:'20181221',
        docNum:100, //????
        docPage:12,
        docSequence:'sge3ff',
        docTitle:'今天的猪肉12元每斤',
        docType:'official',
        keyword:'猪肉',
        remark:'',
        deadline:'永久', 
        docAbout:'综合类',
        docDesc:'慈办'+'[2010]2号',
        docPage:2,
        docDescAuthor:'磁力公安局发文',
        docDescNum:2,
        docLevel:'部级',
        docSecret:'',
        docTypeCode:'WS',
        dutyAuthor:'磁力公安局发文',
        sortYear:2018

            },
            {
                userId:7,
        authId:12,
        batchId:22,
        docDate:'20181221',
        docNum:100, //????
        docPage:12,
        docSequence:'ddcc24',
        docTitle:'今天的猪肉12元每斤',
        docType:'official',
        keyword:'猪肉',
        remark:'',
        deadline:'永久', 
        docAbout:'综合类',
        docDesc:'慈办'+'[2010]2号',
        docPage:2,
        docDescAuthor:'磁力公安局发文',
        docDescNum:2,
        docLevel:'部级',
        docSecret:'无',
        docTypeCode:'WS',
        dutyAuthor:'磁力公安局发文',
        sortYear:2018

            },           {
                userId:7,
        authId:12,
        batchId:22,
        docDate:'20181221',
        docNum:100, //????
        docPage:12,
        docSequence:'asdw2f',
        docTitle:'今天的猪肉12元每斤',
        docType:'official',
        keyword:'猪肉',
        remark:'',
        deadline:'永久', 
        docAbout:'综合类',
        docDesc:'慈办'+'[2010]2号',
        docPage:2,
        docDescAuthor:'磁力公安局发文',
        docDescNum:2,
        docLevel:'部级',
        docSecret:'',
        docDescAuthor:'慈办发',
        // dutyAuthor:'',
        docTypeCode:'WS',
        dutyAuthor:'磁力公安局发文',
        sortYear:2018

            },
        ],

        kind:1,//1 管理员，2病人，3医生
        routes: [],
        sessions: {},
        hrs: [],
        currentSession: null,
        // currentHr: JSON.parse(window.sessionStorage.getItem("user")),
        filterKey: '',
        stomp: null,
        isDot: {},
        user:JSON.parse(window.sessionStorage.getItem("user")),
    },
    mutations: {
        INIT_CURRENTHR(state, hr) {
            state.user = hr;
        },
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSession(state, currentSession) {
            Vue.set(state.isDot, state.currentHr.username + '#' + currentSession.username, false);
            state.currentSession = currentSession;
        },
        addMessage(state, msg) {
            let mss = state.sessions[state.currentHr.username + '#' + msg.to];
            if (!mss) {
                // state.sessions[state.currentHr.username+'#'+msg.to] = [];
                Vue.set(state.sessions, state.currentHr.username + '#' + msg.to, []);
            }
            state.sessions[state.currentHr.username + '#' + msg.to].push({
                content: msg.content,
                date: new Date(),
                self: !msg.notSelf
            })
        },
        INIT_DATA(state) {
            //浏览器本地的历史聊天记录可以在这里完成
            let data = localStorage.getItem('vue-chat-session');
            if (data) {
                state.sessions = JSON.parse(data);
            }
        },
        INIT_HR(state, data) {
            state.hrs = data;
        }
    },
    actions: {
        connect(context) {
            context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
            context.state.stomp.connect({}, success => {
                context.state.stomp.subscribe('/user/queue/chat', msg => {
                    let receiveMsg = JSON.parse(msg.body);
                    if (!context.state.currentSession || receiveMsg.from != context.state.currentSession.username) {
                        Notification.info({
                            title: '【' + receiveMsg.fromNickname + '】发来一条消息',
                            message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0, 10) : receiveMsg.content,
                            position: 'bottom-right'
                        })
                        Vue.set(context.state.isDot, context.state.currentHr.username + '#' + receiveMsg.from, true);
                    }
                    receiveMsg.notSelf = true;
                    receiveMsg.to = receiveMsg.from;
                    context.commit('addMessage', receiveMsg);
                })
            }, error => {

            })
        },
        initData(context) {
            context.commit('INIT_DATA')
            getRequest("/chat/hrs").then(resp => {
                if (resp) {
                    context.commit('INIT_HR', resp);
                }
            })
        }
    }
})

store.watch(function (state) {
    return state.sessions
}, function (val) {
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})


export default store;