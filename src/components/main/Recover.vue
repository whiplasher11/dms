    <div class="selectPull"
     v-on:mouseover="topHeaderShow()"
       v-on:mouseleave="topHeaderHide()"
    >
    <i v-if="showTopHeader" class="fa fa-chevron-up"> </i> <i class="fa fa-chevron-down" v-if="!showTopHeader"></i></div>

  <div :class="selectPull" @click="fixTheTopHeader">   <i v-if="showTopHeader" class="fa fa-paperclip"> </i> </div>
     v-bind:class="[{top_header_b:topHeaderState},{top_header_c:!showTopHeader}, top_header_a]">