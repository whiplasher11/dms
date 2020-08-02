<template>
  <div>
      <div class="wrapper">
          <div style="height:6.5rem"></div>
            <div class="docDetailBox">
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
                    
                    <div class="itemInfo">{{authCode+'-'+item.docTypeCode+'·'+item.sortYear+'-'+item.deadline+'-'+item.docAbout+item.docNum}}</div>
                    <!-- 档号 -->
                    <div class="itemInfo">{{item.docDescAuthor+'['+item.sortYear+']'+item.docNum+"号"}}</div>
                    <div class="itemInfo">{{item.dutyAuthor}}</div>
                    <div class="itemInfo" style="font-size:0.6rem;width:10%">股阿奴啊实打阿大为降低哦按文件袋大江网IDOA我我我的就爱我的基督教爱我家傲娇吊我</div>
                    <div class="itemInfo">20100808</div>
                    <div class="itemInfo">机密</div>
                    <div class="itemInfo">55</div>
                    <div class="itemInfo" style="font-size:0.6rem;width:10%">奥迪jaw我我的就爱我激动我安慰奖地哦啊为奇偶ID叫我</div>
                    <div class="itemInfo">2</div>
                    <div class="itemInfo">5</div>
                    <div class="itemInfo" style="width:10%">
                        <div style="float:left;margin-left=1rem" class="optionDiv">修改</div>
                        <div style="float:left" class="optionDiv">删除</div>
                    </div>
                    <div style="clear:both"></div>
                    <!-- <div style="clear:both"></div> -->
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
      computed: {
    authCode() {
      return sessionStorage.getItem('authCode')||''
    },
    },
    data(){
      return{
        //   authCode:'2',
            tempOrganName:'name',
            tempOrganCode:123,
      }
    },
    methods:{
        focusOnThis(e){

        },
    },
    mounted(){
        // this.authCode=sessionStorage.getItem('authCode')||'错误'
    },

}
</script>

<style lang="scss" scoped>
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