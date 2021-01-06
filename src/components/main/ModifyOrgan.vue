<template>
  <div>
    <div class="wrapper">
      <div style="height: 6.5rem; position: relative">
        <div
          style="
            position: absolute;
            bottom: -1.1rem;
            right: 20%;
            font-size: 1.2rem;
            cursor:pointer;
          "
          v-if="!organsShow"
          @click="backOrgans"
          class="topTextButton"
        >
          返回
        </div>

                <div
          style="
            position: fixed;
        top: 5.5rem;
            right: 24%;
            font-size: 1.1rem;
            cursor:pointer;
          "
          class="topTextButton"
          v-if="organsShow"
          @click="presetNameShow"
       
        >
          预设单位
        </div>
        
                <div
          style="
            position: fixed;
           top: 5.5rem;
            right: 17%;
            font-size: 1.1rem;
            cursor:pointer;
          "
          class="topTextButton"
          v-if="organsShow"
          @click="showUsusal"
       
        >
          常用单位
        </div>
        
                <div
          style="
            position: fixed;
            top: 5.5rem;
            right: 10%;
            font-size: 1.1rem;
            cursor:pointer;
          "
          class="topTextButton"
          v-if="organsShow"
          @click="showAll"
       
        >
          所有单位
        </div>

      </div>
 

      <div
        v-if="presetNameShowFlag"
        class="windowStyle"
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

          -webkit-box-shadow: 0 0 0.5rem #909399;
          box-shadow: 0 0 0.5rem #909399;
          border-radius: 1rem;
        "
      >
        <div
          style="
            font-size: 1.2rem;
            width: 100%;
            text-align: center;
            color: #ddd;
          "
        >
          请预设单位名和全宗号
        </div>

        <el-checkbox class="organShowCheckbox"
        style="position: absolute; right: 1rem; top: 8rem"
        v-if="true"
       
        false-label="false"
        true-label="true"
        @change="logShowtoSet"
        v-model="showToSet"
 
        >是否显示</el-checkbox
      >

        <input
          type="text"
          style="
            height: 1.5rem;
            margin-left: 6rem;
            margin-top: 2rem;
            width: 7rem;
          "
          v-model="nameToSet"
        />&nbsp;&nbsp;&nbsp;:
        <input
          type="text"
          style="height: 1.5rem; margin-left: 1rem; width: 7rem"
          v-model="authCodeToSet"
        />
        <div
          class="textButton"
          @click="clearFixNA"
          style="position: absolute; left: 5rem; color: #ddd"
        >
          取消
        </div>

        <div class="textButton" @click="dopreSetNA" style="color: #ddd;position: absolute">
          确定
        </div>
      </div>


      <div
        v-if="fixNameShow"
        class="windowStyle"
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

          -webkit-box-shadow: 0 0 0.5rem #909399;
          box-shadow: 0 0 0.5rem #909399;
          border-radius: 1rem;
        "
      >
        <div
          style="
            font-size: 1.2rem;
            width: 100%;
            text-align: center;
            color: #ddd;
          "
        >
          请修改单位名或全宗号
        </div>
                <el-checkbox class="organShowCheckbox"
        style="position: absolute; right: 1rem; top: 8rem"
        v-if="true"
       
        false-label="false"
        true-label="true"
        v-model="showToSet"
        >是否显示</el-checkbox
      >

        <input
          type="text"
          style="
            height: 1.5rem;
            margin-left: 6rem;
            margin-top: 2rem;
            width: 7rem;
          "
          v-model="nameToSet"
        />&nbsp;&nbsp;&nbsp;:
        <input
          type="text"
          style="height: 1.5rem; margin-left: 1rem; width: 7rem"
          v-model="authCodeToSet"
        />
        <div
          class="textButton"
          @click="clearFixNA"
          style="position: absolute; left: 5rem; color: #ddd"
        >
          取消
        </div>

        <div class="textButton" @click="doFixNA()" style="color: #ddd">
          确定
        </div>
      </div>

      <div v-if="organsShow">
        <div
          style="
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    /* border-bottom: 0.2rem solid rgb(44, 44, 44); */
    margin-bottom: 1rem;
    height: 5rem;
    line-height: 2rem;
    position: fixed;
    background-color: rgb(255,255,255);
    top: 4.5rem;
          "
        >
          您的档案单位
        </div>
