<template>
<div>
  <!-- 人事 -->
  <div v-if="docType=='personnel'">  
  <div ref="print1" style="position:relative;top:1cm;left:1cm;border:solid;height:1.5cm;width:30mm">
    <div  style="float:left;width:0.7cm;border-right:solid 0.5mm;line-height:0.75cm;height:1.5cm;text-align:center">
      正本
    </div>
    <div style="float:left;width:2.25cm;height:0.725cm;text-align:center;border-bottom:solid 0.5mm">
      类号
    </div>
    <div style="float:left;width:2.25cm;height:0.725cm;text-align:center;">
      <font style="font-size:1.2rem" >{{this.rsPrint}}</font>
      <font style="font-size:1rem">{{this.rsPrintSub}}</font>

    </div>
  </div>
  </div>



  <!-- 文书 -->
  <div v-if="docType=='official'||docType=='business'">
      <div ref="print1" style="position:relative;top:1cm;left:1cm;border:solid;height:1.6cm;width:45mm"  @mouseover="showAdjPos" @mouseleave="hideAdjPos" >
    <div class="clickSmall"   style="font-size:15px;cursor:pointer;float:left;width:14.5mm;border-bottom:solid 0.5mm;border-right:solid 0.5mm;line-height:0.8cm;height:7.75mm;text-align:center">
      {{this.authCode||""}}
    </div>
        <div class="clickSmall"  style="font-size:15px;cursor:pointer;float:left;width:14.5mm;border-bottom:solid 0.5mm;border-right:solid 0.5mm;line-height:0.8cm;height:7.75mm;text-align:center">
      {{this.sortYear}}
    </div>
        <div  class="clickSmall"  style="font-size:15px;cursor:pointer;float:left;width:15mm;border-bottom:solid 0.5mm;line-height:0.8cm;height:7.75mm;text-align:center">
      {{this.docNum}}
    </div>
        <div   class="clickSmall"  style="font-size:15px;cursor:pointer;float:left;width:14.5mm;border-bottom:solid 0.5mm;border-right:solid 0.5mm;line-height:0.8cm;height:7.75mm;
        text-align:center">
 
     <div :style="[{'transform':smaller},{'left':leftAbout},{'top':topAbout}]" style="position:absolute;left:2mm;top:8mm">{{this.docAbout}}</div>

    </div>
        <div class="clickSmall"  style="position:relative;font-size:15px;cursor:pointer;float:left;width:14.5mm;border-bottom:solid 0.5mm;border-right:solid 0.5mm;line-height:0.8cm;height:7.75mm;text-align:center">
     <div>{{this.timedue}}</div> 
             <div class="controlPos" v-if="AdjPosFlag">
        <div @click="clickUp" style="position:absolute;width:5mm;height:5mm;left:-11mm;top:-6mm;color:red;font-weight:600;border:solid 0.3mm;line-height:5mm">↑</div>
             <div @click="clickDown" style="position:absolute;width:5mm;height:5mm;left:-11mm;bottom:-6mm;
             color:red;font-weight:600;border:solid 0.3mm;line-height:5mm">↓</div>

           <div @click="clickLeft" style="position:absolute;width:5mm;height:5mm;
           left:-21mm;top:1mm;color:red;font-weight:600;border:solid 0.3mm;line-height:5mm">←</div>

          <div @click="clickRight" style="position:absolute;width:5mm;height:5mm;
          left:0mm;top:1mm;color:red;font-weight:600;border:solid 0.3mm;line-height:5mm">→</div>
                    <div @click="Clicksmaller" style="position:absolute;width:10mm;height:5mm;
          right:17mm;top:1mm;color:white;font-size:14px;border:solid 0.3mm rgb(222,66,66);background-color:rgb(222,66,66);line-height:5mm">缩小</div>
