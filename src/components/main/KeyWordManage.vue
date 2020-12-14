<template>
  <div class="outbox">
    <div style="position: relative" class="wrapper">
      <div
        style="
          position: fixed;
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
        class="topTextButtonBlue"
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
        {{getAuthName}}的对照表规则
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
        选择设置本单位规则：{{getAuthName}}
      </div>
<!-- {{sessionStorage.getItem("authCode")}} -->
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
        {{ true ? this.deepInThisDocAbout : getAuthName }}-优先级规则设置
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
          请按提示输入
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
        <div
          @click="fixTheKV"
          style="
            color: #333;
            cursor: pointer;
            position: absolute;
            margin-top: 1.5rem;

            font-size: 1.2rem;
            margin-left: 10rem;
          "
        >
          确定
        </div>
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
        <select
          v-model="valueToSet"
          name=""
          id=""
          style="height: 2rem; margin-left: 1rem; width: 9rem"
        >
          <option value="1">履历材料</option>
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

        <div
          @click="doPresetRs"
          style="
            color: #333;
            cursor: pointer;
            position: absolute;
            margin-top: 1.5rem;

            font-size: 1.2rem;
            margin-left: 10rem;
          "
        >
          确定
        </div>
      </div>

      <div
        v-if="showKVPreset"
        style="
          position: fixed;
          top: 40vh;
          left: 50%;
          margin-left: -15rem;
          z-index: 122;
          padding-top: 1rem;
          color: #333;
          font-size: 1.5rem;
          width: 30rem;
          height: 10rem;
          background-color: rgb(240, 240, 240);
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
          请按提示输入
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

        <div
          @click="doPreset"
          style="
            color: #333;
            cursor: pointer;
            position: absolute;
            margin-top: 1.5rem;

            font-size: 1.2rem;
            margin-left: 10rem;
          "
        >
          确定
        </div>
      </div>

      <div class="Card printSetBox" v-if="selectShow">
              <div class="newTip">选择对照表进行设置</div>
    <el-select
    @change="docTypeChange"
          class="tableSelectStyle"
            ref="authSelectref"
            id="selectAuth"
            filterable
            v-model="selectedDoctype"
            placeholder="选择档案类型"
          >
            <el-option
              v-for="item in docTypes"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>

    </el-select>
    <el-select
          class="tableSelectStyle"
          style="top:10rem"

            ref="authSelectref"
            id="selectAuth"
            filterable
            v-model="selectedTableType"
            placeholder="选择对照表"
          > 
           <el-option
              v-for="item in tableTypes"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
    </el-select>
    <div class="topTextButtonBlue" @click="selectDone" style="width:3rem;position:absolute;top:10rem;left:29rem">
      确定
    </div>

      </div>