<div class="organItem" style="height: 3rem "></div>
        <div class="organItem topFix" style=" border-bottom:none;   height: 2rem;
  line-height:2rem;
    top: 7rem;
    position: fixed;
  
    ">
          <div class="organInfo tip" style="width: 12% ;margin-left:2rem">序号</div>

          <div class="organInfo tip">单位名</div>
          <div class="organInfo tip">单位全宗号</div>
          <div class="organInfo tip">权重表修改</div>
          <div class="organInfo tip">操作</div>
          <div class="organInfo tip">&nbsp;</div>
          <div class="organInfo tip"></div>
        </div>

        <div
          class="organItem infoItemHighlight"
          v-for="(item, index) in this.organs"
          :key="item.id"
        >
          <div
            class="organInfo"
            style="width: 12%; font-size: 0.8rem; border: none"
          >
            {{ index + 1 }}
          </div>

          <div
            class="organInfo"
            style="font-size: 0.8rem; border: none"
            @focus="focusOnThis(item)"
            @blur="loseThis(item)"
            :v-model="tempOrganName"
          >
            {{ item.authName }}
          </div>

          <div
            class="organInfo"
            style="font-size: 0.8rem; border: none"
            @focus="focusOnThis"
            @blur="isLocked = false"
            :v-model="tempOrganCode"
          >
            {{ item.authCode | formatAuthCode }}
          </div>
          <div
            class="organInfo hoverStyle"
            style="border: none; font-size: 0.9rem"
            @click="fixThisOrgan(item)"
          >
            修改对照表
          </div>
          <div
            class="organInfo hoverStyle"
            style="border: none"
            @click="checkThisOrganBat(item)"
          >
            查看批次
          </div>
          <div
            class="organInfo hoverStyle"
            style="border: none"
            @click="delThisOrgan(item)"
          >
            删除单位记录
          </div>
          <div
            class="organInfo hoverStyle"
            style="border: none"
            @click="fixOrganName(item)"
          >
            修改单位
          </div>
          <div style="clear: both"></div>
        </div>
      </div>
      <!-- 单位展示 -->

      <div v-if="!organsShow">
      <div class="organIrem" style="height:4rem " ></div>
      <div class="organIrem" style="height:4rem ;width:100%;position:fixed;background-color:rgb(255,255,255);top:4.5rem" ></div>

        <div class="organItem " style="border-bottom:none;   height: 2rem;
  line-height:2rem;
    top: 7.8rem;
    position: fixed;
    border-bottom:solid;
    margin-left:2.5%;
    background-color:rgb(255,255,255)
  ">
  <div></div>
          <div class="BatchInfo">批次名</div>
          <div class="BatchInfo">类型</div>
          <div class="BatchInfo">时间</div>

          <div class="BatchInfo">状态</div>
          <div style="clear: both"></div>
        </div>

        <div
          class="organItem infoItemHighlight"
          style="height: 2.2rem"
          v-for="item in this.batches"
          :key="item.id"
        >
          <div class="BatchInfo">{{ item.batchName }}</div>
          <div class="BatchInfo">{{ item.docType | formatdocType }}</div>

          <div class="BatchInfo">{{ item.createTime }}</div>
          <div class="BatchInfo">已完成</div>
          <div
            class="BatchInfo hoverStyle"
            style="width: 6%"
            @click="batchDocs(item)"
          >
            查看
          </div>
          <div
            class="BatchInfo hoverStyle"
            style="width: 6%"
            @click="deleteTheBatch(item)"
          >
            删除
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showToSetReal:true,
      organsOrigin:[],
      usualOrgans:[],
      showToSet:"",
      presetNameShowFlag:false,
      fixNameShow: false,
      nameToSet: "",
      authCodeToSet: "",
      authfix: "",
      tempOrganName: "name",
      tempOrganCode: 123,

      organsShow: true,
      organs: "",
      organMap: new Map(),

      batches: "",
    };
  },
  methods: {
    logShowtoSet(){
      console.log(this.showToSet)
      if(this.showToSet){
        this.showToSetReal=true
      }else{
        this.showToSetReal=false
      }
    },
    showUsusal(){
      window.scrollTo(0,0)
      // if()
      this.organsOrigin=JSON.parse(JSON.stringify(this.organs))
      this.usualOrgans=[]
      for(var i in this.organs){
        if(this.organs[i].show){
          this.usualOrgans.push(this.organs[i])
        }
      }
      this.organs=JSON.parse(JSON.stringify(this.usualOrgans))
    },
    showAll(){
      window.scrollTo(0,0)
      this.organs=JSON.parse(JSON.stringify(this.organsOrigin))
    },
    deleteTheBatch(item) {
      //   type: "success",
      //   message: "删除成功"
      // });

      this.$confirm("确定要删除该批次及相关记录吗", {
        cancelButtonClass: "btn-custom-cancel",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var tpath = "/work/" + item.id;
          this.deleteRequest(tpath).then((resp) => {
            if (resp.code == 0) {
              this.batches = this.batches.filter((i) => {
                return i.id != item.id;
              });
              this.$message({
                type: "success",
                message: "删除成功",
              });
            } //if
          });
        })
        .catch(() => {});
    },
    fixOrganName(item) {
      this.nameToSet = item.authName;
      this.authCodeToSet = item.authCode;
      this.authfix = item;
      console.log(item)
      console.log(item.show)
      // if(this.showToSet)
var i=item.show
this.showToSet=i
      this.fixNameShow = true;
    },
    clearFixNA() {
      this.fixNameShow = false;
      this.presetNameShowFlag = false;
    },
    presetNameShow() {
      this.nameToSet = "单位名";
      this.authCodeToSet = "全宗号";
      this.presetNameShowFlag = true;
    },
 
    dopreSetNA() {
      console.log("预设")
      console.log(this.showToSet)

      var showma=this.showToSet
      console.log(showma)
 
            var organObj = {
        authName: this.nameToSet,
        authCode: this.authCodeToSet,
        show:showma,
      };
      console.log(organObj)
      
      this.postRequest("/organ", JSON.stringify(organObj)).then((resp) => {
        if (resp) {
          //新建单位后拿到单位id存入session  （已存在的时候 code=1202 ,data 有问题）
          if (resp.code == 1201) {
            this.getRequest("/organ/" + resp.data).then((resp) => {
{
                this.$message({
                  type: "error",
                  message: "单位名已存在，若重复请前往管理",
                });
                // alert(this.BatchForm.authCode);

  
              }
            });
          } //1201
          else if (resp.code == 1202) { 
             this.$message({
                  type: "error",
                  message: "单位代码已存在，若重复请前往管理",
                });
                
          }
          else if (resp.code == 0) {
              this.$message({
                  type: "success",
                  message: "预设成功",
                });
this.presetNameShowFlag=false

            // return true
            // window.sessionStorage.setItem("authId",this.BatchForm.authId)
          }
        }
      }).then(()=>{
                  this.getRequest("/organs").then((resp) => {
            if (resp.code == 0) {
              console.log("修改单位后请求单位列表");
              this.organs = resp.data;
              this.organs.reverse();
        this.showUsusal()


            }
          });
      })


    },
    doFixNA() {
 
      this.authfix.authName = this.nameToSet;
      this.authfix.authCode = this.authCodeToSet;
      console.log('修改单位')
      console.log(this.showToSet)
      var showma=this.showToSet

      this.authfix.show=showma
      this.putRequest(
        //注意防止重复提交
        "/organ/" + this.authfix.id,
        JSON.stringify(this.authfix)
      ).then((resp) => {
        if (resp.code == 0) {
          this.getRequest("/organs").then((resp) => {
            if (resp.code == 0) {
              console.log("修改单位后请求单位列表");
              this.organs = resp.data;
              this.organs.reverse();
        this.showUsusal()

            }
          });
        }
      });

      this.fixNameShow = false;
    },
    // fixThisOrganFromDetail(){

    // },
    fixThisOrgan(item) {
      window.sessionStorage.setItem("authId", item.id);
      window.sessionStorage.setItem("authCode", item.authCode);
      window.sessionStorage.setItem("authName", item.authName);

      // window.sessionStorage.setItem('checkAuthId',item.id)
      this.$router.replace("/work/keyWM");
    },
    batchDocs(item) {
      //查看某批
      window.scrollTo(0, 0);
      this.$store.state.alreadyDocs = [];
      console.log(item);
      console.log("查看某批");
// if(item.sorted!=null){  //该批已经排好序
// this.$store.state.sortedFlag=true
//  var sorted=JSON.parse(item.sorted.sorted);
//       console.log(sorted)
//       console.log("查看某批");

//       sorted=sorted[0]
//                   for (var i = 0; i < sorted.length; i++) {
//               for (var j = 0; j < sorted[i].length; j++) {
//                 this.$store.state.alreadyDocs.push(sorted[i][j]);
//                 //
//               }
//             }
// }
      // /document/page/{type}/{batchId}
     

      // this.$store.state.alreadyDocs=JSON.parse( sorted);
{
        window.sessionStorage.setItem("docType", item.docType);
      window.sessionStorage.setItem("docTypeCode", item.docTypeCode);
      window.sessionStorage.setItem("batchId", item.id);
      window.sessionStorage.setItem("lastBox", JSON.stringify(item.lastBox));

      // batchId
}

      this.$router.replace("/work/docInputD");


    },
    backOrgans() {
      this.organsShow = true;
    },
    checkThisOrganBat(item) {
      window.scrollTo(0, 0);
      console.log("查看批次item");

      console.log(item); //打印单位
      window.sessionStorage.setItem("authId", item.id);
      window.sessionStorage.setItem("authCode", item.authCode);
      window.sessionStorage.setItem("authName", item.authName);

      // window.sessionStorage.setItem('checkAuthId',item.id)
      // window.sessionStorage.setItem('batchId',item.id)

      axios
        .get(this.baseurl + "/work/list", {
          headers: {
            "Content-Type": "application/json",
            authId: item.id,
            token: localStorage.getItem("token")
              ? localStorage.getItem("token").split('"')[1] ||
                localStorage.getItem("token")
              : null,
          },
        })
        //成功返回
        .then((response) => {
          if (response.code == 0) {
            this.organsShow = false;
            this.batches = response.data;
            this.batches.reverse();
          }
        })
        //失败返回
        .catch((error) => {
          console.log(error);
        });
    },
    delThisOrgan(item) {
      //                     this.$message({
      //   type: "success",
      //   message: "删除成功"
      // });

      this.$confirm("确定要删除该单位及相关记录吗", {
        cancelButtonClass: "btn-custom-cancel",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var tpath = "/organ/" + item.id;
          this.deleteRequest(tpath).then((resp) => {
            if (resp.code == 0) {
              this.organs = this.organs.filter((i) => {
                return i.id != item.id;
              });
              this.$message({
                type: "success",
                message: "删除成功",
              });
            } //if
          });
        })
        .catch(() => {});
    },
    focusOnThis(e) {
      // alert(1)
    },

    loseThis(e) {},
  },
  created() {
    window.scrollTo(0,0)
    // alert(this.tempOrganName)

    // var json2 = {
    //     'k1':'v1',
    //     'k2':'v2',

    // };
    // var kk='k3'
    // json2[kk] = '0';
    //     var ss='2'
    // if(json2[kk]=='0') json2[kk]='2'
    // if(json2[ss]==null){
    //     console.log(1)
    // }
    // console.log(json2)

    //     function fun1(d)//回调函数，执行成功后 执行
    // {
    //     alert(d);
    // }
    // function fun2(_call)//函数体
    // {
    //     alert("正在执行fun2里面的程序，成功后返回数据111")
    //     _call("111")
    // }

    // fun2(fun1);//调用回调函数，

    this.getRequest("/organs").then((resp) => {
      if (resp.code == 0) {
        console.log("加载时请求单位列表");
        this.organs = resp.data;
        this.organs.reverse();
        this.showUsusal()
        // console.log(this.organs)
        //  console.log(resp)
      }
    });

    // var testObj={"yongjiu":"20","changqi":"20","beicha":"12","y10":"22","y30":"22","y100":"22"}
    // window.window.localStorage.setItem("token",'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5NDgzNDMsInVzZXJuYW1lIjoidGFuZyJ9.SYvuMV81W9FEjm32GYm5DXsglRH2BU_zJjiMg9MV6qg')
    //        this.postRequest("/document/test",JSON.stringify(testObj)).then(resp => {
    //            console.log(resp)
    //        })
  },
};
</script>


