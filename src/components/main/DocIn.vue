<template>
  <div class="wrapper">
    <Left></Left>

    <div class="keyWordSelect" v-if="false">
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>

      <div class="keyWordsTimer">3秒后消失</div>
      
    </div>

    <el-form class="docInForm" label-width="10rem">
      <!-- <div class="docTypeTitle">sessionStorage批次</div> -->
      <div class="docSeqTip">本份文件唯一序列号：{{this.docForm.docSeq}}</div>

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
              v-model="docForm.keyWord"
              auto-complete="off"
              placeholder="系统识别或手动填写"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
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
            <el-select
              v-model="docForm.docLevel"
              placeholder="选择文件级别"
            >
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
              v-model="docForm.docDutyAuthor"
              auto-complete="off"
              placeholder="输入档案责任者"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

       <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="责任者简称：">
            <el-input
              size="normal"
              type="text"
              v-model="docForm.docDescAbbr"
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
              v-model="docForm.docPages"
              auto-complete="off"
              placeholder="根据文件填写"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

         <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="责任者发文序号：">
            <el-input
              size="normal"
              type="text"
              v-model="docForm.docDescNum "
              auto-complete="off"
              placeholder="文号中序号，没有则不填"
            ></el-input>

          </el-form-item>
        </el-col>


      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="文件期限：">
            <el-select
              v-model="docForm.docTimeDue"
              placeholder="选择文件期限"
            >
              <el-option
                v-for="item in docTimeDues"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="batchName" label="文件密级：">
            <el-select
              v-model="docForm.docSecret"
              placeholder="选择文件密级"
            >
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
        <el-button type="success" size="big" style="margin-left:40%" @click="addDoc"> 
            添加档案
        </el-button>

        <el-button type="primary" size="big" style="margin-left:10%"> 
            清空列表
        </el-button>

      </div>
    </el-form>
  </div>
</template>

<script>
import Left from "../common/HistoryBatches";

export default {
  components: {
    Left: Left
  },

  data() {
    return {
      keyWordEdit: false,

      docLevels:[
        {
          name:'部级',
          value:6
        },
                {
          name:'省级',
          value:5
        },
                {
          name:'市级',
          value:4
        },
                {
          name:'县级',
          value:3
        },
                {
          name:'本级',
          value:2
        },
                {
          name:'乡级',
          value:1
        },
      ],
  
      docTimeDues:[
        {
          name:'永久',
          value:6
        },
                {
          name:'备查',
          value:5
        },
                {
          name:'长期',
          value:4
        },
                {
          name:'100年',
          value:3
        },
                {
          name:'30年',
          value:2
        },
                {
          name:'10年',
          value:1
        },
      ],
 docSecrets:[
        {
          name:'无',
          value:4
        },
                {
          name:'秘密',
          value:3
        },
                {
          name:'机密',
          value:2
        },
                {
          name:'绝密',
          value:1
        },
      ],
      docForm: {
        docSeq:'',//序列号，标识文件
        docTitle: "", //标题
        docAbout: "",
        keyWord: "", //关键字
        docDesc: "", //文号
        sortYear: "",
        docDate: "",
        docTypeCode: "",
        docLevel: "",
        docDescAbbr: "", //责任者简称
        docDutyAuthor:'',  //责任者
        docTimeDue:'',  //文件期限
        docSecret:'',//文件密级
        docPages:'',
        docRemark:'',  //备注
        docNumber:'', //件号
        boxNumber:'', //盒号
      },

            docFormKong: {
        docSeq:'',//序列号，标识文件
        docTitle: "", //标题
        docAbout: "",
        keyWord: "", //关键字
        docDesc: "", //文号  责任者简称+[文件日期的年份]+{件号}号  //提交为空
        sortYear: "",
        docDate: "",
        docTypeCode: "",
        docLevel: "",
        docDescAbbr: "", //责任者简称
        docDutyAuthor:'',  //责任者
        docTimeDue:'',  //文件期限
        docSecret:'',//文件密级
        docPages:'',
        docRemark:'',  //备注
        docNumber:'', //件号
        boxNumber:'', //盒号
      
      },
      aiInput:false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date("1995/5/1");
        }
      }
    };
  },
  methods: {
    checkAdd(){
      if(this.docForm.docTitle==""||this.docForm.keyWord==""||this.docForm.sortYear==""||this.docForm.docAbout==""
      ||this.docForm.docDate==""||this.docForm.docLevel==""||this.docForm.docDutyAuthor==""||this.docForm.docPages==""||this.docForm.docTimeDue=="")
      return false;
      else return true;
    },

    addDoc(){
      if(this.checkAdd()){
              // this.$store.state.alreadyDocs.unshift({  docKeyWord:this.docForm.docAbout||'无文件信息',
              //   docSeq:this.docForm.docSeq ,
              //   docNumber:''})
              this.$store.state.alreadyDocs.unshift(this.docForm)

      this.keyWordEdit=false;
      this.docForm.keyWord=''

      this.docForm.docSeq=this.genId(6,62);
      this.docForm.docDate.replace('-','')
      console.log(this.docForm)
      this.docForm.docTitle='';
      this.docPages=''




      }

      else{
                    this.$message({
              type: "error",
              message: "填写完整"
            });
         
      }

    },

    docAboutBlur() {
      if (this.docForm.keyWord != "" && this.docForm.docAbout != "") {
        //todo1  查询是否有关键字

        var tip = "";
        this.$confirm(
          "检测到新的关键字和对应分类，是否添加入库，以便更快录入",
          "提示",
          {
            cancelButtonClass: "btn-custom-cancel",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              message: "已添加"
            });
          })
          .catch(() => {});
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
        Math.random()
          .toString()
          .substr(3, length) + Date.now()
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

    inputChange(){
      this.aiInput=!this.aiInput;

    },
  },
  created() {
      this.docForm.docSeq=this.genId(6,62);
  }
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

  .el-select{
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

.docSeqTip{
  position: absolute;
  left: 2rem;
  top:1rem
}

.buttonGroup{
  position: relative;
  bottom:0;

  .bottomButton{
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
  top: 8rem;
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