<template>
  <div class="outbox">
    <div style="position: relative" class="wrapper">
      <div
        style="
          position: absolute;
          width: 20rem;
          height: 10rem;
          top: 10rem;
          left: 50%;
          margin-left: -10rem;
          line-height: 10rem;
          background-color: rgba(25, 55, 163, 0.8);
          font-size: 1.3rem;
          color: white;
          text-align: center;
          z-index: 1000;
        "
        v-if="showWaitingFlag"
      >
        请求中，请稍候...
      </div>
      <div
        class="topTextButton"
        style="position: absolute; top: 7.5rem; right: 20rem; z-index: 123"
        v-if="selectShow"
        @click="backToOrgans"
      >
        返回单位表
      </div>

      <div
        class="topTextButton"
        style="position: absolute; top: 7.5rem; right: 20rem; z-index: 123"
        v-if="backToDocAboutShow"
        @click="backToDocAbout"
      >
        返回
      </div>

      <div
        class="topTextButton"
        style="position: absolute; top: 7.5rem; right: 20rem; z-index: 123"
        v-if="!selectShow && !backToDocAboutShow"
        @click="backToSelect"
      >
        &nbsp; 返回 &nbsp;
      </div>
      <div style="height: 4.5rem"></div>

      <div
        v-if="!selectShow && !backToDocAboutShow"
        style="
          position: absolute;
          top: 6rem;
          font-size: 1.5rem;
          width: 100%;
          text-align: center;
        "
      >
        优先级规则
      </div>

      <div
        v-if="selectShow"
        style="
          position: absolute;
          top: 6rem;
          font-size: 1.5rem;
          width: 100%;
          text-align: center;
        "
      >
        选择设置优先级规则
      </div>

      <div
        v-if="backToDocAboutShow"
        style="
          position: absolute;
          top: 6rem;
          font-size: 1.5rem;
          width: 100%;
          text-align: center;
        "
      >
        {{ true ? this.deepInThisDocAbout : authName }}-优先级规则设置
      </div>

      <div
        v-if="showKVFix"
        style="
          position: absolute;
          top: 40vh;
          left: 50%;
          margin-left: -15rem;
          z-index: 122;
          padding-top: 1rem;
          color: #333;
          font-size: 1.5rem;
          width: 30rem;
          height: 10rem;
          background-color: rgb(209, 218, 243);
          -webkit-box-shadow: 0 0 0.5rem #909399;
          box-shadow: 0 0 0.5rem #909399;
          border-radius: 1rem;
        "
      >
        <div
          style="
            font-size: 1rem;
            width: 20rem;
            text-align: center;
            margin-left: 5rem;
            color: #333;
          "
        >
          请输入词的大小
        </div>
        <input
          type="text"
          style="
            height: 1.5rem;
            margin-left: 6rem;
            margin-top: 2rem;
            width: 7rem;
          "
          disabled="true"
          v-model="keyToFix"
        />&nbsp;&nbsp;&nbsp;:
        <input
          type="text"
          style="height: 1.5rem; margin-left: 1rem; width: 7rem"
          v-model="valueToFix"
        />
        <div
          class="textButton"
          @click="clearKV"
          style="position: absolute; left: 5rem; color: #333"
        >
          取消
        </div>
        <div  @click="fixTheKV" style="color: #333 ;cursor:pointer;position:absolute; margin-top: 1.5rem;
 
  font-size: 1.2rem;
  margin-left: 10rem;">确定</div>
      </div>
