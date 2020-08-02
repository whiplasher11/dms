<template>
  <div class="outbox">
    <div style="position:relative" class="wrapper">
      <div style="height:4.5rem;"></div>
      
      <div style="position:absolute;top:6rem;font-size:1.5rem;width:100%;text-align:center">排件号规则管理</div>

      <div class="typeSelect" v-if="selectShow">
        <div style="width:3rem;height:2rem"></div>

        <div class="selectItem">文书类档案问题(机构)优先级设置</div>
        <div class="selectItem">文书类档案责任者优先级设置</div>
        <div class="selectItem">文书类档案关键词优先级设置</div>
        <div class="selectItem">科技类档案项目优先级设置</div>
        <div class="selectItem">科技类档案责任者优先级设置</div>
        <div class="selectItem">科技类档案关键词优先级设置</div>
        <div class="selectItem">业务类档案问题优先级设置</div>
        <div class="selectItem">业务类档案责任者优先级设置</div>
        <div class="selectItem">业务类档案关键词优先级设置</div>



        <div style="clear:both"></div>
        <div style="width:3rem;height:2rem"></div>

      </div>
      <!-- 选择类型 -->

      <div class="keyValueBox" @click="boxClick" v-if="!selectShow">
        <div class="keyValueItem">
                    <div class="keyValueInfo" style="border:none;position:relative">优先级(越大越靠前）
          <el-button @click="saveKeyValue" type="success" class="kvButton" style="  position: absolute; right: 2rem;" v-if="saveBtnShow">保存修改</el-button>

          </div>
          <div class="keyValueInfo" style="border:none">词</div>

          <div class="keyValueInfo" style="border:none">操作</div>


        </div>
        


      
        <div class="keyValueItem" style="z-index=99" v-for="item in keyWordTemp" :key="item.id"  draggable="false">
          <div v-bind:class="[{keyValueInfo:true},{hideText:saveBtnShow}] " style="border:none"   >{{item.tables|formatKeyWordValue}}</div>
          <div class="keyValueInfo" style="border:none"  >{{item.tables|formatKeyWordKey}}</div>

          <div v-bind:class="[{keyValueInfo:true},{hideText:true}] " style="border:none" v-if="false" >{{item.tables|formatKeyWordValue}}</div>

          <div style="width:0;position:absolute;">{{item.id}}</div>
          <el-button type="success" class="kvButton" @click="upClick($event,item)" style="margin-left:3rem">上调</el-button>
          <el-button type="warning" class="kvButton" @click="downClick($event,item)">下调</el-button>
          <el-button type="danger" class="kvButton">删除</el-button>
          <el-button type="error" class="kvButton" v-if="!saveBtnShow" >修改值</el-button>

          
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
    }
  },

  created(){

  },
    methods:{
      saveKeyValue(){
        this.saveBtnShow=false;
        // console.log(this.keyWordTemp)
       var keyValueTable=this.keyWordTemp
      this.submitMap.forEach(function(value,key){  //key表示id value表示数组下标
  // 　　　console.log(key,value)

  // 　var v=value;//第几个
          var k=Object.keys(keyValueTable[value].tables)[0]; //词
          var v=keyValueTable.length-value; //下标 就是新值
          var objLittle={[k]:v}
          var obj={
            id:key,
            tables:objLittle
          }
          console.log(JSON.stringify(obj))

　　　　　　　　　　});
      },
      boxClick(e){
        // console.log(e)
      },
      changeFlag(){
        this.valueShow=true
      },
      valueCompute(e){
        // console.log(e)
        clearInterval(this.timer);
        this.timer = setInterval(this.changeFlag, 2000);


      },
      downClick(e,item){
        // this.valueCompute(e)
        // this.valueShow=false
        this.saveBtnShow=true;
         var _arr=this.keyWordTemp;
       var length = _arr.length;
        var oldPlace
        var newPlace


      for (var i = 0; i < length; i++) {
        if (_arr[i].id == item.id) {
            if (i == length-1) {

            }
            else {
              /*往下交换*/
                _arr.splice(i, 1); //删除下标为i的元素
             _arr.splice(i+1,0,item)
             /*往下交换*/

             /*哪两个改动了加入map*/
             var theOtherItem=_arr[i]
              oldPlace=i;
              newPlace=i+1;
              
              if(!this.submitMap.has(item.id)){
                this.submitMap.set(item.id,newPlace)
              }else {
                this.submitMap.set(item.id,newPlace)
              }

              this.submitMap.set(theOtherItem.id,oldPlace)
              console.log(this.submitMap)
             /*哪几个改动了加入map*/

              return;
            }
        }
    }
      },
      upClick(e,item){
        this.saveBtnShow=true;

        var _arr=this.keyWordTemp;
       var length = _arr.length;
               var oldPlace
        var newPlace


      for (var i = 0; i < length; i++) {
        if (_arr[i].id == item.id) {
            if (i == 0) {
                // _arr.shift(); //删除并返回数组的第一个元素
              
            }
            // else if (i == length - 1) {
            //     _arr.pop();  //删除并返回数组的最后一个元素
              
            // }
            else {
                _arr.splice(i, 1); //删除下标为i的元素
             _arr.splice(i-1,0,item)

             /*哪两个改动了加入map*/
             var theOtherItem=_arr[i]
              oldPlace=i;
              newPlace=i-1;
             
              if(!this.submitMap.has(item.id)){
                this.submitMap.set(item.id,newPlace)
              }else {
                this.submitMap.set(item.id,newPlace)
              }

              this.submitMap.set(theOtherItem.id,oldPlace)
              console.log(this.submitMap)
             /*哪几个改动了加入map*/

              return;
            }
        }
    }
    // this.keyWordTemp=_arr;
        // console.log(item)
        var thisEle=e.path[2] //上一个Item条
        // console.log(thisEle)
      
      
        this.keyWordTemp
        // console.log(e.path[2])
        var preEle=e.path[2].previousElementSibling
        e=preEle;
      }
    },
  data() {
    return {
      saveBtnShow:false,
      submitMap:new Map(),
      valueShow:true,
      timer: '',
      selectShow:true,

      keyWordTemp:[
        {
          id:1,
          tables:{'问题':""}  //可能
        },
        {
          id:2,
          tables:  {'责任者1':"4"},
        },
        {
          id:3,
          tables:{'key3':"3"}
        },
        {
          id:4,
          tables:{'财经类':"2"}
        },
        {
          id:5,
          tables:{'关键字22':"1"}
        },
      ],
    };
  }
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
}
</style>

<style lang="scss" scoped>
.hideText{
  color:rgba(204, 166, 43, 0)
}

.kvButton{
  margin-top: 0.2rem;
  // width: 2rem;
  height: 1.6rem;
  // position: absolute;
  padding-left:0.5rem;
  padding-right: 0.5rem;
  padding-top: 0;
  padding-bottom: 0;
  line-height: 1.6rem;
  float: left;
  margin-left: 1rem;
}
.keyValueBox{
       position: relative;
       top:6rem;
          width: 95%;
        margin:auto;
        border:solid 0.1rem rgb(188, 200, 231);
        // height: 3rem;

        .keyValueItem{
                  float: left;
        width: 100%;
        height: 2rem;
        // margin-top: 0;
        margin-left: 0.2rem;
        text-align: center;
        border:solid 0.02rem;
        }

        .keyValueInfo{

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

 .typeSelect{
   position: relative;
   top:6rem;
   width: 88%;
   margin: auto;
   border: solid;
 }

 .selectItem{
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
 .selectItem:hover{
   cursor: pointer;
 }
.wrapper {
  background-color: rgb(209, 218, 243);

  // height: 150vh;
  padding-bottom: 100vh;
}


</style>>

