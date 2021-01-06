<template>
    <div class="registerWrapper">
        <el-form v-if="this.taggle==1"
                :rules="rules"
                ref="registerForm"
                v-loading="loading"
                element-loading-text="提交中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :model="registerForm"
                class="specialELContainer">
            <h3 class="loginTitle">医生注册</h3>

            <div class="toggle" @click="changeToggle()">{{this.taggle==0?"切换医生注册":"切换病人注册"}}</div>
            <el-form-item prop="username" label="账号：">
                <el-input size="normal" type="text" v-model="registerForm.username" auto-complete="off"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码：">
                <el-input size="normal"  type="password" v-model="registerForm.password" auto-complete="off"
                          placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item prop="age"  label="年龄：">
                <el-input size="normal" type="text" v-model="registerForm.age" auto-complete="off"
                          placeholder="请输入年龄"></el-input>
            </el-form-item>

                <el-form-item prop="phone" label="电话：" >
                <el-input size="normal"  type="text" v-model="registerForm.phone" auto-complete="off"
                          placeholder="电话号码"></el-input>
            </el-form-item>

                    <el-form-item prop="nameZh" label="姓名：" >
                <el-input size="normal" type="text" v-model="registerForm.nameZh" auto-complete="off"
                          placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item prop="sex"  label="性别：" >
               <el-checkbox v-model="registerForm.sex" false-label="0" true-label="1">男</el-checkbox>
                <el-checkbox v-model="registerForm.sex" false-label="1" true-label="0">女</el-checkbox>
            </el-form-item>
            <el-form-item prop="hospital"  label="医院：" v-if="this.taggle==1">
                <el-input size="normal" type="text" v-model="registerForm.hospital" auto-complete="off"
                          placeholder="请输入医院"></el-input>
            </el-form-item>
                        <el-form-item prop="department"  label="科室：" v-if="this.taggle==1">
            <el-input size="normal" type="text" v-model="registerForm.department" auto-complete="off"
                          placeholder="请输入科室"></el-input>
            </el-form-item>
            

            <!-- <el-form-item prop="code">
                <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off"
                          placeholder="点击图片更换验证码" @keydown.enter.native="submitLogin" style="width: 250px"></el-input>
                <img :src="vcUrl" @click="updateVerifyCode" alt="" style="cursor: pointer">
            </el-form-item> -->
            <!-- <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox> -->
            <div class="goRegister" @click="goRegister">已有账号？去登录</div>
            <el-row :gutter="24">
                <el-col :span="6">&nbsp;</el-col>
            <el-col :span="12">
                  <el-button  class="loginBtn" size="normal" type="primary" style="width: 100%;" @click="dRegister">提交注册申请</el-button>
            </el-col>
            </el-row>
          
        </el-form>

<!-- 病人注册表 -->
        <el-form v-if="this.taggle==0"
                :rules="rulesp"
                ref="registerFormp"
                v-loading="loading"
                element-loading-text="注册中..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :model="registerFormp"
                class="specialELContainer">
            <h3 class="loginTitle">病人注册</h3>

            <div class="toggle" @click="changeToggle()">{{this.taggle==0?"医生注册":"病人注册"}}</div>
            <el-form-item prop="username" label="账号：">
                <el-input size="normal" type="text" v-model="registerFormp.username" auto-complete="off"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码：">
                <el-input size="normal"  type="password" v-model="registerFormp.password" auto-complete="off"
                          placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item prop="age"  label="年龄：">
                <el-input size="normal" type="text" v-model="registerFormp.age" auto-complete="off"
                          placeholder="请输入年龄"></el-input>
            </el-form-item>

                <el-form-item prop="phone" label="电话：" >
                <el-input size="normal"  type="text" v-model="registerFormp.phone" auto-complete="off"
                          placeholder="电话号码"></el-input>
            </el-form-item>

                    <el-form-item prop="nameZh" label="姓名：" >
                <el-input size="normal" type="text" v-model="registerFormp.nameZh" auto-complete="off"
                          placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item prop="sex"  label="性别：" >
               <el-checkbox v-model="registerFormp.sex" false-label="0" true-label="1" >男</el-checkbox>
                <el-checkbox v-model="registerFormp.sex" false-label="1" true-label="0">女</el-checkbox>
            </el-form-item>


            <!-- <el-form-item prop="code">
                <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off"
                          placeholder="点击图片更换验证码" @keydown.enter.native="submitLogin" style="width: 250px"></el-input>
                <img :src="vcUrl" @click="updateVerifyCode" alt="" style="cursor: pointer">
            </el-form-item> -->
            <!-- <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox> -->
            <div class="goRegister" @click="goRegister">已有账号？去登录</div>
            <el-row :gutter="24">
                <el-col :span="6">&nbsp;</el-col>
            <el-col :span="12">
                  <el-button  class="loginBtn" size="normal" type="primary" style="width: 100%;" @click="pRegister">注册</el-button>
            </el-col>
            </el-row>
          
        </el-form>
        
    </div>
