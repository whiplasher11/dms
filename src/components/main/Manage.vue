<template>
  <div>
    <div class="wrapper">
      <div style="height:6.5rem;position:relative">
        <!-- <div
          style="position:absolute;bottom:0rem;right:20%;font-size:1.2rem;"
          v-if="true"
          
          class="hoverStyle"
        >返回</div> -->
      </div>
      <div style="margin-top:3rem">
        <div class="userItem">
          <div class="userInfo">用户名</div>
          <div class="userInfo">注册时间</div>
          <div class="userInfo">工作地点</div>
          <div class="userInfo">手机号码</div>
          <div class="userInfo">权限</div>
          <div class="userInfo">到期时间</div>
        </div>

        <div class="userItem" v-for="(item,index) in userTable" :key="index">
          <div class="userInfo">{{item.user.username}}</div>
          <div class="userInfo">{{item.user.registryTime|formatTime}}</div>
          <div class="userInfo">{{item.user.workplace}}</div>

          <div class="userInfo">{{item.user.phone}}</div>
          <div class="userInfo">{{item.role}}</div>
          <div class="userInfo">{{item.endTime|formatEndTime}}</div>
          <el-button type="primary" class="kvButton" @click="continueFee($event,item)">续费</el-button>
          <el-button
            type="danger"
            class="kvButton"
            @click="banUser($event,item)"
            v-if="item.state=='可用'"
          >禁用</el-button>
          <el-button
            type="info"
            class="kvButton"
            @click="unBanUser($event,item)"
            v-if="item.state=='禁用'"
          >解禁</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userTable: [
        {
          role: "普通用户",
          endTime: "2023-08-04T13:36:22.000+0000",
          state: "可用",
          user: {
            id: 8,
            salt: null,
            workplace: "tpp",
            phone: "15274861894",
            registryTime: "2020-08-04T13:34:50.000+0000",
            updateTime: null,
            username: "tang",
            password: null,
          },
        },
        {
          role: null,
          endTime: null,
          state: "到期",
          user: {
            id: null,
            salt: null,
            workplace: null,
            phone: null,
            registryTime: null,
            updateTime: null,
            username: null,
            password: null,
          },
        },
        {
          role: "游客",
          endTime: null,
          state: "到期",
          user: {
            id: 6,
            salt: null,
            workplace: null,
            phone: "18711145238",
            registryTime: "2020-06-05T10:25:39.000+0000",
            updateTime: null,
            username: "qiyuanfeng",
            password: null,
          },
        },
        {
          role: "游客",
          endTime: null,
          state: "到期",
          user: {
            id: 3,
            salt: null,
            workplace: null,
            phone: "123",
            registryTime: "2020-06-05T09:27:40.000+0000",
            updateTime: null,
            username: "test",
            password: null,
          },
        },
      ],
    };
  },
  methods: {
      unBanUser(e, item) {
           this.$confirm("解除禁用此用户使用权限吗", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }).then(() => {
        var path = "/admin/user/" + item.user.username + "/1";
        this.postRequest(
          //注意防止重复提交
          path
          //   JSON.stringify(docObj)
        ).then((resp) => {
            if(resp.code==0){
        this.$message({
          type: "sucess",
          message: "解除成功",
        });
          this.renewTable();

            }
        });
      });
      },
    banUser(e, item) {
      this.$confirm("禁用此用户使用权限吗", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }).then(() => {
        var path = "/admin/user/" + item.user.username + "/1";
        this.postRequest(
          //注意防止重复提交
          path
          //   JSON.stringify(docObj)
        ).then((resp) => {
            if(resp.code==0){
        this.$message({
          type: "success",
          message: "禁用成功",
        });
          this.renewTable();

            }
        });
      });
    },
    
    continueFee(e, item) {
      console.log(item);
      //   var item
      var name = item.user.username;
      this.$confirm("续费一年此用户使用权限吗", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }).then(() => {
        console.log("改变用户权限");
        var path = "/admin/user/" + name;
        this.putRequest(
          //注意防止重复提交
          path
          //   JSON.stringify(docObj)
        ).then((resp) => {
            if(resp.code==0){
                        this.$message({
          type: "success",
          message: "赋权成功",
        });
        this.renewTable()
            }
          console.log(resp);
        });
      });
    },

    renewTable() {
      this.getRequest("/admin/users?pageNow=0&pageSize=100").then((resp) => {
        this.userTable = resp.data;
      });
    },

    loseThis(e) {},
  },
  created() {
    this.getRequest("/admin/users?pageNow=0&pageSize=100").then((resp) => {
      this.userTable = resp.data;
    });
  },
};
</script>

<style lang="scss" scoped>
.userItem {
  width: 95%;
  margin: auto;
  height: 3rem;
  border-bottom: solid 0.02rem;
  .userInfo {
    text-align: center;
    float: left;
    width: 13%;
    height: 2rem;
    // border-left: solid 0.1rem;
    margin-top: 0.15rem;
    margin-left: 0.2rem;
    // padding-top: 0rem;
    line-height: 2rem;
  }
}

.wrapper {
  background-color: rgb(209, 218, 243);
  // height: 120vh;
  padding-bottom: 100vh;
  position: relative;

  .hoverStyle:hover {
    color: rgba(29, 30, 32, 0.733);
    cursor: pointer;
  }
  .organItem {
    width: 95%;
    margin: auto;
    height: 3rem;

    .tip {
      float: left;
      width: 12%;
      height: 2rem;
      margin-top: 0;
      margin-right: 0.2rem;
      text-align: center;
      border: none;
    }
    // border: solid 0.1rem;
  }

  .kvButton {
    margin-top: 0.2rem;
    // width: 2rem;
    height: 1.6rem;
    // position: absolute;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 1.6rem;
    float: left;
    margin-left: 1rem;
  }
}
</style>