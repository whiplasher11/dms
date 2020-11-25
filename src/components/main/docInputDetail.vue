<template>
  <div>
    <div class="wrapper" style="padding-bottom: 50rem">
      <div style="height: 6.5rem"></div>
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

      <!-- <div class="docDetailBox" v-if="docType=='personnel'">

    </div> -->

      <div class="docDetailBox">


        <div class="advSearchBox"  >

                  <el-form
        v-if="advSearchShow&&docType=='personnel'"
 
      ref="searchForm"
 
      :model="searchForm"
      label-width="6rem"
      class="loginContainer"
     style="background-color:rgb(209, 218, 243) !important;"
    >
      <h3 style="        text-align: center;
        color: #505458;">输入一个或多个条件查找文档</h3>
            <el-form-item prop="username" label="识别号：">
        <el-input
          size="normal"
          type="text"
          v-model="searchForm.docSequence"
          auto-complete="off"
          placeholder="识别号"
        ></el-input>
      </el-form-item>

      <el-form-item prop="username" label="文件标题：">
        <el-input
          size="normal"
          type="text"
          v-model="searchForm.docTitle"
          auto-complete="off"
          placeholder="标题"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="姓名：">
        <el-input
          size="normal"
          type="text"
          v-model="searchForm.personName"
          auto-complete="off"
          placeholder="姓名"
        ></el-input>
      </el-form-item>
            <el-form-item prop="password" label="日期：">
        <el-input
          size="normal"
          type="text"
          v-model="searchForm.docDate"
          auto-complete="off"
          placeholder="日期"
        ></el-input>
      </el-form-item>
    
    
      <!-- <el-form-item prop="code">
                <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off"
                          placeholder="点击图片更换验证码" @keydown.enter.native="submitLogin" style="width: 250px"></el-input>
                <img :src="vcUrl" @click="updateVerifyCode" alt="" style="cursor: pointer">
      </el-form-item>-->
      <!-- <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox> -->
      <!-- <div class="goRegister" @click="goRegister">尚未注册？前往注册</div> -->
      <el-button style="margin-left:35% ;float:left" size="normal" type="primary" @click="advSearch">查找</el-button>
      <el-button style="position:absolute;left:60%" size="normal" type="warning" @click="hideAdvSearch">取消</el-button>

    </el-form>


           <el-form
        v-if="advSearchShow&&docType!='personnel'"
 
      ref="searchForm"
 
      :model="searchForm"
      label-width="6rem"
      class="loginContainer"
     style="background-color:rgb(209, 218, 243) !important;"
    >
      <h3 style="        text-align: center;
        color: #505458;">输入一个或多个条件查找文档</h3>
            <el-form-item prop="username" label="识别号：">
        <el-input
          size="normal"
          type="text"
          v-model="searchForm.docSequence"
          auto-complete="off"
          placeholder="识别号"
        ></el-input>
      </el-form-item>

      <el-form-item prop="username" label="文件标题：">
        <el-input
          size="normal"
          type="text"
          v-model="searchForm.docTitle"
          auto-complete="off"
          placeholder="标题"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="文号：">
        <el-input
          size="normal"
          type="text"
          v-model="searchForm.docDesc"
          auto-complete="off"
          placeholder="文号"
        ></el-input>
      </el-form-item>
        <el-form-item prop="password" label="发文日期">
        <el-input
          size="normal"
          type="text"
          v-model="searchForm.docDate"
          auto-complete="off"
          placeholder="发文日期"
        ></el-input>
      </el-form-item>

              <el-form-item prop="password" label="责任者">
        <el-input
          size="normal"
          type="text"
          v-model="searchForm.dutyAuthor"
          auto-complete="off"
          placeholder="责任者"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item prop="code">
                <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off"
                          placeholder="点击图片更换验证码" @keydown.enter.native="submitLogin" style="width: 250px"></el-input>
                <img :src="vcUrl" @click="updateVerifyCode" alt="" style="cursor: pointer">
      </el-form-item>-->
      <!-- <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox> -->
      <!-- <div class="goRegister" @click="goRegister">尚未注册？前往注册</div> -->
      <el-button style="margin-left:35% ;float:left" size="normal" type="primary" @click="advSearch">查找</el-button>
      <el-button style="position:absolute;left:60%" size="normal" type="warning" @click="hideAdvSearch">取消</el-button>

    </el-form>

        </div>

        <div
          style="z-index:333;height: 4.5rem; position: absolute; top: -1.5rem; right: 14rem;width:18%"
        >
          <!-- 搜索 -->
          <el-input class="leftInput" v-model="searchContent"></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="
              background-color: rgb(134, 151, 197);
              border: none;
              margin-top: 1rem;
              margin-left: 0.2rem;
            "
            @click="searchTheDoc"
            >搜索</el-button
          >
          <el-button
            type="warning"
            icon="el-icon-error"
            style="border: none; margin-top: 1rem; position: absolute;right:-4rem"
            @click="cancelSearch"
            >取消</el-button
          >

                            <el-button
            icon="el-icon-tickets"
            style="border: none; margin-top: 1rem; margin-left:8rem;position: absolute;right:-11rem"
            @click="ShowadvSearch"
            >高级搜索</el-button
          >

        </div>
    <div style="position: relative;
            left: 0.5rem;
            top: -0.5rem;
            font-size: 1.1rem;">
        <div
          style="
         float:left
         width:3rem
         text-align:center

          "
          class="hoverStyle "
          @click="backToOrgans"
        >
          选项：
        </div>

        <div
          style="
         float:left
         width:5rem
         text-align:center
          "
          class="topTextButton hoverStyle"
          @click="backToOrgans"
        >
          查看与设置
        </div>

        <div
          style="
         float:left
         width:5rem
         text-align:center
         margin-left:1rem
          "
          class="hoverStyle topTextButton"
          @click="goDocIn"
        >
          继续录入
        </div>
        



        <div
          style="
         float:left
         width:5rem
         text-align:center
         margin-left:1rem
          "
          v-if="docType != 'personnel'"
          class="hoverStyle topTextButton"
          @click="sortThisBatch"
        >
          排件号盒号
        </div>

        <!-- <div
          style="
            position: absolute;
            left: 11rem;
            top: -2.5rem;
            font-size: 1.1rem;
          "
          v-if="docType == 'personnel'"
          class="hoverStyle topTextButton"
          @click="sortThisBatchRS"
        >
          查看本单位
        </div> -->

        <div
          style="
         float:left
         width:5rem
         text-align:center
         margin-left:1rem !important
          "
          class="hoverStyle topTextButton"
          @click="getExcel"
        >
          下载表格
        </div>
        <div
          style="         float:left
         width:5rem;
         text-align:center;
         margin-left:1rem;
         "
          class="hoverStyle"
          @click="goSetRule"
        >
          顺序有问题？请前往设置本单位规则
        </div>
