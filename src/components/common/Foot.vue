<template>
       

    <div id="footer">
         <!-- <div class="zhicheng"> </div> -->
         <img class="footer_bg" src="../../assets/footer.png" alt=""> 
        <div class="content" style="color:#ffffff">
            <ul>
                <ul class="ul_a">
                    <li class="li_a">麓优asdasd2思</li>
                    <li class="li_b"><a target="_blank" class="">招贤纳士</a></li>
                    <li class="li_c"><router-link to='aboutus' class="">关于我们</router-link></li>
                    <li class="li_d">反馈问题</li>
                    <ul class="ul_c">
                        <li class="li_c">Copyright © 2006-2019 轻E包 All Rights Reserved     &nbsp;&nbsp;&nbsp; 粤ICP备15098282号</li>
                        <li class="li_c"></li>
                    </ul>
                        
                </ul>
                <ul class="ul_a">
                    <li class="li_a">联系我们</li>
                    <li class="li_b">地址: 湖南省长沙市岳麓区岳麓街道潇湘中路328号</li>
                    <li class="li_c">电话: 00000000</li>
                    <li class="li_d">邮箱: 00000000</li>
                </ul>
            </ul>
            <div class="ercode">
                <div style="width:10vw;height:10vw;background-color:#666">公众号二维码</div>

                <span>扫一扫关注我们</span>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.zhicheng{
    height: 100vh;

}
#footer {
    width: 100%;
    height: 46vh; 
     /* background-image: url('../../static/footer_bg.png');  */
    /*background-color: #1a262e;*/
    background-repeat: no-repeat;
    background-position: 50%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
}
.footer_bg {
    position: absolute;
    width: 100%; 
    /* min-width: 1366px; */
    /* max-width: 1980px; */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
}
.content {
    width: 60vw;
    /* height: 500px; */
    margin: 0 auto;
    display: block;
    position: relative;
    li{
        font-size: 1.3vw;
    }
    span{
        font-size: 1.3vw;
    }
    a{
        font-size: 1.3vw;
    }
}

.ul_a {
    float: left;
    margin-right: 100px;
    color: #333;
    margin-top: 8vh;
    li:hover{
        cursor: pointer;
    }
}


.li_a {
    font-size: 20px;
    color: #333333;
    margin-bottom: 2Vh;
}

.li_b {
        font-size: 1.3vw;

    color: #333;
}
.li_d {
        font-size: 1.3vw;

    color: #333;
    margin-bottom: 15px;
}
.li_d:hover {
    color: #3cebfb;
    
}
.ul_c {
     margin-top: 3vh; 
    /* margin-bottom: 30px!important; */
}
.li_c {
        font-size: 1.3vw;

    color: #333;
    margin-top: 15px;
    width: 100px;
    white-space: nowrap;
}

/*ul {
    display: inline-block;
    white-space: nowrap;
}

li {
    float: left;
    margin-right: 75px;
    white-space: nowrap;
}*/


/*.ul_a {
    font-size: 22px;
    color: white;
    margin-top: 60px;
    margin-bottom: 40px;
}

.ul_b {
    font-size: 18px;
    color: #a3a3a3;
    margin-bottom: 8px;
}

.ul_c {
    font-size: 18px;
    color: #a3a3a3;
    margin-top: 100px;
}
.ul_c li p {
    line-height: 35px;
    font-size: 20px;
}*/

.ercode {
    position: absolute;
    right: -10vw;
    top: 10vh;
    font-size: 1.5vw;
    color: #333;
    text-align: center;
}
.ercode img {
    width: 15vw;

}
.location {
    /* color: #3cebfb; */
}
</style>
 
// <script>
export default {
 
    created(){
    }
}
 </script>

 