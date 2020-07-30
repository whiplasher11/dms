<template>
  <div>
      <div class="wrapper">
          <div style="height:6.5rem"></div>
            <div class="organItem" style="height:2rem">
              <div class="organInfo tip">单位名</div>
              <div class="organInfo tip">单位全宗号</div>
              <div class="organInfo tip">权重表修改</div>
              <div class="organInfo tip">操作</div>
              <div class="organInfo tip">操作</div>



          </div>

          <div class="organItem">
              <div class="organInfo"  style="font-size:0.8rem"  contenteditable="canEdit"   @focus="focusOnThis"  @blur="isLocked =false" :v-model="tempOrganName">{{this.tempOrganName}}</div>
            <div class="organInfo"     contenteditable="canEdit"   @focus="focusOnThis"  @blur="isLocked =false" :v-model="tempOrganCode">333</div>


          </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
            tempOrganName:'name',
            tempOrganCode:123,
      }
    },
    methods:{
        focusOnThis(e){
            // alert(1)
            console.log(e.target.innerText)
        },
    },
    created(){
        // alert(this.tempOrganName)

        //  this.getRequest("/organs").then(resp => {
        //      console.log(resp)
        //  })
         
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
    height: 120vh;
    position: relative;

    .organItem{
        width: 95%;
        margin:auto;
        height: 3rem;

        .tip{
        float: left;
        width: 12%;
        height: 2rem;
        margin-top: 0;
        margin-right: 0.2rem;
        text-align: center;
        border:none;
        }
        // border: solid 0.1rem;
    }

    .organInfo{
        text-align: center;
        float: left;
        width: 12%;
        height: 2rem;
        border: solid 0.1rem;
        margin-top: 0.5rem;
        margin-left: 0.2rem;
        // padding-top: 0rem;
        line-height: 2rem;

    }
}

</style>