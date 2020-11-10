<template>
  <!-- <div id="top_header"> -->
  <div v-bind:class="classObject">
    <div
      v-bind:class="[{selectPull:true},{switchdeepColor:switchColorflag}]"
      @click="fixTheTopHeader"
      v-on:mouseover="topHeaderShow()"
      v-on:mouseleave="topHeaderHide()"
    >
      <i class="fa fa-paperclip"></i>
    </div>

    <div class="content">
      <ul v-on:mouseover="topHeaderShow()" v-on:mouseleave="topHeaderHide()">
        <li style="font-size:2rem" class="logo" @click="goHome()">
          <!-- <div class="top_box"></div> -->
          智能档案系统
          <div class="topHeaderIcon"></div>
          <!-- <img class="zclogo" src="../../static/zclogo.png" alt=""> -->
        </li>

        <!-- <li v-if="true" style="width:35rem"></li> -->
        <!-- <li class="a" v-if="true"></li> -->

        <li class="a" @click="goHome()" v-if="true">首页</li>

        <li class="a" @click="goDocIn()">档案录入</li>
        <!-- <li class="a" v-if="admin==1" ></li> -->

        <li class="a" v-if="kind==3">
          <div
            style="position: absolute;
    right: 5%;
    text-align: center;
    line-height: 1rem;
    background-color: rgb(255,87,34);
    height: 1.1rem;
    width: 1.1rem;
    color:#fff;

    top: 50%;
    margin-top: -0.5rem;
    font-size: 0.9rem; "
          >3</div>消息列表
        </li>



        <!-- <li @click="toHistory()">历史记录</li> -->

        <li class="product a wrjlb" @click="goCheckHistoryBat">查看与设置</li>
        <li v-if="admin==1" class="product a wrjlb"  @click="ManageUser" >管理用户 </li>

        <li class="a" @click="goAboutUs()" v-if="kind==2">我的医生</li>
        <li>
          <div
            class="headpic malestyle"
            v-if="user"
            @click="goUser(1)"
            v-bind:class="[{malestyle:user.sex==1}, {femalestyle:user.sex==0}]"
          ></div>
        </li>
        <li class="m_right user_controll a" @click="gologin" v-if="!user">登录</li>
        <!-- 
        <li class="user_controll" v-if="$store.state.userInfo">
          <router-link to="/user" class="a user_controll" tag="span">
            您好：{{$store.state.userInfo.userName}}
          </router-link>
        </li>-->
        <li
          @click="goUser(1)"
          class="user_controll a"
          v-if="user"
        >{{user}}</li>
        <li class="m_right user_controll a" @click="exit" v-if="user">退出</li>

        <!-- <li
          @click="goUser(1)"
          class="user_controll a"
          v-if="user"
          v-on:mouseover="changeUserShow()"
          v-on:mouseleave="resetUserShow()"
        >{{user}}</li> -->
        <!-- <li @click="unLogin()" class="reLogin user_controll a" v-if="user">退出</li> -->
      </ul>
    </div>

    <!-- <transition name="fade">
      <div class="product_list" v-if="show" v-on:mouseleave="resetShow()"  v-on:mouseover="changeShow()">
        <div class="product_content">
          <router-link class="product_name" tag="div" to="classcard">
            <p class="svg_p">
              <img class="svg" src="../../static/banner_pad.svg" alt />
            </p>
            <p class="svg_p">百人俱乐部</p>
          </router-link>
          <router-link class="product_name" tag="div" to="homeschool">
            <p class="svg_p">
              <img class="svg" src="../../static/banner_phone.svg" alt />
            </p>
            <p class="svg_p">千人俱乐部</p>
          </router-link>
          <router-link class="product_name" tag="div" to="smartbracelet">
            <p class="svg_p">
              <img class="banner_band" src="../../static/banner_band.svg" alt />
            </p>
            <p class="banner_band_p">万人俱乐部</p>
          </router-link>
        </div>
      </div>

    </transition>-->
    <transition name="fade">
      <div
        class="user_center"
        v-if="showuser"
        v-on:mouseleave="resetUserShow()"
        v-on:mouseover="changeUserShow()"
      >
        <div class="userinfo_items">
          <div style="width:10px;height:10px">
            <span id="user_top"></span>
          </div>
          <li @click="goUser(1)">客户中心</li>
          <li @click="goHistory">康复记录</li>
          <li @click="goUser(2)">修改信息</li>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showIllManage" v-on:mouseleave="resetIllShow()" v-on:mouseover="changeIllShow()">
        <div class="illManageDetail">
          <div style="width:10px;height:10px">
            <span id="user_top"></span>
          </div>
          <li @click="goUser(1)">新建慢病管理</li>
          <li @click="goHistory">上传病史</li>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import picmale from "../../assets/male.png";