</div>
    </div>
        <div class="clickSmall"  style="font-size:15px;cursor:pointer;float:left;width:15mm;border-bottom:solid 0.5mm;line-height:0.8cm;height:7.75mm;text-align:center">
      {{this.docPage}}
    </div>
 

  </div>
  </div>

  <!-- 科技   -->
    <div v-if="docType=='science'">
      <div ref="print1" style="position:relative;top:1cm;left:1cm;border:solid;height:2cm;width:50mm"  @mouseover="showAdjPos" @mouseleave="hideAdjPos">
        
    <div  style="float:left;width:35mm;border-bottom:0.5mm;border-bottom:0.5mm solid;border-right:solid 0.5mm;line-height:1cm;height:10mm;text-align:center">
      档号
    </div>
        <div  style="float:left;width:14.5mm;border-bottom:0.5mm solid;line-height:1cm;height:10mm;text-align:center">
      <div>序号</div> 

      
    </div>
    <div  style="float:left;width:35mm;border-bottom:0.5mm;border-right:solid 0.5mm;line-height:1cm;height:10mm;text-align:center">
      <div :style="[{'transform':smaller},{'left':leftAbout},{'top':topAbout}]" style="position:absolute">{{this.danghao}}</div> 
    </div>
        <div  style="float:left;position:relative;width:14.5mm;border-bottom:0.5mm;line-height:1cm;height:10mm;text-align:center">
      {{this.docNum==null?"":this.docNum}}
       <div class="controlPos" v-if="AdjPosFlag">
        <div @click="clickUp" style="cursor:pointer;position:absolute;width:5mm;height:5mm;left:-20mm;top:-6mm;color:red;font-weight:600;border:solid 0.3mm;line-height:5mm">↑</div>
             <div @click="clickDown" style="cursor:pointer;position:absolute;width:5mm;height:5mm;left:-20mm;bottom:-6mm;
             color:red;font-weight:600;border:solid 0.3mm;line-height:5mm">↓</div>

           <div @click="clickLeft" style="cursor:pointer;position:absolute;width:5mm;height:5mm;
           left:-41mm;top:1mm;color:red;font-weight:600;border:solid 0.3mm;line-height:5mm">←</div>

          <div @click="clickRight" style="cursor:pointer;position:absolute;width:5mm;height:5mm;
          left:0mm;top:1mm;color:red;font-weight:600;border:solid 0.3mm;line-height:5mm">→</div>
                    <div @click="Clicksmaller" style=" cursor:pointer;position:absolute;width:10mm;height:5mm;
          right:25mm;top:2mm;color:white;font-size:14px;border:solid 0.3mm rgb(222,66,66);background-color:rgb(222,66,66);line-height:5mm">缩小</div>
</div>
    </div>
         
<!-- 
    <div style="float:left;width:2.25cm;height:0.725cm;text-align:center;">
      <font style="font-size:1.2rem" >{{this.rsPrint}}</font>
      <font style="font-size:1rem">{{this.rsPrintSub}}</font>

    </div> -->
  </div>
  </div>


</div>

</template>

<script>
export default {
  methods:{
    showAdjPos(){
      this.AdjPosFlag=true
    },
    hideAdjPos(){
      this.AdjPosFlag=false
    },
        Clicksmaller(){
          console.log('变小')
      this.size=this.size-0.05

    },
    clickUp(){
      this.topPosAbout=this.topPosAbout-0.2
    },
    clickDown(){
      this.topPosAbout=this.topPosAbout+0.2

    },
    clickLeft(){
      this.leftPosAbout=this.leftPosAbout-0.2

    },
    clickRight(){
      this.leftPosAbout=this.leftPosAbout+0.2

    },
  },
  computed: {
    leftAbout:function(){
      return this.leftPosAbout+'mm'
    },
    topAbout:function(){
      return this.topPosAbout+'mm'
    },
smaller:function(){

      return 'scale('+this.size+')'
    },
    docType() {
      return sessionStorage.getItem("docType");
    },

  },
  created () {
    var zishu=sessionStorage.getItem('aboutTextNum')
    if(zishu==2){
      this.leftPosAbout=3
    }
    if(zishu==3){
      this.leftPosAbout=1.4
    }
    if(zishu==4){
      this.leftPosAbout=-0.8
      this.size=0.8
    }
    if(zishu==5){
      this.leftPosAbout=-2.5
      this.size=0.67
    }
      this.$message.warning({
        duration:1000,
        message:"请按 ctrl+p 进行打印"
      });
    
    // alert(this.rsPrint)
    // this.rsPrint=sessionStorage.getItem(rsPrint)
    this.rsPrint=window.sessionStorage.getItem('rsPrint')
    this.rsPrintSub=window.sessionStorage.getItem('rsPrintSub')

    this.authCode=sessionStorage.getItem('authCode')
    this.sortYear=sessionStorage.getItem('sortYear')
    this.docNum=sessionStorage.getItem('docNum')
    this.docAbout=sessionStorage.getItem('docAbout')
    this.docPage=sessionStorage.getItem('docPage')
    this.timedue=sessionStorage.getItem('timedue')

this.danghao=sessionStorage.getItem('danghao1')

if(window.sessionStorage.getItem("docType")=='science'){
  this.topPosAbout=9.5
  this.leftPosAbout=4.5
  this.docNum=sessionStorage.getItem('kjXuhao')
}
// this.doc
    // this.$print(this.$refs.print1);//$refs的值要和html里的ref一致
    // console.log(this.rsPrint)
    // alert(this.$store.state.rsPrint)
        },

  data(){
    return{
      authCode:88888,
      docNum:888,
      sortYear:1999,
      docAbout:'综合类',
      timedue:'永久',
      docPage:88,
      danghao:'asd',
      leftPosAbout:3,
      topPosAbout:8,
      AdjPosFlag:false,
      size:1,
      rsPrint:'123',
      nihao:2,
      rsPrintSub:'',
    }
  },

}
</script>

<style lang="scss" scoped>
.clickSmall{

}
</style>>