</template>

<script>

    export default {
        name: "Login",
        data() {
            return {
                taggle:0,
                loading: false,
                vcUrl: '/verifyCode?time='+new Date(),
                registerForm: {
                    username: '',
                    password: '',
                    age:'',
                    phone:'',
                    nameZh:'',
                    sex:1,  
                    hospital:'',
                    department:''

                },

                registerFormp:{
                   username: '',
                    password: '',
                    age:'',
                    phone:'',
                    nameZh:'',
                    sex:'',   
                },
                checked: true,
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    age: [{required: true, message: '请输入年龄', trigger: 'blur'}],
                    phone: [{required: true, message: '请填写完整', trigger: 'blur'}],
                    nameZh: [{required: true, message: '请填写完整', trigger: 'blur'}],
                    sex: [{required: true, message: '请填写完整', trigger: 'blur'}],
                    hospital: [{required: true, message: '请填写完整', trigger: 'blur'}],
                    department: [{required: true, message: '请填写完整', trigger: 'blur'}],


                    // code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
                },
                rulesp:{
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    age: [{required: true, message: '请输入年龄', trigger: 'blur'}],
                    phone: [{required: true, message: '请填写完整', trigger: 'blur'}],
                    nameZh: [{required: true, message: '请填写完整', trigger: 'blur'}],
                    sex: [{required: true, message: '请填写完整', trigger: 'blur'}],
                }
            }
        },
        methods: {
            goRegister(){
                 this.$router.replace("/login")
                
            },
            pRegister(){
                this.$refs.registerFormp.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postKeyValueRequest('/register/patientRegiste', this.registerFormp).then(resp => {

                            // alert(this.$store.state.kind)
                            if (resp) {
                                console.log(resp.obj)
                                if(resp.status==200) this.$router.replace('/login');
                                
                            }else{
                                
                            }
                        }).then(()=>{this.loading = false;})
                    } else {
                        return false;
                    }
                });
            },
            dRegister(){
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postKeyValueRequest('/register/addDoctor', this.registerForm).then(resp => {

                            // alert(this.$store.state.kind)
                            if (resp) {
                                console.log(resp.obj)
                                if(resp.status==200) this.$router.replace('/login');
                                
                            }else{
                                
                            }
                        }).then(()=>{this.loading = false;})
                    } else {
                        return false;
                    }
                });
            },
            
            changeToggle(){
           
                if(this.taggle==0) this.taggle=1
                else if(this.taggle==1) this.taggle=0;
            },
            updateVerifyCode() {
                this.vcUrl = '/verifyCode?time='+new Date();
            },
            submitLogin() {
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postKeyValueRequest('/doLogin', this.registerForm).then(resp => {
                            this.postKeyValueRequest('/isDoctor',{id:resp.obj.userId}).then(res=>{
                                // alert("fachu"+resp.obj.userId)
                                // console.log(res)
                              
                                if(res&&res.msg=="是医生"){this.$store.state.kind=3; }
                            }).then(()=>{
                                 this.postKeyValueRequest('/isPatient',{id:resp.obj.userId}).then((res)=>{
                                      if(res&&res.msg=="是病人"){this.$store.state.kind=2; console.log(res)}
                                    
                                 })
                            });
                            
                            // alert(this.$store.state.kind)
                            if (resp) {
                                this.$store.commit('INIT_CURRENTHR', resp.obj);
                                window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
                                let path = this.$route.query.redirect;
                                console.log(resp.obj)
                                this.$router.replace((path == '/' || path == undefined) ? '/' : path);
                            }else{
                                this.vcUrl = '/verifyCode?time='+new Date();
                            }
                        }).then(()=>{this.loading = false;})
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
input:-webkit-autofill {

-webkit-box-shadow: 0 0 0px 1000px rgb(203, 231, 215) inset!important;

-webkit-text-fill-color: #3E3E3E !important;

}

.registerWrapper{
    height: 100vh;
  background-color: rgb(203, 231, 215);

  

}
.toggle{
    position: absolute;
    right: 3rem;
    top: 65px;
    cursor: pointer;
}
.toggle:hover{
    color: #0b8b36;
}

.goRegister{
    position: absolute;
    right: 35px;
    cursor: pointer;
}
.goRegister:hover{
    color:#1f8630
}
.loginBtn{
    margin-top: 42px !important;
}
    .specialELContainer {
        position: relative;
        border-radius: 15px;
        background-clip: padding-box;
        margin: 4.5rem auto;
        width: 38rem;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 50px auto;

        text-align: center;
        color: #505458;

    }

    .loginRemember {
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
    .el-form-item__content{
        display: flex;
        align-items: center;
    }
</style>