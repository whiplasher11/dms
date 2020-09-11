<template>
  <div class="wrapper">
    <Left></Left>

    <div class="detailBox"></div>
 
 <div style="position:absolute;width:20rem;height:10rem;top:10rem;left:50%;margin-left:-10rem;line-height:10rem;
    background-color:rgba(25,55,163,0.8);font-size:1.3rem;color:white;text-align:center;z-index:1000" v-if="showWaitingFlag">提交中，请稍候...</div>

    <div class="keyWordSelect" v-if="false">
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>

      <div class="keyWordsTimer">3秒后消失</div>
    </div>

    <el-form v-if="!isRS" class="docInForm" ref="docForm" :model="docForm" label-width="10rem" >
      <!-- <div class="docTypeTitle">sessionStorage批次</div> -->
      <div class="docSequenceTip">本份文件唯一序列号：{{this.docForm.docSequence}}</div>

      <el-checkbox
        style="position:absolute;right:1rem;top:1rem;"
        v-if="true"
        @change="inputChange"
        false-label="0"
        true-label="1"
        :checked="false"
      >开启智能录入</el-checkbox>

      <el-form-item class="textArea" prop="batchName" label="文件标题：">
        <el-input
          @blur="titleComplete"
          type="textarea"
          :rows="3"
          class="textAreaInput"
          v-model="docForm.docTitle"
          auto-complete="off"
          placeholder="输入文件标题"
        ></el-input>
      </el-form-item>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="关键字：">
            <el-input
              :disabled="!keyWordEdit"
              @click="checkTitle"
              size="normal"
              type="text"
              v-model="docForm.keyword"
              auto-complete="off"
              placeholder="系统识别或手动填写"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="false">
          <el-form-item prop="batchName" label="机构/问题：">
            <el-input
              @blur="docAboutBlur"
              size="normal"
              type="text"
              v-model="docForm.docAbout"
              auto-complete="off"
              placeholder="根据文件填写"
            ></el-input>
          </el-form-item>
        </el-col>
                <el-col :span="12" v-if="true">
          <el-form-item prop="batchName" label="项目:">
            <el-input
              @blur="docAboutBlur"
              size="normal"
              type="text"
              v-model="docForm.docAbout"
              auto-complete="off"
              placeholder="根据文件填写"
            ></el-input>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="整档年度：">
            <el-date-picker
              type="year"
              placeholder="选择整档年度"
              v-model="docForm.sortYear"
              value-format="yyyy"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="batchName" label="发文日期：">
            <el-date-picker
              type="date"
              placeholder="选择发文日期"
              v-model="docForm.docDate"
              value-format="yyyyMMdd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="文件级别：">
            <el-select v-model="docForm.docLevel" placeholder="选择文件级别">
              <el-option
                v-for="item in docLevels"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="batchName" label="责任者：">
            <el-input
              size="normal"
              type="text"
              v-model="docForm.dutyAuthor"
              auto-complete="off"
              placeholder="输入档案责任者"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item v-show="false" prop="batchName" label="责任者简称：">
            <el-input
              size="normal"
              type="text"
              v-model="docForm.docDescAuthor"
              auto-complete="off"
              placeholder="文号中的责任者简称"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="batchName" label="文件页数：">
            <el-input
              size="normal"
              type="text"
              v-model="docForm.docPage"
              auto-complete="off"
              placeholder="根据文件填写"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
             <el-col :span="12">
          <el-form-item prop="batchName" label="有无文号:">
                  <el-checkbox
        style="position:absolute;left:2rem;top:0.5rem;"
        v-if="true"
        @change="docDescChange"
        false-label="0"
        true-label="1"
        :checked="false"
      ></el-checkbox>

          </el-form-item>
        </el-col>
        
        <el-col :span="12">
          <el-form-item prop="batchName" v-if="docForm.docDescNum==1" label="文号">
            <el-input
              size="normal"
              type="text"
              v-model="docForm.docDesc "
              auto-complete="off"
              placeholder="文号"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="文件期限(年)：">
            <el-select v-model="docForm.deadline" placeholder="选择文件期限">
              <el-option
                v-for="item in docTimeDues"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="batchName" label="文件密级：">
            <el-select v-model="docForm.docSecret" placeholder="选择文件密级">
              <el-option
                v-for="item in docSecrets"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item class="textArea" prop="batchName" label="备注信息：">
        <el-input
          type="textarea"
          :rows="2"
          class="textAreaInput"
          v-model="docForm.docRemark"
          auto-complete="off"
          placeholder="输入备注"
        ></el-input>
      </el-form-item>

      <div class="buttonGroup">
        <el-button
          type="warning"
          v-if="fixDocFlag"
          size="big"
          style="margin-left:40%"
          @click="fixDoc"
        >修改档案</el-button>
        <el-button
          type="success"
          v-if="!fixDocFlag"
          size="big"
          style="margin-left:40%"
          @click="addDoc"
        >添加档案</el-button>

        <el-button type="primary" size="big" style="margin-left:10%" @click="resetDocIn" v-if="!fixDocFlag">清空列表</el-button>
        <el-button type="primary" size="big" style="margin-left:10%" @click="cancelFix" v-if="fixDocFlag">取消修改</el-button>
      </div>
    </el-form>

    



        <el-form v-if="isRS" class="docInForm" ref="docForm" :model="docFormRS" label-width="10rem">
      <!-- <div class="docTypeTitle">sessionStorage批次</div> -->
      <div class="docSequenceTip">本份文件唯一序列号：{{this.docFormRS.docSequence}}</div>
 

       <el-row :gutter="24">

        <el-col :span="24">
          <el-form-item prop="batchName" label="文件标题：">
            <el-input
              size="normal"
              type="text"
              v-model="docFormRS.docTitle"
              auto-complete="off"
              placeholder="根据文件填写"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

       <el-row :gutter="24">

        <el-col :span="12">
          <el-form-item prop="batchName" label="关键词：">
            <el-input
              size="normal"
              type="text"
              v-model="docFormRS.keyword"
              auto-complete="off"
              placeholder="填写关键词"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
 

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="姓名：">
            <el-input
              
 
              size="normal"
              type="text"
              v-model="docFormRS.personName"
              auto-complete="off"
              placeholder="填写姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="batchName" label="材料形成时间：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="docFormRS.docDate"
              value-format="yyyyMMdd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>


    
      </el-row>

