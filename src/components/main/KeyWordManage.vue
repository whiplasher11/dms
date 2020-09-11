<template>
  <div class="outbox">
    <div style="position:relative" class="wrapper">
      
 <div style="position:absolute;width:20rem;height:10rem;top:10rem;left:50%;margin-left:-10rem;line-height:10rem;
    background-color:rgba(25,55,163,0.8);font-size:1.3rem;color:white;text-align:center;z-index:1000" v-if="showWaitingFlag">请求中，请稍候...</div>
      <div  class="hoverStyle" style="position:absolute;top:6.5rem;right:20rem;z-index:123" v-if="selectShow" @click="backToOrgans">返回</div>

      <div  class="hoverStyle" style="position:absolute;top:6.5rem;right:20rem;z-index:123" v-if="!selectShow" @click="backToSelect">返回</div>
      <div style="height:4.5rem;"></div>

      <div style="position:absolute;top:6rem;font-size:1.5rem;width:100%;text-align:center">排件号规则管理</div>

 
 
 <div v-if="showKVFix"
 style="position:absolute;top:40vh;left:50%;margin-left:-15rem;z-index:122;padding-top:1rem;
 font-size:1.5rem;width:30rem;height:10rem;background-color:#666">
 <div style="font-size:1rem;width:10rem;text-align:center;margin-left:10rem;color:white">请输入词的大小</div>
<input type="text" style="height:1.5rem;margin-left:6rem;margin-top:2rem;width:7rem" disabled="true"  v-model="keyToFix">&nbsp;&nbsp;&nbsp;:
<input type="text" style="height:1.5rem;margin-left:1rem;width:7rem" v-model="valueToFix">
<div class="textButton" @click="clearKV" style="position:absolute;left:5rem">取消</div>

