<template>
  <div>
      <div class="wrapper">
          <div style="height:6.5rem;position:relative" >
              <div style="position:absolute;bottom:0rem;right:20%;font-size:1.2rem;" v-if="!organsShow" @click="backOrgans" class="hoverStyle">返回</div>
          </div>
          <div v-if="organsShow">
            <div class="organItem" style="height:2rem">
              <div class="organInfo tip">单位名</div>
              <div class="organInfo tip">单位全宗号</div>
              <div class="organInfo tip">权重表修改</div>
              <div class="organInfo tip">操作</div>
              <div class="organInfo tip">操作</div>



          </div>

          <div class="organItem" v-for="item in this.organs" :key="item.id">
              <div class="organInfo"  style="font-size:0.8rem;border:none"     @focus="focusOnThis(item)"  @blur="loseThis(item)" :v-model="tempOrganName">{{item.authName}}</div>
            
            <div class="organInfo"   style="font-size:0.8rem;border:none"      @focus="focusOnThis"  @blur="isLocked =false" :v-model="tempOrganCode">{{item.authCode|formatAuthCode}}</div>
            <div class="organInfo hoverStyle" style="border:none;font-size:0.9rem" @click="fixThisOrgan(item)">修改优先级</div>
            <div class="organInfo hoverStyle" style="border:none" @click="checkThisOrganBat(item)">查看批次</div>
            <div class="organInfo hoverStyle" style="border:none" @click="delThisOrgan(item)">删除单位记录</div>


          </div>
          </div>
            <!-- 单位展示 -->


            <div v-if="!organsShow">
                   <div class="organItem" style="height:2.2rem">
              <div class="BatchInfo ">批次名</div>
              <div class="BatchInfo ">时间</div>
              <div class="BatchInfo ">状态</div>
              <div style="clear:both"></div>

          </div>

         <div class="organItem" style="height:2.2rem"  v-for="item in this.batches" :key="item.id">
              <div class="BatchInfo">{{item.batchName}}</div>
              <div class="BatchInfo">{{item.createTime}}</div>
              <div class="BatchInfo">已完成</div>
              <div class="BatchInfo hoverStyle" @click="batchDocs(item)">查看</div>

          </div>
            </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
      return{
            tempOrganName:'name',
            tempOrganCode:123,

            organsShow:true,
            organs:'',
            organMap:new Map(),

            batches:'',
      }
    },
    methods:{
        fixThisOrgan(item){
                        window.sessionStorage.setItem('authId',item.id)
            window.sessionStorage.setItem('authCode',item.authCode)
            window.sessionStorage.setItem('checkAuthId',item.id)
            this.$router.replace('/work/keyWM')
        },
        batchDocs(item){ //查看某批
            console.log(item)
            console.log('查看某批')

            // /document/page/{type}/{batchId}
            window.sessionStorage.setItem('docType',item.docType)
            window.sessionStorage.setItem('docTypeCode',item.docTypeCode)
            window.sessionStorage.setItem('batchId',item.id)
window.sessionStorage.setItem("lastBox",JSON.stringify(item.lastBox))

            // batchId
            this.$router.push('/work/docInputD')


         

               
        },
        backOrgans(){
            this.organsShow=true
        },
        checkThisOrganBat(item){
            console.log("查看批次item")

            console.log(item) //打印单位
            window.sessionStorage.setItem('authId',item.id)
            window.sessionStorage.setItem('authCode',item.authCode)
            window.sessionStorage.setItem('checkAuthId',item.id)
            // window.sessionStorage.setItem('batchId',item.id)

              axios.get('/work/list', {
                  headers:{
            'Content-Type': 'application/json',
            'authId':item.id,
            token:sessionStorage.getItem('token')?(sessionStorage.getItem('token').split('"')[1]||sessionStorage.getItem('token')):null,

                  }
              })
                //成功返回
                .then(response => {
                    if(response.code==0){
                        this.organsShow=false;
                        this.batches=response.data;

                    }

                })
                //失败返回
                .catch(error => {
                    console.log(error);
                })
        },
        delThisOrgan(item){
            //                     this.$message({
            //   type: "success",
            //   message: "删除成功"
            // });  
            
            this.$confirm(
                '确定要删除该单位及相关记录吗',
          {
            cancelButtonClass: "btn-custom-cancel",
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
            var tpath='/organ/'+item.id
            this.deleteRequest(tpath)
            .then(resp => {
                if(resp.code==0){
                    this.organs=this.organs.filter(i=>{
                    return i.id!=item.id

            })
            this.$message({
              type: "success",
              message: "删除成功"
            });  
                } //if


            })
          })
          .catch(() => {

          });



        },
        focusOnThis(e){
            // alert(1)

        },

        loseThis(e){

        },
    },
    created(){
        // alert(this.tempOrganName)

    var json2 = {
        'k1':'v1',
        'k2':'v2',

    };
    var kk='k3'
    json2[kk] = '0';
        var ss='2'
    if(json2[kk]=='0') json2[kk]='2'
    if(json2[ss]==null){
        console.log(1)
    }
    console.log(json2)

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


         this.getRequest("/organs").then(resp => {
             if(resp.code==0){
             console.log('加载时请求单位列表')
            this.organs=resp.data;
            // console.log(this.organs)
            //  console.log(resp)

             }
         })
         
        // var testObj={"yongjiu":"20","changqi":"20","beicha":"12","y10":"22","y30":"22","y100":"22"}
        // window.sessionStorage.setItem("token",'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU5NDgzNDMsInVzZXJuYW1lIjoidGFuZyJ9.SYvuMV81W9FEjm32GYm5DXsglRH2BU_zJjiMg9MV6qg')
        //        this.postRequest("/document/test",JSON.stringify(testObj)).then(resp => {
        //            console.log(resp)
        //        })
    },

}
</script>

<style lang="scss" scoped>
.wrapper{
    background-color: rgb(209, 218, 243);
    // height: 120vh;
    padding-bottom: 100vh;
    position: relative;
    

    .hoverStyle:hover{
        color:rgba(29, 30, 32, 0.733);
        cursor: pointer;
    }   
    .organItem{
        width: 95%;
        margin:auto;
        height: 3rem;
        border-bottom:solid 0.02rem;

        .tip{
        float: left;
        width: 15%;
        height: 2rem;
        margin-top: 0;
        margin-right: 0.2rem;
        text-align: center;
        border:none;
        }
        // border: solid 0.1rem;

        .BatchInfo{
            text-align: center;
        float: left;
        width: 20%;
        height: 2rem;
        // border-left: solid 0.1rem;
        margin-top: 0.15rem;
        margin-left: 0.2rem;
        // padding-top: 0rem;
        line-height: 2rem;
        }
    }

    .organInfo{
        text-align: center;
        float: left;
        width: 15%;
        height: 2rem;
        border: solid 0.1rem;
        margin-top: 0.5rem;
        margin-left: 0.2rem;
        // padding-top: 0rem;
        line-height: 2rem;

    }
}

</style>