<!-- erhang -->
      <el-row :gutter="24">



      </el-row>

      <el-row :gutter="24">
       
          <el-col :span="12">
          <el-form-item prop="batchName" label="材料类别：">
            <el-select v-model="docFormRS.docAbout" placeholder="选择材料类别">
              <el-option
                v-for="item in RSTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

          <el-col :span="12">
          <el-form-item prop="z" label="子材料类别：">
            <el-select v-model="docFormRS.docAboutSub" placeholder="选择子材料类别">
              <el-option
                v-for="item in RSSubTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">


        <el-col :span="12">
          <el-form-item prop="batchName" label="文件页数：">
            <el-input
              size="normal"
              type="text"
              v-model="docFormRS.docPage"
              auto-complete="off"
              placeholder="根据文件填写"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>


   

      <!-- <el-form-item class="textArea" prop="batchName" label="备注信息：">
        <el-input
          type="textarea"
          :rows="2"
          class="textAreaInput"
          v-model="docFormRS.docRemark"
          auto-complete="off"
          placeholder="输入备注"
        ></el-input>
      </el-form-item> -->

      <div class="buttonGroup">
        <el-button
          type="warning"
          v-if="fixDocFlag"
          size="big"
          style="margin-left:30%"
          @click="fixDocRS"
        >修改档案</el-button>
        <el-button
          type="success"
          v-if="!fixDocFlag"
          size="big"
          style="margin-left:20%"
          @click="addDocRS"
        >添加档案</el-button>


        <el-button type="primary" size="big" style="margin-left:20%" @click="resetDocInRS" v-if="!fixDocFlag">清空列表</el-button>

                        <el-button
          type="warning"
          v-if="!fixDocFlag"
          size="big"
          style="margin-left:20%"
          @click="goDetail"
        >结束录入</el-button>


        <el-button type="primary" size="big" style="margin-left:10%" @click="cancelFix" v-if="fixDocFlag">取消修改</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
import Utils from "../../utils/doc.js";
import Left from "../common/History";

