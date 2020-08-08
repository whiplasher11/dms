<template>
  <div>
    <div class="wrapper">
      <div style="height:6.5rem"></div>
      <div class="adminBox">
        <div class="userItem">
          <div class="itemInfo">用户名</div>
          <div class="itemInfo">工作地点</div>

          <div class="itemInfo">账户注册时间</div>

          <div class="itemInfo">到期时间</div>

 
        </div>

                <div class="userItem">
          <div class="itemInfo">用户名</div>
          <div class="itemInfo">工作地点</div>

          <div class="itemInfo">账户注册时间</div>

          <div class="itemInfo">到期时间</div>

          <el-button
            type="success"
            style="    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    padding-right: 0.4rem;
    padding-left: 0.4rem;"
          >续费一年</el-button>

                    <el-button
            type="warning"
            style="    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
    padding-right: 0.4rem;
    padding-left: 0.4rem;"
          >禁用账户</el-button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "../../utils/doc.js";
import axios from "axios";

export default {
  computed: {
    authCode() {
      return sessionStorage.getItem("authCode") || "";
    },
  },
  data() {
    return {
      //   authCode:'2',
      tempOrganName: "name",
      tempOrganCode: 123,
    };
  },
  methods: {},
  created() {
    var path = "/admin/users?pageNow=0&pageSize=100";
    this.getRequest(path).then((resp) => {
      if (resp.code == 0) {
        console.log("加载时请求单位列表");
        this.organs = resp.data;
        // console.log(this.organs)
        //  console.log(resp)
      }
    });
  },
  mounted() {
    // this.authCode=sessionStorage.getItem('authCode')||'错误'
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: rgb(209, 218, 243);
  // height: 120vh;
  padding-bottom: 100vh;
}

.adminBox {
  position: relative;

  .userItem {
    height: 2rem;
    border-top: solid 0.02rem;
  }

  .itemInfo {
    float: left;
    font-size: 0.8rem;
    line-height: 2rem;
    width: 15%;
    text-align: center;
    // border-right: 0.05rem solid;
  }
}
</style>