<!-- selectShow -->
      <div class="typeSelect" v-if="false">
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

      <!-- 对照表的设置table -->
   <div class="keyValueBox" @click="boxClick" v-if="!selectShow&&dicShow">  
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
          @click="preSetDicButton"
          v-if="!computeIsLevel"
        >

          点击预设对照规则
        </div>

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
          v-if="computeIsLevel"
          @click="preSetDicButton"
        >
          点击预设对照规则
        </div>

                  <div style="float:left;;width:7rem;text-align:center;position:absolute;z-index:1333" v-if="computeIsLevel&&!selectShow" v-on:mouseover="showFilterLevel()" @mouseleave="hideFilterLevel">
          {{selectedLevel}}            <div style="width: 0.7rem; height: 0.7rem;positon:relative" v-if="!filterLevelFlag">
             
            <span id="user_top"></span>

          </div>
            <div style="width: 0.7rem; height: 0.7rem;positon:relative" v-if="filterLevelFlag">
             
            <span id="user_topd" ></span>

          </div>
          
                     <div class="filterStyle"  v-on:mouseover="showFilterLevel()" @mouseleave="hideFilterLevel"  v-if="filterLevelFlag ">
                <div v-for="(item, index) in this.levelFilter" :key="index" @click="filterThisRequest('level',item)" class="filterItemStyle">{{item}}</div>
              </div>
        </div>

        <div class="keyValueItem ">
          
          
          <div class="keyValueInfo" style="border: none; position: relative">
            {{computeKeyTitle}}
 
          </div>




          <div class="keyValueInfo" style="border: none">{{computeValueTitle}}</div>

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
          v-if="computeIsLevel"
            v-bind:class="[{ keyValueInfo: true }, { hideText: false }]"
            style="border: none"
          >
            {{ item[0]|formatLevelKeyword }}
          </div>
                    <div
                    v-if="!computeIsLevel"
            v-bind:class="[{ keyValueInfo: true }, { hideText: false }]"
            style="border: none"
          >
            {{ item[0] }}
          </div>

          <div class="keyValueInfo" style="border: none">{{ item[1] }}</div>

          <div
            v-bind:class="[{ keyValueInfo: true }, { hideText: true }]"
            style="border: none"
            v-if="false"
          >
            {{ item.tables | formatKeyWordValue }}
          </div>

          <div style="width: 0; position: absolute">{{ item.id }}</div>
 
  
          <div class="topTextButtonBlueNoWidth" style="float:left;margin-left:10rem"
            type="primary"
             
            @click="fixKv($event, item)"
            v-if="!saveBtnShow"
            >修改 </div
          >
        <div class="topTextButtonBlueNoWidth" style="float:left"
            type="danger"
             
            @click="deleteKV($event, item)"
            >删除 </div
          >

          


        </div>

        <div style="clear: both"></div>
      </div>


      <div class="keyValueBox" @click="boxClick" v-if="!selectShow&&!dicShow">
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
            <div class="topTextButtonBlueNoWidth" style="float:left"
              @click="saveKeyValue"
              type="success"
               
           
              v-if="saveBtnShow"
              >保存修改 </div
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
          <div class="topTextButtonBlueNoWidth" style="float:left;margin-left:5rem"
            type="success"
             
            @click="upClick($event, item)"
           
            >上调 </div
          >
          <div class="topTextButtonBlueNoWidth" style="float:left"
            type="warning"
             
            @click="downClick($event, item)"
            >下调 </div
          >
          <div class="topTextButtonBlueNoWidth" style="float:left"
            type="danger"
             
            @click="deleteKV($event, item)"
            >删除 </div
          >
          <div class="topTextButtonBlueNoWidth" style="float:left"
            type="primary"
             
            @click="fixKv($event, item)"
            v-if="!saveBtnShow"
            >修改值 </div
          >

          <div class="topTextButtonBlueNoWidth" style="float:left"
            type=""
             
            @click="thisDocAbout($event, item)"
            v-if="!saveBtnShow && showKeyWord && !backToDocAboutShow"
            >关键词对应表 </div
          >

          <div class="topTextButtonBlueNoWidth" style="float:left"
            type=""
             
            @click="rsKeywordToDocAbout($event, item)"
            v-if="rsKeywordPage"
            >设置对应材料类别 </div
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
import messageVue from "../chat/message.vue";
 