export default {
  name: "docInput",
  components: {
    Left: Left,
  },
  mounted() {
    var that = this;
    Utils.$on("changeThisDoc", function (doc) {
      // console.log(doc);
      var obj = Object.assign({}, doc);
      that.docForm = Object.assign({}, doc);
      that.fixDocFlag = true;
      that.$store.state.tempDocSeq = doc.docSequence;
      that.$store.state.tempDocId = doc.id;
      // alert(that.TempdocSequence)
    });
  },
    watch: {
    docFormRS: {
      handler(val, oldVal) {
        
        if(val.docAbout=='学历学位、评聘专业职务材料'&&oldVal.docAbout!='学历学位、评聘专业职务材料'){
          this.docFormRS.docAboutSub=''
        }
                if(val.docAbout=='工资、任免、退休材料'&&oldVal.docAbout!='工资、任免、退休材料'){
          this.docFormRS.docAboutSub=''
        }
        // console.log(val);
        if (val.docAbout == '工资、任免、退休材料') {
          this.RSSubTypes=this.RSSubTypesOrigin
        } else if(val.docAbout=='学历学位、评聘专业职务材料') {
          

           this.RSSubTypes=[
{
          name: "学历学位材料",
          value: "学历学位材料",
        },{
          name: "职称材料",
          value: "职称材料",
        },

           ]
        }else{
          this.docFormRS.docAboutSub='无'
          this.RSSubTypes=[
            {
                        name: "无",
          value: "无",
            }
          ]
        }
      },
      deep: true,
    },
  },

  computed:{
    isRS(){
      return sessionStorage.getItem('docType')=='personnel'
    }
  },

  data() {
    return {
      docFormRS:{

         id: "",
        docSequence: "", //序列号，标识文件
        docType: "",
        docTitle: "今天的猪肉12元", //标题
        docAbout: "",
        docAboutSub:'',
        keyword: "猪肉", //关键字
        // docDesc: "", //文号
        // sortYear: "2019",
        docDate: "20190808",
        docTypeCode: sessionStorage.getItem("docTypeCode"),
 
        docSecret: "", //文件密级
        docPage: "",
        docRemark: "", //备注
        docNumber: "", //件号
        personName:'',
        docDescNum: "0", //文号中的序号

      },
       docFormRSKong:{
         id: "",
        docSequence: "", //序列号，标识文件
        docType: "",
        docTitle: "今天的猪肉12元", //标题
        docAbout: "",
        docAboutSub:'',
        keyword: "猪肉", //关键字
        // docDesc: "", //文号
        // sortYear: "2019",
        docDate: "20190808",
        docTypeCode: sessionStorage.getItem("docTypeCode"),
 
        docSecret: "", //文件密级
        docPage: "",
        docRemark: "", //备注
        docNumber: "", //件号
        personName:'',
        docDescNum: "0", //文号中的序号


      },

      showWaitingFlag:false,
      weightForm: {},
      manageKeyWordTime: 1,
      keyWordEdit: false,
      fixDocFlag: false,
      RSSubTypesOrigin:[            {
          name: "工资情况材料",
          value: "工资情况材料",
        },
                                {
          name: "任免材料",
          value: "任免材料",
        },                        {
          name: "出国、出境材料",
          value: "出国、出境材料",
        },                        {
          name: "各党派、团体代表登记表",
          value: "各党派、团体代表登记表",
        },                        {
          name: "聘用、录用、转干、转业材料",
          value: "聘用、录用、转干、转业材料",
        },                        {
          name: "待遇、退（离）休、退职材料",
          value: "待遇、退（离）休、退职材料",
        },],
      RSSubTypes:[
                        {
          name: "工资情况材料",
          value: "工资情况材料",
        },
                                {
          name: "任免材料",
          value: "任免材料",
        },                        {
          name: "出国、出境材料",
          value: "出国、出境材料",
        },                        {
          name: "各党派、团体代表登记表",
          value: "各党派、团体代表登记表",
        },                        {
          name: "聘用、录用、转干、转业材料",
          value: "聘用、录用、转干、转业材料",
        },                        {
          name: "待遇、退（离）休、退职材料",
          value: "待遇、退（离）休、退职材料",
        },
      ],
      RSTypes:[
                {
          name: "履历材料",
          value: "履历材料",
        },
                {
          name: "自传材料",
          value: "自传材料",
        },
                {
          name: "鉴定、考核、考察材料",
          value: "鉴定、考核、考察材料",
        },
                {
          name: "学历学位、评聘专业职务材料",
          value: "学历学位、评聘专业职务材料",
        },
                {
          name: "政治历史情况审查材料",
          value: "政治历史情况审查材料",
        },
                {
          name: "入党入团材料",
          value: "入党入团材料",
        },
                        {
          name: "奖励材料",
          value: "奖励材料",
        },
                        {
          name: "处分材料",
          value: "处分材料",
        },
                                {
          name: "工资、任免、退休材料",
          value: "工资、任免、退休材料",
        },
                                {
          name: "其他可供参考的材料",
          value: "其他可供参考的材料",
        },
 
      ],
      docLevels: [
        {
          name: "部级",
          value: "部级",
        },
        {
          name: "省级",
          value: "省级",
        },
        {
          name: "市级",
          value: "市级",
        },
        {
          name: "县级",
          value: "县级",
        },
        {
          name: "本级",
          value: "本级",
        },
        {
          name: "乡级",
          value: "乡级",
        },
      ],

      docTimeDues: [
        {
          name: "永久",
          value: "永久",
        },
        {
          name: "备查",
          value: "备查",
        },
        {
          name: "长期",
          value: "长期",
        },
        {
          name: "100年",
          value: "100年",
        },
        {
          name: "30年",
          value: "30年",
        },
        {
          name: "10年",
          value: "10年",
        },
      ],
      docSecrets: [
        { 
          name: "无",
          value: "无",
        },
        {
          name: "秘密",
          value: "秘密",
        },
        {
          name: "机密",
          value: "机密",
        },
        {
          name: "绝密",
          value: "绝密",
        },
      ],
      docForm: {
        id: "",
        docSequence: "", //序列号，标识文件
        docType: "",
        docTitle: "今天的猪肉12元", //标题
        docAbout: "民生",
        keyword: "猪肉", //关键字
        docDesc: "", //文号
        sortYear: "2019",
        docDate: "20190808",
        docTypeCode: sessionStorage.getItem("docTypeCode"),
        docLevel: "",
        docDescAuthor: "", //责任者简称
        dutyAuthor: "", //责任者
        deadline: "", //文件期限
        docSecret: "", //文件密级
        docPage: "",
        docRemark: "", //备注
        docNumber: "", //件号
        boxNumber: "", //盒号
        docDescNum: "0", //文号中的序号
      },

      docFormKong: {
        id: "",
        docSequence: "", //序列号，标识文件
        // docSequence:'',//序列号，标识文件
        docType: "",
        docTitle: "", //标题
        docAbout: "",
        keyword: "", //关键字
        docDesc: "", //文号
        sortYear: "",
        docDate: "",
        docTypeCode: "",
        docLevel: "",
        docDescAuthor: "", //责任者简称
        dutyAuthor: "", //责任者
        deadline: "", //文件期限
        docSecret: "", //文件密级
        docPage: "",
        docRemark: "", //备注
        docNumber: "", //件号
        boxNumber: "", //盒号
        docDescNum: "0", //文号中的序号
      },

      TempdocSequence: "",

      aiInput: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date("1995/5/1");
        },
      },
    };
  },
  methods: {
    resetDocInRS(){
      this.docFormRS=Object.assign({}, this.docFormRSKong);
    },
    resetDocIn() {
      this.docForm = Object.assign({}, this.docFormKong);
      console.log(this.docFormKong);
    },
       checkAddRS() {
            if (
        this.docFormRS.personName == "" ||
        this.docFormRS.docPage==''||
        this.docFormRS.docDate==''||
        this.docFormRS.docTitle==''||

        this.docFormRS.docAboutSub==''||
        this.docFormRS.docAbout==''||
        this.docFormRS.keyword==''


      
      )
        return false;
      else return true;
       },
    checkAdd() {
      if (
        this.docForm.docTitle == "" ||
        this.docForm.keyword == "" ||
        this.docForm.sortYear == "" ||
        this.docForm.docAbout == "" ||
        this.docForm.docDate == "" ||
        this.docForm.docLevel == "" ||
        this.docForm.dutyAuthor == "" ||
        this.docForm.docPage == "" ||
        this.docForm.deadline == ""||
        this.docForm.docSecret==""
      )
        return false;
      else return true;
    },
    fixDoc() {
      this.fixDocFlag = false;
      /**需要从store里删除 */
      // alert(this.TempdocSequence)

      if (this.checkAdd()) {
        /**需要从store里删除 */
        var length = this.$store.state.alreadyDocs.length || 0;
        var _arr = this.$store.state.alreadyDocs;
        for (var i = 0; i < length; i++) {
          if (_arr[i].docSequence == this.$store.state.tempDocSeq) {
            _arr.splice(i, 1); //删除下标为i的元素
            break;
          }
        }
        /**需要从store里删除 */

        // this.$store.state.alreadyDocs.unshift({  docKeyWord:this.docForm.docAbout||'无文件信息',
        //   docSequence:this.docForm.docSequence ,
        //   docNumber:''})
        this.$store.state.alreadyDocs.unshift(Object.assign({}, this.docForm));

        var docObj = {
          // userId:JSON.stringify(sessionStorage.getItem("userId")),
          // userId: sessionStorage.getItem('userId'),
          userId: sessionStorage.getItem("userIdNum"),

          authId: sessionStorage.getItem("authId"),
          batchId: sessionStorage.getItem("batchId"),
          docDate: this.docForm.docDate,
          docNum: "", //件号
          docPage: this.docForm.docPage,
          docSequence: this.docForm.docSequence,
          docTitle: this.docForm.docTitle,
          docType: sessionStorage.getItem("docType"),
          keyword: this.docForm.keyword,
          remark: this.docForm.remark,
          deadline: this.docForm.deadline,
          docAbout: this.docForm.docAbout,
          docDesc:this.docForm.docDesc,
          // docDesc:
          //   this.docForm.docDescAuthor +
          //   "[" +
          //   this.docForm.docDate.substring(0, 4) +
          //   "]" +
          //   this.docForm.docDescNum +
          //   "号", //文号
          docPage: this.docForm.docPage,
          docDescAuthor: this.docForm.docDescAuthor,
          docDescNum: this.docForm.docDescNum,
          docLevel: this.docForm.docLevel,
          docSecret: this.docForm.docSecret,
          docTypeCode: sessionStorage.getItem("docTypeCode"),
          dutyAuthor: this.docForm.dutyAuthor,
          sortYear: this.docForm.sortYear,
        };
        var pathToDoc =
          "/document/" +
          sessionStorage.getItem("docType") +
          "/" +
          this.$store.state.tempDocId;
        this.putRequest(
          //注意防止重复提交
          pathToDoc,
          JSON.stringify(docObj)
        ).then((resp) => {
          console.log("修改文件");

          console.log(docObj);
          console.log("修改文件的结果");
          console.log(resp);
        });

        this.keyWordEdit = false;
        this.docForm.keyword = "";
        this.docForm.docSequence = this.genId(6, 62);
        this.docForm.docDate.replace("-", "");
        this.docForm.docTitle = "";
        this.docForm.docPage = "";
      } else {
        this.$message({
          type: "error",
          message: "填写完整",
        });
      }
    },
    docDescChange(e){
      // console.log(e)
      if(e==1){
        this.docForm.docDescNum=1
      }
      else if(e==0){
        this.docForm.docDescNum=0
        this.docForm.docDesc=''
      }
    },
    cancelFix(){
                  this.keyWordEdit = false;
            this.docForm.keyword = "";
            this.docForm.docDescNum="0";
            this.docForm.docSequence = this.genId(6, 62);
            this.docForm.docDate.replace("-", "");
            console.log(this.docForm);
            this.docForm.docTitle = "";
            this.docForm.docPage = "";
            this.fixDocFlag=false
    },
    addRS(){

    },
    addDocRS(){
      var docObj={
         userId: sessionStorage.getItem("userIdNum"),
          authId: sessionStorage.getItem("authId"),
          batchId: sessionStorage.getItem("batchId"),
          docDate: this.docFormRS.docDate,
          docNum: "", //????
          docPage: this.docFormRS.docPage,
          docSequence: this.docFormRS.docSequence,
          docTitle: this.docFormRS.docTitle,
          docType: sessionStorage.getItem("docType"),
          keyword: this.docFormRS.keyword,
          // remark: this.docForm.remark,
          // deadline: this.docForm.deadline,
          docAbout: this.docFormRS.docAbout,
          docAboutSub:this.docFormRS.docAboutSub,
          personName:this.docFormRS.personName,
          // docDesc:this.docForm.docDesc,
          // docPage: this.docForm.docPage,
          // docDescAuthor: this.docForm.docDescAuthor,
          // docDescNum: this.docForm.docDescNum,
          // docLevel: this.docForm.docLevel,
          // docSecret: this.docForm.docSecret,
          docTypeCode: sessionStorage.getItem("docTypeCode"),
          // dutyAuthor: this.docForm.dutyAuthor,
          // sortYear: this.docForm.sortYear,
      }

if (this.checkAddRS()) {
  this.showWaitingFlag=true

       var pathToDoc = "/document/" + sessionStorage.getItem("docType");
        this.postRequest(
          //注意防止重复提交
          pathToDoc,
          JSON.stringify(docObj)
        )
          .then((resp) => {
                        console.log("tijiao人事文件");

            console.log(docObj);
            console.log("tijiao人事文件的结果");
            console.log(resp);
            this.docFormRS.id = resp.data.id;
          }) .then((r) => {
               var table;
              if (this.weightForm.perKeywordWig) {
                //已有权重表
                this.getRequest("/weight/sort/" + this.weightForm.perKeywordWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table = resp.data.tables;
                    var key1 = this.docFormRS.keyword;
                    // var json1 = table;
                    if (table[key1] == null) {
                      table[key1] = "0";
                    }
                  })
                  .then((r) => {
                    var docAboutObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: 41,
                      tables: table,
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.perKeywordWig,
                      docAboutObj
                    ).then((resp) => {
                      console.log("更新人事关键词权重表");
                      console.log(resp);
                      this.showWaitingFlag=false
                    });
                  })
                  } //if  已有权重表

                  else{
                                    var key1 = this.docFormRS.keyword;
                var json1 = {};
                json1[key1] = "0";

              
      
                var keyWordObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: 41,
                  tables: json1,
                };

                this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(keyWordObj)
                )
                  .then((resp) => {
                    console.log("第一次提交人事关键词权重表");
                    console.log(resp);
                    if(resp.code==0){
                      this.showWaitingFlag=false
                    }
                  })
                 
                    
                       

                  }



          })
  
}else {
        this.$message({
          type: "error",
          message: "填写完整",
        });
      }

    },
    addDoc() {
      // var
      
      if (this.checkAdd()) {
        this.showWaitingFlag=true;
        // this.$store.state.alreadyDocs.unshift({  docKeyWord:this.docForm.docAbout||'无文件信息',
        //   docSequence:this.docForm.docSequence ,
        //   docNumber:''})
        var docObj = {
          // userId:JSON.stringify(sessionStorage.getItem("userId")),
          // userId: sessionStorage.getItem('userId'),
          userId: sessionStorage.getItem("userIdNum"),
          authId: sessionStorage.getItem("authId"),
          batchId: sessionStorage.getItem("batchId"),
          docDate: this.docForm.docDate,
          docNum: "", //????
          docPage: this.docForm.docPage,
          docSequence: this.docForm.docSequence,
          docTitle: this.docForm.docTitle,
          docType: sessionStorage.getItem("docType"),
          keyword: this.docForm.keyword,
          remark: this.docForm.remark,
          deadline: this.docForm.deadline,
          docAbout: this.docForm.docAbout,
          docDesc:this.docForm.docDesc,
          docPage: this.docForm.docPage,
          docDescAuthor: this.docForm.docDescAuthor,
          docDescNum: this.docForm.docDescNum,
          docLevel: this.docForm.docLevel,
          docSecret: this.docForm.docSecret,
          docTypeCode: sessionStorage.getItem("docTypeCode"),
          dutyAuthor: this.docForm.dutyAuthor,
          sortYear: this.docForm.sortYear,
        };
        var pathToDoc = "/document/" + sessionStorage.getItem("docType");
        this.postRequest(
          //注意防止重复提交
          pathToDoc,
          JSON.stringify(docObj)
        )
          .then((resp) => {
            console.log("tijiao文件");

            console.log(docObj);
            console.log("tijiao文件的结果");
            console.log(resp);
            this.docForm.id = resp.data.id;
            // alert( this.docForm.id)
          })
          .then((r) => {
            // if(r)
            //保证提交完返回id后再执行后续操作

            var weightType1;
            var weightType2;
            var weightType3;

            var kwTemp=this.docForm.keyword

            // if (sessionStorage.getItem("docType") == "official") {
            // if (true) {
if (sessionStorage.getItem("docType") == "official"){
                weightType1 = 11; //文书问题
              weightType2 = 12;
              weightType3 = 13;
}
if(sessionStorage.getItem("docType") == "science"){
                weightType1 = 21; 
              weightType2 = 22;
              weightType3 = 23;
}

if(sessionStorage.getItem("docType") == "business"){
                weightType1 = 31; 
              weightType2 = 32;
              weightType3 = 33;
}

            if (sessionStorage.getItem("docType") == "official") {

              var table;
              if (this.weightForm.docIssueWig) {
                //已有权重表
                this.getRequest("/weight/sort/" + this.weightForm.docIssueWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table = resp.data.tables;
                    var key1 = this.docForm.docAbout;
                    // var json1 = table;
                    if (table[key1] == null) {
                      table[key1] = "0";
                    }
                  })
                  .then((r) => {
                    var docAboutObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: weightType1,
                      tables: table,
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.docIssueWig,
                      docAboutObj
                    ).then((resp) => {
                      console.log("更新文书问题权重表");
                      console.log(resp);
                    });
                  });

                /**责任者
                 *
                 */
                var table2;
                this.getRequest("/weight/sort/" + this.weightForm.docAuthorWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table2 = resp.data.tables;
                    var key2 = this.docForm.dutyAuthor;
                    // var json1 = table;
                    if (table2[key2] == null) {
                      table2[key2] = "0";
                    }
                  })
                  .then((r) => {
                    var dutyAuthorObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: weightType2,
                      tables: table2,
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.docAuthorWig,
                      dutyAuthorObj
                    ).then((resp) => {
                      console.log("更新文书责任者权重表");
                      console.log(resp);
                    });
                  });

                var table3;
                this.getRequest("/weight/sort/" + this.weightForm.docKeywordWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table3 = resp.data.tables;
                    var key3 = kwTemp
                    // var json1 = table;
                    if (table3[key3] == null) {
                      table3[key3] = "0";
                    }

                    console.log(key3);

                    console.log(table3);
                  })
                  .then((r) => {
                    var keyWordObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: weightType3,
                      tables: table3,
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.docKeywordWig,
                      keyWordObj
                    ).then((resp) => {
                      console.log("更新文书关键词权重表");
                      console.log(resp);
                    });
                  }).then(r=>{
                    this.showWaitingFlag=false;
                  });
              } else {
                //第一次录入
                var key1 = this.docForm.docAbout;
                var json1 = {};
                json1[key1] = "0";

                var key2 = this.docForm.dutyAuthor;
                var json2 = {};
                json2[key2] = "0";

                var key3 = this.docForm.keyword;
                var json3 = {};
                json3[key3] = "0";

                var docAboutObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: weightType1,
                  tables: json1,
                };

                var dutyAuthorObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: weightType2,
                  tables: json2,
                };

                var keyWordObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: weightType3,
                  tables: json3,
                };

                this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(docAboutObj)
                )
                  .then((resp) => {
                    console.log("提交问题权重表");
                    console.log(resp);
                  })
                  .then((r) => {
                    this.postRequest(
                      //注意防止重复提交
                      "/weight",
                      JSON.stringify(dutyAuthorObj)
                    )
                      .then((resp) => {
                        console.log("提交责任者权重表");
                        console.log(resp);
                      })
                      .then((r) => {
                        this.postRequest(
                          //注意防止重复提交
                          "/weight",
                          JSON.stringify(keyWordObj)
                        ).then((resp) => {
                          console.log("提交关键词权重表");
                          console.log(resp);
                          this.weightForm = resp.data;
                        }).then(r=>{
                          this.showWaitingFlag=false;
                        });
                      });
                  });
              }
            } //doctype==official if

            if (sessionStorage.getItem("docType") == "business") {

              var table;
              if (this.weightForm.busProjectWig) {
                //已有权重表
                this.getRequest("/weight/sort/" + this.weightForm.busProjectWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table = resp.data.tables;
                    var key1 = this.docForm.docAbout;
                    // var json1 = table;
                    if (table[key1] == null) {
                      table[key1] = "0";
                    }
                  })
                  .then((r) => {
                    var docAboutObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: weightType1,
                      tables: table,
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.busProjectWig,
                      docAboutObj
                    ).then((resp) => {
                      console.log("更新业务问题权重表");
                      console.log(resp);
                    });
                  });

                /**责任者
                 *
                 */
                var table2;
                this.getRequest("/weight/sort/" + this.weightForm.busAuthorWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table2 = resp.data.tables;
                    var key2 = this.docForm.dutyAuthor;
                    // var json1 = table;
                    if (table2[key2] == null) {
                      table2[key2] = "0";
                    }
                  })
                  .then((r) => {
                    var dutyAuthorObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: weightType2,
                      tables: table2,
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.busAuthorWig,
                      dutyAuthorObj
                    ).then((resp) => {
                      console.log("更新文书责任者权重表");
                      console.log(resp);
                    });
                  });

                var table3;
                this.getRequest("/weight/sort/" + this.weightForm.busKeywordWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table3 = resp.data.tables;
                    var key3 = kwTemp
                    // var json1 = table;
                    if (table3[key3] == null) {
                      table3[key3] = "0";
                    }

                    console.log(key3);

                    console.log(table3);
                  })
                  .then((r) => {
                    var keyWordObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: weightType3,
                      tables: table3,
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.busKeywordWig,
                      keyWordObj
                    ).then((resp) => {
                      console.log("更新文书关键词权重表");
                      console.log(resp);
                    });
                  }).then(r=>{
                    this.showWaitingFlag=false;
                  });
              } else {
                //第一次录入
                var key1 = this.docForm.docAbout;
                var json1 = {};
                json1[key1] = "0";

                var key2 = this.docForm.dutyAuthor;
                var json2 = {};
                json2[key2] = "0";

                var key3 = this.docForm.keyword;
                var json3 = {};
                json3[key3] = "0";

                var docAboutObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: weightType1,
                  tables: json1,
                };

                var dutyAuthorObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: weightType2,
                  tables: json2,
                };

                var keyWordObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: weightType3,
                  tables: json3,
                };

                this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(docAboutObj)
                )
                  .then((resp) => {
                    console.log("提交问题权重表");
                    console.log(resp);
                  })
                  .then((r) => {
                    this.postRequest(
                      //注意防止重复提交
                      "/weight",
                      JSON.stringify(dutyAuthorObj)
                    )
                      .then((resp) => {
                        console.log("提交责任者权重表");
                        console.log(resp);
                      })
                      .then((r) => {
                        this.postRequest(
                          //注意防止重复提交
                          "/weight",
                          JSON.stringify(keyWordObj)
                        ).then((resp) => {
                          console.log("提交关键词权重表");
                          console.log(resp);
                          this.weightForm = resp.data;
                        }).then(r=>{
                          this.showWaitingFlag=false;
                        });
                      });
                  });
              }
            } //doctype==business if





   if (sessionStorage.getItem("docType") == "science") {

              var table;
              if (this.weightForm.tecProjectWig) {
                //已有权重表
                this.getRequest("/weight/sort/" + this.weightForm.tecProjectWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table = resp.data.tables;
                    var key1 = this.docForm.docAbout;
                    // var json1 = table;
                    if (table[key1] == null) {
                      table[key1] = "0";
                    }
                  })
                  .then((r) => {
                    var docAboutObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: weightType1,
                      tables: table,
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.tecProjectWig,
                      docAboutObj
                    ).then((resp) => {
                      console.log("更新科技项目权重表");
                      console.log(resp);
                    });
                  });

                /**责任者
                 *
                 */
                var table2;
                this.getRequest("/weight/sort/" + this.weightForm.tecAuthorWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table2 = resp.data.tables;
                    var key2 = this.docForm.dutyAuthor;
                    // var json1 = table;
                    if (table2[key2] == null) {
                      table2[key2] = "0";
                    }
                  })
                  .then((r) => {
                    var dutyAuthorObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: weightType2,
                      tables: table2,
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.tecAuthorWig,
                      dutyAuthorObj
                    ).then((resp) => {
                      console.log("更新科技责任者权重表");
                      console.log(resp);
                    });
                  });

                var table3;
                this.getRequest("/weight/sort/" + this.weightForm.tecKeywordWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table3 = resp.data.tables;
                    var key3 = kwTemp
                    // var json1 = table;
                    if (table3[key3] == null) {
                      table3[key3] = "0";
                    }

                    console.log(key3);

                    console.log(table3);
                  })
                  .then((r) => {
                    var keyWordObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: weightType3,
                      tables: table3,
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.tecKeywordWig,
                      keyWordObj
                    ).then((resp) => {
                      console.log("更新科技关键词权重表");
                      console.log(resp);
                    });
                  }).then(r=>{
                    this.showWaitingFlag=false;
                  });
              } else {
                //第一次录入
                var key1 = this.docForm.docAbout;
                var json1 = {};
                json1[key1] = "0";

                var key2 = this.docForm.dutyAuthor;
                var json2 = {};
                json2[key2] = "0";

                var key3 = this.docForm.keyword;
                var json3 = {};
                json3[key3] = "0";

                var docAboutObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: weightType1,
                  tables: json1,
                };

                var dutyAuthorObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: weightType2,
                  tables: json2,
                };

                var keyWordObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: weightType3,
                  tables: json3,
                };

                this.postRequest(
                  //注意防止重复提交
                  "/weight",
                  JSON.stringify(docAboutObj)
                )
                  .then((resp) => {
                    console.log("提交问题权重表");
                    console.log(resp);
                  })
                  .then((r) => {
                    this.postRequest(
                      //注意防止重复提交
                      "/weight",
                      JSON.stringify(dutyAuthorObj)
                    )
                      .then((resp) => {
                        console.log("提交责任者权重表");
                        console.log(resp);
                      })
                      .then((r) => {
                        this.postRequest(
                          //注意防止重复提交
                          "/weight",
                          JSON.stringify(keyWordObj)
                        ).then((resp) => {
                          console.log("提交关键词权重表");
                          console.log(resp);
                          this.weightForm = resp.data;
                        }).then(r=>{
                          this.showWaitingFlag=false;
                        });
                      });
                  });
              }
            } //doctype==science if




            this.$store.state.alreadyDocs.unshift(
              Object.assign({}, this.docForm)
            );
            this.keyWordEdit = false;
            this.docForm.keyword = "";
            this.docForm.docDescNum="0";
            this.docForm.docSequence = this.genId(6, 62);
            this.docForm.docDate.replace("-", "");
            console.log(this.docForm);
            this.docForm.docTitle = "";
            this.docForm.docPage = "";
          });
      } else {
        this.$message({
          type: "error",
          message: "填写完整",
        });
      }
    },

    docAboutBlur() {
      if (this.docForm.keyword != "" && this.docForm.docAbout != "") {
        //todo1  查询是否有关键字

        var tip = "";
        if (true) {
          this.manageKeyWordTime++;
          if (this.manageKeyWordTime % 10 == 0) {
            this.$confirm(
              "检测到10个新的关键字：" +
                this.docForm.keyword +
                " , 和对应分类" +
                this.docForm.docAbout +
                "，是否添加入库，以便更快录入",
              "提示",
              {
                cancelButtonClass: "btn-custom-cancel",
                confirmButtonText: "前往管理",
                cancelButtonText: "我稍后前往",
                type: "warning",
              }
            )
              .then(() => {
                this.$router.push("/work/keyWM");

                // this.$message({
                //   type: "success",
                //   message: "已添加"
                // });
              })
              .catch(() => {});
          }
        }
      }
    },
    titleComplete() {
      if (this.docForm.docTitle == "") {
        this.keyWordEdit = false;
      } else this.keyWordEdit = true;
    },

    checkTitle() {},
    genID(length) {
      return Number(
        Math.random().toString().substr(3, length) + Date.now()
      ).toString(36);
    },
    genId(len, radix) {
      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
      var uuid = [],
        i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
          }
        }
      }

      return uuid.join("");
    },

    inputChange() {
      this.aiInput = !this.aiInput;
    },
  },
  created() {
    this.docTimeDues=[]
    var deadlineJson=JSON.parse(sessionStorage.getItem("lastBox"))
    // console.log(JSON.parse(deadlineJson))
    let attr;
    
     for (attr in deadlineJson) {
      this.docTimeDues.push(attr);
    }

    console.log(this.docTimeDues)

    // return

    this.getRequest("/organ/" + sessionStorage.getItem("authId")).then(
      (resp) => {
        this.weightForm = resp.data;
        console.log(resp.data)
      }
    );



    this.docForm.docSequence = this.genId(6, 62);
    this.docFormRS.docSequence = this.genId(6, 62);

    if (this.$store.state.tempDoc) {
      this.fixDocFlag = true;
      console.log(this.$store.state.tempDoc);
      this.docForm = Object.assign({}, this.$store.state.tempDoc);
      this.$store.state.tempDoc = "";
    }
  },
};
</script>