<div style="clear:both"></div>

    </div>
        <div
          style="
            position: absolute;
            width: 16rem;
            top: -3.5rem;
            font-size: 1.4rem;
            margin-left: -8rem;
            left: 50%;
          "
        >
          本批所有已录入文档
        </div>
        <div v-if="docType != 'science' && docType != 'personnel'">
          <div class="detailItem">
            <div class="itemInfo">识别号</div>

            <div class="itemInfo">档号</div>
            <div class="itemInfo">文号</div>
            <div class="itemInfo">责任者</div>
            <div class="itemInfo" style="font-size: 0.6rem; width: 10%">
              题名
            </div>
            <div class="itemInfo">成文时间</div>
            <div class="itemInfo">密级</div>
            <div class="itemInfo">页数</div>
            <div class="itemInfo" style="font-size: 0.6rem; width: 10%">
              备注
            </div>
            <div class="itemInfo">件号</div>
            <div class="itemInfo">盒号</div>

            <div style="clear: both"></div>

            <!-- <div style="clear:both"></div> -->
          </div>

          <div
            class="detailItem"
            v-for="(item, index) in this.$store.state.alreadyDocs"
            :key="index"
          >
            <div class="itemInfo">{{ item.docSequence }}</div>

            <div class="itemInfo">
              {{ authCode + "-" + item.docTypeCode + "·"
              }}{{ item.sortYear | formatSortYear }}-{{
                item.deadline | deadlineFormat
              }}-{{ item.docAbout + "-" }}{{ item.docNum | formatFourNum }}
            </div>
            <!-- 档号 -->
            <!-- <div class="itemInfo">{{item.docDescAuthor+'['}}{{item.sortYear|formatSortYear}}{{']'+(item.docNum?item.docNum:'暂无')+"号"}}</div> -->
            <div class="itemInfo">
              {{ item.docDesc ? item.docDesc : "&nbsp;" }}
            </div>

            <div class="itemInfo">{{ item.dutyAuthor }}</div>
            <div class="itemInfo" style="font-size: 0.6rem; width: 10%">
              {{ item.docTitle }}
            </div>
            <div class="itemInfo">{{ item.docDate }}</div>
            <div class="itemInfo">
              {{
                item.docSecret == "无" || !item.docSecret
                  ? "&nbsp;"
                  : item.docSecret
              }}
            </div>
            <div class="itemInfo">{{ item.docPage }}</div>
            <div class="itemInfo" style="font-size: 0.6rem; width: 10%">
              {{ item.remark ? item.remark : "&nbsp;" }}
            </div>
            <div class="itemInfo">{{ item.docNum ? item.docNum : "暂无" }}</div>
            <div class="itemInfo">{{ item.boxSeq ? item.boxSeq : "暂无" }}</div>
            <div class="itemInfo" style="width: 10%">
              <div
                style="float:left;margin-left=1rem"
                class="optionDiv"
                @click="fixThisItem(item)"
              >
                修改
              </div>
              <div
                style="float: left"
                class="optionDiv"
                @click="deleteThisItem(item)"
              >
                删除
              </div>
                            <div
                style="float: left"
                class="optionDiv"
                @click="printBtn(item)"
              >
                印章
              </div>
            </div>
            <div style="clear: both"></div>
            <!-- <div style="clear:both"></div> -->
          </div>
        </div>

        <div v-if="docType == 'personnel'" >
          <div class="detailTopLine" >
            <div class="itemInfo">识别号</div>

            <div class="itemInfo">姓名</div>
            <div class="itemInfo" style="width: 10%">材料类型 </div>
            <div class="itemInfo" style="width: 10%">子材料类型</div>
            <div class="itemInfo" style="width: 15%">标题</div>
            <div class="itemInfo">日期</div>
            <div class="itemInfo" style="width: 4%">页数</div>
            <div class="itemInfo" style="width: 4%">材料序号</div>

            <div class="itemInfo" style="width: 10%">备注</div>
            <div class="itemInfo">操作</div>

            <div class="itemInfo" style="width: 18%">&nbsp;</div>
              <div style="clear:both"></div>

            <!-- <div class="itemInfo">操作</div> -->
            <!-- <div class="itemInfo">操作</div> -->
            <!-- <div style=""></div> -->
          </div>
          <div
            v-for="(item, index) in this.$store.state.alreadyDocs"
            :key="index"
            style="border-top: 0.05rem solid"
          >
            <!-- 上面是循环有多少个人  -->
            <!-- 接下来是循环每个人的16个list -->
            <div v-for="(i, ind) in item" :key="ind">
              <div v-for="(j, ind3) in i" :key="ind3">
                <div class="itemInfo">
                  {{ j.docSequence }}
                </div>
                <div class="itemInfo" v-if="ind3 == 0">
                  {{ j.personName }}
                </div>
                <div class="itemInfo"  v-if="ind3 != 0">&nbsp;</div>

                <div class="itemInfo" style="width: 10%" v-if="ind3 == 0">
                  {{ j.docAbout }}
                </div>
                <div class="itemInfo" v-if="ind3 != 0">&nbsp;</div>

                <div class="itemInfo" style="width: 10%">
                  {{ j.docAboutSub == "无" ? "&nbsp;" : j.docAboutSub }}
                </div>

                <div class="itemInfo" style="width: 15%">
                  {{ j.docTitle }}
                </div>

                <div class="itemInfo">
                  {{ j.docDate }}
                </div>

                <div class="itemInfo" style="width: 4%">
                  {{ j.docPage }}
                </div>
                <div class="itemInfo" style="width: 4%">
                  {{ j.docNum == "" || j.docNum == null ? "&nbsp;" : j.docNum }}
                </div>
                <div class="itemInfo" style="width: 10%" >
                  {{ j.remark == "" || j.remark == null ? "&nbsp;" : j.remark }}
                </div>
                <div class="itemInfo2" style="width: 10%">
                  <div
                    style="float:left;margin-left=1rem"
                    class="optionDiv"
                    @click="fixThisItem(j)"
                  >
                    修改
                  </div>
                  <div
                    style="float: left"
                    class="optionDiv"
                    @click="deleteThisItem(j)"
                  >
                    删除
                  </div>
                                    <div
                    style="float: left"
                    class="optionDiv"
                    @click="printBtn(j)"
                  >
                    印章
                  </div>
                </div>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>
          <div style="border-top: 0.02rem"></div>
        </div>

        <div v-if="docType == 'science'">
          <div class="detailItem">
            <div class="itemInfo2">识别号</div>

            <div class="itemInfo2">档号</div>
            <div class="itemInfo2">全宗号</div>
            <div class="itemInfo2">目录号</div>
            <div class="itemInfo2">案卷号</div>
            <div class="itemInfo2">顺序号</div>
            <div class="itemInfo2">责任者</div>

            <div class="itemInfo2" style="font-size: 0.6rem; width: 10%">
              题名
            </div>
            <div class="itemInfo2">成文时间</div>
            <div class="itemInfo2">页数</div>
            <div class="itemInfo2">期限</div>
            <div class="itemInfo2">密级</div>

            <div class="itemInfo2" style="font-size: 0.6rem; width: 10%">
              备注
            </div>

            <div style="clear: both"></div>

            <!-- <div style="clear:both"></div> -->
          </div>

          <div
            class="detailItem"
            v-for="(item, index) in this.$store.state.alreadyDocs"
            :key="index"
          >
            <div class="itemInfo2">{{ item.docSequence }}</div>

            <div class="itemInfo2">
              {{ authCode + "-" + item.docTypeCode + "-"
              }}{{ item.boxSeq | formatFiveKJ }}-{{
                item.docNum | formatThreeKJ
              }}
            </div>
            <!-- 档号 -->
            <!-- <div class="itemInfo2">{{item.docDescAuthor+'['}}{{item.sortYear|formatSortYear}}{{']'+(item.docNum?item.docNum:'暂无')+"号"}}</div> -->

            <div class="itemInfo2">{{ authCode }}</div>
            <div class="itemInfo2">
              {{ item.docTypeCode ? item.docTypeCode : "&nbsp;" }}
            </div>

            <div class="itemInfo2">
              {{ item.boxSeq ? item.boxSeq : "暂无" }}
            </div>

            <div class="itemInfo2">
              {{ item.docNum ? item.docNum : "暂无" }}
            </div>
            <div class="itemInfo2">{{ item.dutyAuthor }}</div>
            <div class="itemInfo2" style="font-size: 0.6rem; width: 10%">
              {{ item.docTitle }}
            </div>
            <div class="itemInfo2">{{ item.docDate }}</div>
            <div class="itemInfo2">{{ item.docPage }}</div>
            <div class="itemInfo2">{{ item.deadline }}</div>

            <div class="itemInfo2">
              {{ item.docSecret == "无" ? "&nbsp;" : item.docSecret }}
            </div>
            <div class="itemInfo2" style="font-size: 0.6rem; width: 10%">
              {{ item.remark ? item.remark : "&nbsp;" }}
            </div>

            <div class="itemInfo2" style="width: 10%">
              <div
                style="float:left;margin-left=1rem"
                class="optionDiv"
                @click="fixThisItem(item)"
              >
                修改
              </div>
              <div
                style="float: left"
                class="optionDiv"
                @click="deleteThisItem(item)"
              >
                删除
              </div>
                            <div
                style="float: left"
                class="optionDiv"
                @click="printBtn(item)"
              >
                印章
              </div>
            </div>
            <div style="clear: both"></div>
            <!-- <div style="clear:both"></div> -->
          </div>
        </div>

        <div style="boder-top: solid 0.2rem"></div>
      </div>
      <div style="height: 2rem"></div>
    </div>
  </div>