<style lang="scss">
#user_topd {
  position: absolute;

  width: 0px;
  height: 0px;
  line-height: 0px; /*为了防止ie下出现题型*/
  border-bottom: 0.5rem solid #909399;
  border-left: 0.5rem solid rgba(255, 255, 255, 0);
  border-right: 0.5rem solid rgba(255, 255, 255, 0);
  right:0rem;
    top: 0.8rem;
}

#user_top{
  position: absolute;

  width: 0px;
  height: 0px;
  line-height: 0px; /*为了防止ie下出现题型*/
  border-top: 0.5rem solid #909399;
  border-left: 0.5rem solid rgba(255, 255, 255, 0);
  border-right: 0.5rem solid rgba(255, 255, 255, 0);
 
  right:0rem;

    top: 0.8rem;
}



.el-form-item__content{
  font-size: 1rem !important;
  line-height: 2rem !important;
  .el-input{
    font-size: 1rem !important;
  }
}
.el-form-item__label{
      padding: 0 0.8rem 0 0 !important;
    font-size: 1rem !important;
}
// 本页面的
.infoItemHighlight:hover{
  background-color: rgba(210, 216, 228, 0.733);
}

 .topTextButton{
             
          cursor: pointer;
      z-index: 9;
padding: 0.3rem;
          background-color: rgb(108, 120, 153);
          -webkit-box-shadow: 0 0 0.5rem #909399;
          box-shadow: 0 0 0.5rem #909399;
          border-radius: 0.5rem;
          color:#ddd !important;
          // top:-2.8rem !important
          margin-left: 1rem;
  }

  .topTextButton:hover{
          background-color: rgb(43, 50, 68);

  }

   .topTextButtonBlue{
             
          cursor: pointer;
      z-index: 9;
padding: 0.5rem;
text-align: center;
          background-color: rgb(66, 94, 172);
          -webkit-box-shadow: 0 0 0.5rem #909399;
          box-shadow: 0 0 0.5rem #909399;
          border-radius: 0.5rem;
          color:#ddd !important;
          // top:-2.8rem !important
          margin-left: 1rem;
  }

  .topTextButtonBlue:hover{
          background-color: rgb(20, 65, 177);

  }

   .topTextButtonBlueNoWidth{
             
          cursor: pointer;
      z-index: 9;
padding-left: 0.5rem;
padding-right: 0.5rem;
padding-bottom: 0.3rem;
padding-top: 0.3rem;
font-size: 0.9rem;
text-align: center;
          background-color: rgb(82, 81, 189);
          -webkit-box-shadow: 0 0 0.5rem #909399;
          box-shadow: 0 0 0.5rem #909399;
          border-radius: 0.5rem;
          color:#ddd !important;
          // top:-2.8rem !important
          margin-left: 0.5rem;
  }

  .topTextButtonBlueNoWidth:hover{
          background-color: rgb(53, 78, 139);

  }


