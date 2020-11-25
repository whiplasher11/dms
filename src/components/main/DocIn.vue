<template>
  <div class="wrapper">
    <Left></Left>

    <div class="detailBox"></div>

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
      提交中，请稍候...
    </div>
    <!-- 录入提示 -->
    <div
      typeInTipBox
      v-if="tipShowFlag"
      style="
        position: absolute;
        top: 30vh;
        left: 40rem;

        z-index: 122;
        padding-top: 1rem;
        color: #333;
        font-size: 1.5rem;
        width: 20rem;

        background-color: rgb(209, 218, 243);
        -webkit-box-shadow: 0 0 0.5rem #909399;
        box-shadow: 0 0 0.5rem #909399;
        border-radius: 1rem;
      "
    >
      <div
        style="font-size: 1rem; height: 2rem; width: 100%; text-align: center"
      >
        智能匹配:
      </div>
      <!-- <div style="font-size:1rem;text-align:center;width:100%;line-height:2rem">
            关键词 : 问题/机构/项目
          </div> -->
      <div
        v-for="(item, index) in matchedKV"
        :key="index"
        class="matchedKVClass"
      >
        <div
          @click="selectThisTip(item)"
          style="
            font-size: 1rem;
            text-align: center;
            width: 80%;
            margin-left: 10%;
            line-height: 2rem;
          "
          class="matchedItem"
        >
          {{ item[0] }}:{{ item[1] }}
        </div>
      </div>
      <div
        style="
          height: 2rem;
          text-align: right;
          font-size: 0.8rem;
          line-height: 2rem;
          cursor: pointer;
        "
        @click="closeTip"
      >
        关闭&nbsp;
      </div>
    </div>

    <div class="keyWordSelect" v-if="false">
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>

      <div class="keyWordsTimer">3秒后消失</div>
    </div>

    <el-form
      v-if="!isRS"
      class="docInForm"
      ref="docForm"
      :model="docForm"
      label-width="10rem"
    >
      <!-- <div class="docTypeTitle">sessionStorage批次</div> -->
      <div class="docSequenceTip">
        该批次文件唯一序列号：{{ this.docForm.docSequence }}
      </div>

      <el-checkbox
        style="position: absolute; right: 1rem; top: 1rem"
        v-if="false"
        @change="inputChange"
        false-label="0"
        true-label="1"
        :checked="false"
        >对应规则存入对照表</el-checkbox
      >

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
              placeholder="请先填写文件标题"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12" v-if="!isKJ">
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
        <el-col :span="12" v-if="isKJ">
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
              @change="selectDateChange"
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
              @change="selectDateChange"
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
              style="position: absolute; left: 2rem; top: 0.5rem"
              v-if="true"
              @change="docDescChange"
              false-label="0"
              true-label="1"
              :checked="false"
            ></el-checkbox>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            prop="batchName"
            v-if="docForm.docDescNum == 1"
            label="文号"
          >
            <el-input
              size="normal"
              type="text"
              v-model="docForm.docDesc"
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
          v-model="docForm.remark"
          auto-complete="off"
          placeholder="输入备注"
        ></el-input>
      </el-form-item>

      <div class="buttonGroup">
        <el-button
          type="warning"
          v-if="fixDocFlag"
          size="big"
          style="margin-left: 40%"
          @click="fixDoc"
          >修改档案</el-button
        >
        <el-button
          type="success"
          v-if="!fixDocFlag"
          size="big"
          style="margin-left: 30%"
          @click="addDoc"
          >添加档案</el-button
        >

        <el-button
          type="primary"
          size="big"
          style="margin-left: 10%"
          @click="resetDocIn"
          v-if="!fixDocFlag"
          >清空列表</el-button
        >
        <el-button
          type="primary"
          size="big"
          style="margin-left: 10%"
          @click="goDetail"
          v-if="!fixDocFlag"
          >结束录入</el-button
        >

        <el-button
          type="primary"
          size="big"
          style="margin-left: 10%"
          @click="cancelFix"
          v-if="fixDocFlag"
          >取消修改</el-button
        >
      </div>
    </el-form>

    <el-form
      v-if="isRS"
      class="docInForm"
      ref="docForm"
      :model="docFormRS"
      label-width="10rem"
    >
      <!-- <div class="docTypeTitle">sessionStorage批次</div> -->
      <div class="docSequenceTip">
        本份文件唯一序列号：{{ this.docFormRS.docSequence }}
      </div>

      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item prop="batchName" label="材料标题：">
            <el-input
              @blur="titleComplete"
              size="normal"
              type="text"
              v-model="docFormRS.docTitle"
              auto-complete="off"
              placeholder="根据材料填写"
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
      <el-row :gutter="24"></el-row>

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
            <el-select
              v-model="docFormRS.docAboutSub"
              placeholder="选择子材料类别"
            >
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
      <el-row>
        <el-form-item class="textArea" prop="batchName" label="备注信息：">
          <el-input
            type="textarea"
            :rows="2"
            class="textAreaInput"
            v-model="docFormRS.remark"
            auto-complete="off"
            placeholder="输入备注"
          ></el-input>
        </el-form-item>
      </el-row>
      <!-- <el-form-item class="textArea" prop="batchName" label="备注信息：">
        <el-input
          type="textarea"
          :rows="2"
          class="textAreaInput"
          v-model="docFormRS.remark"
          auto-complete="off"
          placeholder="输入备注"
        ></el-input>
      </el-form-item>-->

      <div class="buttonGroup">
        <el-button
          type="warning"
          v-if="fixDocFlag"
          size="big"
          style="margin-left: 30%"
          @click="fixDocRS"
          >修改档案</el-button
        >
        <el-button
          type="success"
          v-if="!fixDocFlag"
          size="big"
          style="margin-left: 20%"
          @click="addDocRS"
          >添加档案</el-button
        >

        <el-button
          type="primary"
          size="big"
          style="margin-left: 20%"
          @click="resetDocInRS"
          v-if="!fixDocFlag"
          >清空列表</el-button
        >

        <el-button
          type="warning"
          v-if="!fixDocFlag"
          size="big"
          style="margin-left: 20%"
          @click="goDetail"
          >结束录入</el-button
        >

        <el-button
          type="primary"
          size="big"
          style="margin-left: 10%"
          @click="cancelFixRS"
          v-if="fixDocFlag"
          >取消修改</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import Utils from "../../utils/doc.js";
