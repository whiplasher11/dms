<template>
  <div>
      <div class="wrapper">
          <div style="height:6.5rem"></div>
           <div style="position:absolute;width:20rem;height:10rem;top:10rem;left:50%;margin-left:-10rem;line-height:10rem;
    background-color:rgba(25,55,163,0.8);font-size:1.3rem;color:white;text-align:center;z-index:1000" v-if="showWaitingFlag">请求中，请稍候...</div>

            <div class="docDetailBox">
                <div style="    position: absolute;
    right: 8rem;
    top: -2.5rem;
    font-size: 1.2rem;" class="hoverStyle" @click="backToOrgans">查看单位表</div>

                <div style="    position: absolute;
    right: 17rem;
    top: -2.5rem;
    font-size: 1.2rem;" class="hoverStyle" @click="goDocIn">继续录入</div>

                <div style="    position: absolute;
    left: 12rem;
    top: -2.5rem;
    font-size: 1.2rem;" class="hoverStyle" @click="sortThisBatch">排件号盒号</div>

                <div style="    position: absolute;
    left: 2rem;
    top: -2.5rem;
    font-size: 1.2rem;" class="hoverStyle" @click="getExcel">下载表格</div>

                    <div style="position: absolute;
    width: 16rem;
    top: -3.5rem;
    font-size: 1.4rem;
    margin-left: -8rem;
    left: 50%;">本批所有已录入文档</div>

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

                 <div class="detailItem"  v-for="item in this.$store.state.alreadyDocs" :key="item.docSequence">
                    <div class="itemInfo" >{{item.docSequence}}</div>
                    
                    <div class="itemInfo">{{authCode+'-'+item.docTypeCode+'·'}}{{item.sortYear|formatSortYear}}-{{item.deadline|deadlineFormat}}-{{item.docAbout+'-'}}{{item.docNum|formatFourNum}}</div>
                    <!-- 档号 -->
                    <div class="itemInfo">{{item.docDescAuthor+'['}}{{item.sortYear|formatSortYear}}{{']'+(item.docNum?item.docNum:'暂无')+"号"}}</div>
                    <div class="itemInfo">{{item.dutyAuthor}}</div>
                    <div class="itemInfo" style="font-size:0.6rem;width:10%">{{item.docTitle}}</div>
                    <div class="itemInfo">{{item.docDate}}</div>
                    <div class="itemInfo">{{item.docSecret=='无'?'&nbsp;':item.docSecret}}</div>
                    <div class="itemInfo">{{item.docPage}}</div>
                    <div class="itemInfo" style="font-size:0.6rem;width:10%">{{item.remark?item.remark:'&nbsp;'}}</div>
                    <div class="itemInfo">{{(item.docNum?item.docNum:'暂无')}}</div>
                    <div class="itemInfo">{{(item.boxSeq?item.boxSeq:'暂无')}}</div>
                    <div class="itemInfo" style="width:10%">
                        <div style="float:left;margin-left=1rem" class="optionDiv" @click="fixThisItem(item)">修改</div>
                        <div style="float:left" class="optionDiv" @click="deleteThisItem(item)">删除</div>
                    </div>
                    <div style="clear:both"></div>
                    <!-- <div style="clear:both"></div> -->
                </div>

                <div style="boder-top:solid 0.2rem;">
                    
                </div>
            </div>
      </div>
  </div>
</template>

<script>
import Utils from '../../utils/doc.js'
import axios from 'axios'

