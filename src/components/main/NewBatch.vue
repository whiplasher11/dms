<template>
  <div class="wrapper">
      <div style="position:absolute;width:20rem;height:10rem;top:10rem;left:50%;margin-left:-10rem;line-height:10rem;
    background-color:rgba(25,55,163,0.8);font-size:1.3rem;color:white;text-align:center;z-index:1000" v-if="showWaitingFlag">请求中，请稍候...</div>
       <!-- <el-form v-if="true" ref="searchForm" label-width="30%" class="searchForm">

        <el-form-item prop="historyAuth" label="">
          <el-select

            ref="authSelectref"
            id="selectAuth"
            filterable
            v-model="BatchForm.authName"
            placeholder="输入"
          >
            <el-option
              v-for="item in historyAuths"
              :key="item.authCode"
              :label="item.authName"
              :value="item.authCode"
            ></el-option>
          </el-select>
        </el-form-item>


     </el-form> -->


    <div class="Card" v-show="step==1">
      <div class="newTip">新建一批档案工作</div>

      <div class="organModify" @click="modifyOrgan">管理</div>



      <el-form v-if="true" ref="BatchForm" :model="BatchForm" label-width="30%" class="batchForm">
        <el-form-item prop="historyAuth" label="选择或填写单位：">
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
            placeholder="如文书类填WS，没有填无"
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

        <el-form-item   v-if="false" label="自定义排件号规则：">
          <el-checkbox
          
            @change="priorityChange"
            false-label="0"
            true-label="1"
            :checked="false"
          >本批整理规则，不选则默认按国家标准</el-checkbox>
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

        <el-form-item v-if="false&&showPriority&&!showTwo" prop="priority.first" label="选择第四优先级：">
          <el-select filterable v-model="priority.forth" placeholder="选择优先级">
            <el-option
              v-for="item in priorityDic"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="false&&showPriority&&!showTwo" prop="priority.first" label="选择第五优先级：">
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

        <div type="primary" class="topTextButton" style="margin-left:40%;width:3rem;padding:0.5rem" @click="nextStep">下一步</div>
      </el-form>
    </div>
<!-- step==2 -->
     <div class="Card"  v-show="step==2">
      <div class="newTip">选择本单位的文书类分卷方法</div>