<div class="textButton" @click="fixTheKV">确定</div>

 </div>


      <div class="typeSelect" v-if="selectShow">
        <div style="width:3rem;height:2rem"></div>

        <div class="selectItem" @click="checkFromThisType(11)">文书类档案问题(机构)优先级设置</div>
        <div class="selectItem" @click="checkFromThisType(12)">文书类档案责任者优先级设置</div>
        <div class="selectItem" @click="checkFromThisType(13)">文书类档案关键词优先级设置</div>
        <div class="selectItem" @click="checkFromThisType(21)">科技类档案项目优先级设置</div>
        <div class="selectItem" @click="checkFromThisType(22)">科技类档案责任者优先级设置</div>
        <div class="selectItem" @click="checkFromThisType(23)">科技类档案关键词优先级设置</div>
        <div class="selectItem" @click="checkFromThisType(31)">业务类档案问题优先级设置</div>
        <div class="selectItem" @click="checkFromThisType(32)">业务类档案责任者优先级设置</div>
        <div class="selectItem" @click="checkFromThisType(33)">业务类档案关键词优先级设置</div>
        <div class="selectItem" @click="checkFromThisType(41)">人事类档案关键词优先级设置</div>


        <div style="clear:both"></div>
        <div style="width:3rem;height:2rem"></div>
      </div>
      <!-- 选择类型 -->

      <div class="keyValueBox" @click="boxClick" v-if="!selectShow">
        <div class="keyValueItem">
          <div class="keyValueInfo" style="border:none;position:relative">
            优先级(越大越靠前）
            <el-button
              @click="saveKeyValue"
              type="success"
              class="kvButton"
              style="  position: absolute; right: 2rem;"
              v-if="saveBtnShow"
            >保存修改</el-button>
          </div>
          <div class="keyValueInfo" style="border:none">词</div>

          <div class="keyValueInfo" style="border:none">操作</div>
        </div>

        <div
          class="keyValueItem"
          style="z-index=99"
          v-for="(item,index) in jsonTable"
          :key="index"
          draggable="false"
        >
          <div
            v-bind:class="[{keyValueInfo:true},{hideText:false}] "
            style="border:none"
          >{{item[1]}}</div>
          <div class="keyValueInfo" style="border:none">{{item[0]}}</div>

          <div
            v-bind:class="[{keyValueInfo:true},{hideText:true}] "
            style="border:none"
            v-if="false"
          >{{item.tables|formatKeyWordValue}}</div>

          <div style="width:0;position:absolute;">{{item.id}}</div>
          <el-button
            type="success"
            class="kvButton"
            @click="upClick($event,item)"
            style="margin-left:3rem"
          >上调</el-button>
          <el-button type="warning" class="kvButton" @click="downClick($event,item)">下调</el-button>
          <el-button type="danger" class="kvButton" @click="deleteKV($event,item)">删除</el-button>
          <el-button type="error" class="kvButton" @click="fixKv($event,item)" v-if="!saveBtnShow">修改值</el-button>

          <!-- <div style="float:left;width:2rem;background-color:red;height:1.5rem">1</div> -->
        </div>

        <div style="clear:both"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      //   return this.$store.state.user;
    },
  },

  created() {
    this.showWaitingFlag=true
    this.getRequest("/organ/" + sessionStorage.getItem("authId")).then(
      (resp) => {
        this.weightForm = resp.data;
        console.log("加载keyWM页面时某个特定单位的权重表对应的id")
        if(this.weightForm){
          this.showWaitingFlag=false
        }
        console.log(this.weightForm)
      }
    );

    var json3 = {};

    console.log(json3);
    let attr;
    for (attr in json3) {
      this.jsonTable.push([attr, json3[attr]]);
    }
    console.log(this.jsonTable);
  },
  methods: {

    backToOrgans(){
      this.$router.push('/work/modifyOrgan')
    },
    backToSelect(){
      this.selectShow=true
    },
    clearKV(){
      this.showKVFix=false;
    },
    renewTable(){
      this.jsonTable=[]
        this.selectShow = false;
      // this.typeNum=num
      if(!this.requestWigId){

        this.jsonTable=[]
            this.$message({
              type: "warning",
              message: "还没有添加过该类型的档案"
            });  
            location.reload()
      }
      else{
        var table
                     this.getRequest("/weight/sort/" + this.requestWigId)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table = resp.data.tables;
               let attr;
      this.jsonTable=[]

    for (attr in table) {
      this.jsonTable.push([attr, table[attr]]);
    }
                    // var json1 = table;

                  })
      }
    },

    checkFromThisType(num) {
      this.jsonTable=[]
        // var this.requestWigId
      if(num==11){
        this.requestWigId=this.weightForm.docIssueWig
      }
      if(num==12){
         this.requestWigId=this.weightForm.docAuthorWig
      }
            if(num==13){
         this.requestWigId=this.weightForm.docKeywordWig
      }
            if(num==21){
         this.requestWigId=this.weightForm.tecProjectWig
      }
            if(num==22){
         this.requestWigId=this.weightForm.tecAuthorWig
      }
            if(num==23){
         this.requestWigId=this.weightForm.tecKeywordWig
      }
            if(num==31){
         this.requestWigId=this.weightForm.busProjectWig
      }
            if(num==32){
         this.requestWigId=this.weightForm.busAuthorWig
      }
            if(num==33){
         this.requestWigId=this.weightForm.busKeywordWig
      }
                  if(num==41){
         this.requestWigId=this.weightForm.perKeywordWig
      }

      this.selectShow = false;
      this.typeNum=num
      if(!this.requestWigId){

        this.jsonTable=[]
            this.$message({
              type: "warning",
              message: "还没有添加过该类型的档案"
            });  
      }
      else{
        var table
                     this.getRequest("/weight/sort/" + this.requestWigId)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table = resp.data.tables;
               let attr;
      this.jsonTable=[]

    for (attr in table) {
      this.jsonTable.push([attr, table[attr]]);
    }
                    // var json1 = table;

                  })
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
      fixKv(e, item) {  //按修改值button
        this.showKVFix=true;
        this.keyToFix=item[0]
        this.valueToFix=item[1]

        // this.deleteKV(e,item)
        // alert(this.keyToFix)
        // this.valueToFix=item[1]
      },


          fixTheKV(){  //确定修改

      var _arr = this.jsonTable;
      var length = _arr.length;


      for (var i = 0; i < length; i++) {
        if (this.jsonTable[i][0] == this.keyToFix) {
            //deleteRequest
          _arr.splice(i, 1); //删除下标为i的元素
          var arrt=[this.keyToFix,this.valueToFix]
          console.log(arrt)
          _arr.splice(i, 0, arrt);

        }
      }   //**前端修改 */

     
      this.submitFixFromQianDuan();
      this.showKVFix=false
      



    },

    submitFixFromQianDuan(){
         var jsonToCommit={}   /**将修改提交 jsonTable是数组*/
        for (var i = 0; i < this.jsonTable.length; i++) {
        console.log(this.jsonTable[i][0]);
        jsonToCommit[this.jsonTable[i][0]] = this.jsonTable[i][1];
      }

            var docAboutObj = {
            authId: sessionStorage.getItem("authId"),
            type: this.typeNum,
            id:this.requestWigId,
            tables: jsonToCommit,
            };

          this.putRequest(
          "/weight/" + this.requestWigId,
          docAboutObj
          ).then((resp) => {
          console.log("修改值的方式更新权重表，类型："+this.typeNum);
          console.log(resp);
          return resp
          }).then(r=>{
            if(r.code==0){
              this.$message({
              type: "warning",
              message: "操作成功"
              });  
              this.renewTable()
            }
            else{
                          this.$message({
              type: "warning",
              message: "操作失败"
            });  

              location.reload()
            }
          });
    },
    deleteKV(e, item) {
                  this.$confirm(
                '确定要删除该条不再使用吗，若本批录入中有该词条可能导致排序失败',
          {
            cancelButtonClass: "btn-custom-cancel",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
                  )
                  .then(()=>{
                          var _arr = this.jsonTable;
      var length = _arr.length;
      for (var i = 0; i < length; i++) {
        if (this.jsonTable[i][0] == item[0]) {

          _arr.splice(i, 1); //删除下标为i的元素
        }

        this.submitFixFromQianDuan();


      
      }
                  })
                  .catch(() => {
                    return
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
      showWaitingFlag:false,
      requestWigId:'',
      typeNum:'',
      weightForm:{},
      keyToFix:'',
      valueToFix:'',
      showKVFix:false,
      saveBtnShow: false,
      submitMap: new Map(),
      valueShow: true,
      timer: "",
      selectShow: true,

      jsonTable: [],

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
      .hoverStyle:hover{
        // margin-left: 22rem;
        color:rgba(29, 30, 32, 0.733);
        cursor: pointer;
        z-index:9999;
    }   
}
</style>

<style lang="scss" scoped>
      .hoverStyle:hover{
        // margin-left: 22rem;
        color:rgba(29, 30, 32, 0.733);
        cursor: pointer;
        z-index:9999;
    }   
.textButton{
  margin-top: 1.5rem;
  color:rgb(227, 229, 236);
  font-size: 1.2rem;
  margin-left:10rem;
  // float:left
  
}


.textButton:hover{
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
    height: 2rem;
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
    height: 2rem;
    border: solid 0.1rem;
    // margin-top: 0.5rem;
    margin-left: 0.2rem;
    // padding-top: 0rem;
    line-height: 2rem;
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
  background-color: rgb(188, 200, 231);
  border: solid rgb(54, 79, 139) 0.02rem;
  line-height: 3rem;
  margin-left: 3.6%;
  margin-top: 1rem;
}
.selectItem:hover {
  cursor: pointer;
}
.wrapper {
  background-color: rgb(209, 218, 243);

  // height: 150vh;
  padding-bottom: 100vh;
}
</style>>