<style lang="scss">
.el-textarea__inner {
  &::placeholder {
    color: rgba(116, 86, 86, 0.507);
  }

  &::-webkit-input-placeholder {
    /* WebKit browsers 适配谷歌 */
    color: rgba(116, 86, 86, 0.507) !important;
  }

  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 适配火狐 */
    color: rgba(116, 86, 86, 0.507) !important;
  }

  &::-moz-placeholder {
    /* Mozilla Firefox 19+ 适配火狐 */
    color: rgba(116, 86, 86, 0.507) !important;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10+  适配ie*/
    color: rgba(116, 86, 86, 0.507) !important;
  }
}
.docInForm >>> .el-input__inner {
  border: 0.08rem solid #274596c5 !important;
}
.docInForm {
  .textArea {
    height: 5rem;
  }

  .el-select {
    width: 100%;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 3.3rem;
  }

  .el-input__inner {
    &::placeholder {
      color: rgba(116, 86, 86, 0.507);
    }

    &::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      color: rgba(116, 86, 86, 0.507);
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      color: rgba(116, 86, 86, 0.507);
    }

    &::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      color: rgba(116, 86, 86, 0.507);
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: rgba(116, 86, 86, 0.507);
    }
  }

  .el-input__inner {
    background: rgba(255, 255, 255, 0.15) !important;
    border-radius: 0.48rem;
    border: 0.08rem solid rgba(33, 57, 94, 0.74);
    height: 2.5rem !important;
    color: rgb(83, 17, 17);
    font-size: 1.1rem;
    padding-left: 3.3rem;
  }
  .el-textarea__inner {
    background: rgba(255, 255, 255, 0.15) !important;
    border-radius: 0.48rem;
    // border: 0.08rem solid #274596c5 !important;
    border: solid 0.08rem;
    border-color: rgba(33, 57, 94, 0.74);
    // height: 2.5rem !important;
    color: rgba(3, 7, 24, 0.788);
    font-size: 1.1rem;
    padding-left: 3.3rem;
    resize: none;
  }

  .textAreaInput {
    background: rgba(255, 255, 255, 0.15) !important;
    // border-radius: 0.48rem;
    // border: 0.08rem solid #274596c5;
    // height: 5rem !important;
    // color: rgb(83, 17, 17);
    // font-size: 1.1rem;
    // padding-left: 3.3rem;
  }

  .el-form-item__label {
    line-height: 3rem !important;
  }
  .el-form-item__content {
    // height: 3rem !important;
  }
}
</style>