.organShowCheckbox{
  .el-checkbox__label{
    color: #ddd !important;
}
.el-checkbox{
    color: #ddd !important;

}
}

</style>

<style lang="scss">

/**el-checkbox */

.el-checkbox__inner{
  width: 1rem !important;
  height: 1rem !important;
  border: 0.06rem solid #DCDFE6 !important;


}
.el-checkbox__inner::after{
height: 0.437rem !important;
    left: 0.25rem !important;
    top:0.0625rem  !important;
    width:0.1875rem  !important;
}


/**el-checkbox */

.el-select .el-input .el-select__caret{
  font-size: 1rem !important;
}
.el-input--small .el-input__icon{
  line-height: 2rem !important;
}
.el-input__icon{
  width: 1.5rem !important;
}
.el-input__inner{
  line-height: 2.5rem !important;
  padding: 0 2.8rem !important;
}
.leftInput .el-input__inner{
  padding: 0 0.8rem !important;

}
.myInput{
 height: 1.5rem;
    background-color: rgba(2,2,2,0);
    border-radius: 0.5rem;
    /* border: none; */
    padding: 0.2rem;
}

.el-checkbox__inner{
  width: 1rem;
  height: 1rem;
}
.el-checkbox{
  font-size: 1rem  !important;
}
.el-checkbox__label{
    display: inline-block;
    padding-left: 0.8rem !important;
    line-height: 1.36rem !important;
    font-size: 1rem !important;
}
.windowStyle {
  background-color: rgba(57, 60, 65, 0.808) !important;
}
</style>