export default {
      computed: {
    authCode() {
      return sessionStorage.getItem('authCode')||''
    },
    },
    data(){
      return{
        //   authCode:'2',
        showWaitingFlag:false,
            tempOrganName:'name',
            tempOrganCode:123,
      }
    },
    methods:{
        sortThisBatch(){
            let vm=this
           var path= '/document/'+sessionStorage.getItem('docType')+'/sort/'+sessionStorage.getItem('batchId')+'?pageNow=0&pageSize=1000'
            this.$confirm(
                "本批工作是否已经完成录入，将生成件号盒号",
              "提示",
              {
                cancelButtonClass: "btn-custom-cancel",
                                cancelButtonText: "否",
                confirmButtonText: "是",

                type: "warning",
              }
            ).then(() => {
                    this.showWaitingFlag=true

            this.getRequest(path)
                  .then((resp) => {
                    console.log('排件号盒号')
                    console.log(resp)
                    // console.log(JSON.stringify(resp))
                    if(resp.code==0){
                    //    console.log(this)
                    // this.reloadTable();   //没有件号顺序，按录入顺序的reload





                    this.showWaitingFlag=false
                    this.$store.state.alreadyDocs=[]
                    // for(var arr in resp.data){
                    //     for(var item in arr){
                    //         this.$store.state.alreadyDocs.push(item)
                    //     }
                    // }
                    for(var i=0;i<resp.data.length;i++){
                        for(var j=0;j<resp.data[i].length;j++){
                            this.$store.state.alreadyDocs.push(resp.data[i][j])
                            // 
                        }
                    }
                    }
                  })
              })


        },
        goDocIn(){
                        this.$router.push('/work/docInput');

        },
          reloadTable(){

          var path='/document/page/'+sessionStorage.getItem('docType')+'/'+sessionStorage.getItem('batchId')+'?pageNow=0&pageSize=1000'
                          axios.get(path, {
                  headers:{
            'Content-Type': 'application/json',
            'authId':sessionStorage.getItem('checkAuthId'),
            token:sessionStorage.getItem('token')?(sessionStorage.getItem('token').split('"')[1]||sessionStorage.getItem('token')):null,

                  }
              }).then(resp=>{
                  console.log(resp)

                  this.$store.state.alreadyDocs=resp.data.content
            // this.$router.push('/work/docInputD')

              })

    },

        backToOrgans(){
                        this.$router.push('/work/modifyOrgan');

        },
        focusOnThis(e){

        },


        getExcel(){
            this.$confirm(
                "下载前请确保已排件号盒号",
              "提示",
              {
                cancelButtonClass: "btn-custom-cancel",
                                cancelButtonText: "否",
                confirmButtonText: "是",

                type: "warning",
              }
            ).then(() => {
              var path='/excel/'+sessionStorage.getItem('docType')+'/'+sessionStorage.getItem('batchId')
                    this.getRequest(path)
                  .then((resp) => {

                  })
            })

        },
        fixThisItem(item){
      this.$store.state.tempDoc=Object.assign({},item)
    //   alert(item.id)
    //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
        // item.sortYear=JSON.stringify(item.sortYear)
    //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
      this.$store.state.tempDocId=item.id

      this.$store.state.tempDocSeq=item.docSequence

            this.$router.push('/work/docInput')
        },

        deleteThisItem(item){

             this.$confirm(
                "是否删除这条档案数据",
              "提示",
              {
                cancelButtonClass: "btn-custom-cancel",
                                cancelButtonText: "否",
                confirmButtonText: "是",

                type: "warning",
              }
            ).then(() => {
                this.showWaitingFlag=true
        var pathToDel='/document/'+sessionStorage.getItem('docType')+'/'+item.id

                axios.delete(pathToDel, {
                  headers:{
            'Content-Type': 'application/json',
            'authId':sessionStorage.getItem('authId'),
            token:sessionStorage.getItem('token')?(sessionStorage.getItem('token').split('"')[1]||sessionStorage.getItem('token')):null,

                  }
              }).then(resp=>{
                  if(resp.code==0){
                      
                    var length = this.$store.state.alreadyDocs.length || 0;
                    var _arr = this.$store.state.alreadyDocs;
                    for (var i = 0; i < length; i++) {
                    if (_arr[i].docSequence == item.docSequence) {
                    _arr.splice(i, 1); //删除下标为i的元素
                      this.showWaitingFlag=false

                    break;
                    }
                    }

                  }
              })
            })

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
    created(){
        // this
    },
  
    mounted(){
        // this.authCode=sessionStorage.getItem('authCode')||'错误'
    },

}
</script>

<style lang="scss" scoped>

.hoverStyle:hover{
    cursor: pointer;
}

.optionDiv{
    // color:rgb(170, 138, 51);
    font-weight: 600;
    font-size: 1rem;
    margin-left: 1rem;
}
.optionDiv:hover{
    color:#aaa;
    cursor: pointer;
}
.wrapper{
    background-color: rgb(209, 218, 243);
    height: 120vh;
    position: relative;

}

.docDetailBox{
    position: relative;
    top:3rem;

    .detailItem{
        // height:2rem;
        // line-height: 2rem;
        border-top:solid 0.02rem;

    }
    .itemInfo{
        float: left;
        font-size: 0.8rem;
        width:7%;
        text-align: center;
        // border-right: 0.05rem solid;

    }
}

</style>