import picfemale from "../../assets/female.png";
import icon from "../../assets/shi.png";

export default {
  data() {
    return {
      switchColorflag: true,
      showIllManage: false,
      topHeaderFix: true,
      picmale: picmale,
      picfemale: picfemale,
      showuser: false,
      show: false,
      state: false,
      topHeaderState: false,
      showTopHeader: true,
      top_header_a: "top_header_a",
      top_header_c: "top_header_c",
      drawer: false,
      curNav: this.$store.state.curNav
    };
  },

  components: {},

  computed: {
    user() {
      return this.$store.state.username
    },
    admin(){
      return this.$store.state.admin
    },
    classObject: function() {
      return {
        top_header_b: this.topHeaderState,
        top_header_a: true,
        top_header_c: !this.showTopHeader && !this.topHeaderFix
      };
    },
    kind() {
      return this.$store.state.kind;
    }
    // userInfo() {
    //   return (
    //     this.$store.state.userInfo || {
    //       businessScope: "",
    //       company: "",
    //       phonenumber: "",
    //       sex: "",
    //       userName: ""
    //     }
    //   );
    // }
  },
  ready() {},

  created() {
    this.getUserInfo();
    this.$store.info_state = 1; //个人信息页面的哪个模块
    this.$store.state.username=sessionStorage.getItem('userId')
    this.$store.state.admin=sessionStorage.getItem('admin')

    // alert(this.user)
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    // if(this.$store.userInfo)
  },

  methods: {
    ManageUser(){
      this.$router.replace('/admin/userManage')
    },
    exit(){
            this.$confirm("是否退出", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }).then(()=>{
              window.sessionStorage.setItem('userId','')
              window.sessionStorage.setItem('token','')
            window.sessionStorage.setItem('admin','')
      this.$store.state.username=''
      this.$store.state.admin='0'
      this.$router.replace('/login')
      })


    },
    goKWM(){
            this.$router.push('/work/keyWM');

    },
    goCheckHistoryBat(){
            this.$router.push('/work/modifyOrgan');

    },
    fixTheTopHeader() {
      this.topHeaderFix = !this.topHeaderFix;
      this.switchColorflag = !this.switchColorflag;
    },
    topHeaderShow() {
      this.showTopHeader = true;
    },
    topHeaderHide() {
      this.showTopHeader = false;
    },


    goDocIn() {
      this.$router.push("/work/newBatch");
    },

    goRecovery() {
      this.$router.push("/recovery");
    },
    gologin() {
      this.$router.replace("/login");
    },
    goHome() {
      //  alert("home")
      this.$router.push("/home");
    },
    unLogin() {
      //  alert(1);
      this.$confirm("确认注销账号?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$store.userInfo=null;
          this.$message({
            type: "success",
            message: "注销成功!"
          });
          this.$store.state.user = null;
          this.$store.state.kind = 0;

          sessionStorage.removeItem("user");

          this.$router.push("/login");
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },

    toHistory() {
      if (localStorage.getItem("token")) {
        this.$router.push("/history");
      } else {
        this.$message({
          type: "info",
          message: "请登录"
        });
        this.$router.push("/login");
      }
    },

    toIllManage() {
      this.$router.push("/illManage");
    },

    getUserInfo() {
      // if (this.$store.state.userInfo) {
      //   this.userInfo = this.$store.state.userInfo;
      //   return;
      // }
      if (localStorage.getItem("token")) {
        // console.log(localStorage.getItem("token"))
        // alert(1)
        if (!this.$store.state.userInfo) {
          this.$http1.get(this.$forePath + "/dist/getUserInfo").then(res => {
            //  console.log("headerinit",res)
            this.$store.commit("setUserInfo", res);
            console.log(res);
            //console.log("aaa", this.$store.state.userInfo);
          });
        }
      } else {
        // setTimeout(() => {
        //   this.$message.warning("登录信息已过期，请重新登录");
        //   this.$router.push("/login");
        // }, 1500);
      }
    },

    handleScroll() {
      var yheight = window.scrollY;
      if (yheight > 60) {
        // console.log("yhei",yheight)
        this.topHeaderState = true;
      } else if (yheight === 0) {
        if (this.show) {
          this.toHeaderState = true;
        } else {
          this.topHeaderState = false;
        }
      }
    },

    changeShow() {
      // alert("onchange")
      this.show = true;
      this.topHeaderState = true;
    },
    changeUserShow() {
      this.showuser = true;
    },
    resetUserShow() {
      this.showuser = false;
    },

    changeIllShow() {
      this.showIllManage = true;
    },
    resetIllShow() {
      this.showIllManage = false;
    }

    // resetShow() {
    //   this.show = false;
    //   var yheight = window.scrollY;
    //   if (yheight > 60) {
    //     this.topHeaderState = true;
    //   } else if (yheight === 0) {
    //     this.topHeaderState = false;
    //   }
    // }
  }

  // unLogin() {
  //   alert(1);
  //   this.$confirm("确认注销账号?", "提示", {
  //     confirmButtonText: "确定",
  //     cancelButtonText: "取消",
  //     type: "warning"
  //   })
  //     .then(() => {
  //       this.$message({
  //         type: "success",
  //         message: "注销成功!"
  //       });
  //       localStorage.removeItem("token");
  //       this.$router.push("/login");
  //     })
  //     .catch(() => {
  //       // this.$message({
  //       //   type: 'info',
  //       //   message: '已取消删除'
  //       // });
  //     });
  // },
};
</script>

