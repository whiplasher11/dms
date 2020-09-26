<template>
  <div>
    <div class="wrapper" style="padding-bottom:10rem">
      <div style="height:6.5rem"></div>
      <div
        style="position:absolute;width:20rem;height:10rem;top:10rem;left:50%;margin-left:-10rem;line-height:10rem;
    background-color:rgba(25,55,163,0.8);font-size:1.3rem;color:white;text-align:center;z-index:1000"
        v-if="showWaitingFlag"
      >请求中，请稍候...</div>

    <!-- <div class="docDetailBox" v-if="docType=='personnel'">

    </div> -->

      <div class="docDetailBox"  >
        <div style="height:4.5rem;position:absolute;top:-3.7rem;right:5rem;">
          <!-- 搜索 -->
          <el-input class="leftInput" v-model="searchContent"></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            style="background-color:rgb(134, 151, 197);border:none;margin-top:1rem;margin-left:0.2rem"
            @click="searchTheDoc"
          >搜索</el-button>
                    <el-button
            type="warning"
            icon="el-icon-error"
            style="border:none;margin-top:1rem;position:absolute"
            @click="cancelSearch"
          >取消</el-button>
        </div>

        <div
          style="    position: absolute;
    left: 0rem;
    top: -2.5rem;
    font-size: 1.2rem;"
          class="hoverStyle"
          @click="backToOrgans"
        >选项：</div>

        <div
          style="    position: absolute;
    left: 18rem;
    top: -2.5rem;
    font-size: 1.2rem;"
          class="hoverStyle"
          @click="backToOrgans"
        >所有整档单位</div>

        <div
          style="    position: absolute;
    left: 27rem;
    top: -2.5rem;
    font-size: 1.2rem;"
          class="hoverStyle"
          @click="goDocIn"
        >继续录入</div>

        <div
          style="    position: absolute;
    left: 35rem;
    top: -2.4rem;
    font-size: 1rem;"
          class="hoverStyle"
          @click="goSetRule"
        >顺序有问题？请前往设置本单位规则</div>

        <div
          style="    position: absolute;
    left: 11rem;
    top: -2.5rem;
    font-size: 1.2rem;"
    v-if="docType!='personnel'"
          class="hoverStyle"
          @click="sortThisBatch"
        >排件号盒号</div>

                <div
          style="    position: absolute;
    left: 11rem;
    top: -2.5rem;
    font-size: 1.2rem;"
    v-if="docType=='personnel'"
          class="hoverStyle"
          @click="sortThisBatchRS"
        >报表排序</div>


        <div
          style="    position: absolute;
    left: 4rem;
    top: -2.5rem;
    font-size: 1.2rem;"
          class="hoverStyle"
          @click="getExcel"
        >下载表格</div>

        <div
          style="position: absolute;
    width: 16rem;
    top: -6.5rem;
    font-size: 1.4rem;
    margin-left: -8rem;
    left: 50%;"
        >本批所有已录入文档</div>

 

        <div v-if="docType!='science'&&docType!='personnel'">
          <div class="detailItem">
            <div class="itemInfo">识别号</div>

            <div class="itemInfo">档号</div>
            <div class="itemInfo">文号</div>
            <div class="itemInfo">责任者</div>
            <div class="itemInfo" style="font-size:0.6rem;width:10%">题名</div>
            <div class="itemInfo">成文时间</div>
            <div class="itemInfo">密级</div>
            <div class="itemInfo">页数</div>
            <div class="itemInfo" style="font-size:0.6rem;width:10%">备注</div>
            <div class="itemInfo">件号</div>
            <div class="itemInfo">盒号</div>

            <div style="clear:both"></div>

            <!-- <div style="clear:both"></div> -->
          </div>

          <div
            class="detailItem"
            v-for="item in this.$store.state.alreadyDocs"
            :key="item.docSequence"
          >
            <div class="itemInfo">{{item.docSequence}}</div>

            <div
              class="itemInfo"
            >{{authCode+'-'+item.docTypeCode+'·'}}{{item.sortYear|formatSortYear}}-{{item.deadline|deadlineFormat}}-{{item.docAbout+'-'}}{{item.docNum|formatFourNum}}</div>
            <!-- 档号 -->
            <!-- <div class="itemInfo">{{item.docDescAuthor+'['}}{{item.sortYear|formatSortYear}}{{']'+(item.docNum?item.docNum:'暂无')+"号"}}</div> -->
            <div class="itemInfo">{{item.docDesc?item.docDesc:'&nbsp;'}}</div>

            <div class="itemInfo">{{item.dutyAuthor}}</div>
            <div class="itemInfo" style="font-size:0.6rem;width:10%">{{item.docTitle}}</div>
            <div class="itemInfo">{{item.docDate}}</div>
            <div class="itemInfo">{{item.docSecret=='无'||!item.docSecret?'&nbsp;':item.docSecret}}</div>
            <div class="itemInfo">{{item.docPage}}</div>
            <div
              class="itemInfo"
              style="font-size:0.6rem;width:10%"
            >{{item.remark?item.remark:'&nbsp;'}}</div>
            <div class="itemInfo">{{(item.docNum?item.docNum:'暂无')}}</div>
            <div class="itemInfo">{{(item.boxSeq?item.boxSeq:'暂无')}}</div>
            <div class="itemInfo" style="width:10%">
              <div
                style="float:left;margin-left=1rem"
                class="optionDiv"
                @click="fixThisItem(item)"
              >修改</div>
              <div style="float:left" class="optionDiv" @click="deleteThisItem(item)">删除</div>
            </div>
            <div style="clear:both"></div>
            <!-- <div style="clear:both"></div> -->
          </div>
        </div>
 

        <div v-if="docType=='personnel'">
         <div style="height:1rem">
 <div class="itemInfo">姓名</div>
  <div class="itemInfo">材料类型</div>
   <div class="itemInfo">子材料类型</div>
 <div class="itemInfo">件号</div>
  <div class="itemInfo" style="width:10%">标题</div>
   <div class="itemInfo">日期</div>
    <div class="itemInfo">页数</div>
     <div class="itemInfo" style="width:10%">备注</div>
      <div class="itemInfo">操作</div>
         </div>
          <div v-for="(item,index) in this.$store.state.alreadyDocs" :key="index" style="border-top:0.05rem solid">
            <!-- 上面是循环有多少个人  -->
            <!-- 接下来是循环每个人的16个list -->
            <div v-for="(i,ind) in item" :key="ind" > 
              <div v-for="(j,ind3) in i" :key="ind3">
                              <div class="itemInfo" v-if="ind3==0">

                {{j.personName}}
              </div>
                              <div class="itemInfo" v-if="ind3!=0">&nbsp;</div>

                            <div class="itemInfo" v-if="ind3==0">
                {{j.docAbout}}
              </div>
                              <div class="itemInfo" v-if="ind3!=0">&nbsp;</div>

                        <div class="itemInfo" >
                {{j.docAboutSub=='无'?'&nbsp;':j.docAboutSub}}
              </div>

                            <div class="itemInfo">
                {{j.docNumber}}
              </div>

                                          <div class="itemInfo"  style="width:10%">
                {{j.docTitle}}
              </div>

                                          <div class="itemInfo">
                {{j.docDate}}
              </div>

                                          <div class="itemInfo">
                {{j.docPage}}
              </div>
                                                        <div class="itemInfo" style="width:10%" >
                {{j.docPage}}
              </div>
            <div class="itemInfo2" style="width:10%">
              <div
                style="float:left;margin-left=1rem"
                class="optionDiv"
                @click="fixThisItem(j)"
              >修改</div>
              <div style="float:left" class="optionDiv" @click="deleteThisItem(j)">删除</div>
            </div>
              <div style="clear:both"></div>

              </div>
            </div>
          </div>
          <div style="border-top:0.02rem"></div>
        </div>


        <div v-if="docType=='science'">
          <div class="detailItem">
            <div class="itemInfo2">识别号</div>

            <div class="itemInfo2">档号</div>
            <div class="itemInfo2">全宗号</div>
            <div class="itemInfo2">目录号</div>
            <div class="itemInfo2">案卷号</div>
            <div class="itemInfo2">顺序号</div>
            <div class="itemInfo2">责任者</div>

            <div class="itemInfo2" style="font-size:0.6rem;width:10%">题名</div>
            <div class="itemInfo2">成文时间</div>
            <div class="itemInfo2">页数</div>
            <div class="itemInfo2">期限</div>
            <div class="itemInfo2">密级</div>

            <div class="itemInfo2" style="font-size:0.6rem;width:10%">备注</div>

            <div style="clear:both"></div>

            <!-- <div style="clear:both"></div> -->
          </div>

          <div
            class="detailItem"
            v-for="item in this.$store.state.alreadyDocs"
            :key="item.docSequence"
          >
            <div class="itemInfo2">{{item.docSequence}}</div>

            <div
              class="itemInfo2"
            >{{authCode+'-'+item.docTypeCode+'-'}}{{item.boxSeq|formatFiveKJ}}-{{item.docNum|formatThreeKJ}}</div>
            <!-- 档号 -->
            <!-- <div class="itemInfo2">{{item.docDescAuthor+'['}}{{item.sortYear|formatSortYear}}{{']'+(item.docNum?item.docNum:'暂无')+"号"}}</div> -->

            <div class="itemInfo2">{{authCode}}</div>
            <div class="itemInfo2">{{item.docTypeCode?item.docTypeCode:'&nbsp;'}}</div>

            <div class="itemInfo2">{{(item.boxSeq?item.boxSeq:'暂无')}}</div>

            <div class="itemInfo2">{{(item.docNum?item.docNum:'暂无')}}</div>
            <div class="itemInfo2">{{item.dutyAuthor}}</div>
            <div class="itemInfo2" style="font-size:0.6rem;width:10%">{{item.docTitle}}</div>
            <div class="itemInfo2">{{item.docDate}}</div>
            <div class="itemInfo2">{{item.docPage}}</div>
            <div class="itemInfo2">{{item.deadline}}</div>

            <div class="itemInfo2">{{item.docSecret=='无'?'&nbsp;':item.docSecret}}</div>
            <div
              class="itemInfo2"
              style="font-size:0.6rem;width:10%"
            >{{item.remark?item.remark:'&nbsp;'}}</div>

            <div class="itemInfo2" style="width:10%">
              <div
                style="float:left;margin-left=1rem"
                class="optionDiv"
                @click="fixThisItem(item)"
              >修改</div>
              <div style="float:left" class="optionDiv" @click="deleteThisItem(item)">删除</div>
            </div>
            <div style="clear:both"></div>
            <!-- <div style="clear:both"></div> -->
          </div>
        </div>

        <div style="boder-top:solid 0.2rem;"></div>
      </div>
      <div style="height:2rem"></div>
    </div>
  </div>