<!--  -->
            <div
        v-if="selectRsDAFlag"
        style="
          position: absolute;
          top: 40vh;
          left: 50%;
          margin-left: -15rem;
          z-index: 122;
          padding-top: 1rem;
          color: #333;
          font-size: 1.5rem;
          width: 30rem;
          height: 10rem;
          background-color: rgb(209, 218, 243);
          -webkit-box-shadow: 0 0 0.5rem #909399;
          box-shadow: 0 0 0.5rem #909399;
          border-radius: 1rem;
        "
      >
        <div
          style="
            font-size: 1rem;
            width: 20rem;
            text-align: center;
            margin-left: 5rem;
            color: #333;
          "
        >
          请选择词对应的材料类别
        </div>
        <input
          type="text"
          style="
            height: 1.5rem;
            margin-left: 6rem;
            margin-top: 2rem;
            width: 7rem;
          "
           disabled="true"
          v-model="keyToSet"
        />&nbsp;&nbsp;&nbsp;:
        <!-- <input
          type="text"
          style="height: 1.5rem; margin-left: 1rem; width: 7rem"
          v-model="valueToSet"
          
        /> -->
        <select v-model="valueToSet" name="" id="" style="height: 2rem; margin-left: 1rem; width: 9rem">
  <option value ="1">履历材料</option>
  <option value="2">自传材料</option>
  <option value="3">鉴定、考核、考察材料</option>
  <option value="4">学历学位材料</option>
  <option value="5">职称材料</option>
  <option value="6">政治历史情况审查材料</option>
  <option value="7">入党入团材料</option>
  <option value="8">奖励材料</option>
  <option value="9">处分材料</option>
  <option value="10">工资情况材料</option>
  <option value="11">任免材料</option>
  <option value="12">出国、出境材料</option>
  <option value="13">各党派、团体代表登记表</option>
  <option value="14">聘用、录用、转干、转业材料</option>
  <option value="15">待遇、退（离）休、退职材料</option>
  <option value="16">其他可供参考的材料</option>

        </select>
        <div
          class="textButton"
          @click="clearRsSet"
          style="position: absolute; left: 5rem; color: #333"
        >
          取消
        </div>

        <div  @click="doPresetRs" style="color: #333 ;cursor:pointer;position:absolute; margin-top: 1.5rem;
 
  font-size: 1.2rem;
  margin-left: 10rem;">确定</div>
      </div>


      <div
        v-if="showKVPreset"
        style="
          position: absolute;
          top: 40vh;
          left: 50%;
          margin-left: -15rem;
          z-index: 122;
          padding-top: 1rem;
          color: #333;
          font-size: 1.5rem;
          width: 30rem;
          height: 10rem;
          background-color: rgb(209, 218, 243);
          -webkit-box-shadow: 0 0 0.5rem #909399;
          box-shadow: 0 0 0.5rem #909399;
          border-radius: 1rem;
        "
      >
        <div
          style="
            font-size: 1rem;
            width: 20rem;
            text-align: center;
            margin-left: 5rem;
            color: #333;
          "
        >
          请输入词和优先级的大小
        </div>
        <input
          type="text"
          style="
            height: 1.5rem;
            margin-left: 6rem;
            margin-top: 2rem;
            width: 7rem;
          "
          v-model="keyToSet"
        />&nbsp;&nbsp;&nbsp;:
        <input
          type="text"
          style="height: 1.5rem; margin-left: 1rem; width: 7rem"
          v-model="valueToSet"
        />
        <div
          class="textButton"
          @click="clearPreset"
          style="position: absolute; left: 5rem; color: #333"
        >
          取消
        </div>

        <div  @click="doPreset" style="color: #333 ;cursor:pointer;position:absolute; margin-top: 1.5rem;
 
  font-size: 1.2rem;
  margin-left: 10rem;">确定</div>
      </div>

      <div class="typeSelect" v-if="selectShow">
        <div style="width: 3rem; height: 2rem"></div>

        <div class="selectItem" @click="checkFromThisType(11)">
          文书类档案问题(机构)优先级设置
        </div>
        <div class="selectItem" @click="checkFromThisType(12)">
          文书类档案责任者优先级设置
        </div>
        <!-- <div class="selectItem" @click="checkFromThisType(13)">
          文书类档案关键词优先级设置
        </div> -->
        <div class="selectItem" @click="checkFromThisType(21)">
          科技类档案项目优先级设置
        </div>
        <div class="selectItem" @click="checkFromThisType(22)">
          科技类档案责任者优先级设置
        </div>
        <!-- <div class="selectItem" @click="checkFromThisType(23)">
          科技类档案关键词优先级设置
        </div> -->
        <div class="selectItem" @click="checkFromThisType(31)">
          业务类档案问题优先级设置
        </div>
        <div class="selectItem" @click="checkFromThisType(32)">
          业务类档案责任者优先级设置
        </div>
        <!-- <div class="selectItem" @click="checkFromThisType(33)">
          业务类档案关键词优先级设置
        </div> -->
        <div class="selectItem" @click="checkFromThisType(41)">
          人事类档案关键词优先级设置
        </div>

        <div style="clear: both"></div>
        <div style="width: 3rem; height: 2rem"></div>
      </div>
      <!-- 选择类型 -->

      <div class="keyValueBox" @click="boxClick" v-if="!selectShow">
        <div
          style="
            position: absolute;
            right: 0;
            top: -0;
            font-weight: 700;
            right: 2rem;
            cursor: pointer;
            line-height: 2rem;
          "
          @click="preSetButton"
        >
          点击预设优先级
        </div>
        <div class="keyValueItem infoItemHighlight">
          <div class="keyValueInfo" style="border: none; position: relative">
            优先级(越大越靠前）
            <el-button
              @click="saveKeyValue"
              type="success"
              class="kvButton"
              style="position: absolute; right: 2rem"
              v-if="saveBtnShow"
              >保存修改</el-button
            >
          </div>
          <div class="keyValueInfo" style="border: none">词</div>

          <div class="keyValueInfo" style="border: none">操作</div>
        </div>

        <div
          class="keyValueItem infoItemHighlight"
          style="z-index=99"
          v-for="(item, index) in jsonTable"
          :key="index"
          draggable="false"
        >
          <div
            v-bind:class="[{ keyValueInfo: true }, { hideText: false }]"
            style="border: none"
          >
            {{ item[1] }}
          </div>
          <div class="keyValueInfo" style="border: none">{{ item[0] }}</div>

          <div
            v-bind:class="[{ keyValueInfo: true }, { hideText: true }]"
            style="border: none"
            v-if="false"
          >
            {{ item.tables | formatKeyWordValue }}
          </div>

          <div style="width: 0; position: absolute">{{ item.id }}</div>
          <el-button
            type="success"
            class="kvButton"
            @click="upClick($event, item)"
            style="margin-left: 6rem"
            >上调</el-button
          >
          <el-button
            type="warning"
            class="kvButton"
            @click="downClick($event, item)"
            >下调</el-button
          >
          <el-button
            type="danger"
            class="kvButton"
            @click="deleteKV($event, item)"
            >删除</el-button
          >
          <el-button
            type="primary"
            class="kvButton"
            @click="fixKv($event, item)"
            v-if="!saveBtnShow"
            >修改值</el-button
          >

          <el-button
            type=""
            class="kvButton"
            @click="thisDocAbout($event, item)"
            v-if="!saveBtnShow && showKeyWord && !backToDocAboutShow"
            >关键词对应表</el-button
          >
          
          <el-button
            type=""
            class="kvButton"
            @click="rsKeywordToDocAbout($event, item)"
            v-if="rsKeywordPage"
            >设置对应材料类别</el-button
          >
          

          <!-- <div style="float:left;width:2rem;background-color:red;height:1.5rem">1</div> -->
        </div>

        <div style="clear: both"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import messageVue from '../chat/message.vue';


export default {
  computed: {
    user() {
      //   return this.$store.state.user;
    },
    rsKeywordPage(){
return this.tableTypeNum == 41
    },
    showKeyWord() {
      return (
        this.tableTypeNum == 11 ||
        this.tableTypeNum == 21 ||
        this.tableTypeNum == 31 
        
      );
    },
  },

  created() {
    window.scrollTo(0,0)
    var js = {};
    var k = 3;
    js["3"] == 2 ? 1 : 2;
    console.log(js);

    // return
    this.showWaitingFlag = true;

    this.getRequest("/organ/" + sessionStorage.getItem("authId")).then(
      (resp) => {
        this.weightForm = resp.data;
        this.authName = resp.data.authName;
        console.log("加载keyWM页面时某个特定单位的权重表对应的id");
        if (this.weightForm) {
          this.showWaitingFlag = false;
        }
        console.log(this.weightForm);
      }
    );

    // var json3 = {};

    // console.log(json3);
    // let attr;
    // for (attr in json3) {
    //   this.jsonTable.push([attr, json3[attr]]);
    // }
    // console.log(this.jsonTable);
  },
  methods: {
    clearRsSet(){
        this.selectRsDAFlag=false
    },
    rsKeywordToDocAbout(e,item){
      this.keyToSet=item[0]
      this.selectRsDAFlag=true
    },
    getKwTypeNum() {
      if (this.typeNum == 11) {
        return 13;
      }
      if (this.typeNum == 21) {
        return 23;
      }
      if (this.typeNum == 31) {
        return 33;
      }
      if(this.typeNum==41) return 41
      
    },

    
        thisDocAbout(e, item) {
          this.showWaitingFlag = true;
this.deepInThisDocAbout = item[0];
   this.backToDocAboutShow = true;

   var keywordJson
   var keywordIssueJson
var that=this
Promise.all([
  new Promise((resolve,reject)=>{
      that.getRequest("/weight/keywordSort/" + that.keywordWigId).then((resp)=>{
        keywordJson=resp.data.tables
        keywordIssueJson=resp.data.keywordIssue
        resolve(resp)
  })
  }),

    new Promise((resolve,reject)=>{
  that.getRequest(
        "/weight/map/about/" + that.requestWigId + "?word=" + item[0]
      ).then((resp)=>{
        resolve(resp)
  })
  }),

]).then((resp)=>{
          console.log("按问题查关键词数组");
        console.log(resp[1]);
        if (resp[1].data == null) {
          this.jsonTable = [];
          this.$message({
            type: "warning",
            message: "还没有关键词表，点击预设",
          });
          this.showWaitingFlag = false;
          return;
        }
                var kwArr = resp[1].data;
        this.keywordArrFromIssue = kwArr;

      this.keywordTable = resp[0].data.tables;
      this.keywordIssueTable = resp[0].data.keywordIssue;
      console.log(this.keywordTable)
      
       var attr;
        this.jsonTable = [];
        console.log(this.keywordTable)

        // this.keywordTable=JSON.parse(this.keywordTable)
        // console.log(this.keywordTable)

        for (attr in this.keywordTable) {
          console.log("搜索关键词权重数组的" + attr);
          if (kwArr.indexOf(attr) >= 0) {
            // console.log("you");
            // this.jsonTable=[]
            this.jsonTable.push([attr, this.keywordTable[attr]]);
          } //问题对应的关键词数组含有
        }
        console.log(this.jsonTable);
        for(var i=0;i<this.jsonTable.length;i++){
          this.jsonTable[i][1]=this.jsonTable.length-i
        }
        
    for (var i = 0; i < this.jsonTable.length; i++) {
        // console.log(this.jsonTable[i][0]);
        this.keywordTable[this.jsonTable[i][0]]=this.jsonTable[i][1]
      }
                var kvObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: this.getKwTypeNum(),
                  tables: keywordJson,
                  keywordIssue: keywordIssueJson,
                };

      
                      this.putRequest("/weight/" + this.keywordWigId, kvObj).then(
                  (resp) => {
                   
                    console.log("更新预设kv权重表数字排序");
                    console.log(resp);

                  }
                );
        
          
}).then(()=>{
  this.showWaitingFlag = false;
})

 
        },
    thisDocAbout1(e, item) {
      this.getRequest("/weight/keywordSort/" + this.keywordWigId).then((resp) => {
        //预加载关键词列表 删除的时候可用
        this.keywordTable = resp.data.tables;
        this.keywordIssueTable = resp.data.keywordIssue;
      });

      this.showWaitingFlag = true;
      // this.selectShow=false
      // console.log(item[0])
      this.deepInThisDocAbout = item[0];
      // 查问题的关键词数组 1111
      this.getRequest(
        "/weight/map/about/" + this.requestWigId + "?word=" + item[0]
      )
      .then((resp) => {
        console.log("按问题查关键词数组");

        console.log(resp);
        if (resp.data == null) {
          this.jsonTable = [];
          this.$message({
            type: "warning",
            message: "还没有关键词表，点击预设",
          });
          this.showWaitingFlag = false;
          return;
        }

        var kwArr = resp.data;
        
        this.keywordArrFromIssue = kwArr;

        var attr;
        this.jsonTable = [];
        for (attr in this.keywordTable) {
          console.log("搜索关键词权重数组的" + attr);
          if (kwArr.indexOf(attr) >= 0) {
            console.log("you");
            // this.jsonTable=[]
            this.jsonTable.push([attr, this.keywordTable[attr]]);
          } //问题对应的关键词数组含有
        }
        console.log(this.jsonTable);
        this.showWaitingFlag = false;
      });
   this.backToDocAboutShow = true;
      // axios.get(this.baseurl+"weight/map/about/"+this.requestWigId, {
      //           headers:{
      //     'Content-Type': 'application/json',
      //     'authId':sessionStorage.getItem('authId'),
      //     token:localStorage.getItem('token')?(localStorage.getItem('token').split('"')[1]||localStorage.getItem('token')):null,

      //           },
      //           params:{
      //             word:"填写"
      //           }

      //       })

   
    },
    backToDocAbout() {
      this.saveBtnShow=false
      this.jsonTable=this.level1JsonTable
      this.backToDocAboutShow=false
      // this.checkFromThisType(this.tableTypeNum);
    },
    backToOrgans() {
      this.$router.push("/work/modifyOrgan");
    },
    backToSelect() {
      this.saveBtnShow = false;
      this.selectShow = true;
    },
    clearKV() {
      this.keyToFix = "";
      this.valueToFix = "";
      this.showKVFix = false;
    },

    clearPreset() {
      this.keyToSet = "";
      this.valueToSet = "";
      this.showKVPreset = false;
    },
    isNumber(value) {
      if (isNaN(value)) {
        return false;
      } else {
        return true;
      }
    },

    addKeyWordToArr() {},
    doPresetRs(){
                    this.selectRsDAFlag=false

                  this.getRequest("/weight/keywordSort/" + this.requestWigId).then((resp) => {
                //获取关键词权重表
                var keywordJson = resp.data.tables;
                var keywordIssueJson = resp.data.keywordIssue;
                // if (keywordIssueJson[this.keyToSet] == null) {
                //   keywordIssueJson[this.keyToSet] = JSON.stringify(this.valueToSet);
                // } 
                console.log("设置的材料类型")

                console.log(this.valueToSet)
                  keywordIssueJson[this.keyToSet] = this.valueToSet

                // else if (
                //   keywordIssueJson[this.keyToSet]
                //     .split("|")
                //     .indexOf(this.rsDocAbout) < 0
                // ) {
                //   //不包含该问题
                //   keywordIssueJson[this.keyToSet] =
                //     keywordIssueJson[this.keyToSet] +
                //     "|" +
                //     this.rsDocAbout;
                // }

 
                var kvObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: this.getKwTypeNum(),
                  tables: keywordJson,
                  issueKeyword:{},
                  keywordIssue: keywordIssueJson,
                };
                this.putRequest("/weight/" + this.requestWigId, kvObj).then(
                  (resp) => {
                    console.log(kvObj);
                    console.log("更新rs预设kv权重表");
                    console.log(resp);
         
                    this.checkFromThisType(41)
                  }
                );
              });
    },

    doPresetSub(){
           {
        if (this.backToDocAboutShow) {  //添加一个关键词 需要：
        //问题权重表：问题对应的关键词数组push
        //关键词权重表： 关键词 kv存， 关键词对应的问题存

          //zai 问题对应关键词页面
          var docAboutTable;
          this.getRequest("/weight/" + this.requestWigId)
            .then((resp) => {
              //问题列表、问题—关键词数组列表1
              docAboutTable = resp.data.tables;
              this.issueKeywordTable = resp.data.issueKeyword;  
              console.log(this.issueKeywordTable); //不同问题对应的关键词数组
              console.log(this.issueKeywordTable[this.deepInThisDocAbout]);

              if (this.issueKeywordTable[this.deepInThisDocAbout] == null) {
                this.issueKeywordTable[this.deepInThisDocAbout] = [];
              }
              if (
                this.issueKeywordTable[this.deepInThisDocAbout].indexOf(
                  this.keyToSet
                ) < 0
              ) {
                //问题对应的关键词列表json，不用判断，肯定有这个问题
                this.issueKeywordTable[this.deepInThisDocAbout].push(
                  this.keyToSet
                );
              }

              var docAboutObj = {
                authId: sessionStorage.getItem("authId"),
                type: this.typeNum,
                tables: docAboutTable,
                issueKeyword: this.issueKeywordTable,
              };

              this.putRequest(
                "/weight/" + this.weightForm.docIssueWig,
                docAboutObj
              ).then((resp) => {
                console.log("更新文书问题权重表");
                console.log(resp);
              });

              /**以上是问题权重表 */

              this.getRequest("/weight/keywordSort/" + this.keywordWigId).then((resp) => {
                //获取关键词权重表
                var keywordJson = resp.data.tables;

                keywordJson[this.keyToSet] = this.valueToSet;
                //**以上是正常添加到权重表 */
                var keywordIssueJson = resp.data.keywordIssue;
                console.log(keywordIssueJson);
                console.log(keywordIssueJson[this.keyToSet]);
                if (keywordIssueJson[this.keyToSet] == null) {
                  keywordIssueJson[this.keyToSet] = this.deepInThisDocAbout;
                } 

                // else if (
                //   keywordIssueJson[this.keyToSet]
                //     .split("|")
                //     .indexOf(this.deepInThisDocAbout) < 0
                // ) {
                //   //不包含该问题
                //   keywordIssueJson[this.keyToSet] =
                //     keywordIssueJson[this.keyToSet] +
                //     "|" +
                //     this.deepInThisDocAbout;
                // }

                keywordJson[this.keyToSet] = this.valueToSet;
                var kvObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: this.getKwTypeNum(),
                  tables: keywordJson,
                  keywordIssue: keywordIssueJson,
                };
                this.putRequest("/weight/" + this.keywordWigId, kvObj).then(
                  (resp) => {
                    console.log(kvObj);
                    console.log("更新预设kv权重表");
                    console.log(resp);
          
                    var e = 1;
                    var tempp = [];
                    tempp.push(this.deepInThisDocAbout); //为了再查一次这个问题
                    this.thisDocAbout(e, tempp);
                  }
                );
              });
            })
            .then(() => {});
        } else {
          //问题和责任者和人事关键词
          var table3;
          var issueKeywordArrJson
          var keywordIssueJson
          this.getRequest("/weight/sort/" + this.requestWigId)
            .then((resp) => {
              //查询对应的权重表得到json
              console.log("添加过，先获取：");
              console.log(resp.data.tables);
              table3 = resp.data.tables;
              if(resp.code==0){
                  var key3 = this.keyToSet;
              // var json1 = table;
              table3[key3] = this.valueToSet;

                 issueKeywordArrJson=resp.data.issueKeyword
                 keywordIssueJson=resp.data.keywordIssue
                 if(keywordIssueJson==null){
                   keywordIssueJson={}
                 }

            if(issueKeywordArrJson[this.keyToSet]==null){
                var arrtemp=[]

                issueKeywordArrJson[this.keyToSet]=arrtemp
              }
 
              }
              else {
                        this.$message({
          type: "warning",
          message: "添加失败",
        });
                return
              }
             
              


            
            })
            .then((r) => {


              var kvObj = {
                authId: sessionStorage.getItem("authId"),
                type: this.typeNum,
                tables: table3,
                issueKeyword: issueKeywordArrJson,
                keywordIssue:keywordIssueJson
              };

              this.putRequest("/weight/" + this.requestWigId, kvObj).then(
                (resp) => {
                  console.log("更新预设kv权重表");
                  console.log(resp);
                  this.renewTable();
                }
              );
            })
            .then((r) => {
              this.showWaitingFlag = false;
              this.showKVPreset = false;
            });
        }
        //添加过这种kv 那么是修改json
      }
    },
    doPreset() {
     

      if (!this.isNumber(this.valueToSet)) {
        this.$message({
          type: "warning",
          message: "优先级只能是数字",
        });
        return;
      }  

 
      
      this.showWaitingFlag = true;
      this.showKVPreset = false;
      // alert(this.valueToSet)
      // alert(this.typeNum)
if(this.backToDocAboutShow){  //关键词重复
         this.getRequest("/weight/keywordSort/" + this.keywordWigId).then((resp) => {
         if(resp.data.tables[this.keyToSet]!=null){
                   this.$message({
          type: "warning",
          message: "关键词已存在,大小为"+resp.data.tables[this.keyToSet]+",问题为："+resp.data.keywordIssue[this.keyToSet],
        });
        
      this.showWaitingFlag = false;

        return;
         }

this.doPresetSub()

       })
}
else{
    this.getRequest("/weight/sort/" + this.requestWigId)
            .then((resp) => {
                       if(resp.data.tables[this.keyToSet]!=null){
                   this.$message({
          type: "warning",
          message: "已存在"+this.keyToSet+",大小为"+resp.data.tables[this.keyToSet],
        });
        
      this.showWaitingFlag = false;

        return;
         }

            })


this.doPresetSub()
}


  //添加过

      // if(){}
    },

    renewTable() {   //问题责任者的刷新
      this.jsonTable = [];
      this.selectShow = false;

       {
        var table;
        this.getRequest("/weight/sort/" + this.requestWigId).then((resp) => {
          //查询对应的权重表得到json
          table = resp.data.tables;
          console.log("刷新table");
          console.log(table);
          let attr;
          this.jsonTable = [];

          for (attr in table) {
            this.jsonTable.push([attr, table[attr]]);
          }
            this.level1JsonTable=this.jsonTable

          // var json1 = table;
        });
      }
    },

    checkFromThisType(num) {
      this.showWaitingFlag = true;
      this.backToDocAboutShow = false;
      // this.ba
      this.jsonTable = [];
      this.tableTypeNum = num;
      // var this.requestWigId
      if (num == 11) {
        this.requestWigId = this.weightForm.docIssueWig;
        this.keywordWigId = this.weightForm.docKeywordWig;
      }
      if (num == 12) {
        this.requestWigId = this.weightForm.docAuthorWig;
      }
      if (num == 13) {
        this.requestWigId = this.weightForm.docKeywordWig;
      }
      if (num == 21) {
        this.requestWigId = this.weightForm.tecProjectWig;
        this.keywordWigId = this.weightForm.tecKeywordWig;
      }
      if (num == 22) {
        this.requestWigId = this.weightForm.tecAuthorWig;
      }
      if (num == 23) {
        this.requestWigId = this.weightForm.tecKeywordWig;
      }
      if (num == 31) {
        this.requestWigId = this.weightForm.busProjectWig;
        this.keywordWigId = this.weightForm.busKeywordWig; //预加载关键词表
      }
      if (num == 32) {
        this.requestWigId = this.weightForm.busAuthorWig;
      }
      if (num == 33) {
        this.requestWigId = this.weightForm.busKeywordWig;
      }
      if (num == 41) {
        this.requestWigId = this.weightForm.perKeywordWig;
         
      }

      this.selectShow = false;
      this.typeNum = num; //选择一种键值进行修改调整 typeNum记录是哪种

 
      if (!this.requestWigId) {
        this.jsonTable = [];
        this.$message({
          type: "warning",
          message: "还没有添加过该类型的档案",
        });
      } else {
        var table;
        this.getRequest("/weight/sort/" + this.requestWigId)
          .then((resp) => {
            //查询对应的权重表得到json
            table = resp.data.tables;
            // this.issueKeywordTable=resp.data.issueKeyword==null?{}:resp.data.issueKeyword;  //关键词对应数组json
            // this.keywordIssueTable=resp.data.keywordIssue==null?{}:resp.data.keywordIssue;
            this.issueTable=resp.data.tables
            this.issueKeywordTable = resp.data.issueKeyword; //问题对应关键词数组json
            // this.keywordIssueTable=resp.data.keywordIssue
      if(num==41){
        console.log(this.issueKeywordTable)
        this.keywordIssueTable=resp.data.keywordIssue
        this.keywordTable=resp.data.tablses
      }

            let attr;
            this.jsonTable = [];

            for (attr in table) {
              this.jsonTable.push([attr, table[attr]]);
            }
            this.level1JsonTable=this.jsonTable  //缓存

            // var json1 = table;
          })
          .then(() => {
            this.showWaitingFlag = false;
          });
      }
    },
    saveKeyValue() {
      console.log("save");

      console.log(this.jsonTable);
      this.submitFixFromQianDuan();
      // var jsonToCommit = {};
      // for (var i = 0; i < this.jsonTable.length; i++) {
      //   console.log(this.jsonTable[i][0]);

      //   jsonToCommit[this.jsonTable[i][0]] = this.jsonTable[i][1];
      // }

      // console.log(jsonToCommit);
      this.saveBtnShow = false;
      //         // console.log(this.keyWordTemp)
      //        var keyValueTable=this.keyWordTemp
      //       this.submitMap.forEach(function(value,key){  //key表示id value表示数组下标
      //   // 　　　console.log(key,value)

      //   // 　var v=value;//第几个
      //           var k=Object.keys(keyValueTable[value].tables)[0]; //词
      //           var v=keyValueTable.length-value; //下标 就是新值
      //           var objLittle={[k]:v}
      //           var obj={
      //             id:key,
      //             tables:objLittle
      //           }
      //           console.log(JSON.stringify(obj))

      // 　　　　　　　　　　});
    },

    // reloadJsonTable(){
    //   if(this.typeNum==11){
    //     this.checkFromThisType();
    //   }
    //   if(this.typeNum){}
    // },
    boxClick(e) {
      // console.log(e)
    },
    changeFlag() {
      this.valueShow = true;
    },
    valueCompute(e) {
      // console.log(e)
      clearInterval(this.timer);
      this.timer = setInterval(this.changeFlag, 2000);
    },
    fixKv(e, item) {
      //按修改值button
      this.showKVFix = true;
      this.keyToFix = item[0];
      this.valueToFix = item[1];

      // this.deleteKV(e,item)
      // alert(this.keyToFix)
      // this.valueToFix=item[1]
    },

    preSetButton() {
      this.showKVPreset = true;
      this.keyToSet='词'
      this.valueToSet='数字'
    },

    fixTheKV() {
      //确定修改
      if (!this.isNumber(this.valueToFix)) {
        this.$message({
          type: "warning",
          message: "优先级只能是数字",
        });
        return;
      }

      var _arr = this.jsonTable;
      var length = _arr.length;

      for (var i = 0; i < length; i++) {
        if (this.jsonTable[i][0] == this.keyToFix) {
          //deleteRequest
          _arr.splice(i, 1); //删除下标为i的元素
          var arrt = [this.keyToFix, this.valueToFix];
          console.log(arrt);
          _arr.splice(i, 0, arrt);
        }
      } //**前端修改 */

      this.submitFixFromQianDuan();
      this.showKVFix = false;
                       
    },

    submitFixFromQianDuan() {
      // alert("tijaio");
      var jsonToCommit = {}; /**将修改提交 jsonTable是数组*/
      for (var i = 0; i < this.jsonTable.length; i++) {
        // console.log(this.jsonTable[i][0]);
        jsonToCommit[this.jsonTable[i][0]] = this.jsonTable[i][1];
      }

if(!this.backToDocAboutShow){  //问题责任者 人事关键词
      var docAboutObj = {
        authId: sessionStorage.getItem("authId"),
        type: this.typeNum,
        id: this.requestWigId,
        tables: jsonToCommit,
        issueKeyword:this.issueKeywordTable,
        keywordIssue:this.keywordIssueTable
      };

      this.putRequest("/weight/" + this.requestWigId, docAboutObj)
        .then((resp) => {
          console.log("修改值的方式更新权重表，类型：" + this.typeNum);
          console.log(resp);
          return resp;
        })
        .then((r) => {
          if (r.code == 0) {
            this.$message({
              type: "warning",
              message: "操作成功",
            });
            this.renewTable();//1
          } else {
            this.$message({
              type: "warning",
              message: "操作失败",
            });

            location.reload();
          }
        });
}  //责任者和问题的提交

else{
for (var i = 0; i < this.jsonTable.length; i++) {  //
        // console.log(this.jsonTable[i][0]);
        if(this.keywordTable[this.jsonTable[i][0]]){
        this.keywordTable[this.jsonTable[i][0]] = this.jsonTable[i][1];
        }
      }
            var kvObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: this.getKwTypeNum(),
                  tables: this.keywordTable,
                  keywordIssue: this.keywordIssueTable,
                };
                this.putRequest("/weight/" + this.keywordWigId, kvObj).then(
                  (resp) => {
                    console.log(kvObj);
                    console.log("调整后，关键词对应的表");
                    console.log(resp);
             
             

                   
                  }
                ).then(()=>{
                     var e = 1;
                    var tempp = [];
                    tempp.push(this.deepInThisDocAbout); //为了再查一次这个问题
                    this.thisDocAbout(e, tempp);
                    
                });
}

    },

    deleteDocAbout(item){
      //进入问题表的时候就已经设置好 this
      //this.issueTable
      //this.issueKeywordTable
      // alert('shanchu')
      this.getRequest(
        "/weight/map/about/" + this.requestWigId + "?word=" + item[0]
      )
      .then((resp) => {
        console.log("按问题查关键词数组 删除某个问题后");
          var kwArr = resp.data;
          if(kwArr==null) {
            kwArr=[]
          }
              this.getRequest("/weight/keywordSort/" + this.keywordWigId).then((resp) => {
        this.keywordTable = resp.data.tables;
 
        this.keywordIssueTable = resp.data.keywordIssue;
      });

 

        var issueToDelete=item[0]

      for(var kwitem in kwArr){
        var stringWithSplit=this.keywordIssueTable[kwArr[kwitem]]
        if(stringWithSplit){
          var keywordIssueStringToArr=stringWithSplit.split('|')
          var indext=keywordIssueStringToArr.indexOf(issueToDelete)
          
          if(indext>-1){  //串中含有
          console.log('含有')
            keywordIssueStringToArr.splice(indext,1)
            stringWithSplit=keywordIssueStringToArr[0]
            for(var i=1;i<keywordIssueStringToArr.length;i++){
              stringWithSplit=stringWithSplit+'|'+keywordIssueStringToArr[i]  //删除后再拼接
            }
          }
          this.keywordIssueTable[kwArr[kwitem]]=stringWithSplit //放回
        } //该关键词有 问题串
        
      }

          var kvObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: this.getKwTypeNum(),
                  tables: this.keywordTable,
                  keywordIssue: this.keywordIssueTable,
                };
                this.putRequest("/weight/" + this.keywordWigId, kvObj).then(
                  (resp) => {
                    console.log(kvObj);
                    console.log("删除问题后，关键词权重表 每一个关键词检查问题串");
                    console.log(resp);
       
       

                   
                  }
                );


        }).then(()=>{
     delete this.issueTable[item[0]]
      delete this.issueKeywordTable[item[0]]
             var issueObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: this.typeNum,
                  tables: this.issueTable,
                  issueKeyword: this.issueKeywordTable,
                };

                this.putRequest(
                  "/weight/" + this.weightForm.docIssueWig,
                  issueObj
                ).then((resp) => {
                  console.log("shanchu问题权重表");
                  console.log(resp);
                  if(resp.code==0){
                              this.$message({
            type: "success",
            message: "删除成功",
          });
                  this.issueKeywordTable=resp.data.issueKeyword
                  this.issueTable=resp.data.tables
        this.jsonTable=[]
                     for (var attr in this.issueTable) {
            this.jsonTable.push([attr, this.issueTable[attr]]);
          }
                  }else{
                        this.$message({
            type: "success",
            message: "删除失败",
          });
                    this.checkFromThisType(this.typeNum)
                  }
                });


        })


 
          

        

    },

    deleteKV(e, item) {
      //删除问题



      var keywordTodelete = {};
      this.$confirm(
        "确定要删除该条不再使用吗，若某批次录入中有该词条可能导致排序失败",
        {
          cancelButtonClass: "btn-custom-cancel",
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          
//问题删除
          if(this.typeNum==11||this.typeNum==21||this.typeNum==31){
        if(this.backToDocAboutShow==false){ //问题责任者
          this.deleteDocAbout(item)
            return
      }
    

}

// alert(2)

          var _arr = this.jsonTable;
          var length = _arr.length;
          // console.log(length)
          for (var i = 0; i < length; i++) {
            if (this.jsonTable[i][0] == item[0]) {
              keywordTodelete = this.jsonTable.splice(i, 1); //删除下标为i的元素  返回的是数组，长度为1
              break; //不break的话会报错，因为外层循环还在继续，数组已经少了一个了
            }
          }



          if (this.backToDocAboutShow) {
            this.showWaitingFlag = true;

            var docAboutTable;
            this.getRequest("/weight/" + this.requestWigId)
              .then((resp) => {
                //问题列表、问题—关键词数组列表1
                docAboutTable = resp.data.tables;
                this.issueKeywordTable = resp.data.issueKeyword;
                var inde = this.issueKeywordTable[
                  this.deepInThisDocAbout
                ].indexOf(item[0]);
                if (inde > -1) {
                  this.issueKeywordTable[this.deepInThisDocAbout].splice(
                    inde,
                    1
                  );
                }
                var issueObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: this.typeNum,
                  tables: docAboutTable,
                  issueKeyword: this.issueKeywordTable,
                };

                this.putRequest(
                  "/weight/" + this.weightForm.docIssueWig,
                  issueObj
                ).then((resp) => {
                  console.log("更新文书问题权重表");
                  console.log(resp);
                });
                return "k"
              })
              .then((resp) => {
                console.log(resp)
                console.log("删除关键字")
                console.log(keywordTodelete[0][0])
                delete this.keywordTable[keywordTodelete[0][0]];  //可能会删除关键词对应其他问题 kkkk
                console.log(this.keywordTable)
                delete this.keywordIssueTable[keywordTodelete[0][0]];

                var kvObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: this.getKwTypeNum(),
                  tables: this.keywordTable,
                  keywordIssue: this.keywordIssueTable,
                };
                this.putRequest("/weight/" + this.keywordWigId, kvObj).then(
                  (resp) => {
                    console.log(kvObj);
                    console.log("删除后更新 预设kv权重表");
                    console.log(resp);
             
                    var e = 1;
                    var tempp = [];
                    tempp.push(this.deepInThisDocAbout); //为了再查一次这个问题
                    this.thisDocAbout(e, tempp);
                  }
                );
              });

            return;
          }

          console.log(this.jsonTable);
          this.submitFixFromQianDuan();
        })
        .catch(() => {
          // alert(a)
        });
    },

    downClick(e, item) {
      // this.valueCompute(e)
      // this.valueShow=false
      this.saveBtnShow = true;
      var _arr = this.jsonTable;
      var length = _arr.length;
      var oldPlace;
      var newPlace;

      for (var i = 0; i < length; i++) {
        if (this.jsonTable[i][0] == item[0]) {
          if (i == length - 1) {
          } else {
            /*往下交换*/
            _arr.splice(i, 1); //删除下标为i的元素
            _arr.splice(i + 1, 0, item);
            /*往下交换*/
            var tempvalue = this.jsonTable[i][1];
            this.jsonTable[i][1] = this.jsonTable[i + 1][1];
            this.jsonTable[i + 1][1] = tempvalue;

            return;
          }
        }
      }
    },
    upClick(e, item) {
      // console.log(this.jsonTable)
      this.saveBtnShow = true;

      var _arr = this.jsonTable;
      var length = _arr.length;
      var oldPlace;
      var newPlace;

      for (var i = 0; i < length; i++) {
        if (this.jsonTable[i][0] == item[0]) {
          if (i == 0) {
            // _arr.shift(); //删除并返回数组的第一个元素
            console.log(1);
          }
          // else if (i == length - 1) {
          //     _arr.pop();  //删除并返回数组的最后一个元素

          // }
          else {
            // var tt=this.jsonTable[i]
            // console.log(tt)
            // this.jsonTable[i]=this.jsonTable[i-1]
            // this.jsonTable[i-1]=tt
            // this.jsonTable=_arr

            _arr.splice(i, 1); //删除下标为i的元素
            _arr.splice(i - 1, 0, item);
            var tempvalue = this.jsonTable[i][1];
            this.jsonTable[i][1] = this.jsonTable[i - 1][1];
            this.jsonTable[i - 1][1] = tempvalue;

            //  /*哪两个改动了加入map*/
            //  var theOtherItem=_arr[i]
            //   oldPlace=i;
            //   newPlace=i-1;

            //   if(!this.submitMap.has(item.id)){
            //     this.submitMap.set(item.id,newPlace)
            //   }else {
            //     this.submitMap.set(item.id,newPlace)
            //   }

            //   this.submitMap.set(theOtherItem.id,oldPlace)
            //   console.log(this.submitMap)
            //  /*哪几个改动了加入map*/

            return;
          }
        }
      }
      // this.keyWordTemp=_arr;
      // console.log(item)
      // var thisEle=e.path[2] //上一个Item条
      // // console.log(thisEle)

      // this.keyWordTemp
      // // console.log(e.path[2])
      // var preEle=e.path[2].previousElementSibling
      // e=preEle;
    },
  },
  data() {
    return {
selectRsDAFlag:false,
      level1JsonTable:[],
      keywordIssueTable: {},
      keywordArrFromIssue: [],
      docAboutWigTable: {},
      deepInThisDocAbout: "", //对哪个问题下的关键词修改
      issueKeywordTable: {}, //问题对应关键词数组json
      issueTable:{},
      tableTypeNum: 11,
      showWaitingFlag: false,
      backToDocAboutShow: false,
      requestWigId: "",
      typeNum: "",
      weightForm: {},
      keyToFix: "",
      valueToFix: "",
      authName: "",

      keyToSet: "",
      valueToSet: "",
      showKVFix: false,
      showKVPreset: false,
      saveBtnShow: false,
      submitMap: new Map(),
      valueShow: true,
      timer: "",
      selectShow: true,

      jsonTable: [],
      keywordTable: "",
      keywordWigId: 1,

      keyWordTemp: [
        {
          id: 1,
          tables: { 问题: "" }, //可能
        },
        {
          id: 2,
          tables: { 责任者1: "4" },
        },
        {
          id: 3,
          tables: { key3: "3" },
        },
        {
          id: 4,
          tables: { 财经类: "2" },
        },
        {
          id: 5,
          tables: { 关键字22: "1" },
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.infoItemHighlight:hover{
  background-color: rgba(210, 216, 228, 0.733);
}


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
  .hoverStyle:hover {
    // margin-left: 22rem;
    color: rgba(29, 30, 32, 0.733);
    cursor: pointer;
    z-index: 9999;
  }
}
</style>

<style lang="scss" scoped>
.hoverStyle:hover {
  // margin-left: 22rem;
  color: rgba(29, 30, 32, 0.733);
  cursor: pointer;
  z-index: 9999;
}
.textButton {
  margin-top: 1.5rem;
  color: rgb(227, 229, 236);
  font-size: 1.2rem;
  margin-left: 10rem;
  // float:left
}

.textButton:hover {
  cursor: pointer;
}
.hideText {
  color: rgba(204, 166, 43, 0);
}

.kvButton {
  margin-top: 0.2rem;
  // width: 2rem;
  height: 1.6rem;
  // position: absolute;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0;
  padding-bottom: 0;
  line-height: 1.6rem;
  float: left;
  margin-left: 1rem;
}
.keyValueBox {
  position: relative;
  top: 6rem;
  width: 95%;
  margin: auto;
  border: solid 0.1rem rgb(188, 200, 231);
  // height: 3rem;

  .keyValueItem {
    float: left;
    width: 100%;
    // height: 2rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    // margin-top: 0;
    margin-left: 0.2rem;
    text-align: center;
    border: solid 0.02rem;
  }

  .keyValueInfo {
    border: solid 0.1rem;

    text-align: center;
    float: left;
    width: 25%;
    // height: 2rem;
    border: solid 0.1rem;
    // margin-top: 0.5rem;
    margin-left: 0.2rem;
    // padding-top: 0rem;
    // line-height: 2rem;
  }
}

.typeSelect {
  position: relative;
  top: 6rem;
  width: 88%;
  margin: auto;
  border: solid;
}

.selectItem {
  float: left;
  width: 20%;
  height: 3rem;
  text-align: center;
  background-color: rgb(155, 155, 155);
  border: solid rgb(54, 79, 139) 0.02rem;
  line-height: 3rem;
  margin-left: 3.6%;
  margin-top: 1rem;
}
.selectItem:hover {
  cursor: pointer;
}

.topTextButton {
  color: #333;
  padding: 0.3rem;
  background-color: rgb(47, 115, 124);
  -webkit-box-shadow: 0 0 0.5rem #909399;
  box-shadow: 0 0 0.5rem #909399;
  border-radius: 0.5rem;
  color: #ddd;
}

.topTextButton:hover {
  cursor: pointer;
  background-color: rgb(18, 71, 78);
}
.wrapper {
  background-color: rgb(240, 240, 243);



  // height: 150vh;
  padding-bottom: 100vh;
}
</style>>

