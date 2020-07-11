<template>
  <div class="wrapper">
    <div class="Card" v-show="step==1">
      <div class="newTip">新建一批档案工作</div>

      <el-form v-if="true" ref="BatchForm" :model="BatchForm" label-width="30%" class="batchForm">
        <el-form-item  prop="historyAuth" label="选择或填写单位：">
          <el-select
            @blur="selectBlur"
            @change="selectAuthChange"
            
            ref="authSelectref"
            id="selectAuth"
            filterable
            v-model="BatchForm.authName"
            placeholder="历史整档单位请下拉"
          >
            <el-option
              v-for="item in historyAuths"
              :key="item.authCode"
              :label="item.authName"
              :value="item.authCode"
            ></el-option>
          </el-select>
        </el-form-item>

        
        <el-form-item prop="batchName" label="单位全宗号：">
          <el-input
            size="normal"
            type="text"
            class="textInput"
            v-model="BatchForm.authCode"
            auto-complete="off"
            placeholder="输入单位全宗号"
          ></el-input>
        </el-form-item>

        <el-form-item prop="workType" label="选择整档类型：">
          <el-select filterable v-model="BatchForm.docType" placeholder="选择整档类型">
            <el-option
              v-for="item in docType"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>

          <el-form-item prop="batchName" label="档案类型代码：">
          <el-input
            size="normal"
            type="text"
            class="textInput"
            v-model="BatchForm.docTypeCode"
            auto-complete="off"
            placeholder="如文书类填WS，不填为空"
          ></el-input>
        </el-form-item>

        <el-form-item prop="batchName" label="批次名：">
          <el-input
            size="normal"
            type="text"
            class="textInput"

            v-model="BatchForm.batchName"
            auto-complete="off"
            placeholder="给本批次命名"
          ></el-input>
        </el-form-item>

    

        <el-form-item label="自定义排件号优先级：">
          <el-checkbox
            v-if="true"
            @change="priorityChange"
            false-label="0"
            true-label="1"
            :checked="false"
          >涉排件号优先级，不选则为默认优先级</el-checkbox>
        </el-form-item>

        <el-form-item prop="priority.first" v-if="showPriority&&!showTwo" label="选择第一优先级：">
          <el-select filterable v-model="priority.first" placeholder="选择优先级">
            <el-option
              v-for="item in priorityDic"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="priority.first" v-if="showPriority&&showTwo" label="选择第一优先级：">
          <el-select filterable v-model="renshipriority.first" placeholder="选择优先级">
            <el-option
              v-for="item in priorityDic2"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="showPriority&&!showTwo" prop="priority.second" label="选择第二优先级：">
          <el-select filterable v-model="priority.second" placeholder="选择优先级">
            <el-option
              v-for="item in priorityDic"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showPriority&&!showTwo" prop="priority.first" label="选择第三优先级：">
          <el-select filterable v-model="priority.third" placeholder="选择优先级">
            <el-option
              v-for="item in priorityDic"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="showPriority&&!showTwo" prop="priority.first" label="选择第四优先级：">
          <el-select filterable v-model="priority.forth" placeholder="选择优先级">
            <el-option
              v-for="item in priorityDic"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showPriority&&!showTwo" prop="priority.first" label="选择第五优先级：">
          <el-select filterable v-model="priority.fifth" placeholder="选择优先级">
            <el-option
              v-for="item in priorityDic"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="showPriority&&showTwo" prop="priority.first" label="选择第二优先级：">
          <el-select filterable v-model="renshipriority.second" placeholder="选择优先级">
            <el-option
              v-for="item in priorityDic2"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" class="midBtn" @click="nextStep">下一步</el-button>
      </el-form>
    </div>

    <div class="Card" v-if="step==2">
      <div class="newTip">设置本单位档案盒</div>
  <el-form v-if="true" ref="BatchForm" :model="BatchForm" label-width="30%" class="batchForm">
          <el-form-item label="本单位盒号：">填写需要用到的盒子类型的上一盒盒号即可</el-form-item>
        <el-form-item prop="lastBox" label="永久盒：">
          <el-input
            size="normal"
            type="text"
            class="textInput"
            v-model="BatchForm.lastBox.yongjiu"
            auto-complete="off"
            placeholder="输入本单位该类型上盒盒号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="lastBox" label="备查盒：">
          <el-input
            size="normal"
            type="text"
            class="textInput"
            v-model="BatchForm.lastBox.beicha"
            auto-complete="off"
            placeholder="输入本单位该类型上盒盒号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="lastBox" label="长期盒：">
          <el-input
            size="normal"
            type="text"
            class="textInput"
            v-model="BatchForm.lastBox.changqi"
            auto-complete="off"
            placeholder="输入本单位该类型上盒盒号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="lastBox" label="100年盒：">
          <el-input
            size="normal"
            type="text"
            class="textInput"
            v-model="BatchForm.lastBox.y100"
            auto-complete="off"
            placeholder="输入本单位该类型上盒盒号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="lastBox" label="30年盒：">
          <el-input
            size="normal"
            type="text"
            class="textInput"
            v-model="BatchForm.lastBox.y30"
            auto-complete="off"
            placeholder="输入本单位该类型上盒盒号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="lastBox" label="10年盒：">
          <el-input
            size="normal"
            type="text"
            class="textInput"
            v-model="BatchForm.lastBox.y10"
            auto-complete="off"
            placeholder="输入本单位该类型上盒盒号"
          ></el-input>
        </el-form-item>
        <el-button type="primary" class="midBtn" @click="preStep">上一步</el-button>

        <el-button type="primary" class="midBtn" @click="newBatch">下一步</el-button>

  </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step:1,
      showTwo: true,
      showPriority: false,

      BatchForm: {
        batchName: "",
        authCode: "",
        authName: "",
        docType: "",
        docTypeCode:'',
        lastBox: {
          yongjiu: 0,
          changqi: 0,
          beicha: 0,
          y100: 0,
          y30: 0,
          y10: 0
        },
        priority: [],
        rule:'',
        to_box:{},
        end:0,
      },

      historyAuths: [
        {
          authCode: 22,
          authName: "尚无历史记录，请新建"
        },
        {
          authCode: 23,
          authName: "如输入慈利县档案局"
        }
      ],
      uploadpriority: {
        first: "keyword",
        second: "level",
        third: "author",
        forth: "docDescNum",
        fifth: "docDate"
      },
      priority: {
        first: "keyword",
        second: "level",
        third: "author",
        forth: "docDescNum",
        fifth: "docDate"
      },
      renshipriority: {
        first: "keyword",
        second: "docDate"
      },
      priorityForm: [{ first: "主题词", key: "1" }],
      priorityDic: [
        { name: "主题词", key: "keyword" },
        { name: "级别", key: "level" },
        { name: "责任者", key: "author" },
        { name: "文号中的序号", key: "docDescNum" },
        { name: "发文日期", key: "docDate" }
      ],
      priorityDic2: [
        { name: "主题词", key: "keyword" },
        { name: "发文日期", key: "docDate" }
      ],

      docType: [
        {
          typeId: 1,
          typeName: "文书类"
        },
        {
          typeId: 2,
          typeName: "科技类"
        },
        {
          typeId: 3,
          typeName: "人事类"
        },
        {
          typeId: 4,
          typeName: "业务类"
        }
      ]
    };
  },
  created() {
       this.getRequest("/organs")  .then(resp => {
     var organs=resp.data;
     this.historyAuths=organs;
   })

    if (
      sessionStorage.getItem("user") &&
      sessionStorage.getItem("user").level == 1
    ) {
      this.getRequest(
        "/organs",
        sessionStorage.getItem(user).userId
      ).then(res => {
        this.historyAuths = res.data;
      });
    } //加载用户的历史整档单位

    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var s = myDate.getSeconds();
    var now =
      year +
      "-" +
      this.conver(month) +
      "-" +
      this.conver(date) +
      
      "归档批";

    this.BatchForm.batchName = now;
  },
  watch: {
    BatchForm: {
      handler(val, oldVal) {
        // console.log(val);
        if (val.docType == 3) {
          this.showTwo = true;
          this.uploadpriority = this.renshipriority;
        } else {
          this.showTwo = false;
          this.uploadpriority = this.priority;
        }
      },
      deep: true
    }
  },

  computed: {

  },

  methods: {

    huiche(){
      alert(1)
    },
    newBatch(){
      // console.log(this.BatchForm)

var a = {"first":"1","second":"2","third":"3","forth":"4","fifth":"5"}
let b = this.BatchForm.priority;


for(var key in b){
  // console.log(key)
    // var newKey=a

    var newKey=a[key]
    // console.log("a['"+key+"']")
    // console.log(a['first'])
    // var newKey= eval("a['"+key+"']");
    // console.log(newKey)

    // console.log("111"+a['level'])
    b[newKey] = b[key];
    delete b[key];
}

// console.log("aaa");
// console.log(b)
b=JSON.stringify(b)
// console.log("after")
// console.log(b)
      this.BatchForm.rule=b;


      console.log("batchForm");
      console.log(this.BatchForm)


      sessionStorage.setItem("Batch",this.BatchForm);
      // sessionStorage.setItem("token","12355")

//新建单位
      var code=this.BatchForm.authCode;
      var organObj={
        authName:this.BatchForm.authName,
        authCode:this.BatchForm.authCode
      }

      this.postKeyValueRequest("/organ", JSON.stringify(organObj))
            .then(resp => {
              console.log(resp)
            })

//新建单位




         var docTypetemp='official'
      if(this.BatchForm.docType==2){
        docTypetemp='science'
      }else if(this.BatchForm.docType==3){
        docTypetemp='personnel'
      }else{
        docTypetemp='business'
      }
      sessionStorage.setItem("docType",docTypetemp)

       var batchobj= {
          authId:x,
          batchName:this.BatchForm.batchName
        }

 this.postRequest(   //注意防止重复提交
        "/work",JSON.stringify(batchobj)

        )
    },

    nextStep() {
      // 根据输入查询是否有该单位
      //  this.postKeyValueRequest(
      //   "/work/hasThisAuth",
      //   {
      //     // userId:sessionStorage.getItem(userId),
      //     authName:this.BatchForm.authName.trim()
      //   }
      // ).then(res=>{
      //   if(res.obj.authId==-1) this.BatchForm.newAuth = true;
      //   else this.BatchForm.authId = res.obj.authId;
      // })
      // if (this.BatchForm.authId == "") this.BatchForm.authId = -1;
      // var token=sessionStorage.getItem("token");
    
     

 
      if(this.validateForm1()){

   

      this.BatchForm.priority = this.uploadpriority;



         if(this.step==1) this.step++
      }
      //

    },
    // inputSelect(){
    //   alert(1)
    // },
    validateForm1(){
      var can=true;
      if(this.BatchForm.authName=="") {
        can=false;
        this.$message({
                            type: 'error',
                            message: '请填写完整'
                        });
      }
      if(this.BatchForm.docType=="")
      {
        can=false
                this.$message({
                            type: 'error',
                            message: '请填写完整'
                        });
      }

      return can;  //校验能否跳往下一页
    },

     preStep(){
      if(this.step==2){
        this.step--;
      }
    },


    conver(s) {
      return s < 10 ? "0" + s : s;
    },

    selectAuthChange(id){
      var name={}
      name=this.historyAuths.find((item)=>{   //在历史记录里有这项选中的话就返回obj
        return item.authCode==id;
      })
      name=name.authName  //obj的lable
      this.BatchForm.authName=name
      this.BatchForm.authCode=id;
    },

    selectBlur(e) {  
      var context = this.$refs["authSelectref"];
      // console.log(text)
      // console.log(this);
      console.log('发出blur的e');
      console.log(e);
      // if(e.target.id=="selectAuth"){
      // alert(e.target.value)
      var inputAuth = e.target.value;
      this.BatchForm.authName = inputAuth;
      // }
      // console.log('hew')
      // console.log(e.target.value);
    },
    priorityChange() {
      //自定义优先级
      this.showPriority = !this.showPriority;
    }
  }
};
</script>