<style lang="scss" scoped>
.switchdeepColor {
  background-color: #221f418e !important;
}

.top_header_c {
  height: 0.3rem !important;
  overflow: hidden;
}

.selectPull {
  cursor: pointer;
  position: absolute;
  right: 1rem;
  height: 2rem;
  width: 2rem;
  top: 2rem;
  background-color: rgba(118, 143, 189, 0.753);
  border-radius: 1rem;
  line-height: 2rem;
}
.content {
  z-index: 2;
  li {
    text-align: center;
    // margin-left: 4%;
    display: inline-block !important;
    width: 9rem;
  }

  .malestyle {
    background-image: url("../../assets/male.png");
  }

  .femalestyle {
    background-image: url("../../assets/female.png");
  }

  .user_controll {
    color: rgb(192, 173, 173) !important;
    font-family: "Microsoft YaHei";
    font-weight: 700;
  }
}
.user_controll:hover {
  color: #ffffff !important;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.product_list {
  position: absolute;
  width: 100%;
  top: 10vh;
  z-index: 999;
  background: rgba(2, 1, 37, 0.5);
  height: 100px;
}
.svg_p {
  text-align: center;
}
.banner_band_p {
  text-align: center;
  margin-top: 10vh !important;
  padding-left: 10px;
}
.product_content {
  width: 400px;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  text-align: right;
  padding-left: 10px;
}

.product_name {
  transition: all 0.5s;
  width: 100px;
  cursor: pointer;
  margin: -5px auto;
}
.product_name:hover p {
  color: #ffffff;
}
.product_name p {
  color: #cbd4da;
  font-size: 12px;
  margin-top: 10px;
}
.banner_band_p {
  margin-top: 0 !important;
  margin-left: -14px;
}
.svg {
  width: 50px;
  margin: 0 auto;
  margin-top: 15px !important;
}
.banner_band {
  margin-top: 12px;
  width: 35px;
  margin-bottom: 6px;
}

.border {
  height: 20px;
  border-right: 2px solid #cbd4da;
  margin-top: 26px;
  margin-left: 0;
}
.m_right {
  margin-right: 20px !important;
}

