<template>
  <div class="left_history_batches">
      <div style="height:150vh;overflow-x:hidden;margin-top:4.6rem" >
        <vue-scroll :ops="ops">

      <div style="height:2.5rem" > 
        <!-- 搜索 -->
        <!-- <el-input class="leftInput" v-model="searchContent" ></el-input> -->
         <!-- <el-button type="primary" icon="el-icon-search"  style="background-color:rgb(134, 151, 197);border:none;margin-top:2vh;" @click="searchTheDoc">搜索</el-button> -->
      </div>

      <div style="height:2rem;position:relative;">
        <div class="detailList" style="margin-left:0.5rem;font-size:0.9rem;" @click="goDetail">点击查看本批详情</div>
      </div>
        <div v-for="item in this.$store.state.alreadyDocs" @click="checkThisDoc(item)" v-on:mouseover="fixShow()" 
        v-on:mouseleave="fixHide()" :key="item.docSequence"  class="leftItem animated fadeInLeft" style="width:60%;height:2rem;float:left;
    box-shadow: 0 0 0.5rem #909399;
    border-radius: .8rem;
    cursor: pointer;
    position:relative;
    padding-left:35%;
    font-size:0.8rem;
    padding-top:0.8rem;
    
    "
    
    >
          <div class="leftMask" @click="checkThisDoc(item)">修改</div>
          <div class="leftPic"></div>
          <!-- <div class="leftKeyWord">{{item.docAbout}} </div> -->
          <div class="leftSeq">识别号： {{item.docSequence}}</div>
          <!-- <div class="leftState">日期: {{item.docDate}}</div> -->
        </div>
        </vue-scroll>

        </div>
   

  </div>
</template>

<script>
import 'vuescroll/dist/vuescroll.css';
import Utils from '../../utils/doc.js'

export default {
  data(){
    return{
      searchContent:'输入识别号',
      showFixFlag:false,

        ops: {
                    vuescroll: {},
                    scrollPanel: {},
                    rail: {
                      background: '#01a99a',
                      opacity: 0,
                      size: '1rem',
                      specifyBorderRadius: false,
                      gutterOfEnds: null,    //轨道距 x 和 y 轴两端的距离
                      gutterOfSide: '0',   //距离容器的距离
                      keepShow: false,   //是否即使 bar 不存在的情况下也保持显示
                      border:'none'    //边框
                    },
                    bar: {
                        hoverStyle: true,    
                        onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
                        background: 'rgb(72,72,72)',   //颜色
                    }
                },
    }
  },
  methods:{
    searchTheDoc(){
      var searchPath="/document/list/page/"+sessionStorage.getItem('docType')+'?pageNow=0&pageSize=100'
         var docObj = {
          // userId:JSON.stringify(sessionStorage.getItem("userId")),
          // userId: sessionStorage.getItem('userId'),
          docSequence:this.searchContent,
          docType:sessionStorage.getItem('docType')
        };
          this.postRequest(
          //注意防止重复提交
          searchPath,
          JSON.stringify(docObj)
        )
          .then((resp) => {
            // console.log(resp)
            // this.
                    this.$store.state.alreadyDocs=resp.data.content
           this.$router.replace("/work/docInputd")


          })
    },
    goDetail(){
      this.$store.state.alreadyDocs=[]

           this.$router.push("/work/docInputd")
      
    },
    emitThisDoc(doc) {
      // console.log(doc)
        Utils.$emit('changeThisDoc',doc);
    },

    fixShow(){
      this.showFixFlag=true;
    },
        fixHide(){
      this.showFixFlag=false;
    },
    checkThisDoc(doc){
      // /document/list/page/{type}
      // var path='/document/list/page/'+sessionStorage.getItem('docType')
      // var obj={"docSequenceuence":docSequence}
      // console.log(obj)
      // obj=JSON.stringify(obj)
      // console.log(obj)

      console.log('侧边点开的item')
      console.log(doc)
      if(doc.docDescAuthor=="true"||doc.docDescAuthor==1||doc.docDescAuthor=="1"){
        doc.docDescAuthor=true
      }else{
        doc.docDescAuthor=false
      }
      

      this.emitThisDoc(doc)
    },
  }

}
</script>
<style lang="scss" >
.leftInput .el-input__inner {
    background: rgba(255, 255, 255, 0.15) !important;
    border: 0.08rem solid rgba(33, 57, 94, 0.74);
    height: 2rem !important;
    line-height: 2rem !important;
    border-radius: 0.3rem;

}

</style>

<style lang="scss" scoped>

.leftMask{
    position: absolute;
    right: -22.1rem;
    width: 36rem;
    height: 2rem;
    top: 0.5rem;
    text-align: center;
    line-height: 2rem;
    background-color: rgba(180, 84, 116, 0.041);
}

.leftMask:hover{
  // background-color: rgba(253, 4, 58, 0.774);
    right: 0.1rem;
    color:white;
    font-weight: 600;
    width: 3rem;

}

.detailList:hover{
  cursor: pointer;
  color: #666;
}
.leftKeyWord{

}
.leftInput{
  float: left;
  width:65%;
  margin-left: 2%;
  margin-top: 2vh;
}

.leftPic{
  position: absolute;
  height: 3rem;
  width: 3rem;
  left: 0%;
  top:-0.2rem;
  background:url('../../assets/topLogo.png');
  // background-color: #ddd;
  z-index: 5;
    background-repeat: no-repeat;
    background-size: 100%;

}
.leftItem{
  background-color: rgb(178, 182, 189)
}
.leftItem:hover{
    background-color:rgb(194, 198, 211) !important;
}


.left_history_batches{
    // float:left;
  //    ::-webkit-scrollbar {
  //    width: 0 !important;
  //  }
  //  ::-webkit-scrollbar {
  //    width: 0 !important;height: 0;
  //  }

    height: 150vh;
    width: 10rem;
    background-color:rgb(216, 221, 231);
    position: absolute;
    top:0;
    // top:4.5rem;
    overflow-y: hidden;
     overflow-x: hidden;
    
}
</style>