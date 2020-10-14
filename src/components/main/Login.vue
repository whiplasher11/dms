<template>
  <div style="position:relative" class="Loginwrapper">
    <div class="bgpic"></div>

   

      <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
       >
      >
    <el-form
        v-if="flag"
      :rules="rules"
      ref="loginForm"
      v-loading="loading"
      element-loading-text="正在登录..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :model="loginForm"
      label-width="6rem"
      class="loginContainer"
    >
      <h3 class="loginTitle">登录国安档案管理系统</h3>
      <el-form-item prop="username" label="账号：">
        <el-input
          size="normal"
          type="text"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码：">
        <el-input
          size="normal"
          type="password"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item prop="code">
                <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off"
                          placeholder="点击图片更换验证码" @keydown.enter.native="submitLogin" style="width: 250px"></el-input>
                <img :src="vcUrl" @click="updateVerifyCode" alt="" style="cursor: pointer">
      </el-form-item>-->
      <!-- <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox> -->
      <div class="goRegister" @click="goRegister">尚未注册？前往注册</div>
      <el-button class="loginBtn" size="normal" type="primary" @click="submitLogin">登录</el-button>
    </el-form>
      </transition>

      <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
      >
    <el-form
      v-if="flag2"
      :rules="regirules"
      ref="regiForm"
      v-loading="loading"
      element-loading-text="注册中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(22, 44,22, 0.8)"
      :model="regiForm"
      label-width="6rem"
      class="loginContainer"
    >
      <h3 class="loginTitle">注册</h3>
      <el-form-item prop="phone" label="手机号：">
        <el-input
          size="normal"
          type="text"
          v-model="regiForm.phone"
          auto-complete="off"
          placeholder="输入手机号"
        ></el-input>
      </el-form-item>

      <el-form-item prop="username" label="账号：">
        <el-input
          size="normal"
          type="text"
          v-model="regiForm.username"
          auto-complete="off"
          placeholder="用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码：">
        <el-input
          size="normal"
          type="password"
          v-model="regiForm.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item prop="repassword" label="确认密码：">
        <el-input
          size="normal"
          type="password"
          v-model="regiForm.repassword"
          auto-complete="off"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>

      <el-form-item prop="workplace" label="单位：">
        <el-input
          size="normal"
          type="text"
          v-model="regiForm.workplace"
          auto-complete="off"
          placeholder="输入所在的单位"
        ></el-input>
      </el-form-item>

      <!-- <el-form-item prop="code">
                <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off"
                          placeholder="点击图片更换验证码" @keydown.enter.native="submitLogin" style="width: 250px"></el-input>
                <img :src="vcUrl" @click="updateVerifyCode" alt="" style="cursor: pointer">
      </el-form-item>-->
      <!-- <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox> -->
      <div class="goRegister" @click="goLogin">已有账号？请登录</div>
      <el-button class="loginBtn" size="normal" type="primary" @click="submitRegi">注册</el-button>
    </el-form>
      </transition>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      flag:true,
      flag2:false,
      loading: false,
      vcUrl: "/verifyCode?time=" + new Date(),
      loginForm: {
        username: "",
        password: ""
      },
      regiForm: {
        username: "",
        password: "",
        phone:"",
        workplace:"",
        repassword:""
      },
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
        // code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      },
      regirules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },
        { min: 5,max: 25,message: '长度在 5 到 25个字符'},],

        repassword: [{ required: true, message: "请再次输入密码", trigger: "blur" }],

        phone: [{ required: true, message: "请输入手机号", trigger: "blur" },
              	{validator:function(rule,value,callback){
	            if(/^1[34578]\d{9}$/.test(value) == false){
	                callback(new Error("请输入正确的手机号"));
	            }else{
	                callback();
	            }
	        }, trigger: 'blur'}

        ],

        workplace: [{ required: true, message: "请输入单位名称", trigger: "blur" }],

        // code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      },
    };
  },
  methods: {
    submitRegi(){
            this.$refs.regiForm.validate(valid => {
        if (valid) {
          this.loading = true;
          var regiData=JSON.stringify(this.regiForm)
          console.log(regiData)
          this.postKeyValueRequest("/register", regiData)
            .then(resp => {
              if (resp) {
                console.log(resp)
                if(resp.code==0){
                
                        this.$message({
                        type: "success",
                        message: "注册成功!"

                      });

                      this.flag2=false;
                        setTimeout(() => {
                        this.flag=true;
                      }, 850);
                }
                  // this.$store.commit("INIT_CURRENTHR", resp.obj);
                  // window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
                  // let path = this.$route.query.redirect;
                  // console.log(resp.obj);
                  // this.$router.replace(
                  //   path == "/" || path == undefined ? "/" : path
                // );
              } else {
                alert('服务器错误')
              }
            })
            .then(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    goRegister() {
      this.flag=false;
      setTimeout(() => {
        this.flag2=true;
      }, 850);
    },
    goLogin(){
      this.flag2=false;
      setTimeout(() => {
        this.flag=true;
      }, 850);
    },
    updateVerifyCode() {
      this.vcUrl = "/verifyCode?time=" + new Date();
    },
    submitLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          var logindata=JSON.stringify(this.loginForm)
          console.log(logindata)
          this.postKeyValueRequest("/login", logindata)
            .then(resp => {
              if (resp) {
                console.log(resp)
                if(resp.code==0){
                  var thistoken=resp.data.token.split('"')[1];
                  if(thistoken==null) thistoken=resp.data.token; 
                  window.sessionStorage.setItem("token",thistoken)
                  window.sessionStorage.setItem("userId",this.loginForm.username)
                  window.sessionStorage.setItem("userIdNum",resp.data.userId)
                  window.sessionStorage.setItem("admin",'')
                  if(resp.data.role=='管理员'){
                  window.sessionStorage.setItem("admin",'1')
                  // window.sessionStorage.setItem("admin",'1')
                  this.$store.state.admin=1

                  }

                            this.$message({
                        type: "success",
                        message: "登录成功!"
                      });

                      this.$router.push('/work/newBatch')
                }
                
                // else if(){}
                  // this.$store.commit("INIT_CURRENTHR", resp.obj);
                  // window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
                  // let path = this.$route.query.redirect;
                  // console.log(resp.obj);
                  // this.$router.replace(
                  //   path == "/" || path == undefined ? "/" : path
                // );
              } else {
                alert('服务器错误')
              }
            })
            .then(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" >
.loginContainer {
  .el-input__inner {
    background: rgba(255, 255, 255, 0.15) !important;
    border-radius: 0.58vw;
    border: 0.1rem solid #274596c5;
    height: 3rem;
    color: #333;
    font-size: 1.1vw;
    padding-left: 3.3vw;
  }
    .el-input__inner:hover{
    border: 0.1rem solid #718cd8c5;

  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px rgb(203, 231, 215) inset !important;
    -webkit-text-fill-color: #3e3e3e !important;
    font-size: 1.1rem !important;
  }

  .el-form-item__label:before {
    content: "" !important;
  }
  .el-form-item__label {
    font-size:0.9rem !important;
    font-weight: 600;
    line-height: 3rem !important;
  }
  position: relative;
  padding: 15px 35px 15px 35px;
  top: 1rem;
  background: rgba(255, 255, 255, 0) !important;
}
</style>


<style lang="scss" scoped>
.Loginwrapper {
  background-color: rgb(209, 218, 243);
  height: 150vh;

  .loginContainer {
 
    position: relative;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 30rem;
    top: 7rem;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
}

.Loginwrapper >>> .el-form-item__label {
  // font-size: 6rem !important;
}

.loginBtn {
  margin-top: 3rem !important;
  margin-bottom: 1.6rem !important;

  left: 20%;
  width: 60%;
  height: 2.5rem;
  position: relative;
}

.bgpic {
  /* background: url("../assets/welcome.png"); */
  width: 52rem;
  height: 52rem;
  position: absolute;
  left: -1%;
  top: 3%;
  background-repeat: no-repeat;
  background-size: 100%;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
}
.goRegister {
  position: absolute;
  right: 35px;
  cursor: pointer;
}
.goRegister:hover {
  color: #1f8630;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>