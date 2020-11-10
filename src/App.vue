<template>
  <div id="app">
     <TopHeader v-if="!$route.meta.hideflg"></TopHeader>
    <router-view/>
  </div>
</template>

<script>
import TopHeader from "./components/common/TopHeader.vue";

import Left from "./components/common/History.vue";

export default {
  components: {
    TopHeader: TopHeader,
     
  },
  data(){
    return{
      header_show:true
    }
  },
  methods:{
    optHeader:function(bool) {
        this.header_show = bool;
      },

    setRootFontSize() {
        // let rem, rootWidth;
        // let rootHtml = document.documentElement;
        // //限制展现页面的最小宽度
        // rootWidth = rootHtml.clientWidth < 1366 ? 1366 : rootHtml.clientWidth;
        // // 19.2 = 设计图尺寸宽 / 100（ 设计图的rem = 100 ）
        // rem = rootWidth / 19.2;
        // // 动态写入样式
        // rootHtml.style.fontSize = `${rem}px`;

        let rootHtml = document.documentElement;
        var windowWidth=window.screen.width;
        let rem=windowWidth/100;
        rootHtml.style.fontSize=`${rem}px`;
    }
  },
 mounted(){
   this.setRootFontSize();

 }
}
</script>

<style >
.el-message{
  z-index: 99999 !important;
  top:5rem !important;
}
</style>