</template>

<script>
import Utils from "../../utils/doc.js";
import axios from "axios";
import doc from '../../utils/doc.js';

export default {
  computed: {
    docType() {
      return sessionStorage.getItem("docType");
    },
    authCode() {
      return sessionStorage.getItem("authCode") || "";
    },
  },
  data() {
    return {
      advSearchShow:false,
      searchContent:'输入识别号',
      searchForm:{
        docSequence:'',
        docTitle:'',
        docDesc:'',
        docDate:'',
        dutyAuthor:'',
        docType:'',
        personName:'',
      },
      RsDocs: [
        //所有的人
        [
          //第一个人
          [
            //16个list的第一个
            {
              id: "1",
              docSequence: "123qwe", //序列号，标识文件
              docType: "personnel",
              docTitle: "材料1巴拉巴拉", //标题
              docAbout: "履历材料",
              docAboutSub: "无",
              keyword: "关键字", //关键字
              // docDesc: "", //文号
              // sortYear: "2019",
              docDate: "20180808",
              docTypeCode: "RS",

              docSecret: "", //文件密级
              docPage: "23",
              remark: "", //备注
              docNumber: "1", //件号
              personName: "陈海林",
              docDescNum: "0", //文号中的序号
            },
            {
              id: "2",
              docSequence: "321qwe", //序列号，标识文件
              docType: "personnel",
              docTitle: "材料1巴拉巴拉2", //标题
              docAbout: "履历材料",
              docAboutSub: "无",
              keyword: "关键字2", //关键字
              // docDesc: "", //文号
              // sortYear: "2019",
              docDate: "20180808",
              docTypeCode: "RS",

              docSecret: "", //文件密级
              docPage: "23",
              remark: "", //备注
              docNumber: "2", //件号
              personName: "陈海林",
              docDescNum: "0", //文号中的序号
            },
          ], //16个list
          [
            //材料2
            {
              id: "1",
              docSequence: "12aswe", //序列号，标识文件
              docType: "personnel",
              docTitle: "材料2巴拉巴拉", //标题
              docAbout: "自传材料",
              docAboutSub: "无",
              keyword: "关键字1", //关键字
              // docDesc: "", //文号
              // sortYear: "2019",
              docDate: "20180808",
              docTypeCode: "RS",

              docSecret: "", //文件密级
              docPage: "23",
              remark: "", //备注
              docNumber: "1", //件号
              personName: "陈海林",
              docDescNum: "0", //文号中的序号
            },
            {
              id: "2",
              docSequence: "32asde", //序列号，标识文件
              docType: "personnel",
              docTitle: "材料2巴拉巴拉2", //标题
              docAbout: "自传材料",
              docAboutSub: "无",
              keyword: "关键字2", //关键字
              // docDesc: "", //文号
              // sortYear: "2019",
              docDate: "20180808",
              docTypeCode: "RS",

              docSecret: "", //文件密级
              docPage: "23",
              remark: "", //备注
              docNumber: "2", //件号
              personName: "陈海林",
              docDescNum: "0", //文号中的序号
            },
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
        ],
        [
          //人B
          [], //16个list
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
        ],
      ],

      //   authCode:'2',
      // searchForm.docSequence: "输入识别号",
      showWaitingFlag: false,
      tempOrganName: "name",
      tempOrganCode: 123,
    };
  },
  methods: {
        isNumber(value) {
      if (isNaN(value)) {
        return false;
      } else {
        return true;
      }
    },

       loadDocs(){
//         if(sessionStorage.getItem('docType')=='personnel'){
// var path =
//         "/document/" +
//         sessionStorage.getItem("docType") +
//         "/sort/" +
//         sessionStorage.getItem("batchId") +
//         "?pageNow=0&pageSize=10000";
        
//         this.showWaitingFlag = true;
//         this.getRequest(path).then((resp) => {
//           console.log("排件号盒号");
//           console.log(resp);})
//         }
        this.showWaitingFlag=true
      // return
       var path='/document/page/'+sessionStorage.getItem('docType')+'/'
       +sessionStorage.getItem('batchId')+'?pageNow=0&pageSize=100000'  // 其他三种档案都是这个接口，但人事的渲染比较nb，三重循环
                          axios.get(this.baseurl+path, {
                  headers:{
            'Content-Type': 'application/json',
            'authId':sessionStorage.getItem('authId'),
            token:sessionStorage.getItem('token')?(sessionStorage.getItem('token').split('"')[1]||sessionStorage.getItem('token')):null,
                  }
              }).then(resp=>{
                  // console.log(resp)
                  if(resp){
                    
                    if(resp.data.content&&this.docType=='personnel' ){
                       let vm = this;
      var path =
        "/document/" +
        sessionStorage.getItem("docType") +
        "/sort/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=10000";
 
         this.getRequest(path).then((resp) => {
          console.log("排件号人事");
          console.log(resp);
          if(resp){
            this.showWaitingFlag=false
          }
          // console.log(JSON.stringify(resp))
          if (resp.code == 0) {
            
            // console.log("ss000000000aaaa")
            this.showWaitingFlag = false;
            console.log(resp.data)
            this.$store.state.alreadyDocs = resp.data
 
          }
        });
                    }
                  else {this.$store.state.alreadyDocs=resp.data.content
                  this.showWaitingFlag=false
                  }
                  }
                 
            // this.$router.push('/work/docInputD')
              })
    },

    loadDocs1() {
      this.$store.state.alreadyDocs=[]
      //         if(sessionStorage.getItem('docType')=='personnel'){

      // var path =
      //         "/document/" +
      //         sessionStorage.getItem("docType") +
      //         "/sort/" +
      //         sessionStorage.getItem("batchId") +
      //         "?pageNow=0&pageSize=90000";

      //         this.showWaitingFlag = true;

      //         this.getRequest(path).then((resp) => {
      //           console.log("排件号盒号");
      //           console.log(resp);})

      //         }

      this.showWaitingFlag = true;

      // return
      // var path =
      //   "/document/page/" +
      //   sessionStorage.getItem("docType") +
      //   "/" +
      //   sessionStorage.getItem("batchId") +
      //   "?pageNow=0&pageSize=900000";
var path =
        "/document/" +
        sessionStorage.getItem("docType") +
        "/sort/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=10000";

          // var path='/document/page/'+sessionStorage.getItem('docType')+'/'
          // +sessionStorage.getItem('batchId')+'?pageNow=0&pageSize=100000'

      axios
        .get(this.baseurl+path, {
          headers: {
            "Content-Type": "application/json",
            authId: sessionStorage.getItem("authId"),
            token: sessionStorage.getItem("token")
              ? sessionStorage.getItem("token").split('"')[1] ||
                sessionStorage.getItem("token")
              : null,
          },
        })
        .then((resp) => {
          console.log(resp);
    this.$store.state.alreadyDocs = resp.data;

          if (resp) {
            // if (resp.data.content && this.docType == "personnel") {
            if (resp.data.content && this.docType == "personnel") {

              // let vm = this;
              // var path =
              //   "/document/" +
              //   sessionStorage.getItem("docType") +
              //  "/" +
              //   sessionStorage.getItem("batchId") +
              //   "?pageNow=0&pageSize=90000";

                 var path =
        "/document/page/" +
        sessionStorage.getItem("docType") +
        "/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=1000";

              this.getRequest(path).then((resp) => {
                console.log("排件号人事");
                console.log(resp);
                if (resp) {
                  this.showWaitingFlag = false;
                }
                // console.log(JSON.stringify(resp))
                if (resp.code == 0) {
                  // console.log("ss000000000aaaa")
                  this.showWaitingFlag = false;
                  console.log(resp.data);
                  this.$store.state.alreadyDocs = resp.data;
                }
              });
            } else {
              this.$store.state.alreadyDocs = resp.data.content;

              this.showWaitingFlag = false;
            }
          }

          // this.$router.push('/work/docInputD')
        });
    },
    cancelSearch() {
      // if (this.searchContent != "输入识别号") {
      if (true) {
        this.searchContent= "输入识别号";
        this.loadDocs();
      }
    },
    goSetRule() {
      // this.$router.replace('/work/modifyOragan')
      // if(this.docType=='')
      // this.$store.state.whichRuleSet=
      // this.$store.state.whichRuleSet=sessionStorage.getItem('auth')
      this.$router.push("/work/keyWM");
    },

    hideAdvSearch(){
      this.advSearchShow=false
      this.loadDocs();
    },
  ShowadvSearch(){
      this.advSearchShow=true;

    },
        advSearch(){
      this.showWaitingFlag=true
      var searchPath =
        "/document/list/page/" +
        sessionStorage.getItem("docType") +
        "?pageNow=0&pageSize=900000";
      // var docObj1 = {
      //   // userId:JSON.stringify(sessionStorage.getItem("userId")),
      //   // userId: sessionStorage.getItem('userId'),
      //   docSequence: this.searchForm.docSequence,
      //   docType: sessionStorage.getItem("docType"),
      // };
      this.searchForm.docType=sessionStorage.getItem('docType')
      var docObj=this.searchForm
      for(var key in docObj){
        if(docObj[key]==''){
          delete docObj[key];
        }
      }

      this.postRequest(
        //注意防止重复提交
        searchPath,
        JSON.stringify(docObj)
      ).then((resp) => {
        // console.log(resp);
        this.showWaitingFlag=false
        this.$store.state.alreadyDocs=resp.data.content

        if(sessionStorage.getItem('docType')=='personnel'){
          // alert(2)
          var arr1=this.$store.state.alreadyDocs
          var arr2=[]
          arr2.push(arr1)
          var arr3=[]
          arr3.push(arr2)
          this.$store.state.alreadyDocs=arr3
          // console.log('aaa')
          console.log(arr3)
        }
      });
    },

    searchTheDoc() {
      this.showWaitingFlag=true
      var searchPath =
        "/document/list/page/" +
        sessionStorage.getItem("docType") +
        "?pageNow=0&pageSize=1000";
      var docObj = {
        // userId:JSON.stringify(sessionStorage.getItem("userId")),
        // userId: sessionStorage.getItem('userId'),
        docSequence: this.searchContent,
        docType: sessionStorage.getItem("docType"),
      };
      this.postRequest(
        //注意防止重复提交
        searchPath,
        JSON.stringify(docObj)
      ).then((resp) => {
        // console.log(resp);
        this.showWaitingFlag=false
        this.$store.state.alreadyDocs=resp.data.content

        if(sessionStorage.getItem('docType')=='personnel'){
          // alert(2)
          var arr1=this.$store.state.alreadyDocs
          var arr2=[]
          arr2.push(arr1)
          var arr3=[]
          arr3.push(arr2)
          this.$store.state.alreadyDocs=arr3
          // console.log('aaa')
          console.log(arr3)
        }
      });
    },
    sortThisBatchRS1(){
                window.scrollTo(0,0)
            console.log("查看批次item")

            console.log(item) //打印单位


              axios.get(this.baseurl+'/work/list', {
                  headers:{
            'Content-Type': 'application/json',
            'authId':sessionStorage.getItem('authId'),
            token:sessionStorage.getItem('token')?(sessionStorage.getItem('token').split('"')[1]||sessionStorage.getItem('token')):null,

                  }
              })
                //成功返回
                .then(response => {
                    if(response.code==0){
                        this.organsShow=false;
                        this.batches=response.data;
                        this.batches.reverse()

                    }

                })
                //失败返回
                .catch(error => {
                    console.log(error);
                })
    },
    sortThisBatchRS() {
      // let vm = this;
      var path =
        "/document/" +
        sessionStorage.getItem("docType") +
        "/sort/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=90000";
      this.$confirm(
        "将对本批人事信息排序，本批工作是否已经完成录入，并且所有关键词都已经设置优先级",
        "提示",
        {
          cancelButtonClass: "btn-custom-cancel",
          cancelButtonText: "设置优先级",
          confirmButtonText: "是",

          type: "warning",
        }
      ).then(() => {
        this.showWaitingFlag = true;

        this.getRequest(path).then((resp) => {
          console.log("排件号盒号人事");
          console.log(resp);
          // console.log(JSON.stringify(resp))
          if (resp.code == 0) {
            // console.log("ss000000000aaaa")
            this.showWaitingFlag = false;
            this.$store.state.alreadyDocs = resp.data;

            // for(var arr in resp.data){
            //     for(var item in arr){
            //         this.$store.state.alreadyDocs.push(item)
            //     }
            // }
            // for (var i = 0; i < resp.data.length; i++) {
            //   for (var j = 0; j < resp.data[i].length; j++) {
            //     for(var k=0;k<resp.data[i][j].length;k++){
            //       this.$store.state.alreadyDocs.push(resp[i][j][k])
            //     }
            //     //
            //   }
            // }
          }
        });
      });
    },
    sortThisBatch() {
      // let vm = this;
      var path =
        "/document/" +
        sessionStorage.getItem("docType") +
        "/sort/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=90000";
      this.$confirm(
        "将生成件号盒号，本批工作是否已经完成录入，并且所有关键词责任者等都已经设置优先级",
        "提示",
        {
          cancelButtonClass: "btn-custom-cancel",
          cancelButtonText: "设置优先级",
          confirmButtonText: "是",

          type: "warning",
        }
      ).then(() => {
        this.showWaitingFlag = true;

        this.getRequest(path).then((resp) => {
          console.log("排件号盒号");
          console.log(resp);
          // console.log(JSON.stringify(resp))
          if (resp.code == 0) {
            this.showWaitingFlag = false;
            this.$store.state.alreadyDocs = [];
            // for(var arr in resp.data){
            //     for(var item in arr){
            //         this.$store.state.alreadyDocs.push(item)
            //     }
            // }
            for (var i = 0; i < resp.data.length; i++) {
              for (var j = 0; j < resp.data[i].length; j++) {
                this.$store.state.alreadyDocs.push(resp.data[i][j]);
                //
              }
            }
          }
        });
      });
    },
    goDocIn() {
      this.$router.push("/work/docInput");
    },
    reloadTable() {
      var path =
        "/document/page/" +
        sessionStorage.getItem("docType") +
        "/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=1000";
      axios
        .get(this.baseurl+path, {
          headers: {
            "Content-Type": "application/json",
            authId: sessionStorage.getItem("checkAuthId"),
            token: sessionStorage.getItem("token")
              ? sessionStorage.getItem("token").split('"')[1] ||
                sessionStorage.getItem("token")
              : null,
          },
        })
        .then((resp) => {
          console.log(resp);

          this.$store.state.alreadyDocs = resp.data.content;
          // this.$router.push('/work/docInputD')
        });
    },

    backToOrgans() {
      this.$router.push("/work/modifyOrgan");
    },
    focusOnThis(e) {},

       getExcel() {
      this.$confirm("下载前请确保已排序", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        cancelButtonText: "否",
        confirmButtonText: "是",

        type: "warning",
      }).then(() => {
          //  var path ='/excel'
            var path =
          "/document/excel/" +
          sessionStorage.getItem("docType") +
          "/" +
          sessionStorage.getItem("batchId");



        if(sessionStorage.getItem('docType')=='personnel'){
this.showWaitingFlag=true
 axios({
                method: "get",

                url: this.baseurl+path,

           headers: {
            "Content-Type": "application/json",
            authId: sessionStorage.getItem("authId"),
            token: sessionStorage.getItem("token")
              ? sessionStorage.getItem("token").split('"')[1] ||
                sessionStorage.getItem("token")
              : null,
          },
          
                responseType: "blob",

            })

                .then((res) => {
                    //ie内核的浏览器下

                    if (

                        navigator.userAgent.match(/MSIE\s([\d.]+)/) ||

                        navigator.userAgent.indexOf("Trident") > -1

                    ) {
                        window.navigator.msSaveBlob(res, `人员信息.zip`);

                    } else {
                        let url = window.URL.createObjectURL(res);

                        let link = document.createElement("a");

                        link.style.display = "none";

                        link.href = url;

                        link.download = `人员信息.zip`;

                        document.body.appendChild(link);

                        link.click();

                        document.body.removeChild(link);

                        window.URL.revokeObjectURL(url);
    this.showWaitingFlag=false
                    }

                })

                .catch((error) => {
                    this.$message.warning("导出失败");

                });

 


        }
        else{
          // alert(2)
          this.showWaitingFlag=true
            axios({
          method: "get",
          url: this.baseurl+path,
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            authId: sessionStorage.getItem("authId"),
            token: sessionStorage.getItem("token")
              ? sessionStorage.getItem("token").split('"')[1] ||
                sessionStorage.getItem("token")
              : null,
          },
        }).then((res) => {
          // console.log("DASDASDASDASD")

          console.log(res);
          const blob = new Blob([res]); //new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）

          const fileName = "文件名称.xls"; //这里可以自定义名称，发现设置xlsx文件类型下载后打开会提示下面图-1的无效报错,所以我用了xls格式

          const elink = document.createElement("a");

          elink.download = fileName;

          elink.style.display = "none";

          elink.href = URL.createObjectURL(blob);

          document.body.appendChild(elink);

          elink.click();

          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
          this.showWaitingFlag=false
        });

        return;

        var path =
          "/document/excel/" +
          sessionStorage.getItem("docType") +
          "/" +
          sessionStorage.getItem("batchId");

        axios
          .post(
            this.baseurl+path,
            {},
            { responseType: "arraybuffer" },
            {
              headers: {//checkAuthId
                "Content-Type": "application/json",
                authId: sessionStorage.getItem("authId"),
                token: sessionStorage.getItem("token")
                  ? sessionStorage.getItem("token").split('"')[1] ||
                    sessionStorage.getItem("token")
                  : null,
              },
            }
          )
          .then((res) => {
            let blob = new Blob([res], { type: "application/vnd.ms-excel" });
            let objectUrl = URL.createObjectURL(blob);
            window.location.href = objectUrl;
          })
          .catch((error) => {
            if (data.Vue) {
              data.Vue.$message.error("系统异常");
            }
            reject(null, e);
          });
 
        }
        // let date = item.plans[this.daysIndex[index]]
        //  let url = '/Ecp.Export.exportXls.jdn?entityId='+item.FId+'&date='+date.FDeparture_date+'&token=' + sessionStorage.getItem("token")
     
      
      });
    },
    fixThisItem(item) {
      console.log(item);
      this.$store.state.tempDoc = Object.assign({}, item);
      //   alert(item.id)
      //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
      // item.sortYear=JSON.stringify(item.sortYear)
      //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
      this.$store.state.tempDocId = item.id;

      this.$store.state.tempDocSeq = item.docSequence;

      this.$router.push("/work/docInput");
    },
    printBtn(item){
 
      if(sessionStorage.getItem("docType")=="personnel"){
              if(item.personJob==4||item.personJob==5) //personJob字段用来存是哪种文档类型
      {
        window.sessionStorage.setItem('rsPrint',4)
      window.sessionStorage.setItem('rsPrintSub',(item.personJob-3)+'-'+item.docNum)
      }
      if(item.personJob<4){
        window.sessionStorage.setItem('rsPrint',item.personJob)
        window.sessionStorage.setItem('rsPrintSub','-'+item.docNum)

      }
      else if(item.personJob<10){
        window.sessionStorage.setItem('rsPrint',item.personJob-1)
        window.sessionStorage.setItem('rsPrintSub','-'+item.docNum)
      }
      else if(item.personJob>9&&item.personJob<16){  //10-15
                window.sessionStorage.setItem('rsPrint',item.personJob-9)
        window.sessionStorage.setItem('rsPrintSub',(item.personJob-9)+'-'+item.docNum)
      }else{
                        window.sessionStorage.setItem('rsPrint',10)
        window.sessionStorage.setItem('rsPrintSub','-'+item.docNum)
      }
    var ttt=sessionStorage.getItem('rsPrint')
      window.sessionStorage.setItem('rsPrint',ttt+" ")
      }//personnel
      else if(sessionStorage.getItem("docType")=="official"||sessionStorage.getItem("docType")=="business"){
        // alert(2)
        window.sessionStorage.setItem('authCode',sessionStorage.getItem('authCode'))

        window.sessionStorage.setItem('sortYear',item.sortYear)
        window.sessionStorage.setItem('docNum',item.docNum)
        window.sessionStorage.setItem('docAbout',item.docAbout)
        var y=item.deadline
        // console.log(y)
        if(this.isNumber(y)){
          // alert(1)
          console.log(y)
          y=y+'年'
        }
        window.sessionStorage.setItem('timedue',y)


        window.sessionStorage.setItem('docPage',item.docPage)


      }

      // else if(sessionStorage.getItem("docType")=="business") {
      //   var t=sessionStorage.getItem('authCode')+ "-" 
      //        +'-' +item.docAbout + "-"  +this.formatFourNum1(item.docNum)
      //   window.sessionStorage.setItem('danghao',t)
      // }
      
      else if(sessionStorage.getItem("docType")=="science"){
        // alert(2)
          // alert(2) 
          var tauthcode=sessionStorage.getItem('authCode')
              var c=tauthcode
              // alert(tauthcode)
    while(c.charAt(0)=='0') {
      c=c.substring(1)
    }
        var kjdh=c+ "-"  
             +  sessionStorage.getItem('docTypeCode') +'-'+
               item.boxSeq
    // alert(2)

      window.sessionStorage.setItem("danghao1",kjdh)
      window.sessionStorage.setItem("kjXuhao",item.docNum)
      }



      let { href } = this.$router.resolve({ path: '/work/print' })
      window.open(href, '_blank')
    },
    formatFourNum1(value){
          var tvalue=value+""
    if(tvalue==undefined||tvalue=='null'||!tvalue||tvalue==""){return '暂无'}
    else {
        var h=tvalue
        while(h.length<4){
            h='0'+h
        }
        // console.log(h)
        return h
    }
    },
    formatFiveKJ(value){
    var tvalue=value+""
    if(tvalue==undefined||tvalue=='null'||!tvalue||tvalue==""){return '暂无'}
    else {
        var h=tvalue
        while(h.length<5){
            h='0'+h
        }
        // console.log(h)
        return h
    }
    },

    formatThreeKJ(value){
        var tvalue=value+""
    if(tvalue==undefined||tvalue=='null'||!tvalue||tvalue==""){return '暂无'}
    else {
        var h=tvalue
        while(h.length<3){
            h='0'+h
        }
        // console.log(h)
        return h
    }
    },

    deleteThisItem(item) {
      this.$confirm("是否删除这条档案数据", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        cancelButtonText: "否",
        confirmButtonText: "是",

        type: "warning",
      }).then(() => {
        this.showWaitingFlag = true;
        var pathToDel =
          "/document/" + sessionStorage.getItem("docType") + "/" + item.id;

        axios
          .delete(this.baseurl+pathToDel, {
            headers: {
              "Content-Type": "application/json",
              authId: sessionStorage.getItem("authId"),
              token: sessionStorage.getItem("token")
                ? sessionStorage.getItem("token").split('"')[1] ||
                  sessionStorage.getItem("token")
                : null,
            },
          })
          .then((resp) => {
            if (resp.code == 0) {
              this.showWaitingFlag=false

              this.loadDocs()
//               var length = this.$store.state.alreadyDocs.length || 0;
//               var _arr = this.$store.state.alreadyDocs;
//               for (var i = 0; i < length; i++) {
//                 for(var j=0;j<_arr[i].length;j++){
//                   for(var k=0;k<_arr[i][j].length;k++){
//  if (_arr[i][j][k].docSequence == item.docSequence) {
//                   _arr[i][j].splice(k, 1); //删除下标为i的元素
//                   this.showWaitingFlag = false;

//                   break;
//                 }
//                   }
//                 }
               
//               }
            }
          });
      });

      // '/document/{type}/{id}'
      // var pathToDel='/document'
      //  this.deleteRequest(
      //   //注意防止重复提交
      //   pathToDoc,
      //   JSON.stringify(docObj)
      // ).then((resp) => {
      //   console.log("修改文件");

      //   console.log(docObj);
      //   console.log("修改文件的结果");
      //   console.log(resp);
      // });
    },
  },
  created() {
    // this
    // var c="adsd"
    // if(c.charAt(0)=='a') c=c.substring(1)
    // alert(c)

    this.loadDocs();
  },

  mounted() {
    // this.authCode=sessionStorage.getItem('authCode')||'错误'
    // this.docType=sessionStorage
  },
};
</script>