<style lang="scss" scoped>
// .detailBox{
//   width: 100%;
//   height: 50rem;
//   z-
// }

.docSequenceTip {
  position: absolute;
  left: 2rem;
  top: 1rem;
}

.buttonGroup {
  position: relative;
  bottom: 0;

  .bottomButton {
    display: flex;
  }
}

.keyWordSelect {
  width: 60rem;
  height: 8rem;
  padding-bottom: 2rem;

  position: absolute;
  top: 6rem;
  left: 50%;
  margin-left: -25rem;
  background-color: rgb(92, 96, 160);
  z-index: 3;

  .keywords {
    width: 10rem;
    height: 1.6rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    // position: absolute;
    float: left;

    z-index: 3;
    // background-color: #fff;
  }

  .keyWordsTimer {
    position: absolute;
    width: 10rem;
    height: 1.6rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    bottom: 0;
    right: 0;
    background-color: rgb(92, 96, 160);
    z-index: 3;
  }
}

.el-date-editor.el-input {
  width: 100%;
}

.el-date-editor.el-input__inner {
  padding-left: 3.3rem;
}

.docTypeTitle {
  position: absolute;
  width: 50rem;
  left: 50%;
  margin-left: -25rem;
  font-size: 1.2rem;
  top: -2.5rem;
  text-align: center;
}
.docInForm {
  position: relative;
  padding-top: 4rem;
  top: 5rem;
  left: 20%;
  // height: 20rem;
  padding-bottom: 2rem;

  width: 65rem;
  padding-right: 5rem;
  border: solid 1px;
}

.wrapper {
  height: 150vh;

  position: relative;
  background-color: rgb(195, 204, 228);
}
</style>