<el-form  class="batchForm" label-width="30%" style="padding-bottom:5rem">
                        <el-form-item prop="workTypeSub" label="分卷方法：" >
          <el-select v-model="officialDocTypeSub" placeholder="选择分卷方法">
            <el-option
              v-for="item in officialDocTypeSubs"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>


                <div type="primary" class="topTextButtonBlue" style="width:12%;position:absolute;left:25%;bottom:1rem" @click="preStep">上一步</div>
        <div type="primary" class="topTextButtonBlue" style="width:12%;position:absolute;left:55%;bottom:1rem;" @click="nextStep2">下一步</div>
      </el-form>
      </div>

    <div class="Card" v-if="step==3">
      <div class="newTip">设置本单位档案盒号</div>
      <el-form v-if="true" ref="BatchForm" :model="BatchForm" label-width="30%" class="batchForm">
       <div style="font-size=0.7rem;margin-bottom:1rem;width:80%;margin-left:10%;text-align:center"> 提示：填写需要用到的盒子类型的上一盒盒号即可,如长期盒前一批整档工作排到了39盒，本批将使用第40盒那么填写(长期：39)</div>
        <div v-for="(item,index) in this.jsonArray" :key="index" style="position:relative">
          <input v-model="item[0]" type="text" style="width: 25%; 
    height: 2.2rem;
    font-size: 1.1rem;
    border: 0.08rem solid #274596c5;
    background: rgba(255, 255, 255, 0.15) !important;
    border-radius: 0.48rem;
    padding-left: 2rem;margin-left:2rem;margin-bottom:1rem"
    >

        （年）盒型：
          <input type="text" v-model="item[1]" style="width: 25%; 
    height: 2.2rem;
    font-size: 1.1rem;
    border: 0.08rem solid #274596c5;
    background: rgba(255, 255, 255, 0.15) !important;
    border-radius: 0.48rem;
    padding-left: 2rem;">（盒）
    <div style="position:absolute;right:2rem;top:0.4rem;font-weight:600;cursor:pointer" @click="deleteThis(index)">删除</div>
        </div>
        <!-- <el-form-item prop="lastBox" label="永久盒：">
          <el-input
            size="normal"
            type="text"
            class="textInput"
            v-model="BatchForm.lastBox.永久"
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
        </el-form-item> -->
      <div style="position:relative">
      <div style="height:1rem"></div>

        <div type="primary" class="topTextButtonBlue" style="width:12%;position:absolute;left:15%" @click="preStep">上一步</div>
        <div type="primary" class="topTextButtonBlue" style="width:14%;position:absolute;left:35%" @click="newBoxType">新增盒型</div>

        <div type="primary" class="topTextButtonBlue" style="width:12%;position:absolute;left:55%" @click="newBatch">下一步</div>
      </div>
      <div style="height:1rem"></div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kk:0,
      weightForm:{},
      showWaitingFlag:false,
      can:true,
      step: 1,
      showTwo: true,
      showPriority: false,
      officialDocTypeSub:1,

      BatchForm: {
        batchName: "",
        authCode: "",
        authName: "",
        docType: "",
        docTypeCode: "",
        lastBox: {
          '永久': "0",
          '长期': "39",
          '备查': "0",
 
        },

        rule: "",
        to_box: {},
        end: 0,
      },

      historyAuths: [
        {
          authCode: 22,
          authName: "尚无历史记录，请输入",
        },
        {
          authCode: 23,
          authName: "如输入慈利县档案局",
        },
      ],
      uploadpriority: {
        first: "keyword",
        second:"docDateYear",
        third: "level",
        forth: "author",
        fifth: "docDesc",
        six:"docDate",
        seven:"docDescNum"
      },
      priority: {
        first: "keyword",
        second:"docDateYear",
        third: "level",
        forth: "author",
        fifth: "docDesc",
        six:"docDate",
        seven:"docDescNum"
      },
            priorityJ: {
        first: "keyword",
        second:"keyword2",
        third: "docDateYear",
        forth: "level",
        fifth: "author",
        six:"docDesc",
        seven:"docDate",
        eight:"docDescNum"
      },
            uploadpriorityJ: {
        first: "keyword",
        second:"keyword2",
        third: "docDateYear",
        forth: "level",
        fifth: "author",
        six:"docDesc",
        seven:"docDate",
        eight:"docDescNum"
      },

      renshipriority: {
        first: "keyword",
        second: "docDate",
      },
      priorityDic: [
        { name: "主题词", key: "keyword" },
        { name: "级别", key: "level" },
        { name: "责任者", key: "author" },
        // { name: "是否有文号", key: "docDescNum" },
        // { name: "发文日期", key: "docDate" },
      ],
      priorityDic2: [
        { name: "主题词", key: "keyword" },
        { name: "发文日期", key: "docDate" },
      ],

      officialDocTypeSubs:[
        {
          typeId: 1,
          typeName: "问题分卷法",
        },
        {
          typeId: 2,
          typeName: "机构分卷法",
        },
      ],

      docType: [
        {
          typeId: 1,
          typeName: "文书类",
        },
        // {
        //   typeId: 2,
        //   typeName: "科技类",
        // },
        // {
        //   typeId: 3,
        //   typeName: "人事类",
        // },
        // {
        //   typeId: 4,
        //   typeName: "业务类",
        // },
      ],
      jsonArray:[],
    };
  },
  created() {
    window.scrollTo(0,0)

 this.testAc()
//  this.getRequest("/organ/" + sessionStorage.getItem("authId")).then(
//       (resp) => {
//         this.weightForm = resp.data;
//         console.log(resp.data)
//       })




      let attr;
    for (attr in this.BatchForm.lastBox) {
      this.jsonArray.push([attr, this.BatchForm.lastBox[attr]]);
    }
    console.log('jsonArr');

    console.log(this.jsonArray);


    this.$store.state.username = sessionStorage.getItem("userId");
    this.$store.state.alreadyDocs = [];
    this.getRequest("/organs").then((resp) => {
      if (resp.status == 500) {
        this.$message({
          type: "error",
          message: resp.data.message,
        });
        this.$router.push("/login");
      }

      console.log(resp);
      var organs = resp.data;
      if (organs == null) {
        this.historyAuths = [
          {
            authCode: 22222,
            authName: "尚无历史记录，请输入",
          },
          {
            authCode: 33333,
            authName: "如输入慈利县档案局",
          },
        ];
      } else {
        // organs=organs.rev?
        organs.reverse();
        this.historyAuths = organs;
      }
    });

    if (
      sessionStorage.getItem("user") &&
      sessionStorage.getItem("user").level == 1
    ) {
      this.getRequest("/organs").then((res) => {
        if (res.data) {
          this.historyAuths = res.data;
        }
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
      "-" +
      this.conver(h) +
      ":" +
      this.conver(m) +
      "归档批";

    this.BatchForm.batchName = now;
  },
  watch: {
    BatchForm: {
      handler(val, oldVal) {
        // console.log(val);
        // if(val.docType==1){
        //   this.officialDocTypeSubsShow=true
        // }else{
        //   this.officialDocTypeSubsShow=false
        // }

        if (val.docType == 3) {
          this.showTwo = true;
          this.uploadpriority = this.renshipriority;
        } else {
          this.showTwo = false;
          this.uploadpriority = this.priority;
        }
      },
      deep: true,
    },
  },

  computed: {},

  methods: {
    nextStep2(){
  this.showWaitingFlag=true
          this.weightForm.officialType=this.officialDocTypeSub
           this.putRequest(
          //注意防止重复提交
          "/organ/" + sessionStorage.getItem("authId"),
          JSON.stringify(this.weightForm)
        ).then((resp) => {
          console.log("修改单位表的文书类分卷方法");
          console.log(resp)
          this.weightForm=resp.data
          if(resp.code==0){
                  this.step++
                  this.showWaitingFlag=false
          }
        })
 

    },
    deleteThis(index){
      this.jsonArray.splice(index,1)
    },
    newBoxType(){
      this.jsonArray.push([
        '',''
      ])

      // {
      //   this.BatchForm.lastBox['22']="2"
      //   // console.log(typeof(this.lastBox))
      //   console.log(this.BatchForm)
      //   return
      // }

    },
    modifyOrgan() {
      this.$router.push("/work/modifyOrgan");
    },

    huiche() {
      alert(1);
    },
isNumber(val){

    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) && regNeg.test(val)){
        return true;
    }else{
        return false;
    }

},
isStringNum(val){
  // console.log(val+':'+typeof(val)+Number(val)+JSON.stringify(val))

  if(val=="") return false
  var n=Number(val)
  // console.log('转换')

  // console.log(n)
  if(!isNaN(n)) return true
  else return false
},
    newBatch() {
      // console.log(this.BatchForm)
      // {
      //   this.BatchForm.lastBox['22']="2"
      //   // console.log(typeof(this.lastBox))
      //   console.log(this.BatchForm)
      //   return
      // }
      var newBFlag=true
      //       for(var i=0;i<3;i++){
      //   // console.log(this.isStringNum(this.jsonArray[i][1]))
      //   if(!this.isStringNum(this.jsonArray[i][1])){
      //     newBFlag=false
          
      //   }
      // }

    
      // for(  var i=3;i<this.jsonArray.length;i++){
      //   // console.log()
      //   // alert(this.isStringNum(this.jsonArray[i][0]+this.jsonArray[i][0]))
      //   if(!this.isStringNum(this.jsonArray[i][0])) newBFlag=false
      //   if(!this.isStringNum(this.jsonArray[i][1])) newBFlag=false
      // }
for(  var i=0;i<this.jsonArray.length;i++){
  if(!this.isStringNum(this.jsonArray[i][0])&&(!(this.jsonArray[i][0]=='永久'||this.jsonArray[i][0]=='长期'||this.jsonArray[i][0]=='备查'))) newBFlag=false
  if(!this.isStringNum(this.jsonArray[i][1])) newBFlag=false
}
      if(!newBFlag){
                this.$message({
          type: "error",
          message: "除初始三种盒型外只允许填入数字",
        });
        return
      }
                     var jsonToCommit={}   /**将修改提交 jsonArray是数组*/
        for (var i = 0; i < this.jsonArray.length; i++) {
        console.log(this.jsonArray[i][0]);
        jsonToCommit[this.jsonArray[i][0]] = this.jsonArray[i][1];
      }
        console.log(jsonToCommit);

      this.BatchForm.lastBox=jsonToCommit
      window.sessionStorage.setItem("lastBox",JSON.stringify(jsonToCommit))

      var a = { first: "1", second: "2", third: "3", forth: "4", fifth: "5",six:"6" ,seven:"7"};
      let b = this.priority
      // console.log(b)


      for (var key in b) {  //数字作为key ，keyword level 作为value
        var newKey = a[key];  //a[first]
        b[newKey] = b[key];  //b[1]=b[first]
        delete b[key];
      }

      if(this.officialDocTypeSub==2){
         a = { first: "1", second: "2", third: "3", forth: "4", fifth: "5",six:"6" ,seven:"7",eight:"8"};
         b=this.priorityJ
               for (var key in b) {  //数字作为key ，keyword level 作为value
        var newKey = a[key];  //a[first]
        b[newKey] = b[key];  //b[1]=b[first]
        delete b[key];
      }
      }

      // console.log("aaa");
      // console.log(b)
      // b=JSON.stringify(b)
      // console.log("after")
      // console.log(b)

      this.BatchForm.rule = b;

      console.log("batchForm");
      console.log(this.BatchForm);

      sessionStorage.setItem("Batch", this.BatchForm);
      // window.localStorage.setItem("token","12355")

      //新建单位
      // var code = this.BatchForm.authCode;
      // var organObj = {
      //   authName: this.BatchForm.authName,
      //   authCode: this.BatchForm.authCode,
      // };

      // this.postRequest("/organ", JSON.stringify(organObj))
      //   .then((resp) => {
      //     if (resp) {
      //       //新建单位后拿到单位id存入session  （已存在的时候 code=1202 ,data 有问题）
      //       if (resp.code == 1107) {
      //         this.$router.push("/home");
      //       }
      //       if (resp.code == 0) {
      //         window.sessionStorage.setItem("authId", resp.data.id);
      //         window.sessionStorage.setItem("authCode", resp.data.authCode);
      //         window.sessionStorage.setItem(
      //           "docTypeCode",
      //           this.BatchForm.docTypeCode
      //         );
      //         // window.sessionStorage.setItem("authId",this.BatchForm.authId)
      //       }
      //     }
      //   })
      // .then((r) =>

      var docTypetemp = "official";
      if (this.BatchForm.docType == 2) {
        docTypetemp = "science";
      } else if (this.BatchForm.docType == 3) {
        docTypetemp = "personnel";
      } else if (this.BatchForm.docType == 4) {
        docTypetemp = "business";
      }

      if(this.officialDocTypeSub==2){
        docTypetemp="officialJ"  //机构分卷法
      }
      sessionStorage.setItem("docType", docTypetemp);

      var batchobj = {
        authId: sessionStorage.getItem("authId"),
        batchName: this.BatchForm.batchName,
        // rule:JSON.stringify(this.BatchForm.rule),
        // authName:sessionStorage.getItem('authName'),
        docType: docTypetemp,
        docTypeCode: this.BatchForm.docTypeCode,
        rule: this.BatchForm.rule,
        // lastBox:JSON.stringify(this.BatchForm.lastBox)
        end:0,
        doc_number:1,
        lastBox: this.BatchForm.lastBox,
      };
      console.log("提交了organ后提交的批次信息");
      console.log(batchobj);
      this.postRequest(
        //注意防止重复提交
        "/work",
        JSON.stringify(batchobj)
      ).then((resp) => {
        if (resp.data && resp.code == 0) {
          window.sessionStorage.setItem("batchId", resp.data.id);
          this.$router.push("/work/docInput");
        }
      });

      //新建单位
    },

    nextStep() {
//人事 
if(this.BatchForm.docType==3){
{
/**
 * 人事类
 * 先查这个选中单位的权重表
 */
/*

   this.getRequest("/organ/" + sessionStorage.getItem("authId")).then(
      (resp) => {
        this.weightForm = resp.data;
        console.log(resp.data)

      }).then(()=>{
        if(this.weightForm.perSubWig10==null){  
          this.showWaitingFlag=true
          var key1 = '无';
                var json1 = {};
                json1[key1] = "0";
              var rs1 = {
                  authId: sessionStorage.getItem("authId"),
                  type: 50,
                  tables: json1,
                };
        var rs2 = {
                  authId: sessionStorage.getItem("authId"),
                  type: 51,
                  tables: json1,
                };
                


                                var rs3 = {
                  authId: sessionStorage.getItem("authId"),
                  type: 52,
                  tables: json1,
                };
                

  var key41 = '学历学位材料';
                var json4 = {};
                json4[key41] = "2";
                 var key42 = '职称材料';
                           json4[key42] = "1";

                                                  var rs4 = {
                  authId: sessionStorage.getItem("authId"),
                  type: 53,
                  tables: json4,
                };
            


                  
                                var rs5 = {
                  authId: sessionStorage.getItem("authId"),
                  type: 54,
                  tables: json1,
                };
      


                                var rs6 = {
                  authId: sessionStorage.getItem("authId"),
                  type: 55,
                  tables: json1,
                };
 


                                var rs7 = {
                  authId: sessionStorage.getItem("authId"),
                  type: 56,
                  tables: json1,
                };
        

                  
                                var rs8 = {
                  authId: sessionStorage.getItem("authId"),
                  type: 57,
                  tables: json1,
                };
    

                                                  var rs0 = {
                  authId: sessionStorage.getItem("authId"),
                  type: 59,
                  tables: json1,
                };
      



var key91 = '工资情况材料';
                var json9 = {};
                json9[key91] = "9";
                 var key92 = '任免材料';
                           json9[key92] = "8";

                                            var key93 = '出国、出境材料';
                           json9[key93] = "7";
                                            var key94 = '各党派、团体代表登记表';
                           json9[key94] = "6";
                                            var key95 = '聘用、录用、转干、转业材料';
                           json9[key95] = "5";
                                                                       var key96 = '待遇、退（离）休、退职材料';
                           json9[key96] = "4";
                  
                                var rs9 = {
                  authId: sessionStorage.getItem("authId"),
                  type: 58,
                  tables: json9,
                };
  

                
                  this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(rs1)
                )
                  .then((resp) => {
   this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(rs2)
                )
                  .then((resp) => {
  this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(rs3)
                )
                  .then((resp) => {
       this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(rs4)
                )
                  .then((resp) => {
             this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(rs5)
                )
                  .then((resp) => {
                               this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(rs6)
                )
                  .then((resp) => {
           this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(rs7)
                )
                  .then((resp) => {
                                this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(rs8)
                )
                  .then((resp) => {
                               this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(rs0)
                )
                  .then((resp) => {
                 this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(rs9)
                )
                  .then((resp) => {
                    console.log("批次时提交子材料9");
                    console.log(resp);





                  })
                  })
                  })
                  })
                  })
                  })

                  })
                  })
                  })

                  })


 
 
      

        }
      })


*/
}
         var docTypetemp = "science";
      if (this.BatchForm.docType == 1) {
        docTypetemp = "official";
        if(this.officialDocTypeSub==2){//机构法
        docTypetemp = "officialJ"
        }
      } else if (this.BatchForm.docType == 3) {
        docTypetemp = "personnel";
      } else if (this.BatchForm.docType == 4) {
        docTypetemp = "business";
      }


      this.BatchForm.priority=this.uploadpriority
            var a = { first: "1", second: "2", third: "3", forth: "4", fifth: "5" ,six:"6",seven:"7"};
            let b = this.BatchForm.priority;
      for (var key in b) {
        var newKey = a[key];
        b[newKey] = b[key];
        delete b[key];
      }

      // if(this.docTypetemp=="officialJ"){
      //         this.BatchForm.priority=this.uploadpriorityJ
      //        a = { first: "1", second: "2", third: "3", forth: "4", fifth: "5" ,six:"6",seven:"7",eight:"8"};
      //        b = this.BatchForm.priority;
      // for (var key in b) {
      //   var newKey = a[key];
      //   b[newKey] = b[key];
      //   delete b[key];
      // }

      // }
 
      this.BatchForm.rule = b;

      sessionStorage.setItem("docType", docTypetemp);

          var batchobj = {
        authId: sessionStorage.getItem("authId"),
        batchName: this.BatchForm.batchName,
        // rule:JSON.stringify(this.BatchForm.rule),
        // authName:sessionStorage.getItem('authName'),
        docType: docTypetemp,
        docTypeCode: this.BatchForm.docTypeCode,
        rule: this.BatchForm.rule,
        doc_number:1,

        // lastBox:JSON.stringify(this.BatchForm.lastBox)
        // lastBox: this.BatchForm.lastBox,
      };
      console.log("人事提交的批次信息");
      console.log(batchobj);
      this.postRequest(
        //注意防止重复提交
        "/work",
        JSON.stringify(batchobj)
      ).then((resp) => {
        if (resp.data && resp.code == 0) {
          window.sessionStorage.setItem("batchId", resp.data.id);
        }else{
          return
        }
      }).then(
        ()=>{


                 
          this.$router.push("/work/docInput");


      });
  return
      }
 
//等待一个带有异步的函数办法就是 在async函数里面 await这个异步promise
this.can=this.validateForm1()
if(this.can){ //再验证code和单位名是否匹配
  var that=this
  const checkp=async function(){
  that.can=await that.checkOrganPromise()
        if (that.can) {
        that.BatchForm.priority = that.uploadpriority;
        if (that.step == 1) that.step++;
      }

      if(that.weightForm.officialType==0&&that.BatchForm.docType==1){ //到step2
        console.log("文书第一次")
      }else
      {
        that.step++ //到step3
      }
      that.showWaitingFlag=false
}
checkp()
}


    },

    checkOrganPromise(){
        var code = this.BatchForm.authCode;
      var organObj = {
        authName: this.BatchForm.authName,
        authCode: this.BatchForm.authCode,
      };
 
var that=this
   
        return  new Promise((resolve, reject)=>{
                    that.postRequest("/organ", JSON.stringify(organObj)).then((resp) => {
        if (resp) {
          //新建单位后拿到单位id存入session  （已存在的时候 code=1202 ,data 有问题）
          if (resp.code == 1201) {
            that.getRequest("/organ/" + resp.data).then((resp) => {
              console.log("单位名重复后")
              console.log(resp);
              if (
                resp.code == 0 &&
                resp.data.authName == that.BatchForm.authName &&
                resp.data.authCode == that.BatchForm.authCode
              ) {
                // alert('ok')
                window.sessionStorage.setItem("authId",resp.data.id);
            window.sessionStorage.setItem('authName',resp.data.authName)
            that.weightForm=resp.data

                window.sessionStorage.setItem(
                  "authCode",
                  that.BatchForm.authCode
                );
                window.sessionStorage.setItem(
                  "docTypeCode",
                  that.BatchForm.docTypeCode
                );
 resolve(true)
                // alert("zq")
                // can=true
                // alert(1)
                // return 
              } else {
                 resolve(false)
                that.$message({
                  type: "error",
                  message: "单位名已存在，若重复请前往管理",
                });
                // alert(this.BatchForm.authCode);

               
              }
            });
          } //1201
          else if (resp.code == 1202) {
            that.getRequest("/organ/" + resp.data).then((resp) => {
              console.log(resp);
              if (
                resp.code == 0 &&
                resp.data.authName == that.BatchForm.authName &&
                resp.data.authCode == that.BatchForm.authCode
              ) {
                that.can=true
            window.sessionStorage.setItem('authName',resp.data.authName)

                window.sessionStorage.setItem("authId", resp.data.id);
                 that.weightForm=resp.data
                 
                window.sessionStorage.setItem(
                  "authCode",
                  that.BatchForm.authCode
                );
                window.sessionStorage.setItem(
                  "docTypeCode",
                  that.BatchForm.docTypeCode
                );
                // alert
                 resolve(true)
                // return true;
              } else {
                that.$message({
                  type: "error",
                  message: "单位代码已存在，若重复请前往管理",
                });
                // return false
                resolve(false)
              }
            });
          }
          else if (resp.code == 0) {
            // alert('code=0')
            window.sessionStorage.setItem("authId", resp.data.id);
            window.sessionStorage.setItem('authName',resp.data.authName)

            window.sessionStorage.setItem("authCode", resp.data.authCode);
            window.sessionStorage.setItem(
              "docTypeCode",
              that.BatchForm.docTypeCode
            );
            this.weightForm=resp.data
            resolve(true)
            // return true
            // window.sessionStorage.setItem("authId",this.BatchForm.authId)
          }
        }
        else resolve(false)
         })
       

   })
       

    },

    testAc(){
var that=this
                async function test(){
that.kk="yuanlai"
console.log(that.kk)
      that.kk=await new Promise((resolve, reject)=>{
        setTimeout(function(){
          that.kk="3秒后变"
           resolve(that.kk)
        }, 3000)
   })
console.log(that.kk)
    }

test()

    },

   validateForm1() {
      // return false
      this.can = true;
      if (this.BatchForm.authName == "") {
        this.can = false;
        this.$message({
          type: "error",
          message: "请填写完整",
        });
        return false;
      }
      if (this.BatchForm.docType == "") {
        this.can = false;
        this.$message({
          type: "error",
          message: "请填写完整",
        });
        return false;
      }

      return this.can
    

// return checkOrganRepeat()

{
      // this.postRequest("/organ", JSON.stringify(organObj)).then((resp) => {
      //   if (resp) {
      //     //新建单位后拿到单位id存入session  （已存在的时候 code=1202 ,data 有问题）
      //     if (resp.code == 1201) {
      //       this.getRequest("/organ/" + resp.data).then((resp) => {
      //         console.log("单位名重复后")
      //         console.log(resp);
      //         if (
      //           resp.code == 0 &&
      //           resp.data.authName == this.BatchForm.authName &&
      //           resp.data.authCode == this.BatchForm.authCode
      //         ) {
      //           // alert('ok')
      //           window.sessionStorage.setItem("authId",resp.data.id);
      //       window.sessionStorage.setItem('authName',resp.data.authName)

      //           window.sessionStorage.setItem(
      //             "authCode",
      //             this.BatchForm.authCode
      //           );
      //           window.sessionStorage.setItem(
      //             "docTypeCode",
      //             this.BatchForm.docTypeCode
      //           );
      //           // alert("zq")
      //           // can=true
      //           // alert(1)
      //           // return 
      //         } else {
      //           this.$message({
      //             type: "error",
      //             message: "单位名已存在，若重复请前往管理",
      //           });
      //           // alert(this.BatchForm.authCode);

      //           this.can=false
      //         }
      //       });
      //     } //1201
      //     else if (resp.code == 1202) {
      //       this.getRequest("/organ/" + resp.data).then((resp) => {
      //         console.log(resp);
      //         if (
      //           resp.code == 0 &&
      //           resp.data.authName == this.BatchForm.authName &&
      //           resp.data.authCode == this.BatchForm.authCode
      //         ) {
      //           this.can=true
      //       window.sessionStorage.setItem('authName',resp.data.authName)

      //           window.sessionStorage.setItem("authId", resp.data.id);
      //           window.sessionStorage.setItem(
      //             "authCode",
      //             this.BatchForm.authCode
      //           );
      //           window.sessionStorage.setItem(
      //             "docTypeCode",
      //             this.BatchForm.docTypeCode
      //           );
      //           // alert
      //           // return true;
      //         } else {
      //           this.$message({
      //             type: "error",
      //             message: "单位代码已存在，若重复请前往管理",
      //           });
      //           // return false
      //           this.can=false
      //         }
      //       });
      //     }
      //     else if (resp.code == 0) {
      //       // alert('code=0')
      //       window.sessionStorage.setItem("authId", resp.data.id);
      //       window.sessionStorage.setItem('authName',resp.data.authName)

      //       window.sessionStorage.setItem("authCode", resp.data.authCode);
      //       window.sessionStorage.setItem(
      //         "docTypeCode",
      //         this.BatchForm.docTypeCode
      //       );
      //       // return true
      //       // window.sessionStorage.setItem("authId",this.BatchForm.authId)
      //     }
      //   }
      // }).then(()=>{
      //         setTimeout(function () {
      //   // alert(this.can+'632')
      //   return this.can
      // },1000)
      // })
   }

   
    },

    preStep() {

       if(this.weightForm.officialType==0&&this.BatchForm.docType==1&&this.step==3){
        console.log("文书第一次,prestep")
        this.step--
        return
      }else if(this.step==3){
        this.step=1
        return
      }
    this.step--

    },

    conver(s) {
      return s < 10 ? "0" + s : s;
    },

    selectAuthChange(id) {
      var name = {};
      name = this.historyAuths.find((item) => {
        //在历史记录里有这项选中的话就返回obj
        return item.authCode == id;
      });
      window.sessionStorage.setItem("authId", name.id);
      console.log(name);

      name = name.authName; //obj的lable
      this.BatchForm.authName = name;
      var tempId = JSON.stringify(id);
      while (tempId.length < 5) {
        tempId = "0" + tempId;
      }
      this.BatchForm.authCode = tempId;
    },

    selectBlur(e) {

      var inputAuth = e.target.value;
      this.BatchForm.authName = inputAuth;

    },
    priorityChange() {
      //自定义优先级
      //权限接口，定制规则
      this.$message.warning("定制排档案规则请联系管理员");
      return
      this.showPriority = !this.showPriority;
    },
  },
};
</script>

<style lang="scss">


.searchForm{
   position: relative;
  /* padding: 15px 35px 15px 35px; */
  top: 4rem;
  background: rgba(255, 255, 255, 0) !important;

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
    padding: 0 0.8rem 0 0 !important;
    font-size: 1rem !important;
  }
  .el-form-item__content {
    height: 3rem !important;
  }
  .textInput {
    width: 70%;
  }

}



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
// .midBtn {
//   width: 6rem;
//   left: 50%;
//   margin-left: -3rem;
//   position: relative;
// }
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
  background-color: rgb(255, 255, 255);


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

  .organModify {
    border-radius: 0.5rem;
    position: absolute;
    width: 10%;
    top: 3.6rem;
    right: 3.8rem;
    text-align: center;
    border: solid 0.1rem;
    z-index: 999;
  }
}

.organModify:hover {
  cursor: pointer;
  color: #476bb3d8;
  z-index: 999;
  border: solid 0.1rem;
  border-color: rgb(33, 63, 163);
}
</style>