</template>

<script>
import Utils from "../../utils/doc.js";
import axios from "axios";

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

      RsDocs:[
        [ //人A
          [
 {

         id: "1",
        docSequence: "123qwe", //序列号，标识文件
        docType: "personnel",
        docTitle: "材料1巴拉巴拉", //标题
        docAbout: "履历材料",
        docAboutSub:'无',
        keyword: "关键字", //关键字
        // docDesc: "", //文号
        // sortYear: "2019",
        docDate: "20180808",
        docTypeCode:'RS',
 
        docSecret: "", //文件密级
        docPage: "23",
        docRemark: "", //备注
        docNumber: "1", //件号
        personName:'陈海林',
        docDescNum: "0", //文号中的序号

      }, {

         id: "2",
        docSequence: "321qwe", //序列号，标识文件
        docType: "personnel",
        docTitle: "材料1巴拉巴拉2", //标题
        docAbout: "履历材料",
        docAboutSub:'无',
        keyword: "关键字2", //关键字
        // docDesc: "", //文号
        // sortYear: "2019",
        docDate: "20180808",
        docTypeCode:'RS',
 
        docSecret: "", //文件密级
        docPage: "23",
        docRemark: "", //备注
        docNumber: "2", //件号
        personName:'陈海林',
        docDescNum: "0", //文号中的序号

      },
    
          ],//16个list
          [  //材料2
 {

         id: "1",
        docSequence: "12aswe", //序列号，标识文件
        docType: "personnel",
        docTitle: "材料2巴拉巴拉", //标题
        docAbout: "自传材料",
        docAboutSub:'无',
        keyword: "关键字1", //关键字
        // docDesc: "", //文号
        // sortYear: "2019",
        docDate: "20180808",
        docTypeCode:'RS',
 
        docSecret: "", //文件密级
        docPage: "23",
        docRemark: "", //备注
        docNumber: "1", //件号
        personName:'陈海林',
        docDescNum: "0", //文号中的序号

      }, {

         id: "2",
        docSequence: "32asde", //序列号，标识文件
        docType: "personnel",
        docTitle: "材料2巴拉巴拉2", //标题
        docAbout: "自传材料",
        docAboutSub:'无',
        keyword: "关键字2", //关键字
        // docDesc: "", //文号
        // sortYear: "2019",
        docDate: "20180808",
        docTypeCode:'RS',
 
        docSecret: "", //文件密级
        docPage: "23",
        docRemark: "", //备注
        docNumber: "2", //件号
        personName:'陈海林',
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
          []

        ],
        [ //人B
          [],//16个list
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
          []
        ],
      ],

      //   authCode:'2',
      searchContent: "输入识别号",
      showWaitingFlag: false,
      tempOrganName: "name",
      tempOrganCode: 123,
    };
  },
  methods: {
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




      // return
       var path='/document/page/'+sessionStorage.getItem('docType')+'/'+sessionStorage.getItem('batchId')+'?pageNow=0&pageSize=100000'
                          axios.get(path, {
                  headers:{
            'Content-Type': 'application/json',
            'authId':sessionStorage.getItem('authId'),
            token:sessionStorage.getItem('token')?(sessionStorage.getItem('token').split('"')[1]||sessionStorage.getItem('token')):null,

                  }
              }).then(resp=>{
                  console.log(resp)
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
          // console.log(JSON.stringify(resp))
          if (resp.code == 0) {
 
            // console.log("ss000000000aaaa")
            this.showWaitingFlag = false;
            console.log(resp.data)
            this.$store.state.alreadyDocs = resp.data
 
          }
        });
                    }
                  else this.$store.state.alreadyDocs=resp.data.content
                  }

                 
            // this.$router.push('/work/docInputD')

              })
    },
    cancelSearch(){
      if(this.searchContent!='输入识别号'){
      this.searchContent="输入识别号"
this.loadDocs()
      }

      
    },
    goSetRule() {
      // this.$router.replace('/work/modifyOragan')
      this.$router.push("/work/modifyOrgan");
    },
    searchTheDoc() {
      var searchPath =
        "/document/list/page/" +
        sessionStorage.getItem("docType") +
        "?pageNow=0&pageSize=1000";
      var docObj = {
        // userId:JSON.stringify(sessionStorage.getItem("userId")),
        // userId: sessionStorage.getItem('userId'),
        docSequence: this.searchContent,
        docType:sessionStorage.getItem('docType')
      };
      this.postRequest(
        //注意防止重复提交
        searchPath,
        JSON.stringify(docObj)
      ).then((resp) => {
        // console.log(resp);
        this.$store.state.alreadyDocs=resp.data.content
      });
    },
    sortThisBatchRS(){
            let vm = this;
      var path =
        "/document/" +
        sessionStorage.getItem("docType") +
        "/sort/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=10000";
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
            this.$store.state.alreadyDocs = resp.data
            
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
      let vm = this;
      var path =
        "/document/" +
        sessionStorage.getItem("docType") +
        "/sort/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=10000";
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
        .get(path, {
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
      this.$confirm("下载前请确保已排件号盒号", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        cancelButtonText: "否",
        confirmButtonText: "是",

        type: "warning",
      }).then(() => {
        // let date = item.plans[this.daysIndex[index]]
        //  let url = '/Ecp.Export.exportXls.jdn?entityId='+item.FId+'&date='+date.FDeparture_date+'&token=' + sessionStorage.getItem("token")
        var path =
          "/document/excel/" +
          sessionStorage.getItem("docType") +
          "/" +
          sessionStorage.getItem("batchId");

        axios({
          method: "get",
          url: path,
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/json",
            authId: sessionStorage.getItem("checkAuthId"),
            token: sessionStorage.getItem("token")
              ? sessionStorage.getItem("token").split('"')[1] ||
                sessionStorage.getItem("token")
              : null,
          },
        }).then((res) => {
          // console.log("DASDASDASDASD")

          console.log(res);
          const blob = new Blob([res]); //new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）

          const fileName = "文件名称.xls"; //这里可以自定义名称，发现设置xlsx文件类型下载后打开会提示下面图-1的无效报错,所以我用了xls格式

          const elink = document.createElement("a");

          elink.download = fileName;

          elink.style.display = "none";

          elink.href = URL.createObjectURL(blob);

          document.body.appendChild(elink);

          elink.click();

          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        });

        return;

        var path =
          "/document/excel/" +
          sessionStorage.getItem("docType") +
          "/" +
          sessionStorage.getItem("batchId");

        axios
          .post(
            path,
            {},
            { responseType: "arraybuffer" },
            {
              headers: {
                "Content-Type": "application/json",
                authId: sessionStorage.getItem("checkAuthId"),
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

        //               var path='/document/excel/'+sessionStorage.getItem('docType')+'/'+sessionStorage.getItem('batchId')
        //                     this.getRequest(path)
        //                   .then((resp) => {
        //         //             const reader = new FileReader()
        //         // reader.readAsText(resp, 'utf-8')
        //         // reader.onload = function (evt) {
        //         //   console.log(evt)
        //         //   const url = window.URL.createObjectURL(new Blob(['\uFEFF' + evt.target.result], {type: 'text/plain;charset=utf-8'}))
        //         //   const link = document.createElement('a')
        //         //   link.href = url
        //         //   link.setAttribute('download', `${fileName}`)
        //         //   document.body.appendChild(link)
        //         //   link.click()}

        //                                      var elink = document.createElement('a');
        // elink.download = "导出结果.xls";
        // elink.style.display = 'none';
        // var blob = new Blob([resp], {type:"application/octet-stream;charset=UTF-8"});

        // elink.href = URL.createObjectURL(blob);
        // document.body.appendChild(elink);
        // elink.click();
        // document.body.removeChild(elink);
        //                   })
        //                   // window.open(path)
      });
    },
    fixThisItem(item) {
      console.log(item)
      this.$store.state.tempDoc = Object.assign({}, item);
      //   alert(item.id)
      //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
      // item.sortYear=JSON.stringify(item.sortYear)
      //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
      this.$store.state.tempDocId = item.id;

      this.$store.state.tempDocSeq = item.docSequence;

      this.$router.push("/work/docInput");
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
          .delete(pathToDel, {
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
              var length = this.$store.state.alreadyDocs.length || 0;
              var _arr = this.$store.state.alreadyDocs;
              for (var i = 0; i < length; i++) {
                if (_arr[i].docSequence == item.docSequence) {
                  _arr.splice(i, 1); //删除下标为i的元素
                  this.showWaitingFlag = false;

                  break;
                }
              }
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
      
this.loadDocs();
  },

  mounted() {
    // this.authCode=sessionStorage.getItem('authCode')||'错误'
    // this.docType=sessionStorage
  },
};
</script>

<style lang="scss" scoped>
.leftInput {
  float: left;
  width: 65%;
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
  height: 120vh;
  position: relative;
}

.docDetailBox {
  position: relative;
  top: 5rem;

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
}
</style>