<style lang="scss" scoped>
  .topTextButton{
            
          
padding: 0.3rem;
          background-color: rgb(97, 101, 112);
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
  .topFix{
    color: #222;
    background-color: rgba(255, 255, 255, 1);
  }
  
.wrapper {
  // background-color: rgb(209, 218, 243);
  background-color: rgb(255, 255, 255);

  // height: 120vh;
  padding-bottom: 100vh;
  position: relative;

  .hoverStyle:hover {
    color: rgba(29, 30, 32, 0.733);
    cursor: pointer;
  }
  .organItem {
    width: 95%;
    margin: auto;
    // height: 3rem;
    border-bottom: solid 0.02rem;

    .tip {
      float: left;
      width: 13%;
      height: 2rem;
      margin-top: 0;
      margin-right: 0.2rem;
      text-align: center;
      border: none;
    }
    // border: solid 0.1rem;

    .BatchInfo {
      text-align: center;
      float: left;
      width: 17%;
      height: 2rem;
      // border-left: solid 0.1rem;
      margin-top: 0.15rem;
      margin-left: 0.2rem;
      // padding-top: 0rem;
      line-height: 2rem;
    }
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

  .organInfo {
    text-align: center;
    float: left;
    width: 13%;
    // height: 2rem;
    border: solid 0.1rem;
    margin-top: 0.7rem;
    margin-left: 0.2rem;
    margin-bottom: 0.7rem;

    // padding-top: 0rem;
    // line-height: 2rem;
  }
}
</style>