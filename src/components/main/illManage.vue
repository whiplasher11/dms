<template>
  <div style="position:relative" class="wrapper">
    <div>
      <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated zoomOutDown"
      >
        <div class="rightside" v-if="this.newManageShow">
          <div class="closebtn" @click="closeNewManage">
            <i class="el-icon-circle-close"></i>
          </div>
          <div class="rightsideShadow"></div>
          <div class="rightTip">新建慢病管理</div>
          <el-form
            v-if="true"
            label-width="20%"
            :rules="rules"
            ref="dataForm"
            v-loading="loading"
            element-loading-text="提交中..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :model="dataForm"
            class="dataUploadwrapper"
          >
            <el-form-item prop="name" label="姓名：">
              <el-input
                size="normal"
                type="text"
                v-model="dataForm.name"
                auto-complete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="科室：">
              <el-input
                size="normal"
                type="text"
                v-model="dataForm.temp"
                auto-complete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-form-item prop="blood" label="主要症状： ">
              <el-select
                size="normal"
                style="width:100%"
                v-model="dataForm.blood"
                placeholder="请选择"
              >
                <!-- <el-option
              v-for="item in staffJobs"
              :key="item.jobId"
              :label="item.jobName"
                :value="item.jobId"/>-->
              </el-select>
            </el-form-item>
            <el-form-item prop="pee" label="可选医生：">
              <el-select
                size="normal"
                style="width:100%"
                v-model="dataForm.blood"
                placeholder="请选择"
              >
                <!-- <el-option
              v-for="item in staffJobs"
              :key="item.jobId"
              :label="item.jobName"
                :value="item.jobId"/>-->
              </el-select>
            </el-form-item>

            <el-form-item prop="hospital" label="病况描述:">
              <el-input
                size="normal"
                type="textarea"
                v-model="dataForm.pee"
                auto-complete="off"
                placeholder="请输入"
              ></el-input>
            </el-form-item>

            <el-button class="uploadbtn" type="primary">提交申请</el-button>
          </el-form>

        </div>
      </transition>
    </div>
    <!-- 空出菜单项 -->
    <div style="height:4.5rem;"></div>  
    <div class="leftcard">
      <div class="leftside" @click="newManageClick">
        <i class="el-icon-edit-outline"></i>
        新建管理项
      </div>
      <div class="leftside upload">
        <i class="el-icon-document"></i>
        &nbsp;&nbsp;&nbsp;上传病史
      </div>
    </div>

    <div class="ill_card" v-if="this.historyShow==1">
      <div class="card_blank"></div>
      <div class="card_title">慢病管理项</div>
      <div class="ill_name carditem">病名:</div>
      <div class="carditem">病种:</div>
      <div class="carditem">起始日期:</div>
      <div class="carditem">终止日期:</div>
      <div class="carditem">医生姓名:</div>
      <div class="carditem">今日是否已用药:</div>
      <div class="ill_card_wrapper"></div>

      <div class="answer">
        <div class="ill_name carditem1">荨麻疹</div>
        <div class="carditem1">皮肤慢性病</div>
        <div class="carditem1">2005-05-05</div>
        <div class="carditem1">-</div>
        <div class="carditem1">钟南山</div>
        <div class="carditem1">否</div>
      </div>
      <div class="cardpic"></div>
      <div class="createTime">创建时间：2015-12-11 08:08:56</div>

      <div class="detailtip">点击查看详情</div>
      <!-- 
            <div class="btns carditem">
                <el-button size="normal" type="primary" class="detailbtn">查看详情</el-button>
                <el-button size="normal" type="primary" class="medicinebtn">申请康复</el-button>

      </div>-->
    </div>

        <div class="ill_card" v-if="this.historyShow==1">
      <div class="card_blank"></div>
      <div class="card_title">慢病管理项</div>
      <div class="ill_name carditem">病名:</div>
      <div class="carditem">病种:</div>
      <div class="carditem">起始日期:</div>
      <div class="carditem">终止日期:</div>
      <div class="carditem">医生姓名:</div>
      <div class="carditem">今日是否已用药:</div>
      <div class="ill_card_wrapper"></div>

      <div class="answer">
        <div class="ill_name carditem1">荨麻疹</div>
        <div class="carditem1">皮肤慢性病</div>
        <div class="carditem1">2005-05-05</div>
        <div class="carditem1">-</div>
        <div class="carditem1">钟南山</div>
        <div class="carditem1">否</div>
      </div>
      <div class="cardpic"></div>
      <div class="createTime">创建时间：2015-12-11 08:08:56</div>

      <div class="detailtip">点击查看详情</div>
      <!-- 
            <div class="btns carditem">
                <el-button size="normal" type="primary" class="detailbtn">查看详情</el-button>
                <el-button size="normal" type="primary" class="medicinebtn">申请康复</el-button>

      </div>-->
    </div>

    <div class="ill_card" v-if="this.historyShow==1">
      <div class="card_blank"></div>
      <div class="card_title">慢病管理项</div>
      <div class="ill_name carditem">病名:</div>
      <div class="carditem">病种:</div>
      <div class="carditem">起始日期:</div>
      <div class="carditem">终止日期:</div>
      <div class="carditem">医生姓名:</div>
      <div class="carditem">今日是否已用药:</div>
      <div class="ill_card_wrapper"></div>

      <div class="answer">
        <div class="ill_name carditem1">荨麻疹</div>
        <div class="carditem1">皮肤慢性病</div>
        <div class="carditem1">2005-05-05</div>
        <div class="carditem1">-</div>
        <div class="carditem1">钟南山</div>
        <div class="carditem1">否</div>
      </div>
      <div class="cardpic"></div>
      <div class="createTime">创建时间：2015-12-11 08:08:56</div>

      <div class="detailtip">点击查看详情</div>
      <!-- 
            <div class="btns carditem">
                <el-button size="normal" type="primary" class="detailbtn">查看详情</el-button>
                <el-button size="normal" type="primary" class="medicinebtn">申请康复</el-button>

      </div>-->
    </div>


    <div style="height:50.5rem;"></div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    newManageClick() {
      // alert(1)
      this.newManageShow = true;
      this.historyShow = 2;
    },
    closeNewManage() {
      this.newManageShow = false;
      this.historyShow = 1;
    }
  },
  data() {
    return {
      newManageShow: false,
      historyShow: 1,
      dataForm: {
        name: this.$store.state.user.nameZh,
        temp: "",
        blood: "",
        weight: "",
        mailv: "",
        pee: "",
        hospital: "",
        department: ""
      },

      rules: {
        name: [{ required: true, message: "请填写完整", trigger: "blur" }],
        pee: [{ required: true, message: "请填写完整", trigger: "blur" }],
        age: [{ required: true, message: "请填写完整", trigger: "blur" }],
        hospital: [{ required: true, message: "请填写完整", trigger: "blur" }],
        nameZh: [{ required: true, message: "请填写完整", trigger: "blur" }],
        sex: [{ required: true, message: "请填写完整", trigger: "blur" }],
        hospital: [{ required: true, message: "请填写完整", trigger: "blur" }],
        department: [{ required: true, message: "请填写完整", trigger: "blur" }]

        // code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.uploadbtn {
  left: 50%;
  margin-left: -4rem;
  width: 8rem;
  height: 2.5rem;
  position: absolute;
  color: rgb(215, 230, 216);
  font-size: 1.1rem;
  background-color: rgb(79, 134, 45);
  border-color: #409eff;
}
.rightTip {
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5rem;
}
.dataUploadwrapper {
  z-index: 2;
}
.rightsideShadow {
  box-shadow: #666 0px 0px 10px;
  // background-color: rgba(216, 230, 222, 0.63);
  border-radius: 1rem;
  width: 55rem;
  height: 35rem;
  position: absolute;
  z-index: 0;
  left: 0%;
  /* margin-left: -25rem; */
  top: -1rem;
}
.rightside {
  //   box-shadow: #666 0px 0px 10px;
  // background-color: rgba(77, 98, 168, 0.719);
  width: 50rem;
  position: absolute;
  left: 50%;
  margin-left: -25rem;
  top: 8rem;

  .closebtn {
    position: absolute;
    right: -3rem;
    top: -0.5rem;
    font-size: 2rem;
    font-weight: 800;
    z-index: 10;
    cursor: pointer;
  }
}
.leftside {
  text-align: center;
  border: 1px solid #2b885a;
  border-left: none;
  border-right: none;
  /* margin-bottom: -0.2rem; */
  width: 10rem;
  top: 8rem;
  margin-left: 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
}
.leftside:hover {
  transform: scale(1.05);
}

.upload {
  top: 11rem;
}
.createTime {
  height: 2rem;
  position: absolute;
  right: -9%;
  top: 0%;
  font-size: 0.8rem;
}
.cardpic {
  background: url(("../../assets/doc.png"));
  width: 12rem;
  height: 12rem;
  position: absolute;
  left: -8%;
  top: -10%;
  background-repeat: no-repeat;
  background-size: 100%;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
}
.detailtip {
  position: absolute;
  bottom: -2rem;
  right: 1rem;
  color: rgb(46, 129, 115);
}
.answer {
  position: absolute;
  top: 5rem;
  left: 16rem;
}
.detailbtn {
  color: #fff;
  background-color: rgb(49, 150, 133);
  border-color: rgb(49, 150, 133);
}

.card_title {
  text-align: center;
  position: absolute;
  width: 20rem;
  left: 50%;
  top: 1rem;
  margin-left: -10rem;
  font-family: "New Roman";
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 2rem;
}
.card_blank {
  height: 5rem;
}
.carditem {
  text-align: right;
  margin-bottom: 1.8rem;
  font-style: italic;
  font-size: 1.1rem;
  width: 13rem;
}

.carditem1 {
  text-align: left;
  margin-bottom: 1.8rem;
  font-style: italic;
  font-size: 1.1rem;
  width: 10rem;
}

.ill_name {
}

.wrapper {
  background-color: rgb(203, 231, 215);
}

.ill_card {
  position: relative;
  background-repeat: no-repeat;
  background-size: 100%;
  left: 50%;
  // background-color: rebeccapurple;
  margin-bottom: 8rem;
  margin-top: 3rem;
  margin-left: -17rem;
  width: 34rem;
  font-weight: 550;
  height: 25rem;
  // background-color: #222222;
  transition: all 0.3s;
  z-index: 5;
}
.ill_card:hover {
  cursor: pointer;
  transform: scale(1.005);
}
.ill_card_wrapper {
  z-index: 4;
  box-shadow: #666 0px 0px 10px;
  width: 41rem;
  height: 30rem;
  position: absolute;
  left: -7%;
  top: -3%;
}
</style>>

