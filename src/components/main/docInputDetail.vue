<template>
  <div>
      <div class="wrapper">
          <div style="height:6.5rem"></div>
            <div class="docDetailBox">
                <div style="    position: absolute;
    right: 12rem;
    top: -2.5rem;
    font-size: 1.2rem;" class="hoverStyle" @click="backToOrgans">返回</div>

                    <div style="position: absolute;
    width: 16rem;
    top: -2.5rem;
    font-size: 1.2rem;
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
                    
                    <div class="itemInfo">{{authCode+'-'+item.docTypeCode+'·'}}{{item.sortYear|formatSortYear}}{{'-'+item.deadline+'-'+item.docAbout+(item.docNum?item.docNum:'暂无')}}</div>
                    <!-- 档号 -->
                    <div class="itemInfo">{{item.docDescAuthor+'['}}{{item.sortYear|formatSortYear}}{{']'+(item.docNum?item.docNum:'暂无')+"号"}}</div>
                    <div class="itemInfo">{{item.dutyAuthor}}</div>
                    <div class="itemInfo" style="font-size:0.6rem;width:10%">{{item.docTitle}}</div>
                    <div class="itemInfo">{{item.docDate}}</div>
                    <div class="itemInfo">{{item.docSecret?item.docSecret:'&nbsp;'}}</div>
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
            </div>
      </div>
  </div>
</template>

<script>
import Utils from '../../utils/doc.js'

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
        backToOrgans(){
                        this.$router.push('/work/modifyOrgan');

        },
        focusOnThis(e){

        },

        fixThisItem(item){
      this.$store.state.tempDoc=Object.assign({},item)
      alert(item.id)
    //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
        // item.sortYear=JSON.stringify(item.sortYear)
    //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
      this.$store.state.tempDocId=item.id

      this.$store.state.tempDocSeq=item.docSequence

            this.$router.push('/work/docInput')
        },

        deleteThisItem(){

        },
    },
    created(){
        this
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