.top_header_b {
  width: 100%;
  height: 4.5rem;
  // animation: topHeader_b_bg 1s alternate;
  // -webkit-animation: topHeader_b_bg 1s alternate;
  animation-fill-mode: forwards;
  position: fixed;
  text-align: center;
  z-index: 9999;

  top: 0;
}

.top_header_a {
  width: 100%;
  background-color: rgba(35, 57, 184, 0.788);
  height: 4.5rem;
  position: fixed;
  text-align: center;
  z-index: 9999;
  animation-fill-mode: forwards;
  top: 0;
}
.content ul li:hover {
  color: #ffffff;
}
.top_header_b ul {
  background-color: #372aaa8f;
  list-style-type: none;
  line-height: 4.5rem;
  white-space: nowrap;
  text-align: left;
  // margin-left: 20px;
}

.top_header_b li:hover {
  cursor: pointer;
}

.a {
  color: #d2cbda;
  font-size: 1.2rem !important;
}

.topHeaderIcon {
  background: url(("../../assets/topLogo.png"));
  position: absolute;
  top: -0.1em;
  left: -4rem;
  width: 4.7rem;
  /* background-color: red; */
  height: 4.7rem;
  z-index: 222;
  background-repeat: no-repeat;
  background-size: 100%;
}

.headpic {
  width: 3.8rem;
  height: 3.8rem;
  background-color: #ddd;
  background-repeat: no-repeat;
  background-size: 100%;
  // background-image: url("../../assets/head.png");
  border-radius: 50%;
  position: absolute;
  left: 56%;
  top: 12%;
}

.logo {
  font-family: STZhongsong;
  margin-right: 12%;
  color: #cbd4da;
  margin-left: 2%;
}
.logo:hover {
  color: #ffffff;
}

.content ul li {
  display: flex;
  color: #cbd4da;
  font-size: 16px;
  /* margin-right: 6%; */
  position: relative;
  height: 4.5rem;
  float: left;
}

// .top_header_a ul {
//   list-style-type: none;
//   line-height: 10vh;
//   white-space: nowrap;
//   text-align: left;
//   // margin-left: 20px;
//   overflow: hidden;
// }

.content ul {
  list-style-type: none;
  margin-top: 0;
  height: 4.5rem;
  line-height: 4.5rem;
  white-space: nowrap;
  text-align: left;
  overflow: hidden;
}

.top_header_a li:hover {
  cursor: pointer;
}

.content {
  // width: 1500px;
  margin: 0 auto;
  // padding-left: 2%;
  // background: url("../../assets/topheader.png");
  height: 4.5rem;
  overflow: hidden;
}

#user_top {
  position: absolute;

  width: 0px;
  height: 0px;
  line-height: 0px; /*为了防止ie下出现题型*/
  border-bottom: 0.5vw solid #909399;
  border-left: 0.5vw solid rgba(255, 255, 255, 0);
  border-right: 0.5vw solid rgba(255, 255, 255, 0);
  left: 44%;
  top: -0.5vw;
}
.userinfo_items {
  position: absolute;
  border-radius: 0.4vw;
  width: 8vw;
  height: 10vw;
  background-color: aqua;
  left: 80rem;
  list-style: none;
  background: rgba(13, 94, 56, 0.836);

  box-shadow: 0 0 1.30208vw #909399;
  padding-top: 0.3vw;

  li {
    margin-top: 1vw;
    color: #eeeeee;
    font-weight: 600;
    font-size: 1vw;
  }
  li:hover {
    color: #fff;
  }
}
// .userinfo_items

.illManageDetail {
  position: absolute;
  border-radius: 0.4vw;
  width: 8vw;
  height: 7vw;
  background-color: aqua;
  left: 44rem;
  list-style: none;
  background: rgba(13, 94, 56, 0.836);
  box-shadow: 0 0 1.30208vw #909399;
  padding-top: 0.3vw;

  li {
    margin-top: 1vw;
    color: #eeeeee;
    font-weight: 600;
    font-size: 1vw;
  }
  li:hover {
    color: #fff;
  }
}
</style>

