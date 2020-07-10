<template>
  <div class="outbox">
    <div style="position:relative" class="wrapper">
      <div style="height:4.5rem;"></div>
      <div class="leftcard">
        <div class="leftside patientSearchWrapper">
          <el-input placeholder="病人姓名"></el-input>
        </div>
        <div class="search">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="leftside upload"></div>
        <!-- <div class="leftside plan" >用药计划</div> -->

        <div class="leftproblem">
          <div style="color:#333;margin-bottom:0.5rem;border-bottom:1px dashed">常见问题</div>
          <div class="problemItem">1、怎样提醒病人按时服药</div>
          <div class="problemItem">2、病人情绪不好</div>
        </div>
      </div>

      <div class="rightside">
        <div class="pcard">
          <div class="pname">博古特</div>
          <div class="itemNameBox">
            <div class="itemName">病名：</div>
            <div class="itemName">年龄：</div>
            <div class="itemName">性别：</div>
            <div class="itemName">服药：</div>
            <div class="itemName">接诊时间：</div>
          </div>

          <div class="itemContentBox">
            <div class="itemContent">荨麻疹</div>
            <div class="itemContent">22</div>
            <div class="itemContent">男</div>
            <div class="itemContent">否</div>
            <div class="itemContent">2018-08-08</div>
          </div>

          <div class="detailTip">点击查看详情</div>

          <div class="cardShadow"></div>

          <div class="cardpic"></div>
        </div>

        <div class="pcard">
          <div class="pname">审冰</div>
          <div class="itemNameBox">
            <div class="itemName">病名：</div>
            <div class="itemName">年龄：</div>
            <div class="itemName">性别：</div>
            <div class="itemName">服药：</div>
            <div class="itemName">接诊时间：</div>
          </div>

          <div class="itemContentBox">
            <div class="itemContent">慢性非炎</div>
            <div class="itemContent">22</div>
            <div class="itemContent">女</div>
            <div class="itemContent">否</div>
            <div class="itemContent">2018-12-08</div>
          </div>

          <div class="detailTip">点击查看详情</div>

          <div class="cardShadow"></div>

          <div class="cardfepic"></div>
        </div>

        <div class="pcard">
          <div class="pname">博古特</div>
          <div class="itemNameBox">
            <div class="itemName">病名：</div>
            <div class="itemName">年龄：</div>
            <div class="itemName">性别：</div>
            <div class="itemName">服药：</div>
            <div class="itemName">接诊时间：</div>
          </div>

          <div class="itemContentBox">
            <div class="itemContent">荨麻疹</div>
            <div class="itemContent">22</div>
            <div class="itemContent">男</div>
            <div class="itemContent">否</div>
            <div class="itemContent">2018-08-08</div>
          </div>

          <div class="detailTip">点击查看详情</div>

          <div class="cardShadow"></div>

          <div class="cardpic"></div>
        </div>

        <div class="pcard">
          <div class="pname">审冰</div>
          <div class="itemNameBox">
            <div class="itemName">病名：</div>
            <div class="itemName">年龄：</div>
            <div class="itemName">性别：</div>
            <div class="itemName">服药：</div>
            <div class="itemName">接诊时间：</div>
          </div>

          <div class="itemContentBox">
            <div class="itemContent">慢性非炎</div>
            <div class="itemContent">22</div>
            <div class="itemContent">女</div>
            <div class="itemContent">否</div>
            <div class="itemContent">2018-12-08</div>
          </div>

          <div class="detailTip">点击查看详情</div>

          <div class="cardShadow"></div>

          <div class="cardfepic"></div>
        </div>

        <div class="pcard">
          <div class="pname">审冰</div>
          <div class="itemNameBox">
            <div class="itemName">病名：</div>
            <div class="itemName">年龄：</div>
            <div class="itemName">性别：</div>
            <div class="itemName">服药：</div>
            <div class="itemName">接诊时间：</div>
          </div>

          <div class="itemContentBox">
            <div class="itemContent">慢性非炎</div>
            <div class="itemContent">22</div>
            <div class="itemContent">女</div>
            <div class="itemContent">否</div>
            <div class="itemContent">2018-12-08</div>
          </div>

          <div class="detailTip">点击查看详情</div>

          <div class="cardShadow"></div>

          <div class="cardfepic"></div>
        </div>
        <div class="pcard">
          <div class="pname">博古特</div>
          <div class="itemNameBox">
            <div class="itemName">病名：</div>
            <div class="itemName">年龄：</div>
            <div class="itemName">性别：</div>
            <div class="itemName">服药：</div>
            <div class="itemName">接诊时间：</div>
          </div>

          <div class="itemContentBox">
            <div class="itemContent">荨麻疹</div>
            <div class="itemContent">22</div>
            <div class="itemContent">男</div>
            <div class="itemContent">否</div>
            <div class="itemContent">2018-08-08</div>
          </div>

          <div class="detailTip">点击查看详情</div>

          <div class="cardShadow"></div>

          <div class="cardpic"></div>
        </div>
        <div class="pcard">
          <div class="pname">博古特</div>
          <div class="itemNameBox">
            <div class="itemName">病名：</div>
            <div class="itemName">年龄：</div>
            <div class="itemName">性别：</div>
            <div class="itemName">服药：</div>
            <div class="itemName">接诊时间：</div>
          </div>

          <div class="itemContentBox">
            <div class="itemContent">荨麻疹</div>
            <div class="itemContent">22</div>
            <div class="itemContent">男</div>
            <div class="itemContent">否</div>
            <div class="itemContent">2018-08-08</div>
          </div>

          <div class="detailTip">点击查看详情</div>

          <div class="cardShadow"></div>

          <div class="cardpic"></div>
        </div>
      </div>

      <div style="height:14.5rem;"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },

  data() {
    return {
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
        username: [{ required: true, message: "请填写完整", trigger: "blur" }],
        password: [{ required: true, message: "请填写完整", trigger: "blur" }],
        age: [{ required: true, message: "请填写完整", trigger: "blur" }],
        phone: [{ required: true, message: "请填写完整", trigger: "blur" }],
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
<style lang="scss">
.patientSearchWrapper {
  border: none !important;
  .el-input__inner {
    background: rgba(255, 255, 255, 0.15) !important;
    border-radius: 0.58vw;
    border: 0.1rem solid #21b15dc5;
    height: 3rem;
    color: #333;
    font-size: 1.1rem;
    padding-left: 1rem;
  }
}
</style>

<style lang="scss" scoped>
.leftproblem {
  position: absolute;
  top: 13rem;
  left: 2rem;
  width: 18rem;

  .problemItem {
    font-size: 1.1rem;
    cursor: pointer;
    margin-bottom: 0.8rem;
  }
}

.pcard {
  position: relative;
  float: left;
  background-repeat: no-repeat;
  background-size: 100%;
  /* left: 50%; */
  margin-right: 8%;
  margin-bottom: 2rem;
  margin-top: 3rem;
  /* margin-left: -17rem; */
  width: 15rem;
  // background-color: red;
  font-weight: 550;
  height: 15rem;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  z-index: 5;

  .cardpic {
    background: url(("../../assets/patient.png"));
    width: 12rem;
    height: 12rem;
    position: absolute;
    left: 41%;
    top: 2%;
    background-repeat: no-repeat;
    background-size: 85%;
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
    z-index: -1;
  }

  .cardfepic {
    background: url("../../assets/fepatient.png");
    width: 12rem;
    height: 12rem;
    position: absolute;
    left: 41%;
    top: 10%;
    background-repeat: no-repeat;
    background-size: 85%;
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
    z-index: -1;
  }

  .pname {
    position: absolute;
    top: 1rem;
    left: 50%;
    width: 10rem;
    text-align: center;
    margin-left: -5rem;
  }

  .itemNameBox {
    width: 5.5rem;
    // height: 5rem;
    // background-color: #ddd;
    position: absolute;
    top: 3rem;

    .itemName {
      // font-family: ;
      margin-bottom: 0.5rem;
      text-align: right;
      margin-left: 0.1rem;
    }
  }

  .itemContentBox {
    width: 9rem;
    // height: 5rem;
    // background-color: #d2d;
    position: absolute;
    top: 3rem;
    margin-left: 5.5rem;

    .itemContent {
      margin-bottom: 0.5rem;
    }
  }

  .detailTip {
    position: absolute;
    bottom: 0.4rem;
    right: 1rem;
  }

  .cardShadow {
    width: 16rem;
    height: 16rem;
    box-shadow: 0 0 0.5rem #909399;
    border-radius: 1rem;
    cursor: pointer;
  }
  .cardShadow:hover {
    transform: scale(1.02);
  }
}

.search {
  top: 6rem;
  margin-left: 1rem;
  position: absolute;
  left: 11rem;
  height: 2rem;
}

.leftside {
  text-align: center;
  border: 1px solid #2b885a;
  border-left: none;
  border-right: none;
  /* margin-bottom: -0.2rem; */
  width: 8rem;
  top: 6rem;
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
.plan {
  top: 14rem;
}
.wrapper {
  background-color: rgb(203, 231, 215);
  height: 80rem;
}

.rightside {
  padding-left: 3%;

  border: 1px solid rgba(125, 175, 146, 0.438);
  //   box-shadow: #666 0px 0px 10px;
  width: 60rem;
  // height: 30rem;
  position: absolute;
  left: 50%;
  top: 8rem;
  margin-left: -25rem;
}

.rightTip {
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
}
</style>>