export default {
  computed: {
    computeKeyTitle(){
      if((this.typeNum-6)%10==0){
        return "关键词"
      }
      else return "文号(不包括数字)"
    },
    computeValueTitle(){
            if((this.typeNum-6)%10==0){
        return "期限"
      }
      else return "责任者"
    },
        computeIsLevel(){
            if((this.typeNum-6)%10==0){
        return true
      }
      else return false
    },
    user() {
      //   return this.$store.state.user;
    },
    getAuthName(){

      return sessionStorage.getItem('authName')
    },
    rsKeywordPage() {
      return this.typeNum == 41;
    },
    showKeyWord() {
      return (
        this.typeNum == 11 ||
        this.typeNum == 21 ||
        this.typeNum == 31
      );
    },
  },

  created() {
    window.scrollTo(0, 0);
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


      if(this.weightForm.officialDescAuthor==null){
          this.weightForm.officialDescAuthor={}
      }
            if(this.weightForm.officialLevelKeywordDeadline==null){
          this.weightForm.officialLevelKeywordDeadline={}

      }
            if(this.weightForm.tecDescAuthor==null){
          this.weightForm.tecDescAuthor={}

      }
            if(this.weightForm.tecLevelKeywordDeadline==null){
          this.weightForm.tecLevelKeywordDeadline={}
      }
                  if(this.weightForm.busDescAuthor==null){
          this.weightForm.busDescAuthor={}
      }
                  if(this.weightForm.busLevelKeywordDeadline==null){
          this.weightForm.busLevelKeywordDeadline={}
      }
              if (this.weightForm) {
          this.showWaitingFlag = false;
        }
        console.log(this.weightForm);
// var a='officialDescAuthor'
// console.log(this.weightForm[a])
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
        filterThisRequest(str,item){
          this.selectedLevel=item
      window.scrollTo(0,0)

      if(str=='level'){
        // for(var i in this.jsonTable){
        //   this.jsonTable[i][0].split('~')[0]
        // }
      this.jsonTable=this.tempTable


            this.jsonTable= this.jsonTable.filter(function (element, index, self) {
   　　return element[0].split('~')[0]==item
　　});

      }
 


      
    },

        hideFilterLevel(){
      this.filterLevelFlag=false;
    },
    showFilterLevel(){
      this.filterLevelFlag=true;
    },

    preSetLevelDicButton(){

    },
    getAuth(){
      
    this.getRequest("/organ/" + sessionStorage.getItem("authId")).then(
      (resp) => {
        this.weightForm = resp.data;
        
        })
    },
    selectDone(){
      if(this.selectedDoctype=="文书类"){
        if(this.selectedTableType=="文书类档案问题(机构)优先级表"){
          this.checkFromThisType(11)

        }
                if(this.selectedTableType=="文书类档案责任者优先级表"){
          this.checkFromThisType(12)
        }
                if(this.selectedTableType=="文号责任者对照表"){
          this.selectedTableTypeName="officialDescAuthor"

          this.checkFromThisType(15)

        }
                if(this.selectedTableType=="级别期限对照表"){
          this.selectedTableTypeName="officialLevelKeywordDeadline"
          
          this.checkFromThisType(16)

        }
      }
            if(this.selectedDoctype=="业务类"){
        if(this.selectedTableType=="业务类档案问题优先级表"){
          this.checkFromThisType(31)
        }
                if(this.selectedTableType=="业务类档案责任者优先级表"){
          this.checkFromThisType(32)
        }
                if(this.selectedTableType=="文号责任者对照表"){
          this.selectedTableTypeName="busDescAuthor"

          this.checkFromThisType(35)
          
        }
                if(this.selectedTableType=="级别期限对照表"){
          this.selectedTableTypeName="busLevelKeywordDeadline"

          this.checkFromThisType(36)
        }
      }
            if(this.selectedDoctype=="科技类"){
        if(this.selectedTableType=="科技类档案项目优先级表"){
          this.checkFromThisType(21)
        }
                if(this.selectedTableType=="科技类档案责任者优先级表"){
          this.checkFromThisType(22)
        }
                if(this.selectedTableType=="文号责任者对照表"){
          this.selectedTableTypeName="tecDescAuthor"

          this.checkFromThisType(25)

        }
                if(this.selectedTableType=="级别期限对照表"){
          this.selectedTableTypeName="tecLevelKeywordDeadline"

          this.checkFromThisType(26)

        }
      }
            if(this.selectedDoctype=="人事类"){

              this.checkFromThisType(41)
      }

    },
    docTypeChange(){
      if(this.selectedDoctype=='文书类')
      this.tableTypes=[
        "文书类档案问题(机构)优先级表",
        "文书类档案责任者优先级表",
                "文号责任者对照表",
        "级别期限对照表",
      ]
      else if(this.selectedDoctype=='业务类'){
        this.tableTypes=[
        "业务类档案问题优先级表",
        "业务类档案责任者优先级表",
                "文号责任者对照表",
        "级别期限对照表",
      ]
      }else if(this.selectedDoctype=='科技类'){
        this.tableTypes=[
        "科技类档案项目优先级表",
        "科技类档案责任者优先级表",
                "文号责任者对照表",
        "级别期限对照表",
      ]
      }else{
        this.selectedTableType=""
        this.tableTypes=[
        "人事类档案关键词优先级表",
        ]
      }
    },


    clearRsSet() {
      this.selectRsDAFlag = false;
    },
    rsKeywordToDocAbout(e, item) {
      this.keyToSet = item[0];
      this.selectRsDAFlag = true;
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
      if (this.typeNum == 41) return 41;
    },

    thisDocAbout(e, item) {
      this.showWaitingFlag = true;
      this.deepInThisDocAbout = item[0];
      this.backToDocAboutShow = true;

      var keywordJson;
      var keywordIssueJson;
      var that = this;
      Promise.all([
        new Promise((resolve, reject) => {
          that
            .getRequest("/weight/keywordSort/" + that.keywordWigId)
            .then((resp) => {
              keywordJson = resp.data.tables;
              keywordIssueJson = resp.data.keywordIssue;
              resolve(resp);
            });
        }),

        new Promise((resolve, reject) => {
          that
            .getRequest(
              "/weight/map/about/" + that.requestWigId + "?word=" + item[0]
            )
            .then((resp) => {
              resolve(resp);
            });
        }),
      ])
        .then((resp) => {
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
          console.log(this.keywordTable);

          var attr;
          this.jsonTable = [];
          console.log(this.keywordTable);

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
          for (var i = 0; i < this.jsonTable.length; i++) {
            this.jsonTable[i][1] = this.jsonTable.length - i;
          }

          for (var i = 0; i < this.jsonTable.length; i++) {
            // console.log(this.jsonTable[i][0]);
            this.keywordTable[this.jsonTable[i][0]] = this.jsonTable[i][1];
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
        })
        .then(() => {
          this.showWaitingFlag = false;
        });
    },
    thisDocAbout1(e, item) {
      this.getRequest("/weight/keywordSort/" + this.keywordWigId).then(
        (resp) => {
          //预加载关键词列表 删除的时候可用
          this.keywordTable = resp.data.tables;
          this.keywordIssueTable = resp.data.keywordIssue;
        }
      );

      this.showWaitingFlag = true;
      // this.selectShow=false
      // console.log(item[0])
      this.deepInThisDocAbout = item[0];
      // 查问题的关键词数组 1111
      this.getRequest(
        "/weight/map/about/" + this.requestWigId + "?word=" + item[0]
      ).then((resp) => {
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
      console.log(this.issueTable)
      this.saveBtnShow = false;
      this.jsonTable = this.level1JsonTable;
      this.backToDocAboutShow = false;
      // this.checkFromThisType(this.typeNum);
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
    doPresetRs() {
      this.selectRsDAFlag = false;


      this.getRequest("/weight/keywordSort/" + this.requestWigId).then(
        (resp) => {
          //获取关键词权重表
          var keywordJson = resp.data.tables;
          var keywordIssueJson = resp.data.keywordIssue;
          // if (keywordIssueJson[this.keyToSet] == null) {
          //   keywordIssueJson[this.keyToSet] = JSON.stringify(this.valueToSet);
          // }
          console.log("设置的材料类型");

          console.log(this.valueToSet);
          keywordIssueJson[this.keyToSet] = this.valueToSet;

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
            issueKeyword: {},
            keywordIssue: keywordIssueJson,
          };
          this.putRequest("/weight/" + this.requestWigId, kvObj).then(
            (resp) => {
              console.log(kvObj);
              console.log("更新rs预设kv权重表");
              console.log(resp);

              this.checkFromThisType(41);
            }
          );
        }
      );
    },

    doPresetSub() {
      {
        if (this.backToDocAboutShow) {
          //添加一个关键词 需要：
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
                this.issueTable=resp.data.tables
              });

              /**以上是问题权重表 */

              this.getRequest("/weight/keywordSort/" + this.keywordWigId).then(
                (resp) => {
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
                }
              );
            })
            .then(() => {});
        } else {
          //问题和责任者和人事关键词
          var table3;
          var issueKeywordArrJson;
          var keywordIssueJson;
          this.getRequest("/weight/sort/" + this.requestWigId)
            .then((resp) => {
              //查询对应的权重表得到json
              console.log("添加过，先获取：");
              console.log(resp.data.tables);
              table3 = resp.data.tables;
              if (resp.code == 0) {
                var key3 = this.keyToSet;
                // var json1 = table;
                table3[key3] = this.valueToSet;

                issueKeywordArrJson = resp.data.issueKeyword;
                keywordIssueJson = resp.data.keywordIssue;
                if (keywordIssueJson == null) {
                  keywordIssueJson = {};
                }

                if (issueKeywordArrJson[this.keyToSet] == null) {
                  var arrtemp = [];

                  issueKeywordArrJson[this.keyToSet] = arrtemp;
                }
              } else {
                this.$message({
                  type: "warning",
                  message: "添加失败",
                });
                return;
              }
            })
            .then((r) => {
              var kvObj = {
                authId: sessionStorage.getItem("authId"),
                type: this.typeNum,
                tables: table3,
                issueKeyword: issueKeywordArrJson,
                keywordIssue: keywordIssueJson,
              };

              this.putRequest("/weight/" + this.requestWigId, kvObj).then(
                (resp) => {
                  console.log("更新预设kv权重表");
                  console.log(resp);
              this.issueTable=resp.data.tables

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
      console.log(this.weightForm)
      if(this.typeNum%5==0||(this.typeNum-6)%10==0){  //对照表
      var levelkw=this.selectedLevel+"~"+this.keyToSet
      if(this.weightForm[this.selectedTableTypeName][this.keyToSet]!=null||
      this.weightForm[this.selectedTableTypeName][levelkw]!=null){
                  
              this.$message({
                type: "warning",
                message:
                  "该对照已存在：" +
                 this.keyToSet
              });

              this.showWaitingFlag = false;

              return;
            
      }
        if(this.typeNum==15){
          this.weightForm.officialDescAuthor[this.keyToSet]=this.valueToSet
        }
                if(this.typeNum==25){
          this.weightForm.tecDescAuthor[this.keyToSet]=this.valueToSet
        }
                if(this.typeNum==35){
          this.weightForm.busDescAuthor[this.keyToSet]=this.valueToSet
        }

          if(this.typeNum==16){
var k=this.selectedLevel+'~'+this.keyToSet
console.log(k)
console.log(this.weightForm.officialLevelKeywordDeadline)

          this.weightForm.officialLevelKeywordDeadline[this.selectedLevel+'~'+this.keyToSet]=this.valueToSet
console.log(this.weightForm.officialLevelKeywordDeadline)

        }
                if(this.typeNum==26){


                    this.weightForm.tecLevelKeywordDeadline[this.selectedLevel+'~'+this.keyToSet]=this.valueToSet

        }
                if(this.typeNum==36){


                    this.weightForm.busLevelKeywordDeadline[this.selectedLevel+'~'+this.keyToSet]=this.valueToSet

        }



      this.jsonTable=[]
      this.putRequest(
        //注意防止重复提交
        "/organ/" + sessionStorage.getItem("authId"),
        JSON.stringify(this.weightForm)
      ).then((resp) => {
        if(resp.code==0){
                  this.$message({
          type: "success",
          message: "预设成功",
        });

          var json=resp.data
          var attr
          var table=json[this.selectedTableTypeName]
                    for ( attr in table) {

                      console.log(attr)
                      console.log(table[attr])
            this.jsonTable.push([attr, table[attr]]);
          }
          this.showKVPreset=false
        }
      })


      this.showWaitingFlag=false
        return
      }


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
      if (this.backToDocAboutShow) {
        //关键词重复
        this.getRequest("/weight/keywordSort/" + this.keywordWigId).then(
          (resp) => {
            if (resp.data.tables[this.keyToSet] != null) {
              this.$message({
                type: "warning",
                message:
                  "关键词已存在,大小为" +
                  resp.data.tables[this.keyToSet] +
                  ",问题为：" +
                  resp.data.keywordIssue[this.keyToSet],
              });

              this.showWaitingFlag = false;

              return;
            }

            this.doPresetSub();
          }
        );
      } else {
        this.getRequest("/weight/sort/" + this.requestWigId).then((resp) => {
          if (resp.data.tables[this.keyToSet] != null) {
            this.$message({
              type: "warning",
              message:
                "已存在" +
                this.keyToSet +
                ",大小为" +
                resp.data.tables[this.keyToSet],
            });

            this.showWaitingFlag = false;

            return;
          }
        });

        this.doPresetSub();
      }

      //添加过

      // if(){}
    },

    renewAuthTable(){
      this.getAuth();

    },
    renewTable() {
      //问题责任者的刷新
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
          this.level1JsonTable = this.jsonTable;

          // var json1 = table;
        });
      }
    },

    checkFromThisTableType(num){
      this.selectShow=false
      this.dicShow=true
      // var organId=sessionStorage.getItem('authId')
      //         this.getRequest("/organ/" + organId)
      //     .then((resp) => {
              
      //     })
      var descAuthorJson
      this.jsonTable=[]
      var table
      var attr
      if(num%5==0){  //文号责任者
      this.descAuthorFlag=true

 if(num==15){//文书文号责任者
table=this.weightForm.officialDescAuthor
console.log(table)
  
                  for (attr in table) {
            this.jsonTable.push([attr, table[attr]]);
          }
      }
      if(num==25){//keji文号责任者
table=this.weightForm.tecDescAuthor

                  for (attr in table) {
            this.jsonTable.push([attr, table[attr]]);
          }
      }
            if(num==35){//yewu文号责任者
table=this.weightForm.busDescAuthor

                  for (attr in table) {
            this.jsonTable.push([attr, table[attr]]);
          }
      }

      }

      if((num-6)%10==0){
        this.selectedLevel='级别'
        console.log(this.selectedTableTypeName)

        var table=this.weightForm[this.selectedTableTypeName]
        console.log(table)
                  for (attr in table) {
            this.jsonTable.push([attr, table[attr]]);
          }
      }

      this.tempTable=this.jsonTable //级别+关键词对应期限那里 级别筛选时暂存完整的对照表
     
      this.showWaitingFlag=false
    },
    checkFromThisType(num) {
      this.typeNum = num;
      this.showWaitingFlag = true;
      this.backToDocAboutShow = false;

      if((num-5)%10==0||(num-6)%10==0){
this.checkFromThisTableType(num)
     

        return
      }
      this.dicShow=false
      // this.ba
      this.jsonTable = [];
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
            console.log("权重表分类，get到")
            console.log(resp)
            table = resp.data.tables;
            // this.issueKeywordTable=resp.data.issueKeyword==null?{}:resp.data.issueKeyword;  //关键词对应数组json
            // this.keywordIssueTable=resp.data.keywordIssue==null?{}:resp.data.keywordIssue;
            this.issueTable = resp.data.tables;
            this.issueKeywordTable = resp.data.issueKeyword; //问题对应关键词数组json
            // this.keywordIssueTable=resp.data.keywordIssue
            if (num == 41) {
              console.log(this.issueKeywordTable);
              this.keywordIssueTable = resp.data.keywordIssue;
              this.keywordTable = resp.data.tablses;
            }

            let attr;
            this.jsonTable = [];

            for (attr in table) {
              this.jsonTable.push([attr, table[attr]]);
            }
            this.level1JsonTable = this.jsonTable; //缓存

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
      this.keyToSet = "词";
      this.valueToSet = "数字";
    },
    preSetDicButton(){
      if(this.computeIsLevel){
        if(this.selectedLevel=="级别"){
                            this.$message({
          type: "warning",
          message: "请选择级别",
        });
        return
        }

      }
            this.showKVPreset = true;
      this.keyToSet = this.computeKeyTitle
      this.valueToSet = this.computeValueTitle
    },

    fixTheKV() {

console.log((this.typeNum-6))
            if(this.typeNum%5==0||(this.typeNum-6)%10==0){  //对照表

        if(this.typeNum==15){

          this.weightForm.officialDescAuthor[this.keyToFix]=this.valueToFix

        }
                if(this.typeNum==25){


          this.weightForm.tecDescAuthor[this.keyToFix]=this.valueToFix
        }
                if(this.typeNum==35){


          this.weightForm.busDescAuthor[this.keyToFix]=this.valueToFix
        }

                if(this.typeNum==16){
var k=this.selectedLevel+'~'+this.keyToFix
console.log(k)
console.log(this.weightForm.officialLevelKeywordDeadline)

          this.weightForm.officialLevelKeywordDeadline[this.selectedLevel+'~'+this.keyToFix]=this.valueToFix
console.log(this.weightForm.officialLevelKeywordDeadline)

        }
                if(this.typeNum==26){


                    this.weightForm.tecLevelKeywordDeadline[this.selectedLevel+'~'+this.keyToFix]=this.valueToFix

        }
                if(this.typeNum==36){


                    this.weightForm.busLevelKeywordDeadline[this.selectedLevel+'~'+this.keyToFix]=this.valueToFix

        }


      this.jsonTable=[]
      this.putRequest(
        //注意防止重复提交
        "/organ/" + sessionStorage.getItem("authId"),
        JSON.stringify(this.weightForm)
      ).then((resp) => {
        if(resp.code==0){
                  this.$message({
          type: "success",
          message: "修改成功",
        });
          var json=resp.data
          var attr
          var table=json[this.selectedTableTypeName]
                    for ( attr in table) {
            this.jsonTable.push([attr, table[attr]]);
          }
          this.showKVFix=false
        }
      })


      this.showWaitingFlag=false
        return
      }
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

      if (!this.backToDocAboutShow) {
        //问题责任者 人事关键词
        var docAboutObj = {
          authId: sessionStorage.getItem("authId"),
          type: this.typeNum,
          id: this.requestWigId,
          tables: jsonToCommit,
          issueKeyword: this.issueKeywordTable,
          keywordIssue: this.keywordIssueTable,
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
              this.renewTable(); //1
            } else {
              this.$message({
                type: "warning",
                message: "操作失败",
              });

              location.reload();
            }
          });
      } //责任者和问题的提交
      else {
        for (var i = 0; i < this.jsonTable.length; i++) {
          //
          // console.log(this.jsonTable[i][0]);
          if (this.keywordTable[this.jsonTable[i][0]]) {
            this.keywordTable[this.jsonTable[i][0]] = this.jsonTable[i][1];
          }
        }
        var kvObj = {
          authId: sessionStorage.getItem("authId"),
          type: this.getKwTypeNum(),
          tables: this.keywordTable,
          keywordIssue: this.keywordIssueTable,
        };
        this.putRequest("/weight/" + this.keywordWigId, kvObj)
          .then((resp) => {
            console.log(kvObj);
            console.log("调整后，关键词对应的表");
            console.log(resp);
          })
          .then(() => {
            var e = 1;
            var tempp = [];
            tempp.push(this.deepInThisDocAbout); //为了再查一次这个问题
            this.thisDocAbout(e, tempp);
          });
      }
    },

    deleteDocAbout(item) {
      //进入问题表的时候就已经设置好 this
      //this.issueTable
      //this.issueKeywordTable
      // alert('shanchu')
      console.log(this.issueTable)
       var issueToDelete = item[0];
       var issueKeywordArr
      this.getRequest(
        "/weight/map/about/" + this.requestWigId + "?word=" + item[0]
      )
        .then((resp) => {
          issueKeywordArr=resp.data
        })



        .then(() => {

{//操作关键词权重表
  
          console.log("按问题查关键词数组 删除某个问题后");
          var kwArr = issueKeywordArr
          if (kwArr == null) {
            kwArr = [];
          }
          this.getRequest("/weight/keywordSort/" + this.keywordWigId).then(
            (resp) => {
              this.keywordTable = resp.data.tables;
              this.keywordIssueTable = resp.data.keywordIssue;
            }
          ).then(()=>{ //获取关键词权重表后再操作
          for (var i in kwArr) {
            console.log("删除问题对应的关键词：" + kwArr[i]);
            delete this.keywordTable[kwArr[i]];
            delete this.keywordIssueTable[kwArr[i]]
          }
          }).then(()=>{

         var kvObj = {
            authId: sessionStorage.getItem("authId"),
            type: this.getKwTypeNum(),
            tables: this.keywordTable,
            keywordIssue: this.keywordIssueTable,
          };
          this.putRequest("/weight/" + this.keywordWigId, kvObj).then(
            (resp) => {
              console.log(kvObj);
              console.log("删除问题后，操作关键词权重表");
              console.log(resp);
            }
          );
          });
          // for (var kwitem in kwArr) {
            // var stringWithSplit = this.keywordIssueTable[kwArr[kwitem]];
            // if (stringWithSplit) {
            //   var keywordIssueStringToArr = stringWithSplit.split("|");
            //   var indext = keywordIssueStringToArr.indexOf(issueToDelete);

            //   if (indext > -1) {
            //     //串中含有
            //     console.log("含有");
            //     keywordIssueStringToArr.splice(indext, 1);
            //     stringWithSplit = keywordIssueStringToArr[0];
            //     for (var i = 1; i < keywordIssueStringToArr.length; i++) {
            //       stringWithSplit =
            //         stringWithSplit + "|" + keywordIssueStringToArr[i]; //删除后再拼接
            //     }
            //   }
            //   this.keywordIssueTable[kwArr[kwitem]] = stringWithSplit; //放回
            // } //该关键词有 问题串
          // }

 
        
}

{  //操作问题权重表
            console.log("shanchu问题权重表1");
          console.log(this.issueTable);

          delete this.issueTable[item[0]];
          delete this.issueKeywordTable[item[0]];
          console.log(this.issueTable);

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
            if (resp.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.issueKeywordTable = resp.data.issueKeyword;
              this.issueTable = resp.data.tables;
              this.jsonTable = [];
              for (var attr in this.issueTable) {
                this.jsonTable.push([attr, this.issueTable[attr]]);
              }
              this.level1JsonTable = this.jsonTable; //暂存的数组
            } else {
              this.$message({
                type: "success",
                message: "删除失败",
              });
              this.checkFromThisType(this.typeNum);
            }
          });
}

        });
    },

    deleteKV(e, item) {
      //删除问题
            if(this.typeNum%5==0||(this.typeNum-6)%10==0){  //对照表

        var arr=[]
        var json=this.weightForm[this.selectedTableTypeName]

        console.log(json)

        delete json[item[0]]
        console.log(json)


     
          //         for (var i = 0; i < length; i++) {
          //   if (this.jsonTable[i][0] == item[0]) {
          //     keywordTodelete = this.jsonTable.splice(i, 1); //删除下标为i的元素  返回的是数组，长度为1
          //     break; //不break的话会报错，因为外层循环还在继续，数组已经少了一个了
          //   }
          // }

       this.jsonTable=[]
      this.putRequest(
        //注意防止重复提交
        "/organ/" + sessionStorage.getItem("authId"),
        JSON.stringify(this.weightForm)
      ).then((resp) => {
        if(resp.code==0){
                  this.$message({
          type: "success",
          message: "删除",
        });
          var json=resp.data
          var attr
          var table=json[this.selectedTableTypeName]
                    for ( attr in table) {
            this.jsonTable.push([attr, table[attr]]);
          }
          this.showKVFix=false
        }
      })


      this.showWaitingFlag=false
        return
      }

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
          if (this.typeNum == 11 || this.typeNum == 21 || this.typeNum == 31) {
            if (this.backToDocAboutShow == false) {
              //问题责任者
              this.deleteDocAbout(item);
              return;
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
                return "k";
              })
              .then((resp) => {
                console.log(resp);
                console.log("删除关键字");
                console.log(keywordTodelete[0][0]);
                delete this.keywordTable[keywordTodelete[0][0]]; //可能会删除关键词对应其他问题 kkkk
                console.log(this.keywordTable);
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
      tempTable:[],//级别+关键词对应期限那里 级别筛选时暂存完整的对照表

      descAuthorFlag:false, //是否是文号责任者对照表
      dicShow:false,  //对照表是否显示
      selectShow: true, //选择类型界面是否显示

      selectedLevel:"级别",//筛选级别
      selectedDoctype:'',
      selectedTableType:'',
      selectedTableTypeName:'',//选择的对照表类型在单位对象中属性的名称

filterLevelFlag:false, //设置级别+关键词对照期限表时 筛选级别
levelFilter:[
  "本级",
  "县级",
  "市级",
  "省级",
  "部级",


],
      docTypes:[
        '文书类',
        '业务类',
        '科技类',
        '人事类',
      ],

      tableTypes:[
        "请先选择文档类型",

      ],
      selectRsDAFlag: false,
      level1JsonTable: [],
      keywordIssueTable: {},
      keywordArrFromIssue: [],
      docAboutWigTable: {},
      deepInThisDocAbout: "", //对哪个问题下的关键词修改
      issueKeywordTable: {}, //问题对应关键词数组json
      issueTable: {},
      typeNum: 11,
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
 

<style lang="scss" scoped>
.tableSelectStyle{
  position: absolute;
  top:5rem;
  left: 3rem;
  width:20rem;
}

.filterItemStyle{
  border-bottom: 0.01rem;
  font-size: 0.8rem;
  padding-top: 0.2rem;
  padding-bottom: 0.3rem;
  z-index: 3323;
  cursor: pointer;
}

.filterItemStyle:hover{
  background-color: rgb(222, 222, 222);
  
}
.filterStyle{
  position:absolute;
  width:7rem;
  border-radius: 1rem;

  
  background-color: rgb(230, 230, 230);
  
  top:1.5rem;

}

.hoverStyle:hover {
  // margin-left: 22rem;
  color: rgba(29, 30, 32, 0.733);
  cursor: pointer;
  z-index: 9999;
}
.textButton {
  z-index: 9;
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
  // border: solid 0.05rem rgb(102, 103, 107);
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

.Card {
  width: 40rem;
  -webkit-box-shadow: 0 0 0.5rem #909399;
  box-shadow: 0 0 0.5rem #909399;
  border-radius: 1rem;
  background-color: rgb(240, 240, 243);
  position: relative;
  top: 8rem;
  left: 50%;
  margin-left: -20rem;
  padding-bottom: 15rem;
    .newTip {
    position: absolute;
    width: 100%;
    top: 0.5rem;
    font-size: 1.1rem;
    text-align: center;
  }
  }
</style>