import Left from "../common/History";
import axios from "axios";
// import { delete } from 'vue/types/umd';

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
      that.docFormRS = Object.assign({}, doc);

      that.fixDocFlag = true;
      that.$store.state.tempDocSeq = doc.docSequence;
      that.$store.state.tempDocId = doc.id; //id用来修改文件

      // alert(that.TempdocSequence)
    });
  },
  watch: {
    edocFormRSJS: {
      handler: (v, o) => {
        console.log(v.docAbout);
        console.log(o);
      },
      deep: true,
    },
    docFormRSJS: {
      handler(val, oldVal) {
        // console.log(val);
        // console.log(oldVal);

        // if (val.docAbout != oldVal.docAbout) {
        //   this.docFormRS.docAboutSub = "";
        // }

        // console.log(val);
        if (val.docAbout == "工资、任免、退休材料") {
          this.RSSubTypes = this.RSSubTypesOrigin;
        } else if (val.docAbout == "学历学位、评聘专业职务材料") {
          this.RSSubTypes = [
            {
              name: "学历学位材料",
              value: "学历学位材料",
            },
            {
              name: "职称材料",
              value: "职称材料",
            },
          ];
        } else {
          this.docFormRS.docAboutSub = "无";
          this.RSSubTypes = [
            {
              name: "无",
              value: "无",
            },
          ];
        }

        if (
          val.docAbout == "学历学位、评聘专业职务材料" &&
          oldVal.docAbout != "学历学位、评聘专业职务材料"
        ) {
          this.docFormRS.docAboutSub = "";
        }
        if (
          val.docAbout == "工资、任免、退休材料" &&
          oldVal.docAbout != "工资、任免、退休材料"
        ) {
          this.docFormRS.docAboutSub = "";
        }
      },
      deep: true,
    },
  },

  computed: {
    docFormRSJS() {
      return JSON.parse(JSON.stringify(this.docFormRS));
    },
    isRS() {
      return sessionStorage.getItem("docType") == "personnel";
    },
    isKJ() {
      return sessionStorage.getItem("docType") == "science";
    },
  },

  data() {
    return {
      addDocBtnFlg:true,
      kwInTitle:[],
      rsDocTypeMain:"",
      matchedKV: [],
      tipShowFlag: false,
      keywordTemp: "",
      searchForm: {
        batchId: sessionStorage.getItem("batchId"),
        docSequence: "",
        docTitle: "",
        docDesc: "",
        docDate: "",
        dutyAuthor: "",
        docType: "",
        personName: "",
      },
      docFormRS: {
        id: "",
        docSequence: "", //序列号，标识文件
        docType: "",
        docTitle: "填写标题", //标题
        docAbout: "",
        docAboutSub: "",
        keyword: "关键字", //关键字
        // docDesc: "", //文号
        // sortYear: "2019",
        docDate: "20180808",
        docTypeCode: sessionStorage.getItem("docTypeCode"),

        docSecret: "", //文件密级
        docPage: "",
        remark: "", //备注
        docNum: "", //件号
        personName: "",
        docDescNum: "0", //文号中的序号
      },
      docFormRSKong: {
        id: "",
        docSequence: "", //序列号，标识文件
        docType: "",
        docTitle: "", //标题
        docAbout: "",
        docAboutSub: "",
        keyword: "", //关键字
        // docDesc: "", //文号
        // sortYear: "2019",
        docDate: "20190808",
        docTypeCode: sessionStorage.getItem("docTypeCode"),

        docSecret: "", //文件密级
        docPage: "",
        remark: "", //备注
        docNum: "", //件号
        personName: "",
        docDescNum: "0", //文号中的序号
      },

      showWaitingFlag: false,
      weightForm: {},
      manageKeyWordTime: 1,
      keyWordEdit: false,
      fixDocFlag: false,
      RSSubTypesOrigin: [
        {
          name: "工资情况材料",
          value: "工资情况材料",
        },
        {
          name: "任免材料",
          value: "任免材料",
        },
        {
          name: "出国、出境材料",
          value: "出国、出境材料",
        },
        {
          name: "各党派、团体代表登记表",
          value: "各党派、团体代表登记表",
        },
        {
          name: "聘用、录用、转干、转业材料",
          value: "聘用、录用、转干、转业材料",
        },
        {
          name: "待遇、退（离）休、退职材料",
          value: "待遇、退（离）休、退职材料",
        },
      ],
      RSSubTypes: [
        {
          name: "工资情况材料",
          value: "工资情况材料",
        },
        {
          name: "任免材料",
          value: "任免材料",
        },
        {
          name: "出国、出境材料",
          value: "出国、出境材料",
        },
        {
          name: "各党派、团体代表登记表",
          value: "各党派、团体代表登记表",
        },
        {
          name: "聘用、录用、转干、转业材料",
          value: "聘用、录用、转干、转业材料",
        },
        {
          name: "待遇、退（离）休、退职材料",
          value: "待遇、退（离）休、退职材料",
        },
      ],
      RSTypes: [
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
        docTitle: "请填写文件标题", //标题
        docAbout: "填写",
        keyword: "关键词", //关键字
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
        remark: "", //备注
        docNum: "", //件号
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
        remark: "", //备注
        docNum: "", //件号
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
    getRsText(code) {
      if (code == 1 || code == "1") {
        this.rsDocTypeMain="履历材料"
        
        return "无";}
      if (code == 2 || code == "2"){
        this.rsDocTypeMain="自传材料"

         return "无";
      }
      if (code == 3 || code == "3") {
        this.rsDocTypeMain="鉴定、考核、考察材料"

        return "无";
      }
      if (code == 4 || code == "4") {
        this.rsDocTypeMain="学历学位、评聘专业职务材料"

        return "学历学位材料";
      }
      if (code == 5 || code == "5") {
        this.rsDocTypeMain="学历学位、评聘专业职务材料"

        return "职称材料"; //return 子材料
      } 
      if (code == 6 || code == "6") 
       {
        this.rsDocTypeMain="政治历史情况审查材料"

        return "无";
      }
      if (code == 7 || code == "7") {
        this.rsDocTypeMain="入党入团材料"
        return "无";

      }
      if (code == 8 || code == "8"){
        this.rsDocTypeMain="奖励材料"
        return "无";

      }
      if (code == 9 || code == "9"){
                this.rsDocTypeMain="处分材料"
        return "无";
      }  
      if (code == 10 || code == "10"){
        this.rsDocTypeMain="工资、任免、退休材料"

        return "工资情况材料"; //return 子材料
      }   
      if (code == 11 || code == "11") {
        this.rsDocTypeMain="工资、任免、退休材料"

        return "任免材料"; //return 子材料
      }  
      if (code == 12 || code == "12")  {
        this.rsDocTypeMain="工资、任免、退休材料"

        return "出国、出境材料"; //return 子材料
      } 
      if (code == 13 || code == "13") {
        this.rsDocTypeMain="工资、任免、退休材料"

        return "各党派、团体代表登记表"; //return 子材料
      }  
      if (code == 14 || code == "14"){
        this.rsDocTypeMain="工资、任免、退休材料"

        return "聘用、录用、转干、转业材料"; //return 子材料
      }   
      if (code == 15 || code == "15"){
        this.rsDocTypeMain="工资、任免、退休材料"

        return "待遇、退（离）休、退职材料"; //return 子材料
      }    
      if (code == 16 || code == "16") {
                this.rsDocTypeMain="其他可供参考的材料"
        return "无";
      }
    },
    closeTip() {
      this.tipShowFlag = false;
    },
    selectDateChange(id) {
      var docDateYear = this.docForm.docDate.substring(0, 4);
      console.log(docDateYear);
      console.log(this.docForm.sortYear);
      if(docDateYear==null||this.docForm.sortYear==null){
        return
      }

      if (docDateYear > this.docForm.sortYear) {
        this.$confirm("发文日期不能迟于整档年度", "提示", {
          cancelButtonClass: "btn-custom-cancel",
          confirmButtonText: "好的",
          cancelButtonText: "忽略此条规则",
          type: "warning",
        }).then(() => {
          this.docForm.docDate = 20190808 + "";
          this.docForm.sortYear = 2019 + "";
        });
      }
    },
    resetDocInRS() {
      this.docFormRSKong.docSequence = this.docFormRS.docSequence;
      this.docFormRS = Object.assign({}, this.docFormRSKong);
    },
    resetDocIn() {
      this.docFormKong.docSequence = this.docForm.docSequence;
      this.docForm = Object.assign({}, this.docFormKong);
      // console.log(this.docFormKong);
    },
    checkAddRS() {
      if (
        this.docFormRS.personName == "" ||
        this.docFormRS.docPage == "" ||
        this.docFormRS.docDate == "" ||
        this.docFormRS.docTitle == "" ||
        this.docFormRS.docAboutSub == "" ||
        this.docFormRS.docAbout == "" ||
        this.docFormRS.keyword == ""
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
        this.docForm.deadline == "" ||
        this.docForm.docSecret == ""
      )
        return false;
      else return true;
    },
    fixDocRS() {
      // this.fixDocFlag = false;

      var jobCode;
      if (this.docFormRS.docAbout == "履历材料") {
        jobCode = 1;
      } else if (this.docFormRS.docAbout == "自传材料") {
        jobCode = 2;
      } else if (this.docFormRS.docAbout == "鉴定、考核、考察材料") {
        jobCode = 3;
      }
      // else if (this.docFormRS.docAbout == "学历学位、评聘专业职务材料") {
      //   jobCode = 4;
      // }
      else if (this.docFormRS.docAbout == "政治历史情况审查材料") {
        jobCode = 6;
      } else if (this.docFormRS.docAbout == "入党入团材料") {
        jobCode = 7;
      } else if (this.docFormRS.docAbout == "奖励材料") {
        jobCode = 8;
      } else if (this.docFormRS.docAbout == "处分材料") {
        jobCode = 9;
      } else if (this.docFormRS.docAbout == "其他可供参考的材料") {
        jobCode = 16;
      }

      if (this.docFormRS.docAboutSub == "学历学位材料") {
        jobCode = 4;
      } else if (this.docFormRS.docAboutSub == "职称材料") {
        jobCode = 5;
      }

      if (this.docFormRS.docAboutSub == "工资情况材料") {
        jobCode = 10;
      }
      if (this.docFormRS.docAboutSub == "任免材料") {
        jobCode = 11;
      }
      if (this.docFormRS.docAboutSub == "出国、出境材料") {
        jobCode = 12;
      }
      if (this.docFormRS.docAboutSub == "各党派、团体代表登记表") {
        jobCode = 13;
      }
      if (this.docFormRS.docAboutSub == "聘用、录用、转干、转业材料") {
        jobCode = 14;
      }
      if (this.docFormRS.docAboutSub == "待遇、退（离）休、退职材料") {
        jobCode = 15;
      }

      var docObj = {
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
        docAbout: this.docFormRS.docAbout,
        docAboutSub: this.docFormRS.docAboutSub,
        personName: this.docFormRS.personName,
        personJob: jobCode,
        remark: this.docFormRS.remark,
        docTypeCode: sessionStorage.getItem("docTypeCode"),
      };

      if (this.checkAddRS()) {
         var keywordIssueJson
        this.showWaitingFlag = true;
        var pathToDoc =
          "/document/" +
          sessionStorage.getItem("docType") +
          "/" +
          this.$store.state.tempDocId; //提交的时候返回id，左侧栏点击的时候放在tempDocId
        this.putRequest(
          //注意防止重复提交
          pathToDoc,
          JSON.stringify(docObj)
        )
          .then((resp) => {
            console.log("修改人事文件");

            console.log(docObj);
            console.log("修改人事文件的结果");
            console.log(resp);

            if (resp.code == 0) {
              var table;
              if (this.weightForm.perKeywordWig) {
                //已有权重表
                this.getRequest("/weight/keywordSort/" + this.weightForm.perKeywordWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table = resp.data.tables;
                    var key1 = this.docFormRS.keyword;
                    keywordIssueJson=resp.keywordIssue
                    if(keywordIssueJson==null){keywordIssueJson={}}  //fixRs
                      keywordIssueJson[key1]=jobCode

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
                      keywordIssue:keywordIssueJson, //
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.perKeywordWig,
                      docAboutObj
                    ).then((resp) => {
                      console.log("更新人事关键词权重表");
                      console.log(resp);
                      this.showWaitingFlag = false;
                    });
                  });
              } //if  已有权重表
              // else {
              //   var key1 = this.docFormRS.keyword;
              //   var json1 = {};
              //   json1[key1] = "0";

              //   var keyWordObj = {
              //     authId: sessionStorage.getItem("authId"),
              //     type: 41,
              //     tables: json1,
              //   };

              //   this.postRequest(
              //     //注意防止重复提交
              //     "/weight",
              //     JSON.stringify(keyWordObj)
              //   ).then((resp) => {
              //     console.log("第一次提交人事关键词权重表");
              //     console.log(resp);
              //     // console.log(this.weightForm=resp)
              //     this.weightForm = resp.data;
              //     if (resp.code == 0) {
              //       this.showWaitingFlag = false;
              //     }
              //   });
              // }

              var length = this.$store.state.alreadyDocs.length || 0;
              var _arr = this.$store.state.alreadyDocs;
              for (var i = 0; i < length; i++) {
                if (_arr[i].docSequence == this.$store.state.tempDocSeq) {
                  _arr.splice(i, 1); //删除下标为i的元素
                  break;
                }
              }
              this.$store.state.alreadyDocs.unshift(
                Object.assign({}, this.docFormRS)
              );
            }

            // this.docFormRS.id = resp.data.id;  //修改文件用
          })
          .then((r) => {
            this.getRequest("/work/" + sessionStorage.getItem("batchId")) //
              .then((resp) => {
                // this.
              });

            this.docFormRS.docTitle = "";
            this.docFormRS.docPage = "";
            this.genId(6, 62);
            this.docFormRS.docDate.replace("-", "");

            this.showWaitingFlag = false;

            // console.log(this.docFormRS);
            // this.docForm.docTitle = "";
            // this.docForm.docPage = "";
          });
      } else {
        this.showWaitingFlag = false;
        this.$message({
          type: "error",
          message: "填写完整",
        });
      }
    },
    fixDoc() {
      this.showWaitingFlag = true;
      /**需要从store里删除 */
      // alert(this.TempdocSequence)

      if (this.checkAdd()) {
        /**需要从store里删除 */

        /**需要从store里删除 */

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
          docNum: "", //件号
          docPage: this.docForm.docPage,
          docSequence: this.docForm.docSequence,
          docTitle: this.docForm.docTitle,
          docType: sessionStorage.getItem("docType"),
          keyword: this.docForm.keyword,
          remark: this.docForm.remark,
          deadline: this.docForm.deadline,
          docAbout: this.docForm.docAbout,
          docDesc: this.docForm.docDesc,
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
        )
          .then((resp) => {
            console.log("修改文件");

            console.log(docObj);
            console.log("修改文件的结果");
            console.log(resp);
            if (resp.code == 0) {
              var length = this.$store.state.alreadyDocs.length || 0;
              var _arr = this.$store.state.alreadyDocs;
              for (var i = 0; i < length; i++) {
                if (_arr[i].docSequence == this.$store.state.tempDocSeq) {
                  _arr.splice(i, 1); //删除下标为i的元素
                  break;
                }
              }
              this.$store.state.alreadyDocs.unshift(
                Object.assign({}, this.docForm)
              );

              this.fixDocFlag = false;
              this.showWaitingFlag = false;

              this.optThreeWeightTable();
            }
          })
          .then(() => {
            this.keyWordEdit = false;
            this.docForm.keyword = "";
            this.genId(6, 62);
            this.docForm.docDate.replace("-", "");
            this.docForm.docTitle = "";
            this.docForm.docPage = "";
          });
      } else {
        this.showWaitingFlag = false;
        this.$message({
          type: "error",
          message: "填写完整",
        });
      }
    },
    goDetail() {
      this.$router.push("/work/docInputd");
    },
    docDescChange(e) {
      // console.log(e)
      if (e == 1) {
        this.docForm.docDescNum = 1;
      } else if (e == 0) {
        this.docForm.docDescNum = 0;
        this.docForm.docDesc = "";
      }
    },
    cancelFixRS() {
      this.keyWordEdit = false;
      this.docFormRS.keyword = "";
      this.docFormRS.personName = "输入姓名";
      this.genId(6, 62);
      this.docFormRS.docDate.replace("-", "");
      // console.log(this.docForm);
      this.docFormRS.docTitle = "";
      this.docFormRS.docPage = "";
      (this.docFormRS.docAboutSub = ""), (this.docFormRS.docAbout = "");

      this.fixDocFlag = false;
    },
    cancelFix() {
      this.keyWordEdit = false;
      this.docForm.keyword = "";
      this.docForm.docDescNum = "0";
      this.genId(6, 62);
      this.docForm.docDate.replace("-", "");
      console.log(this.docForm);
      this.docForm.docTitle = "";
      this.docForm.docPage = "";
      this.fixDocFlag = false;
    },
    addRS() {},
    /**
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
     */
    optSubmitRS() {
      var jobCode;
      if (this.docFormRS.docAbout == "履历材料") {
        jobCode = 1;
      } else if (this.docFormRS.docAbout == "自传材料") {
        jobCode = 2;
      } else if (this.docFormRS.docAbout == "鉴定、考核、考察材料") {
        jobCode = 3;
      } 
      // else if (this.docFormRS.docAbout == "学历学位、评聘专业职务材料") {
      //   jobCode = 4;
      // } 
      else if (this.docFormRS.docAbout == "政治历史情况审查材料") {
        jobCode = 6;
      } else if (this.docFormRS.docAbout == "入党入团材料") {
        jobCode = 7;
      } else if (this.docFormRS.docAbout == "奖励材料") {
        jobCode = 8;
      } else if (this.docFormRS.docAbout == "处分材料") {
        jobCode = 9;
      } else if (this.docFormRS.docAbout == "其他可供参考的材料") {
        jobCode = 16;
      }

      if (this.docFormRS.docAboutSub == "学历学位材料") {
        jobCode = 4;
      } else if (this.docFormRS.docAboutSub == "职称材料") {
        jobCode = 5;
      }

      if (this.docFormRS.docAboutSub == "工资情况材料") {
        jobCode = 10;
      }
      if (this.docFormRS.docAboutSub == "任免材料") {
        jobCode = 11;
      }
      if (this.docFormRS.docAboutSub == "出国、出境材料") {
        jobCode = 12;
      }
      if (this.docFormRS.docAboutSub == "各党派、团体代表登记表") {
        jobCode = 13;
      }
      if (this.docFormRS.docAboutSub == "聘用、录用、转干、转业材料") {
        jobCode = 14;
      }
      if (this.docFormRS.docAboutSub == "待遇、退（离）休、退职材料") {
        jobCode = 15;
      }

      var docObj = {
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
        docAboutSub: this.docFormRS.docAboutSub,
        personName: this.docFormRS.personName,
        personJob: jobCode,
        // docDesc:this.docForm.docDesc,
        // docPage: this.docForm.docPage,
        remark: this.docFormRS.remark,
        docTypeCode: sessionStorage.getItem("docTypeCode"),
        // dutyAuthor: this.docForm.dutyAuthor,
        // sortYear: this.docForm.sortYear,
      };
       var keywordIssueJson

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
          this.docFormRS.id = resp.data.id; //修改文件用
        })
        .then((r) => {
          var table;
          if (this.weightForm.perKeywordWig) {
            //已有权重表
            this.getRequest("/weight/sort/" + this.weightForm.perKeywordWig)
              .then((resp) => {
                //查询对应的权重表得到json
                table = resp.data.tables;
                var key1 = this.docFormRS.keyword;
                // var json1 = table;
                                   keywordIssueJson=resp.data.keywordIssue
                    if(keywordIssueJson==null){keywordIssueJson={}}
                      keywordIssueJson[key1]=jobCode  //optRs

                if (table[key1] == null) {
                  table[key1] = "0";
                }

              })
              .then((r) => {
                var docAboutObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: 41,
                  tables: table,
                  keywordIssue:keywordIssueJson,
                };

                this.putRequest(
                  "/weight/" + this.weightForm.perKeywordWig,
                  docAboutObj
                ).then((resp) => {
                  console.log("更新人事关键词权重表");
                  console.log(resp);
                  this.showWaitingFlag = false;
                });
              });
          } //if  已有权重表
          // else {
          //   var key1 = this.docFormRS.keyword;
          //   var json1 = {};
          //   json1[key1] = "0";

          //   var keyWordObj = {
          //     authId: sessionStorage.getItem("authId"),
          //     type: 41,
          //     tables: json1,
          //   };

          //   this.postRequest(
          //     //注意防止重复提交
          //     "/weight",
          //     JSON.stringify(keyWordObj)
          //   ).then((resp) => {
          //     console.log("第一次提交人事关键词权重表");
          //     console.log(resp);
          //     // console.log(this.weightForm=resp)
          //     this.weightForm = resp.data;
          //     if (resp.code == 0) {
          //       this.showWaitingFlag = false;
          //     }
          //   });
          // }
          this.$store.state.alreadyDocs.unshift(
            Object.assign({}, this.docFormRS)
          );

          this.docFormRS.docTitle = "";
          this.docFormRS.docPage = "";
          this.genId(6, 62);
          this.docFormRS.docDate.replace("-", "");

        });
    },
    addDocTimer(){
      this.addDocBtnFlg=false
      var that=this
      setTimeout(function(){
        that.addDocBtnFlg=true  //???
      },2000);
    },
    addDocRS() {
      this.tipShowFlag = false; //录入提示关闭

      if(!this.addDocBtnFlg){
        console.log(this.addDocBtnFlg)
        return
      }
      this.addDocTimer()

      if (this.checkAddRS()) {
        this.showWaitingFlag = true;

        var searchPath =
          "/document/list/page/" +
          sessionStorage.getItem("docType") +
          "?pageNow=0&pageSize=900000";

        this.searchForm.docType = sessionStorage.getItem("docType");
        this.searchForm.personName = this.docFormRS.personName;
        this.searchForm.docTitle = this.docFormRS.docTitle;
        // this.searchForm.docSequence=this.docFormRS.docSequence
        this.searchForm.docDate = this.docFormRS.docDate;
        this.searchForm.dutyAuthor = "";
        this.searchForm.docDesc = "";

        var searchObj = this.searchForm;
        for (var key in searchObj) {
          if (searchObj[key] == "") {
            delete searchObj[key];
          }
        }

        this.postRequest(
          //注意防止重复提交
          searchPath,
          JSON.stringify(searchObj)
        ).then((resp) => {
          if (resp.data.content.length != 0) {
            this.$confirm("请检查是否录入重复", "提示", {
              cancelButtonClass: "btn-custom-cancel",
              confirmButtonText: "忽略，录入此条", //then必须在前面 否则点击空白都执行
              cancelButtonText: "好的，暂不录入",
              type: "warning",
            })
              .then(() => {
                //空白地方 点没重复，提交
                this.optSubmitRS();
              })
              .catch(() => {
                this.showWaitingFlag = false;
                return; //点击好的，然后不提交
              });
          } else {
            this.optSubmitRS();
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "填写完整",
        });
      }
    },
    addDoc() {
      this.tipShowFlag = false;
            if(!this.addDocBtnFlg){
        console.log(this.addDocBtnFlg)

        return
      }
      this.addDocTimer()
      // var
      // this.optThreeWeightTable()
      // return

      if (this.checkAdd()) {
        this.showWaitingFlag = true;
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
          docDesc: this.docForm.docDesc,
          docPage: this.docForm.docPage,
          docDescAuthor: this.docForm.docDescAuthor,
          docDescNum: this.docForm.docDescNum,
          docLevel: this.docForm.docLevel,
          docSecret: this.docForm.docSecret,
          docTypeCode: sessionStorage.getItem("docTypeCode"),
          dutyAuthor: this.docForm.dutyAuthor,
          sortYear: this.docForm.sortYear,
        };

        var searchPath =
          "/document/list/page/" +
          sessionStorage.getItem("docType") +
          "?pageNow=0&pageSize=900000";

        this.searchForm.docType = sessionStorage.getItem("docType");

        {
          this.searchForm.docTitle = this.docForm.docTitle;
          // this.searchForm.docSequence=this.docForm.docSequence
          this.searchForm.docDesc = this.docForm.docDesc;
          this.searchForm.docDate = this.docForm.docDate;
          this.searchForm.dutyAuthor = this.docForm.dutyAuthor;
          this.searchForm.personName = "";
        }
        var searchObj = this.searchForm;
        for (var key in searchObj) {
          if (searchObj[key] == "") {
            delete searchObj[key];
          }
        }

        this.postRequest(
          //注意防止重复提交
          searchPath,
          JSON.stringify(searchObj)
        ).then((resp) => {
          console.log("添加前检查是否重复");
          console.log(resp);

          if (resp.data.content.length != 0) {
            this.$confirm("请检查是否录入重复", "提示", {
              cancelButtonClass: "btn-custom-cancel",
              confirmButtonText: "没有重复，录入此条",
              cancelButtonText: "好的，暂不录入",
              type: "warning",
            })
              .then(() => {
                var pathToDoc =
                  "/document/" + sessionStorage.getItem("docType");
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
                    this.docForm.id = resp.data.id; //赋给alreadydocs 修改文件用
                    // alert( this.docForm.id)
                  })
                  .then((r) => {
                    // if(r)
                    //保证提交完返回id后再执行后续操作
                    this.keywordTemp = this.docForm.keyword;
                    this.optThreeWeightTable();

                    this.$store.state.alreadyDocs.unshift(
                      Object.assign({}, this.docForm)
                    );
                    this.keyWordEdit = false;
                    this.docForm.keyword = "";
                    this.docForm.docDescNum = "0";
                    this.genId(6, 62);
                    this.docForm.docDate.replace("-", "");
                    console.log(this.docForm);
                    this.docForm.docTitle = "";
                    this.docForm.docPage = "";
                  });
              })
              .catch(() => {
                this.showWaitingFlag = false;
                return; //点击好的，然后不提交
              });
          } // 重复，不提交 或 仍要提交
          else {
            //不重复

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
                this.docForm.id = resp.data.id; //赋给alreadydocs 修改文件用
                // alert( this.docForm.id)
              })
              .then((r) => {
                // if(r)
                //保证提交完返回id后再执行后续操作
                this.keywordTemp = this.docForm.keyword;
                this.optThreeWeightTable();

                this.getRequest("/work/" + sessionStorage.getItem("batchId")) //
                  .then((resp) => {});

                this.$store.state.alreadyDocs.unshift(
                  Object.assign({}, this.docForm)
                );
                this.keyWordEdit = false;
                this.docForm.keyword = "";
                this.docForm.docDescNum = "0";
                this.genId(6, 62);
                this.docForm.docDate.replace("-", "");
                console.log(this.docForm);
                this.docForm.docTitle = "";
                this.docForm.docPage = "";
              });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "填写完整",
        });
      }
    },
    optThreeWeightTable1() {
      var weightType1;
      var weightType2;
      var weightType3;

      var kwTemp = this.docForm.keyword;

      // if (sessionStorage.getItem("docType") == "official") {
      // if (true) {
      if (sessionStorage.getItem("docType") == "official") {
        weightType1 = 11; //文书问题
        weightType2 = 12;
        weightType3 = 13;
      }
      if (sessionStorage.getItem("docType") == "science") {
        weightType1 = 21;
        weightType2 = 22;
        weightType3 = 23;
      }

      if (sessionStorage.getItem("docType") == "business") {
        weightType1 = 31;
        weightType2 = 32;
        weightType3 = 33;
      }
    },

    //  setTheJsonWigTable(reqId,key,value){
    //          var table
    //         this.getRequest("/weight/sort/" + reqId)
    //           .then((resp) => {
    //             // alert(0)
    //             //查询对应的权重表得到json
    //             table = resp.data.tables;
    //             var key1 = key;
    //             // var json1 = table;
    //             if (table[key1] == null) {
    //               table[key1] = "0";
    //             }
    //           })
    //             var setObj = {
    //               authId: sessionStorage.getItem("authId"),
    //               type: weightType1,
    //               tables: table,
    //               issueKeyword:issueKeyword
    //             };
    //  },
    optThreeWeightTable() {
      //操作三种类型的权重表，前提是已知weightForm即单位信息，第一次则先get 不是第一次则
      var weightType1;
      var weightType2;
      var weightType3;

      var kwTemp = this.docForm.keyword;

      // if (sessionStorage.getItem("docType") == "official") {
      // if (true) {
      if (sessionStorage.getItem("docType") == "official") {
        weightType1 = 11; //文书问题
        weightType2 = 12;
        weightType3 = 13;
      }
      if (sessionStorage.getItem("docType") == "science") {
        weightType1 = 21;
        weightType2 = 22;
        weightType3 = 23;
      }

      if (sessionStorage.getItem("docType") == "business") {
        weightType1 = 31;
        weightType2 = 32;
        weightType3 = 33;
      }

      if (sessionStorage.getItem("docType") == "official") {
        var table;
        var issueKeywordArrJson;
        if (this.weightForm.docIssueWig) {
          //已有权重表 1111
          this.getRequest("/weight/" + this.weightForm.docIssueWig)
            .then((resp) => {
              // alert(0)
              //查询对应的权重表得到json
              table = resp.data.tables;
              var key1 = this.docForm.docAbout;
              // var json1 = table;
              if (table[key1] == null) {
                table[key1] = "0";
              }
              issueKeywordArrJson = resp.data.issueKeyword;

              console.log(resp);

              if (issueKeywordArrJson[key1] == null) {
                var arrtemp = [];
                arrtemp.push(kwTemp);
                issueKeywordArrJson[key1] = arrtemp;
              } else {
                if (issueKeywordArrJson[key1].indexOf(kwTemp) < 0) {
                  issueKeywordArrJson[key1].push(kwTemp);
                }
              }
            })

            .then((r) => {
              // var issueKeyword={}
              // if(true){//假设不包含这个问题
              //   var docAboutKeyWordArr=[]
              //   docAboutKeyWordArr.push(kwTemp) //因为异步执行，表格已经刷新，kwTemp暂存的关键字
              //   console.log(docAboutKeyWordArr)
              //   issueKeyword[this.docForm.docAbout]=docAboutKeyWordArr
              // }

              var docAboutObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType1,
                tables: table,
                issueKeyword: issueKeywordArrJson,
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
          // this.getRequest("/weight/sort/" + this.weightForm.docAuthorWig)
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
                issueKeyword: {},
                keywordIssue: {},
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
          var keywordIssueJson;
          this.getRequest("/weight/sort/" + this.weightForm.docKeywordWig)
            .then((resp) => {
              //查询对应的权重表得到json
              table3 = resp.data.tables;
              keywordIssueJson = resp.data.keywordIssue;
              var key3 = kwTemp; //docForm里的会被刷新
              // var json1 = table;
              if (table3[key3] == null) {
                table3[key3] = "0";
              }
              if (keywordIssueJson[key3] == null) {
                keywordIssueJson[key3] = this.docForm.docAbout;
              } else {
                if (
                  keywordIssueJson[key3]
                    .split("|")
                    .indexOf(this.docForm.docAbout) < 0
                ) {
                  //
                  keywordIssueJson[key3] =
                    keywordIssueJson[key3] + "|" + this.docForm.docAbout;
                }
              }

              console.log(key3);

              console.log(table3);
            })
            .then((r) => {
              var keyWordObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType3,
                tables: table3,
                keywordIssue: keywordIssueJson,
              };

              this.putRequest(
                "/weight/" + this.weightForm.docKeywordWig,
                keyWordObj
              ).then((resp) => {
                console.log("更新文书关键词权重表");
                console.log(resp);
              });
            })
            .then((r) => {
              this.showWaitingFlag = false;
            });
        }
      } //doctype==official if

      if (sessionStorage.getItem("docType") == "business") {
        var table;
        var issueKeywordArrJson;
        if (this.weightForm.busProjectWig) {
          //已有权重表
          this.getRequest("/weight/" + this.weightForm.busProjectWig)
            .then((resp) => {
              // alert(0)
              //查询对应的权重表得到json
              table = resp.data.tables;
              var key1 = this.docForm.docAbout;
              // var json1 = table;
              if (table[key1] == null) {
                table[key1] = "0";
              }
              issueKeywordArrJson = resp.data.issueKeyword;
              if (issueKeywordArrJson[key1] == null) {
                var arrtemp = [];
                arrtemp.push(kwTemp);
                issueKeywordArrJson[key1] = arrtemp;
              } else {
                if (issueKeywordArrJson[key1].indexOf(kwTemp) < 0) {
                  issueKeywordArrJson[key1].push(kwTemp);
                }
              }
            })

            .then((r) => {
              var docAboutObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType1,
                tables: table,
                issueKeyword: issueKeywordArrJson,
              };

              console.log(docAboutObj);

              this.putRequest(
                "/weight/" + this.weightForm.busProjectWig,
                docAboutObj
              ).then((resp) => {
                console.log("更新yewu问题权重表");
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
                issueKeyword: {},
                keywordIssue: {},
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
          var keywordIssueJson;
          this.getRequest("/weight/sort/" + this.weightForm.busKeywordWig)
            .then((resp) => {
              //查询对应的权重表得到json
              table3 = resp.data.tables;
              keywordIssueJson = resp.data.keywordIssue;
              var key3 = kwTemp; //docForm里的会被刷新
              // var json1 = table;
              if (table3[key3] == null) {
                table3[key3] = "0";
              }
              if (keywordIssueJson[key3] == null) {
                keywordIssueJson[key3] = this.docForm.docAbout;
              } else {
                if (
                  keywordIssueJson[key3]
                    .split("|")
                    .indexOf(this.docForm.docAbout) < 0
                ) {
                  //
                  keywordIssueJson[key3] =
                    keywordIssueJson[key3] + "|" + this.docForm.docAbout;
                }
              }

              console.log(key3);

              console.log(table3);
            })
            .then((r) => {
              var keyWordObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType3,
                tables: table3,
                keywordIssue: keywordIssueJson,
              };
              this.putRequest(
                "/weight/" + this.weightForm.busKeywordWig,
                keyWordObj
              ).then((resp) => {
                console.log("更新业务关键词权重表");
                console.log(resp);
              });
            })
            .then((r) => {
              this.showWaitingFlag = false;
            });
        }
      } //doctype==business if

      if (sessionStorage.getItem("docType") == "science") {
        var table;
        var issueKeywordArrJson;
        if (this.weightForm.tecProjectWig) {
          //已有权重表 3333
          this.getRequest("/weight/sort/" + this.weightForm.tecProjectWig)
            .then((resp) => {
              // alert(0)
              //查询对应的权重表得到json
              table = resp.data.tables;
              var key1 = this.docForm.docAbout;
              // var json1 = table;
              if (table[key1] == null) {
                table[key1] = "0";
              }
              issueKeywordArrJson = resp.data.issueKeyword;
              if (issueKeywordArrJson[key1] == null) {
                var arrtemp = [];
                arrtemp.push(kwTemp);
                issueKeywordArrJson[key1] = arrtemp;
              } else {
                if (issueKeywordArrJson[key1].indexOf(kwTemp) < 0) {
                  issueKeywordArrJson[key1].push(kwTemp);
                }
              }
            })

            .then((r) => {
              var docAboutObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType1,
                tables: table,
                issueKeyword: issueKeywordArrJson,
              };

              console.log(docAboutObj);

              this.putRequest(
                "/weight/" + this.weightForm.tecProjectWig,
                docAboutObj
              ).then((resp) => {
                console.log("更新科技问题权重表");
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
                issueKeyword: {},
                keywordIssue: {},
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
          var keywordIssueJson;
          this.getRequest("/weight/sort/" + this.weightForm.tecKeywordWig)
            .then((resp) => {
              //查询对应的权重表得到json
              table3 = resp.data.tables;
              keywordIssueJson = resp.data.keywordIssue;
              var key3 = kwTemp; //docForm里的会被刷新
              // var json1 = table;
              if (table3[key3] == null) {
                table3[key3] = "0";
              }
              if (keywordIssueJson[key3] == null) {
                keywordIssueJson[key3] = this.docForm.docAbout;
              } else {
                if (
                  keywordIssueJson[key3]
                    .split("|")
                    .indexOf(this.docForm.docAbout) < 0
                ) {
                  //
                  keywordIssueJson[key3] =
                    keywordIssueJson[key3] + "|" + this.docForm.docAbout;
                }
              }

              console.log(key3);

              console.log(table3);
            })
            .then((r) => {
              var keyWordObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType3,
                tables: table3,
                keywordIssue: keywordIssueJson,
              };

              this.putRequest(
                "/weight/" + this.weightForm.tecKeywordWig,
                keyWordObj
              ).then((resp) => {
                console.log("更新科技关键词权重表");
                console.log(resp);
              });
            })
            .then((r) => {
              this.showWaitingFlag = false;
            });
        }
      } //doctype==science if
    },

    optThreeWeightTable2() {},

    docAboutBlur() {
      if (this.docForm.keyword != "" && this.docForm.docAbout != "") {
        //todo1  查询是否有关键字

        var tip = "";
        if (true) {
          this.manageKeyWordTime++;
          if (this.manageKeyWordTime % 10 == 0) {
            this.$confirm(
              "检测到一些新的关键字：" +
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
    weightFormKeywordCode() {
      //点出标题区域可能还没返回
      var type = sessionStorage.getItem("docType");
      if (type == "official") {
        return this.weightForm.docKeywordWig;
      } else if (type == "business") {
        return this.weightForm.busKeywordWig;
      } else if (type == "science") {
        return this.weightForm.tecKeywordWig;
      } else if (type == "personnel") {
        return this.weightForm.perKeywordWig;
      }
    },

    aiInputFunc() {
      // alert(2)
    var keywordIssueJson

/*
      if (sessionStorage.getItem("docType") == "personnel") {
        this.getRequest("/weight/" + this.weightForm.perKeywordWig).then(
          (resp) => {
             keywordIssueJson = resp.data.keywordIssue;
            console.log(keywordIssueJson);
               let attr;
    for (attr in keywordIssueJson) {
      if(this.docFormRS.docTitle.indexOf(attr)==-1){
       delete keywordIssueJson[attr]
      }
      
    }
    console.log(keywordIssueJson)

    // kwInTitleTrue=[]
    // for(var k in kwInTitle){
    //   if(this.docFormRS.docTitle.indexOf(kwInTitle[k])>-1){
    //     kwInTitleTrue.push(kwInTitle[k])
    //   }
    // }
          }
        );
      }*/
      // var titttt=sessionStorage.getItem('docType')=='personnel'?this.docFormRs.docTitle:this.docForm.docTitle
      axios
        .get(this.baseurl + "/weight/map/" + this.weightFormKeywordCode(), {
          headers: {
            "Content-Type": "application/json",
            authId: sessionStorage.getItem("authId"),
            token: sessionStorage.getItem("token")
              ? sessionStorage.getItem("token").split('"')[1] ||
                sessionStorage.getItem("token")
              : null,
          },
          params: {
            title: sessionStorage.getItem('docType')=='personnel'?this.docFormRS.docTitle:this.docForm.docTitle,
          },
        })
        .then((resp) => {
          this.matchedKV = [];

          console.log(resp)





           for (var attr in resp.data) {
             if(resp.data==null){
               resp.data=keywordIssueJson
             }
            var splitArr = resp.data[attr].split("|");

             if (sessionStorage.getItem("docType") == "personnel") {
              console.log(2);

              for (var k in splitArr) {
                console.log(splitArr[k])
                var i = this.getRsText(splitArr[k]);
                console.log(i)
                this.matchedKV.push([attr, this.rsDocTypeMain,i]);
              }
                console.log(this.matchedKV);

            } // 人事要找对照表


       else{
                       for (var k in splitArr) {
                this.matchedKV.push([attr, splitArr[k]]);
              }
         
       }
              // 其他三种


            if (this.matchedKV.length == 1) {
              if(sessionStorage.getItem("docType") == "personnel"){
                this.docFormRS.docAboutSub=this.matchedKV[0][2]
                this.docFormRS.docAbout=this.matchedKV[0][1]
              }
              else{
              this.docForm.docAbout = this.matchedKV[0][1];
              this.docForm.keyword = this.matchedKV[0][0];
              }

            } else {
              this.tipShowFlag = true;
            }
          }

 
          // alert()
        });
    },
    selectThisTip( item) {
      this.docForm.docAbout = item[1];
      this.docForm.keyword = item[0];

      if(sessionStorage.getItem('docType')=='personnel'){
              this.docFormRS.docAbout = item[1];
              this.docFormRS.docAboutSub = item[2];
      this.docForm.keyword = item[0];
      }
      this.tipShowFlag = false;
    },
    titleComplete() {
      if (this.docForm.docTitle == "") {
        this.keyWordEdit = false;
      } else this.keyWordEdit = true;

      this.aiInputFunc();
      // this.getRequest(   //查标题

      //             "/weight/map/"+this.weightFormKeywordCode(),{
      //               title:this.docForm.docTitle,

      //             }

      //           ).then((resp) => {
      //             console.log(resp)
      //           })
    },

    checkTitle() {},
    genID(length) {
      return Number(
        Math.random().toString().substr(3, length) + Date.now()
      ).toString(36);
    },
    getId1(a, b) {
      var date = new Date(); //当前标准时间格式
      var month = date.getMonth() + 1; //返回0~11之间的数字，0代表一月，11代表12月
      var day = date.getDate(); //返回天数，0~31，getDay()返回的是星期几（0~6）
      var hour = date.getHours(); //获取小时
      var minute = date.getMinutes(); //获取分钟
      var second = date.getSeconds(); //获取秒
      var num =
        year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
    },

    genId(len, radix) {
      this.getRequest("/work/" + sessionStorage.getItem("batchId")).then(
        (resp) => {
          if (resp) {
            this.docForm.docSequence = resp.data.doc_number;
            this.docFormRS.docSequence = resp.data.doc_number;
          }
        }
      );
      return;

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
    // var jsonk={}
    // var aa='aa'
    // if(jsonk[aa]==null){
    //   jsonk[aa]='2'
    // }
    // console.log(jsonk)
    // return

    this.docTimeDues = [];
    var deadlineJson = JSON.parse(sessionStorage.getItem("lastBox"));
    // console.log(JSON.parse(deadlineJson))
    let attr;

    for (attr in deadlineJson) {
      this.docTimeDues.push(attr);
    }

    console.log(this.docTimeDues);

    // return

    this.getRequest("/organ/" + sessionStorage.getItem("authId")).then(
      (resp) => {
        this.weightForm = resp.data;
        console.log(resp.data);
      }
    );
    //  this.getRequest("/work/"+sessionStorage.getItem('batchId')) //
    //       .then((resp) => {

    //       })

    this.genId(6, 62);

    if (this.$store.state.tempDoc) {
      this.fixDocFlag = true;
      console.log(this.$store.state.tempDoc);
      this.docForm = Object.assign({}, this.$store.state.tempDoc);
      this.docFormRS = Object.assign({}, this.$store.state.tempDoc);
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
.matchedItem {
}
.matchedItem:hover {
  color: rgb(93, 93, 117);
  font-weight: 600;
  cursor: pointer;
}

.matchedKVClass {
  height: 2rem;
  border-bottom: solid 0.2px #aaa;
}
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