<style lang="scss">
.batchForm {
  .el-input__inner {
    background: rgba(255, 255, 255, 0.15) !important;
    border-radius: 0.48rem;
    border: 0.08rem solid #274596c5;
    height: 2.5rem !important;
    color: #333;
    font-size: 1.1rem;
    padding-left: 3.3vw;
  }

  .el-form-item__label {
    line-height: 3rem !important;
  }
  .el-form-item__content {
    height: 3rem !important;
  }
  .textInput {
    width: 70%;
  }
}
</style>

<style lang="scss" scoped>
.midBtn {
  width: 6rem;
  left: 50%;
  margin-left: -3rem;
  position: relative;
}
.batchForm {
  position: relative;
  /* padding: 15px 35px 15px 35px; */
  top: 3rem;
  background: rgba(255, 255, 255, 0) !important;

  .el-form-item__label {
    font-size: 0.9rem !important;
    font-weight: 600;
    line-height: 3rem !important;
  }

  .el-form-item {
    height: 3rem;
  }
}

.wrapper {
  height: 150vh;
  background-color: rgb(209, 218, 243);
}
.Card {
  width: 40rem;
  -webkit-box-shadow: 0 0 0.5rem #909399;
  box-shadow: 0 0 0.5rem #909399;
  border-radius: 1rem;
  position: relative;
  top: 8rem;
  left: 50%;
  margin-left: -20rem;
  padding-bottom: 5rem;
  .newTip {
    position: absolute;
    width: 100%;
    top: 0.5rem;
    text-align: center;
  }
}
</style>