<style lang="scss" scoped>
.loginContainer{
      position: absolute;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 30rem;
    left:50%;
    margin-left: -15rem;
    top: 4rem;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.leftInput {
  float: left;
  width: 60%;
  margin-left: 2%;
  margin-top: 0.9rem;
}
.hoverStyle:hover {
  cursor: pointer;
  color: rgba(1, 4, 14, 0.801);
}

.optionDiv {
  // color:rgb(170, 138, 51);
  font-weight: 600;
  font-size: 1rem;
  margin-left: 1rem;
}
.optionDiv:hover {
  color: #aaa;
  cursor: pointer;
}
.wrapper {
  background-color: rgb(209, 218, 243);
  // height: 120vh;
  position: relative;
  padding-bottom: 60vh;
}

.docDetailBox {
  position: relative;
  top: 3rem;
  // padding-bottom: 50rem;

  .detailItem {
    // height:2rem;
    // line-height: 2rem;
    border-top: solid 0.02rem;
  }
  .itemInfo {
    float: left;
    font-size: 0.8rem;
    width: 7%;
    text-align: center;
    // border-right: 0.05rem solid;
  }
  .itemInfo2 {
    float: left;
    font-size: 0.8rem;
    width: 6%;
    text-align: center;
    // border-right: 0.05rem solid;
  }

  .detailTopLine{
    height: 2rem;
    line-height: 2rem;
    border-top:  solid rgb(56, 53, 53);
  }
  .topTextButton{
             
          
      
          color: #333;

          // width: 30rem;
          // height: 10rem;
padding: 0.3rem;
          background-color: rgb(108, 120, 153);
          -webkit-box-shadow: 0 0 0.5rem #909399;
          box-shadow: 0 0 0.5rem #909399;
          border-radius: 0.5rem;
          color:#ddd;
          // top:-2.8rem !important
          margin-left: 1rem;
  }

  .topTextButton:hover{
          background-color: rgb(43, 50, 68);

  }
}
</style>