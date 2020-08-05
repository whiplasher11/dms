<template>
  <div style="position:relative" class="wrapper">
	  <!-- <div class="backgroundpic"></div> -->
	  <div style="height:10rem;"></div>
		<div class="topTip">
			<div class="topicon"></div>
		  <div class="toptext">Hi,欢迎来到国安档案管理系统</div>
	  </div>
 <div class="banner">
  <div class="item">
	<transition>
    <img :src="dataList[currentIndex]" style=" width: 100%;height: 100%;">
		</transition>
  </div>
  <div class="page" v-if="this.dataList.length > 1">
    <ul>
      <li @click="gotoPage(prevIndex)">&lt;</li>
      <li  v-for="(item,index) in dataList" :key=index @click="gotoPage(index)" :class="{'current':currentIndex == index }">  {{index+1}}</li>
      <li @click="gotoPage(nextIndex)">&gt;</li>
    </ul>
  </div>
</div>

  </div>
</template>

<script>
import pic1 from "../../assets/pic1.png";
import pic2 from "../../assets/pic2.png";
import pic3 from "../../assets/pic3.png";



export default {
 data() {
	 return{
		   dataList:[pic1,pic2,pic3],
  currentIndex: 0,   //默认显示图片
  timer: null    //定时器
	 }
},
mounted(){
	this.runInv()
			
	       this.getRequest("/organ/5").then(resp => {
      console.log(resp)})
},
methods: {
		runInv() {
  this.timer = setInterval(() => {
    this.gotoPage(this.nextIndex1())
  }, 2000)
},
  gotoPage(index) {
	  
    this.currentIndex = index;
  },
  	 prevIndex1() {
    if(this.currentIndex == 0) {
      return this.dataList.length - 1;
    }else{
      return this.currentIndex - 1;
    }
  },
  //下一张
  nextIndex1() {
    if(this.currentIndex == this.dataList.length - 1) {
      return 0;
    }else {
      return this.currentIndex + 1;
    }
  }
},
computed:{
	 prevIndex() {
    if(this.currentIndex == 0) {
      return this.dataList.length - 1;
    }else{
      return this.currentIndex - 1;
    }
  },
  //下一张
  nextIndex() {
    if(this.currentIndex == this.dataList.length - 1) {
      return 0;
    }else {
      return this.currentIndex + 1;
    }
  }
}
}
</script>


<style lang="scss" scoped>
.wrapper{
	background-color: rgb(203, 231, 215);
	
}
.topTip{
	
    position: absolute;
    width:25rem;
    height: 11rem;
	    top: 6rem;
    margin-left: -12.5rem;
    left: 50%;
    font-size: 2rem;

	color: rgba(54, 78, 67, 0.897);
}
.backgroundpic{
  background:url(  ("../../assets/doc.png"));
position: absolute;
    top: 3rem;
    left: 15rem;
    width: 12.7rem;
    /* background-color: red; */
    height: 13.7rem;
    z-index: 0;
    background-repeat: no-repeat;
    background-size: 62%;
	
}

	.banner{

		width: 100%;
		height: 50rem;



		.current{
			background-color: rgba(55, 88, 65, 0.5);
		}
		.item{
			width:100%;
			height: 30rem;

		}

		.page{
			position: absolute;
			right: 0;
			bottom: 21.0rem;

		}
		ul{
			list-style: none;
		}
		ul li{
			float: left;
			font-size: 1.5rem;
			width: 3rem;
			cursor: pointer;
			text-align: center;
			color: rgb(255, 255, 255);
			border-radius: 1rem;
		}
	}

	

	.content div {
	  height: 100rem;
	}
	.box1 {
	  width: 50vw;
	  background-color: coral;
	}
	.box2 {
	  width: 4rem;
	  background-color: skyblue;
	}
	.box3 {
	  width: 6rem;
	  background-color: palegreen;
	}
	.box4 {
	  width: 8rem;
	  background-color: wheat;
	}
	.box5 {
	  width: 10rem;
	  background-color: darkred;
	}
</style>
