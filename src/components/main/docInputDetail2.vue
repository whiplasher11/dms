<template>
  <div>
    <div
      v-show="showCenterPrint"
      style="
        position: fixed;
        left: 30rem;
        top: 20rem;
        width: 40rem;
        height: 20rem;
        z-index: 2000;
        background-color: #fff;
        -webkit-box-shadow: 0 0 0.5rem #909399;
        box-shadow: 0 0 0.5rem #909399;
        border-radius: 1rem;
      "
    >
      <HidePrint
        v-bind:printDoc="printDoc"
        v-show="!showPrint"
        style="margin-left: -30mm; position: relative; width: 80%; left: 50%"
      ></HidePrint>

      <div
        style="
          position: absolute;
          right: 0.5rem;
          top: 0.1rem;
          font-size: 1.5rem;
          cursor: pointer;
        "
        @click="hideCenterPrintBtn"
      >
        <i class="el-icon-remove"></i>
      </div>
    </div>

    <div
      style="
        position: relative;
        z-index: 444;
        margin-top: 0rem;
        background-color: #eee;
      "
      v-show="showKWM"
    >
      <div
        style="
          position: absolute;
          right: 6rem;
          top: 5rem;
          background-color: #f22;
          font-size: 0.8rem;
        "
        class="topTextButtonBlue"
        @click="hideSubKWM"
      >
        &nbsp;关闭&nbsp;
      </div>

      <KeyWordManage> </KeyWordManage>
    </div>

    <!-- <div v-show="getDocInShow">
  <DocIn>
  </DocIn>
</div> -->

    <div class="wrapper" style="padding-bottom: 50rem" v-if="!showKWM">
      <div style="height: 6.5rem"></div>
      <div
        style="
          position: fixed;
          width: 20rem;
          height: 10rem;
          top: 10rem;
          left: 50%;
          margin-left: -10rem;
          line-height: 10rem;
          background-color: rgba(25, 55, 163, 0.8);
          font-size: 1.3rem;
          color: white;
          text-align: center;
          z-index: 1000;
        "
        v-if="showWaitingFlag"
      >
        请求中，请稍候...
      </div>

      <div
        v-if="showStartBoxSet"
        style="
          position: fixed;
          top: 15rem;
          left: 50%;
          margin-left: -15rem;
          z-index: 122;
          padding-top: 1rem;
          color: #333;
          font-size: 1.5rem;
          width: 30rem;
          height: 10rem;
          background-color: rgb(255, 255, 255);
          -webkit-box-shadow: 0 0 0.5rem #909399;
          box-shadow: 0 0 0.5rem #909399;
          border-radius: 1rem;
        "
      >
        <div
          style="
            font-size: 1rem;
            width: 20rem;
            text-align: center;
            margin-left: 5rem;
            color: #333;
          "
        >
          输入盒号
        </div>
        <input
          type="text"
          style="
            height: 1.5rem;
            margin-left: 11rem;
            margin-top: 2rem;
            width: 8rem;
          "
          v-model="startBoxNum"
        />
        <div
          class="textButton"
          @click="cancleManulBox"
          style="
            color: #333;
            cursor: pointer;
            position: absolute;
            margin-top: 1.5rem;

            font-size: 1.2rem;
            margin-left: 17rem;
          "
        >
          取消
        </div>

        <div
          @click="manualBox"
          style="
            color: #333;
            cursor: pointer;
            position: absolute;
            margin-top: 1.5rem;

            font-size: 1.2rem;
            margin-left: 10rem;
          "
        >
          确定
        </div>
      </div>

      <!-- <div class="docDetailBox" v-if="docType=='personnel'">

    </div> -->

      <div class="docDetailBox">
        <div class="advSearchBox">
          <el-form
            v-if="advSearchShow && docType == 'personnel'"
            ref="searchForm"
            :model="searchForm"
            label-width="6rem"
            class="specialELContainer"
            style=""
          >
            <h3
              style="
                text-align: center;
                width: 100%;

                color: #555;
              "
            >
              输入一个或多个条件查找文档
            </h3>

            <!-- <div style="position:absolute" v-if="docType!='personnel'"> <i class="el-icon-remove"></i> 隐藏</div>
        <div style="position:absolute;right:0;top:0.4rem" v-if="docType=='personnel'"><i class="el-icon-remove"></i> 隐藏</div> -->
            <div
              style="
                position: absolute;
                right: 0.5rem;
                top: 0.1rem;
                font-size: 1.5rem;
                cursor: pointer;
              "
              @click="hideAdvSearchNoReload"
            >
              <i class="el-icon-remove"></i>
            </div>

            <el-form-item prop="username" label="识别号：">
              <el-input
                size="normal"
                type="text"
                v-model="searchForm.docSequence"
                auto-complete="off"
                placeholder="识别号"
              ></el-input>
            </el-form-item>

            <el-form-item prop="username" label="文件标题：">
              <el-input
                size="normal"
                type="text"
                v-model="searchForm.docTitle"
                auto-complete="off"
                placeholder="标题"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="姓名：">
              <el-input
                size="normal"
                type="text"
                v-model="searchForm.personName"
                auto-complete="off"
                placeholder="姓名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="日期：">
              <el-input
                size="normal"
                type="text"
                v-model="searchForm.docDate"
                auto-complete="off"
                placeholder="日期"
              ></el-input>
            </el-form-item>

            <!-- <el-form-item prop="code">
                <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off"
                          placeholder="点击图片更换验证码" @keydown.enter.native="submitLogin" style="width: 250px"></el-input>
                <img :src="vcUrl" @click="updateVerifyCode" alt="" style="cursor: pointer">
      </el-form-item>-->
            <!-- <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox> -->
            <!-- <div class="goRegister" @click="goRegister">尚未注册？前往注册</div> -->

            <div
              style="margin-left: 35%; float: left"
              class="topTextButtonBlue"
              @click="advSearch"
            >
              查找
            </div>
            <div
              style="position: absolute; left: 60%"
              class="topTextButtonBlue"
              @click="hideAdvSearch"
            >
              取消
            </div>
          </el-form>

          <div></div>

          <el-form
            class="specialELContainer"
            label-width="7rem"
            v-if="boxInfoShowFlag"
            style="width: 50rem; margin-left: -25rem"
          >
            <div
              style="
                position: absolute;
                right: 0.5rem;
                top: 0.1rem;
                font-size: 1.5rem;
                cursor: pointer;
              "
              @click="boxInfoShowFlag = false"
            >
              <i class="el-icon-remove"></i>
            </div>

            <h3 style="text-align: center; color: #505458">备考表详细信息</h3>

            <div>所有盒：</div>

            <div>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="立卷人">
                    <el-input
                      size="normal"
                      type="text"
                      v-model="publisher"
                      auto-complete="off"
                      placeholder="立卷人"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="检查人">
                    <el-input
                      size="normal"
                      type="text"
                      v-model="checker"
                      auto-complete="off"
                      placeholder="检查人"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24" style="border-bottom: 1px dashed">
                <el-col :span="12">
                  <el-form-item label="立卷时间">
                    <el-input
                      size="normal"
                      type="text"
                      v-model="publishTime"
                      auto-complete="off"
                      placeholder="立卷时间"
                    ></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="检查时间">
                    <el-input
                      size="normal"
                      type="text"
                      v-model="checkTime"
                      auto-complete="off"
                      placeholder="检查时间"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

            <div style="height: 2rem">
              <div style="height: 2rem; width: 5rem; float: left">设置盒:</div>

              <div style="float: left; margin-left: 2rem" v-if="!boxInfoNow">
                选择盒子
              </div>

              <div style="float: left; margin-left: 2rem" v-if="boxInfoNow">
                本盒共{{ boxInfoNow.docCount }}件,{{ boxInfoNow.from }}~{{
                  boxInfoNow.to
                }},共{{ boxInfoNow.totalPage }}页
              </div>
            </div>

            <el-form-item prop="historyAuth" label="选择盒子" v-if="true">
              <el-select
                style="width: 80%"
                @change="boxInfoSelectDone"
                value-key="tableNumber"
                filterable
                v-model="boxInfoNow"
                placeholder="选择盒子"
              >
                <el-option
                  v-for="item in boxInfoList"
                  :key="item.tableNumber"
                  :label="item.tableNumber"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>

            <div v-show="!processShow">
              <el-form-item label="其他需要说明的情况" class="textArea">
                <el-input
                  size="normal"
                  type="textarea"
                  class="textAreaInput"
                  v-model="boxInfoNow.remark"
                  auto-complete="off"
                  :rows="3"
                  placeholder="其他需要说明的情况"
                ></el-input>
              </el-form-item>
            </div>

            <div
              class="topTextButtonBlue"
              style="width: 20%; margin-left: 6%; float: left"
              @click="saveInfo"
            >
              保存备考表信息
            </div>

            <!-- <div class="topTextButtonBlue" v-if="processShow" style="width:15%;float:left;margin-left:5%" @click="printThis"> 
            打印
          </div> -->
            <div
              class="topTextButtonBlue"
              style="width: 20%; float: left; margin-left: 6%"
              @click="getOneInfo"
            >
              下载本盒备考表
            </div>
            <div
              class="topTextButtonBlue"
              style="width: 20%; float: left; margin-left: 6%"
              @click="getAllInfo"
            >
              下载所有盒备考表
            </div>

            <div></div>
          </el-form>

          <el-form
            class="specialELContainer"
            label-width="6rem"
            v-if="PrintControllshow"
            style="width: 40rem; margin-left: -20rem; top: 20rem"
          >
            <div
              style="
                position: absolute;
                right: 0.5rem;
                top: 0.1rem;
                font-size: 1.5rem;
                cursor: pointer;
              "
              @click="PrintControllshow = false"
            >
              <i class="el-icon-remove"></i>
            </div>

            <h3 style="text-align: center; color: #505458">打印归档印章</h3>
            <el-row :gutter="24">
              <el-col :span="20">
                <el-form-item label="IP">
                  <el-input
                    style="width: 80%"
                    size="normal"
                    type="text"
                    v-model="printerIp"
                    auto-complete="off"
                    placeholder="设备Ip地址"
                  ></el-input>
                </el-form-item>
              </el-col>

              <!-- <div style="position:absolute;left:73%;top:0.5rem;" v-if="connectStatus" >连接中···</div> -->

              <div
                style="
                  position: absolute;
                  left: 73%;
                  top: 0.5rem;
                  cursor: pointer;
                "
                @click="ipInput"
              >
                连接
                <!-- <div class="topButton">
      连接
    </div> -->
                <div
                  style="
                    position: absolute;
                    width: 3rem;
                    left: 1rem;
                    top: -4rem;
                    color: red;
                  "
                  v-if="!connectStatus"
                >
                  {{ connectTip }}
                </div>
                <div
                  style="
                    position: absolute;
                    width: 3rem;
                    left: 1rem;
                    top: -4rem;
                    color: green;
                  "
                  v-if="connectStatus"
                >
                  已连接
                </div>

                <!-- 本来准备用作说明怎么连接机器 -->
                <div
                  style="
                    position: relative;
                    width: 1rem;
                    height: 1rem;
                    background-color: red;
                  "
                  v-if="false"
                >
                  <div
                    style="
                      position: absolute;
                      width: 5rem;
                      height: 5rem;
                      left: 1rem;
                      top: 1rem;
                      background-color: red;
                    "
                  ></div>
                </div>
              </div>
            </el-row>

            <el-form-item prop="historyAuth" label="打印顺序" v-if="false">
              <el-select
                style="width: 80%"
                @blur="printOrderBlur"
                @change="printOrderDone"
                filterable
                v-model="SelectedPrintOrder"
                placeholder="选择打印顺序"
              >
                <el-option
                  v-for="item in printOrders"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>

            <div style="height: 3rem" v-if="processShow"></div>

            <div v-show="!processShow">
              <el-form-item label="识别号">
                <el-input
                  ref="shibie"
                  style="width: 80%"
                  size="normal"
                  type="text"
                  v-model="printSeqAt"
                  auto-complete="off"
                  placeholder="识别号"
                ></el-input>
              </el-form-item>
            </div>

            <div
              v-show="processShow"
              style="
                height: 3rem;
                width: 50%;
                position: relative;
                left: 50%;
                margin-left: -25%;
                text-align: center;
              "
            >
              本次打印{{ this.printType }}:{{ this.printInfo }}
            </div>

            <div style="margin-left: 10%; height: 4rem">
              {{ this.printInfo1 }}

              <div>
                {{ this.printInfo }}
              </div>
            </div>

            <!-- <div style="margin-left: 10%">
              提示：按上下键可快速切换识别号，按回车键发送打印信息
            </div> -->
            <div style="height: 1rem"></div>
            <div
              class="topTextButtonBlue"
              v-if="!processShow"
              style="width: 15%; margin-left: 5%; float: left"
              @click="printThis1"
            >
              发送打印
            </div>

            <!-- <div class="topTextButtonBlue" v-if="processShow" style="width:15%;float:left;margin-left:5%" @click="printThis"> 
            打印
          </div> -->
            <div
              class="topTextButtonBlue"
              style="width: 15%; float: left; margin-left: 5%"
              @click="nextPrint"
            >
              +
            </div>
            <div
              class="topTextButtonBlue"
              style="width: 15%; float: left; margin-left: 5%"
              @click="prePrint"
            >
              -
            </div>

            <div
              class="topTextButtonBlue"
              style="width: 15%; float: left; margin-left: 5%"
              @click="resetPrint"
            >
              重置
            </div>

            <div></div>
          </el-form>

          <el-form
            v-if="advSearchShow && docType != 'personnel'"
            ref="searchForm"
            :model="searchForm"
            label-width="6rem"
            class="specialELContainer"
          >
            <!-- <div style="    left: -0px;
    position: absolute;
    border-radius: 15px 15px 0 0;
    width: 100%;
    background-color: rgb(204,204,204);
    height: 2.5rem;
    text-align: center;
    line-height: 2.5rem;
    ">输入一个或多个条件查找文档</div> -->

            <h3 style="text-align: center; color: #505458">
              输入一个或多个条件查找文档
            </h3>
            <div
              style="
                position: absolute;
                right: 0.5rem;
                top: 0.1rem;
                font-size: 1.5rem;
                cursor: pointer;
              "
              @click="hideAdvSearchNoReload"
            >
              <i class="el-icon-remove"></i>
            </div>

            <el-form-item prop="username" label="识别号：">
              <el-input
                size="normal"
                type="text"
                v-model="searchForm.docSequence"
                auto-complete="off"
                placeholder="识别号"
              ></el-input>
            </el-form-item>

            <el-form-item prop="username" label="文件标题：">
              <el-input
                size="normal"
                type="text"
                v-model="searchForm.docTitle"
                auto-complete="off"
                placeholder="标题"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="文号：">
              <el-input
                size="normal"
                type="text"
                @blur="likeDescComplete"
                v-model="searchForm.docDesc"
                auto-complete="off"
                placeholder="文号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="发文日期">
              <el-input
                size="normal"
                type="text"
                v-model="searchForm.docDate"
                auto-complete="off"
                placeholder="发文日期"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password" label="责任者">
              <el-input
                size="normal"
                type="text"
                v-model="searchForm.dutyAuthor"
                auto-complete="off"
                placeholder="责任者"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item prop="code">
                <el-input size="normal" type="text" v-model="loginForm.code" auto-complete="off"
                          placeholder="点击图片更换验证码" @keydown.enter.native="submitLogin" style="width: 250px"></el-input>
                <img :src="vcUrl" @click="updateVerifyCode" alt="" style="cursor: pointer">
      </el-form-item>-->
            <!-- <el-checkbox size="normal" class="loginRemember" v-model="checked"></el-checkbox> -->
            <!-- <div class="goRegister" @click="goRegister">尚未注册？前往注册</div> -->
            <div
              style="margin-left: 35%; float: left"
              class="topTextButtonBlue"
              @click="advSearch"
            >
              查找
            </div>
            <div
              style="position: absolute; left: 60%"
              class="topTextButtonBlue"
              @click="hideAdvSearch"
            >
              取消
            </div>
          </el-form>
        </div>

        <div
          style="
            z-index: 333;
            height: 3.5rem;
            position: fixed;
            top: 6rem;
            right: 0px;
            width: 27%;
            background-color: rgb(255, 255, 255);
          "
        >
          <div
            class="topTextButton"
            @click="ShowadvSearch"
            style="float: right; margin-top: 1rem"
          >
            高级搜索
          </div>
          <!-- <el-button
            icon="el-icon-tickets"
            style="border: none; margin-top: 1rem;margin-right:1rem;
            float:right;"
            @click="ShowadvSearch"
            >高级搜索</el-button
          > -->
          <div
            class="topTextButton"
            @click="cancelSearch"
            style="float: right; margin-top: 1rem"
          >
            取消
          </div>

          <!-- <el-button
            type="warning"
            icon="el-icon-error"
            style="border: none; margin-top: 1rem;margin-right:0.7rem; float:right"
            @click="cancelSearch"
            >取消</el-button
          > -->
          <div
            class="topTextButton"
            @click="searchTheDoc"
            style="float: right; margin-top: 1rem"
          >
            搜索
          </div>

          <!-- <input class="leftInput myInput" v-model="searchContent" @focus="clearSearchContent" @blur="putInContent">  -->

          <!-- 搜索         <el-button
            type="primary"
            icon="el-icon-search"
            style="
            float:right;
              background-color: rgb(134, 151, 197);
              border: none;
              margin-left:0.7rem;
              margin-top: 1rem;
             
            "
            @click="searchTheDoc"
            >搜索</el-button
          >
  -->
          <el-input
            class="leftInput"
            v-model="searchContent"
            @focus="clearSearchContent"
            @blur="putInContent"
          ></el-input>
        </div>
        <!-- fix遮挡div以及单位名称 -->

        <div
          style="
            height: 9rem;
            width: 100%;
            position: fixed;
            background-color: rgb(255, 255, 255);
            top: 3rem;
          "
        >
          <div
            style="
              position: absolute;
              bottom: 6rem;
              left: 50%;
              width: 50%;
              margin-left: -25%;
              text-align: center;
            "
          >
            单位名：{{ authName }}
          </div>
        </div>
        <!-- 顶部按钮 ↓ -->
        <div
          style="
            position: fixed;
            left: 0.5rem;
            top: 6.5rem;
            z-index: 5;
            font-size: 1.1rem;
          "
        >
          <div
            style="
              margin-top: 0.4rem;
              float: left;

              text-align: center;
            "
            class="hoverStyle"
            @click="backToOrgans"
          >
            选项：
          </div>

          <div
            style="
              float: left;
              background-color: rgb(155, 120, 153);

              width: 5rem;
              text-align: center;
              margin-left: 1rem;
            "
            class="hoverStyle topTextButton"
            @click="goDocIn"
          >
            录入界面
          </div>

          <div
            style="
              float: left;
              background-color: rgb(128, 128, 183);

              text-align: center;
            "
            v-if="docType != 'personnel'"
            class="hoverStyle topTextButton"
            @click="sortThisBatch"
          >
            排件号盒号
          </div>
          <div
            style="
         float:left
         width:5rem
         text-align:center
         margin-left:1rem
          "
            v-if="docType == 'personnel'"
            class="hoverStyle topTextButton"
            @click="sortThisBatchRS"
          >
            排件号
          </div>
          <!-- <div
          style="
            position: absolute;
            left: 11rem;
            top: -2.5rem;
            font-size: 1.1rem;
          "
          v-if="docType == 'personnel'"
          class="hoverStyle topTextButton"
          @click="sortThisBatchRS"
        >
          查看本单位
        </div> -->

          <div
            style="
              float: left;
              background-color: rgb(128, 160, 153);

              width: 5rem;
              text-align: center;
              margin-left: 1rem;
            "
            class="hoverStyle topTextButton"
            @click="getExcel"
          >
            下载表格
          </div>
          <div
            style="
         float:left
         width:5rem
         text-align:center
          "
            class="topTextButton hoverStyle"
            @click="backToOrgans"
          >
            其他批次
          </div>
          <div
            style="
              float: left;
              background-color: rgb(122, 122, 122);

              width: 5rem;
              text-align: center;
              margin-left: 1rem;
            "
            v-if="docType != 'personnel'"
            class="hoverStyle topTextButton"
            @click="myBoxNum"
          >
            {{ myBoxNumSwitch ? "保存盒号" : "手动盒号" }}
          </div>

          <div
            style="
              float: left;
              background-color: rgb(188, 130, 153);

              width: 5rem;
              text-align: center;

              margin-left: 1rem !important;
            "
            class="hoverStyle topTextButton"
            @click="lockThisBatch"
            v-if="!isEnd"
          >
            锁定本批
          </div>

          <div
            style="
         float:left;
         background-color: rgb(128, 155, 153);
         
         width:5rem;
         text-align:center
         margin-left:1rem !important
         
          "
            class="hoverStyle topTextButton"
            @click="unLockThisBatch"
            v-if="isEnd"
          >
            解除锁定
          </div>

          <div
            style="         float:left
         width:5rem;
         
         text-align:center;
         margin-left:1rem;

         "
            class="topTextButton"
            @click="showKWMClick"
          >
            设置规则
          </div>
          <div
            style="
              float: left;
              background-color: rgb(22, 44, 100);

              width: 5rem;
              text-align: center;
              margin-left: 1rem;
            "
            class="topTextButton"
            @click="PrintSocket"
          >
            批量打印
          </div>

          <div
            style="         float:left
         width:5rem;
         text-align:center;
         margin-left:1rem;

         "
            class="topTextButton"
            @click="genBoxInfo"
          >
            备考表
          </div>

          <div style="clear: both"></div>
          <div style="margin-top: 0.4rem">
            <div style="float: left">筛选：</div>

            <!-- niandu -->
            <div
              style="
                float: left;
                width: 7rem;
                text-align: center;
                position: relative;
              "
              v-if="docType != 'personnel'"
              v-on:mouseover="showFilterSortYear()"
              @mouseleave="hideFilterSortYear"
            >
              <div
                style="
                  width: 0.7rem;
                  height: 0.7rem;
                  position: absolute;
                  right: 1rem;
                "
                v-if="!filterSortYearFlag && docType != 'personnel'"
              >
                <span id="user_top"></span>
              </div>
              <div
                style="
                  width: 0.7rem;
                  height: 0.7rem;
                  position: absolute;
                  right: 1rem;
                "
                v-if="filterSortYearFlag"
              >
                <span id="user_topd"></span>
              </div>

              <el-checkbox
                class=""
                style="position: relative; right: 1rem; top: 0rem"
                v-if="true"
                false-label="false"
                true-label="true"
                @change="sortYearCheckChange"
                v-model="sortYearCheck"
                >{{ yearReq }}
              </el-checkbox>

              <div
                class="filterStyle"
                v-on:mouseover="showFilterSortYear()"
                @mouseleave="hideFilterSortYear"
                v-if="filterSortYearFlag"
              >
                <div
                  v-for="(item, index) in this.yearFilter"
                  :key="index"
                  @click="filterFromRequests1(item)"
                  class="filterItemStyle"
                >
                  {{ item }}
                </div>
              </div>
            </div>
            <!-- niandu -->
            <!-- wenti -->
            <div
              style="
                float: left;
                width: 12rem;
                text-align: center;
                position: relative;
              "
              v-if="docType != 'personnel'"
              v-on:mouseover="showFilterDocAbout()"
              @mouseleave="hideFilterDocAbout"
            >
              <div
                style="
                  width: 0.7rem;
                  height: 0.7rem;
                  position: absolute;
                  right: 1rem;
                "
                v-if="!filterDocAboutFlag && docType != 'personnel'"
              >
                <span id="user_top"></span>
              </div>
              <div
                style="
                  width: 0.7rem;
                  height: 0.7rem;
                  position: absolute;
                  right: 1rem;
                "
                v-if="filterDocAboutFlag"
              >
                <span id="user_topd"></span>
              </div>

              <el-checkbox
                class=""
                style="position: relative; right: 1rem; top: 0rem"
                v-if="true"
                false-label="false"
                true-label="true"
                @change="dabCheckChange"
                v-model="dabCheck"
                >{{ docAboutReq }}
              </el-checkbox>

              <div
                class="filterStyle"
                style="width: 12rem"
                v-on:mouseover="showFilterDocAbout()"
                @mouseleave="hideFilterDocAbout"
                v-if="filterDocAboutFlag"
              >
                <div
                  v-for="(item, index) in this.docAboutFilter"
                  :key="index"
                  @click="filterFromRequests2(item)"
                  class="filterItemStyle"
                >
                  {{ item }}
                </div>
              </div>
            </div>

            <!-- qixian -->
            <div
              style="
                float: left;
                width: 7rem;
                text-align: center;
                position: relative;
              "
              v-if="docType != 'personnel'"
              v-on:mouseover="showFilterDeadline()"
              @mouseleave="hideFilterDeadline"
            >
              <el-checkbox
                class=""
                style="position: relative; right: 1rem; top: 0rem"
                v-if="true"
                false-label="false"
                true-label="true"
                @change="ddlCheckChange"
                v-model="ddlCheck"
                >{{ deadlineReq }}</el-checkbox
              >

              <div style="width: 0.7rem; height: 0.7rem; positon: relative">
                <span id="user_top" v-if="!filterDeadlineFlag"></span>
                <span id="user_topd" v-if="filterDeadlineFlag"></span>
              </div>

              <div
                class="filterStyle"
                v-on:mouseover="showFilterDeadline()"
                @mouseleave="hideFilterDeadline"
                v-if="filterDeadlineFlag"
              >
                <div
                  v-for="(item, index) in this.deadlineFilter"
                  :key="index"
                  @click="filterFromRequests3(item)"
                  class="filterItemStyle"
                >
                  {{ item }}
                </div>
              </div>
            </div>

            <!-- xingming -->

            <div
              style="
                float: left;
                width: 7rem;
                text-align: center;
                position: relative;
              "
              v-if="docType == 'personnel'"
              v-on:mouseover="showFilterName()"
              @mouseleave="hideFilterName"
            >
              姓名
              <div style="width: 0.7rem; height: 0.7rem; positon: relative">
                <span id="user_top" v-if="!filterNameFlag"></span>
                <span id="user_topd" v-if="filterNameFlag"></span>
              </div>

              <div
                class="filterStyle"
                v-on:mouseover="showFilterName()"
                @mouseleave="hideFilterDeadline"
                v-if="filterNameFlag"
              >
                <div
                  v-for="(item, index) in this.nameFilter"
                  :key="index"
                  @click="filterThisRequest('name', item)"
                  class="filterItemStyle"
                >
                  {{ item }}
                </div>
              </div>
            </div>

            <div
              style="
                float: left;
                width: 10rem;
                text-align: center;
                position: relative;
                cursor: pointer;
              "
              @click="showAllDocs"
            >
              取消筛选
            </div>

            <div
              style="
                float: left;
                width: 8rem;
                text-align: center;
                position: relative;
                cursor: pointer;
              "
              @click="showDeleted"
            >
              {{ deletedShowSwitch == 1 ? "已删文件" : "返回列表" }}
            </div>

            <div
              style="
                float: left;
                width: 8rem;
                text-align: center;
                position: relative;
              "
              v-if="deletedShowSwitch"
            >
              {{ $store.state.alreadyDocs.length }}份
            </div>
          </div>
        </div>
        <!-- <div
          style="
            position: fixed;
            width: 16rem;
            top: 5.5rem;
            font-size: 1.4rem;
            margin-left: -8rem;
            left: 50%;
          "
        >
          本批所有已录入文档
        </div> -->
        <!-- 文档列表↓ -->
        <div v-if="!showKWM">
          <div
            style="height: 4.5rem; width: 100%"
            v-if="docType != 'personnel'"
          ></div>

          <div
            style="height: 2.5rem; width: 100%"
            v-if="docType == 'personnel'"
          ></div>

          <div v-if="docType != 'science' && docType != 'personnel'" style="">
            <div class="detailItem detailItemTitle" style="height: 2rem">
              <div class="itemInfo" style="width: 3%">识别号</div>
              <div class="itemInfo" style="width: 6%">
                {{ docType == "officialJ" ? "机构" : "问题" }}
              </div>
              <div class="itemInfo" style="width: 4%">
                {{ docType == "officialJ" ? "机构词" : "问题词" }}
              </div>

              <div class="itemInfo" style="width: 10%">档号</div>
              <div class="itemInfo" style="width: 10%">文号</div>
              <div class="itemInfo" style="width: 12%">责任者</div>
              <div class="itemInfo" style="font-size: 0.6rem; width: 12%">
                题名
              </div>
              <div class="itemInfo" style="width: 4%">成文时间</div>
              <div class="itemInfo" style="width: 4%">密级</div>
              <div class="itemInfo" style="font-size: 0.6rem; width: 6%">
                备注
              </div>
              <div class="itemInfo" style="width: 2%">页数</div>
              <div class="itemInfo" style="width: 2%">计</div>

              <div class="itemInfo" style="width: 4%">件号</div>
              <div class="itemInfo" style="width: 4%">盒号</div>

              <div style="clear: both"></div>

              <!-- <div style="clear:both"></div> -->
            </div>

            <div
              class="detailItem infoItemHighlight"
              v-for="(item, index) in this.$store.state.alreadyDocs.filter(
                (obj) => obj.deleted != deletedShowSwitch
              )"
              :key="index"
            >
              <div class="itemInfo" style="width: 3%">
                {{ item.docSequence }}
              </div>
              <div class="itemInfo" style="width: 6%">{{ item.docAbout }}</div>
              <div class="itemInfo" style="width: 4%">{{ item.keyword }}</div>

              <div class="itemInfo" style="font-size: 0.6rem; width: 10%">
                {{ authCode + "-" + item.docTypeCode + "·"
                }}{{ item.sortYear | formatSortYear }}-{{
                  item.deadline | deadlineFormat
                }}-{{ item.docAbout + "-" }}{{ item.docNum | formatFourNum }}
              </div>
              <!-- 档号 -->
              <!-- <div class="itemInfo">{{item.docDescAuthor+'['}}{{item.sortYear|formatSortYear}}{{']'+(item.docNum?item.docNum:'暂无')+"号"}}</div> -->
              <div class="itemInfo" style="font-size: 0.6rem; width: 10%">
                {{ item.docDesc ? item.docDesc : "&nbsp;" }}
              </div>

              <div class="itemInfo" style="width: 12%">
                {{ item.dutyAuthor }}
              </div>
              <div class="itemInfo" style="font-size: 0.6rem; width: 12%">
                {{ item.docTitle }}
              </div>
              <div class="itemInfo" style="width: 4%">{{ item.docDate }}</div>
              <div class="itemInfo" style="width: 4%">
                {{
                  item.docSecret == "无" || !item.docSecret
                    ? "&nbsp;"
                    : item.docSecret
                }}
              </div>
              <div class="itemInfo" style="font-size: 0.6rem; width: 6%">
                {{ item.remark ? item.remark : "&nbsp;" }}
              </div>
              <div class="itemInfo" style="width: 2%">{{ item.docPage }}</div>
              <div
                class="itemInfo"
                style="width: 2%"
                v-bind:class="[
                  { itemInfo: true },
                  { endStyle: item.docSequence == endInfo.docSequence },
                ]"
              >
                {{ item.pageTotal | pageTotalformat }}
              </div>

              <div class="itemInfo" style="width: 4%">
                {{ item.docNum ? item.docNum : "暂无" }}
              </div>
              <div
                v-bind:class="[
                  { itemInfo: true },
                  { startStyle: item.docSequence == startInfo.docSequence },
                  { endStyle: item.docSequence == endInfo.docSequence },
                ]"
                style="width: 4%"
                @mouseleave="boxLeave(item)"
                @mouseenter="boxOver(item)"
                @click="boxClick(item)"
              >
                {{ item.boxSeq ? item.boxSeq : "暂无" }}
              </div>
              <div class="itemInfo" style="width: 7%">
                <div v-if="item.deleted == 0">
                  <div
                    style="float:left;margin-left=1rem"
                    class="optionDiv"
                    @click="fixThisItem(item)"
                  >
                    修改
                  </div>
                  <div
                    style="float: left"
                    class="optionDiv"
                    @click="deleteThisItem(item)"
                  >
                    删除
                  </div>
                  <div
                    v-if="item.printed != 1"
                    style="float: left"
                    class="optionDiv"
                    @click="printOne(item)"
                  >
                    印章
                  </div>
                </div>

                <div
                  v-if="item.deleted == 1"
                  style="float:left;margin-left=1rem;cursor:arrow;color:red"
                  class="optionDiv"
                >
                  已作废
                </div>

                <div
                  v-if="item.printed == 1"
                  style="float: left; color: #c00"
                  class="optionDiv"
                  @click="printOne(item)"
                >
                  已印
                </div>
              </div>
              <div style="clear: both"></div>
              <!-- <div style="clear:both"></div> -->
            </div>
          </div>

          <div v-if="docType == 'personnel'">
            <div style="height: 2rem; width: 3rem"></div>
            <div class="detailTopLine">
              <div class="itemInfo" style="width: 3%">识别号</div>

              <div class="itemInfo">姓名</div>
              <div class="itemInfo" style="width: 10%">材料类型</div>
              <div class="itemInfo" style="width: 10%">子材料类型</div>
              <div class="itemInfo" style="width: 15%">标题</div>
              <div class="itemInfo">日期</div>
              <div class="itemInfo" style="width: 4%">页数</div>

              <div class="itemInfo" style="width: 4%">材料序号</div>

              <div class="itemInfo" style="width: 10%">备注</div>
              <div class="itemInfo">操作</div>

              <div class="itemInfo" style="width: 14%">&nbsp;</div>
              <div style="clear: both"></div>

              <!-- <div class="itemInfo">操作</div> -->
              <!-- <div class="itemInfo">操作</div> -->
              <!-- <div style=""></div> -->
            </div>

            <div
              class="detailItemRS infoItemHighlight"
              v-for="(item, index) in this.$store.state.alreadyDocs"
              :key="index"
            >
              <div class="itemInfo" style="width: 3%">
                {{ item.docSequence }}
              </div>

              <div class="itemInfo">{{ item.personName }}</div>
              <div class="itemInfo" style="width: 10%">{{ item.docAbout }}</div>
              <div class="itemInfo" style="width: 10%">
                {{ item.docAboutSub }}
              </div>
              <div class="itemInfo" style="width: 15%">{{ item.docTitle }}</div>
              <div class="itemInfo">{{ item.docDate }}</div>
              <div class="itemInfo" style="width: 4%">{{ item.docPage }}</div>

              <div class="itemInfo" style="width: 4%">
                {{ item.docNum ? item.docNum : "暂无" }}
              </div>

              <div class="itemInfo" style="width: 10%">{{ item.remark }}</div>
              <div class="itemInfo">&nbsp;</div>

              <div class="itemInfo" style="width: 14%">&nbsp;</div>
              <div style="clear: both"></div>
            </div>

            <!-- <div style="border-top: 0.02rem"></div> -->
          </div>

          <div v-if="docType == 'science'">
            <div class="detailItem detailItemTitle">
              <div class="itemInfo2" style="width: 3%">识别号</div>

              <div class="itemInfo2" style="width: 6%">关键词</div>
              <div class="itemInfo2" style="width: 4%">项目</div>
              <div class="itemInfo2" style="width: 10%">档号</div>
              <div class="itemInfo2" style="width: 4%">全宗号</div>
              <div class="itemInfo2" style="width: 4%">目录号</div>
              <div class="itemInfo2" style="width: 10%">责任者</div>
              <div class="itemInfo2" style="font-size: 0.6rem; width: 10%">
                题名
              </div>
              <div class="itemInfo2" style="width: 4%">成文时间</div>
              <div class="itemInfo2" style="width: 4%">期限</div>
              <div class="itemInfo2" style="width: 3%">密级</div>

              <div class="itemInfo2" style="font-size: 0.6rem; width: 8%">
                备注
              </div>
              <div class="itemInfo2" style="width: 3%">页数</div>

              <div class="itemInfo2" style="width: 3%">计</div>

              <div class="itemInfo2" style="width: 3%">案卷号</div>
              <div class="itemInfo2" style="width: 3%">顺序号</div>

              <div style="clear: both"></div>

              <!-- <div style="clear:both"></div> -->
            </div>

            <div
              class="detailItem infoItemHighlight"
              v-for="(item, index) in this.$store.state.alreadyDocs"
              :key="index"
            >
              <div class="itemInfo2" style="width: 3%">
                {{ item.docSequence }}
              </div>
              <div class="itemInfo2" style="width: 6%">{{ item.keyword }}</div>
              <div class="itemInfo2" style="width: 4%">{{ item.docAbout }}</div>

              <div class="itemInfo2" style="width: 10%">
                {{ authCode + "-" + item.docTypeCode + "-"
                }}{{ item.boxSeq | formatFiveKJ }}-{{
                  item.docNum | formatThreeKJ
                }}
              </div>
              <!-- 档号 -->
              <!-- <div class="itemInfo2">{{item.docDescAuthor+'['}}{{item.sortYear|formatSortYear}}{{']'+(item.docNum?item.docNum:'暂无')+"号"}}</div> -->

              <!-- 全宗号 -->
              <div class="itemInfo2" style="width: 4%">{{ authCode }}</div>
              <!-- 目录号 -->
              <div class="itemInfo2" style="width: 4%">
                {{ item.docTypeCode ? item.docTypeCode : "&nbsp;" }}
              </div>

              <div class="itemInfo2" style="width: 10%">
                {{ item.dutyAuthor }}
              </div>
              <div class="itemInfo2" style="font-size: 0.6rem; width: 10%">
                {{ item.docTitle }}
              </div>
              <div class="itemInfo2" style="width: 4%">{{ item.docDate }}</div>
              <div class="itemInfo2" style="width: 4%">{{ item.deadline }}</div>

              <div class="itemInfo2" style="width: 3%">
                {{ item.docSecret == "无" ? "&nbsp;" : item.docSecret }}
              </div>
              <div class="itemInfo2" style="font-size: 0.6rem; width: 8%">
                {{ item.remark ? item.remark : "&nbsp;" }}
              </div>
              <div class="itemInfo2" style="width: 3%">{{ item.docPage }}</div>

              <div class="itemInfo2" style="width: 3%">
                {{ item.pageTotal | pageTotalformat }}
              </div>
              <div class="itemInfo2" style="width: 3%">
                {{ item.boxSeq ? item.boxSeq : "暂无" }}
              </div>

              <div class="itemInfo2" style="width: 3%">
                {{ item.docNum ? item.docNum : "暂无" }}
              </div>
              <div class="itemInfo2" style="width: 7%">
                <div
                  style="float:left;margin-left=1rem"
                  class="optionDiv"
                  @click="fixThisItem(item)"
                >
                  修改
                </div>
                <div
                  style="float: left"
                  class="optionDiv"
                  @click="deleteThisItem(item)"
                >
                  删除
                </div>
                <div
                  style="float: left"
                  class="optionDiv"
                  @click="printBtn(item)"
                >
                  印章
                </div>
              </div>
              <div style="clear: both"></div>
              <!-- <div style="clear:both"></div> -->
            </div>
          </div>

          <div style="boder-top: solid 0.2rem"></div>
        </div>
      </div>
      <div style="height: 2rem"></div>
    </div>
  </div>
</template>

<script>
import Utils from "../../utils/printUtil.js";
import KeyWordManage from "./KeyWordManage";
import axios from "axios";
import VueSocketIO from "vue-socket.io";

import HidePrint from "./print";
// 由 arr.filter 产生的部分符合条件的alreadydocs 和  rawdocs是指向的同一个数组？ 修改 a也修改了r

export default {
  components: {
    HidePrint: HidePrint,
    KeyWordManage: KeyWordManage,
  },
  watch: {
    printSeqAtJS: {
      handler(v, o) {
        for (var i in this.$store.state.rawDocs) {
          if (this.$store.state.rawDocs[i].docSequence == v) {
            var d = this.$store.state.rawDocs[i];
            this.printInfo = d.docTitle;
            this.printInfo1 = d.docDesc;
          }
        }
      },
    },
    // getDocInShow:{
    //          handler(val, oldVal) {
    //            //console.log(val)
    //            if(val==false){
    //           setTimeout(() => {
    //                              //console.log(this.$store.state.docDetialBar)
    //   window.scrollTo(0,this.$store.state.docDetialBar)
    //           }, 0);
    //            }
    //            if(val==true){
    //              window.scrollTo(0,0)
    //            }
    //    }
    // }
  },
  computed: {
    // isEnd(){
    //   if(this.$store.state.isEnd==1) return true
    //   else return false
    // },
    printSeqAtJS() {
      return this.printSeqAt;
    },
    docType() {
      return sessionStorage.getItem("docType");
    },
    authCode() {
      return sessionStorage.getItem("authCode") || "";
    },
    authName() {
      return sessionStorage.getItem("authName") || "";
    },
    getDocInShow() {
      return this.$store.state.showDocIn;
    },
    // getDocDetailBar(){
    //   return this.$store.state.docDetialBar
    // },
  },
  data() {
    return {
      //备考表相关变量
      publisher: "",
      checker: "",
      publishTime: "",
      checkTime: "",

      boxInfoShowFlag: false,
      boxInfoList: [],
      boxInfoNow: {},
      boxInfoTableNumList: [],


      isEnd:false,
      //备考表相关变量
      //print相关
      firstTimePrint: 1, //第一次发送打印信号，会超时

      printIndex: 1,
      printedList: [],
      printedString: "",
      maxSeq: 1,
      lastPrint: -1,
      printType: "识别号",
      connectTip: "未连接",
      printInfo: "",
      printInfo1: "",
      processShow: false,
      printSeqAt: 0,
      printArr: [],
      connectStatus: false,
      helpShow: false,
      printerIp: "",
      SelectedPrintOrder: "",
      printOrders: ["按识别号小到大正序", "按识别号大到小逆序", "按件号顺序"],

      socketUtil: "",
      PrintControllshow: false,

      showKWM: false,

      /**手动排盒号使用变量 */
      boxNumMap: {},
      startBoxNum: 0,
      showStartBoxSet: false,
      startStyleCtrl: false,
      myBoxNumSwitch: false,
      boxSeqTemp: "",
      boxSeqText: "开始",
      startSeq: "",
      endSeq: "",
      startInfo: {
        docSequence: 0,
        boxSeq: 0,
      }, //存“开始”标签的信息

      endInfo: {
        docSequence: 0,
        boxSeq: 0,
      }, //存“结束”标签的信息

      deletedShowSwitch: 1,
      showDocIn: false,
      destoryFlag: true,
      initTime: "",
      printDoc: false,

      deadlineReq: "期限",
      yearReq: "年度",
      docAboutReq: "机构",
      showCenterPrint: false,
      showPrint: false,
      reSend: true, //打印页面发过来文档，然后再从本页面printBtn(文档)，
      //改变setSessionStorage的一些值，但是这个变量false就不打开新的页面了，为了重用里面的一些设置值的代码

      onceFlag: false, //只执行一次的改变批次锁定状态 printBtn

      alreadyDocsRestore: [],
      filterDocAboutFlag: false,
      filterDeadlineFlag: false,
      filterSortYearFlag: false,
      filterNameFlag: false,

      sortYearCheck: false,
      dabCheck: false,
      ddlCheck: false,

      nameFilter: [],
      yearFilter: [],
      docAboutFilter: [],
      deadlineFilter: [],
      advSearchShow: false,
      searchContent: "输入识别号",
      searchForm: {
        authId: sessionStorage.getItem("authId"),
        batchId: sessionStorage.getItem("batchId"),
        docSequence: "",
        docTitle: "",
        docDesc: "",
        docDate: "",
        dutyAuthor: "",
        docType: "",
        personName: "",
      },
      RsDocs: [
        //所有的人
        [
          //第一个人
          [
            //16个list的第一个
            {
              id: "1",
              docSequence: "123qwe", //序列号，标识文件
              docType: "personnel",
              docTitle: "材料1巴拉巴拉", //标题
              docAbout: "履历材料",
              docAboutSub: "无",
              keyword: "关键字", //关键字
              // docDesc: "", //文号
              // sortYear: "2019",
              docDate: "20180808",
              docTypeCode: "RS",

              docSecret: "", //文件密级
              docPage: "23",
              remark: "", //备注
              docNumber: "1", //件号
              personName: "陈海林",
              docDescNum: "0", //文号中的序号
            },
            {
              id: "2",
              docSequence: "321qwe", //序列号，标识文件
              docType: "personnel",
              docTitle: "材料1巴拉巴拉2", //标题
              docAbout: "履历材料",
              docAboutSub: "无",
              keyword: "关键字2", //关键字
              // docDesc: "", //文号
              // sortYear: "2019",
              docDate: "20180808",
              docTypeCode: "RS",

              docSecret: "", //文件密级
              docPage: "23",
              remark: "", //备注
              docNumber: "2", //件号
              personName: "陈海林",
              docDescNum: "0", //文号中的序号
            },
          ], //16个list
          [
            //材料2
            {
              id: "1",
              docSequence: "12aswe", //序列号，标识文件
              docType: "personnel",
              docTitle: "材料2巴拉巴拉", //标题
              docAbout: "自传材料",
              docAboutSub: "无",
              keyword: "关键字1", //关键字
              // docDesc: "", //文号
              // sortYear: "2019",
              docDate: "20180808",
              docTypeCode: "RS",

              docSecret: "", //文件密级
              docPage: "23",
              remark: "", //备注
              docNumber: "1", //件号
              personName: "陈海林",
              docDescNum: "0", //文号中的序号
            },
            {
              id: "2",
              docSequence: "32asde", //序列号，标识文件
              docType: "personnel",
              docTitle: "材料2巴拉巴拉2", //标题
              docAbout: "自传材料",
              docAboutSub: "无",
              keyword: "关键字2", //关键字
              // docDesc: "", //文号
              // sortYear: "2019",
              docDate: "20180808",
              docTypeCode: "RS",

              docSecret: "", //文件密级
              docPage: "23",
              remark: "", //备注
              docNumber: "2", //件号
              personName: "陈海林",
              docDescNum: "0", //文号中的序号
            },
          ],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
        ],
        [
          //人B
          [], //16个list
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
          [],
        ],
      ],

      //   authCode:'2',
      // searchForm.docSequence: "输入识别号",
      showWaitingFlag: false,
      tempOrganName: "name",
      tempOrganCode: 123,
    };
  },
  methods: {
    saveInfo() {
      var infoObj = {};
      for (var i in this.boxInfoList) {
        this.boxInfoList[i].publisher = this.publisher;
        this.boxInfoList[i].checker = this.checker;
        this.boxInfoList[i].publishTime = this.publishTime;
        this.boxInfoList[i].checkTime = this.checkTime;
        this.boxInfoList[i].authName = sessionStorage.getItem("authName");
      }
      infoObj.infos = JSON.stringify(this.boxInfoList);

      this.putRequest(
        "/work/box-infos/" + sessionStorage.getItem("batchId"),
        JSON.stringify(infoObj)
      ).then((resp) => {
        //console.log(resp)
        if (resp.code == 0) {
          console.log(resp);
          this.$message({
            type: "success",
            message: "保存成功",
          });
        }
      });
    },
    getOneInfo() {
      if (
        this.boxInfoNow.id == null ||
        this.boxInfoNow.tableNumber.length == 0
      ) {
        this.$message({
          type: "warning",
          message: "请选择",
        });
        return;
      }
      //       this.getRequest("/work/downloadOne/"+this.boxInfoNow.id+"/"+sessionStorage.getItem("batchId")).then((resp) => {
      //   console.log(resp)

      // })

      axios({
        method: "get",
        url:
          this.baseurl +
          "/work/downloadOne/" +
          this.boxInfoNow.id +
          "/" +
          sessionStorage.getItem("batchId"),
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          authId: sessionStorage.getItem("authId"),
          token: window.localStorage.getItem("token")
            ? window.localStorage.getItem("token").split('"')[1] ||
              window.localStorage.getItem("token")
            : null,
        },
      }).then((res) => {
        // //console.log("DASDASDASDASD")

        //console.log(res);
        const blob = new Blob([res]); //new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）

        const fileName = this.boxInfoNow.tableNumber + ".doc"; //这里可以自定义名称，发现设置xlsx文件类型下载后打开会提示下面图-1的无效报错,所以我用了xls格式

        const elink = document.createElement("a");

        elink.download = fileName;

        elink.style.display = "none";

        elink.href = URL.createObjectURL(blob);

        document.body.appendChild(elink);

        elink.click();

        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
        this.showWaitingFlag = false;
      });
    },
    getAllInfo() {
      this.showWaitingFlag = true;
      axios({
        method: "get",
        url:
          this.baseurl +
          "/work/downloadAll/" +
          sessionStorage.getItem("batchId"),
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          authId: sessionStorage.getItem("authId"),
          token: window.localStorage.getItem("token")
            ? window.localStorage.getItem("token").split('"')[1] ||
              window.localStorage.getItem("token")
            : null,
        },
      })
        .then((res) => {
          // //console.log("DASDASDASDASD")

          //console.log(res);
          const blob = new Blob([res]); //new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）

          const fileName = sessionStorage.getItem("authName") + ".zip"; //这里可以自定义名称，发现设置xlsx文件类型下载后打开会提示下面图-1的无效报错,所以我用了xls格式

          const elink = document.createElement("a");

          elink.download = fileName;

          elink.style.display = "none";

          elink.href = URL.createObjectURL(blob);

          document.body.appendChild(elink);

          elink.click();

          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
          this.showWaitingFlag = false;
        })
        .then((r) => {
          this.showWaitingFlag = false;
        });
    },
    boxInfoBlur(e) {
      var inputBoxTableNum = e.target.value;
      console.log(inputBoxTableNum);
    },
    boxInfoSelectDone(e) {
      console.log(e);
      this.boxInfoNow = e;
      // for(var i in this.boxInfoList){
      //   if(this.boxInfoList[i].tableNumber==e){
      //     this.boxInfoNow
      //   }
      // }
    },
    genBoxInfo() {
      if (!this.$store.state.isEnd) {
        this.$confirm(
          "请确定盒号件号不再修改,锁定本批次后再操作备考表",
          "提示",
          {
            confirmButtonText: "好的",
            type: "warning",
          }
        );
      }
      if (this.$store.state.isEnd) {
        this.boxInfoShowFlag = true;

        this.getRequest(
          "/work/box-infos?id=" + sessionStorage.getItem("batchId")
        ).then((resp) => {
          console.log(resp);
          this.boxInfoList = resp.data;
          if (this.boxInfoList.length == 0) {
            this.$message({
              type: "warning",
              message: "请先排件号盒号并锁定本批",
            });
            return;
          }

          this.publishTime = this.boxInfoList[0].publishTime;
          this.publisher = this.boxInfoList[0].publisher;
          this.checkTime = this.boxInfoList[0].checkTime;
          this.checker = this.boxInfoList[0].checker;
          this.boxInfoTableNumList = [];
        });
        //   var infoObj={}
        //   infoObj.a="b"
        //         this.postRequest(
        //   //注意防止重复提交
        //   "/work/box-infos/"+sessionStorage.getItem("batchId"),
        //   JSON.stringify(infoObj)
        // ).then((resp) => {
        //   console.log(resp)
        // })
      }
    },
    printThis1() {
      // var arr=this.printArr[this.printSeqAt]
      // this.connectStatus=true
      //     axios({
      //       method: "post",
      //       url: "http://localhost:8999/api/send",
      //       data: {
      //         message:
      //           "000B|0000|100|/mnt/sdcard/MSG/" + 1 + "/|0|0000|0|0000|0D0A",
      //       },
      //       timeout: 6000,
      //     })
      //       .then((resstart) => {
      //                 this.$message({
      //   type: "warning",
      //   message: JSON.stringify(resstart),
      // });
      // return;
      //       })
      //       return

      if (!this.connectStatus) {
        this.$message({
          type: "warning",
          message: "请先连接打印机",
        });
        return;
      }

      var arr = [];
      var docs = this.$store.state.rawDocs;
      var docOne;
      console.log(docs.length);

      for (var k in docs) {
        if (docs[k].docSequence == this.printSeqAt) {
          console.log(docs[k]);
          if (docs[k].deleted == 1) {
            this.$message({
              type: "warning",
              message: "该份已删除",
            });
            return;
          }
          docOne = docs[k];
          if (docOne.printed != 1) {
            docs[k].printed = 1;
            this.printedList.push(docs[k].id);
            var str = "";
            for (var i in this.printedList) {
              str = str + this.printedList[i] + ",";
            }
            if (str.charAt(str.length - 1) == ",") {
              str = str.substring(0, str.length - 1);
            }
            ///setPrint/{type}/{id}
            console.log(str);
            this.postRequest(
              "/work/printedList/" + sessionStorage.getItem("batchId"),
              str
            ).then((resp) => {
              //console.log(resp)
              if (resp.code == 0) {
              }
            });
          }
          break;
        }
      }
      if (!docOne) {
        this.$message({
          type: "warning",
          message: "该份不存在或已删除",
        });
        return;
      }

      var pjson = {};
      pjson.code = sessionStorage.getItem("authCode") + "";
      pjson.year = docOne.sortYear + "";

      pjson.about = docOne.docAbout + "";
      pjson.page = docOne.docPage + "" + "";
      pjson.num = docOne.docNum + "" + "";
      if (this.isNumber(docOne.deadline)) {
        pjson.deadline = docOne.deadline + "年";
      } else {
        pjson.deadline = docOne.deadline;
      }

      var p = {};
      p.params = pjson;
      axios({
        method: "post",
        url: "http://localhost:8999/api/writeBmp",
        data: {
          params: JSON.stringify(pjson),
        },
        timeout: 6000,
      }).then((r) => {
        console.log(r);

        axios({
          method: "post",
          url: "http://localhost:8999/api/send",
          data: {
            message: "000B|0000|500|0|0|0000|0|0000|0D0A",
          },
          timeout: 1000,
        })
          .then((res) => {
            console.log("stop signal-" + JSON.stringify(res));
            // this.$message({
            //   type: "success",
            //   message: JSON.stringify(res),
            // });
            function sleep1(ms, callback) {
              setTimeout(callback, ms);
            }
            //sleep 1s

            if (res.code == 0) {
              //好像stop信号不响应但是发过去了，再发start信号使其生效
              console.log("1s" + new Date().getSeconds());
              sleep1(1000, () => {
                console.log("1s 后" + new Date().getSeconds());

                axios({
                  method: "post",
                  url: "http://localhost:8999/api/send",
                  data: {
                    message:
                      "000B|0000|100|/mnt/sdcard/MSG/" +
                      1 +
                      "/|0|0000|0|0000|0D0A",
                  },
                  timeout: 6000,
                })
                  .then((resstart) => {
                    console.log(
                      JSON.stringify(
                        "开始打印返回的：" + JSON.stringify(resstart)
                      )
                    );
                    if (resstart.code == 0) {
                      this.$message({
                        type: "success",
                        message: "打印信号已发送",
                      })
                      console.log(this.firstTimePrint)

                        if (this.firstTimePrint == 1) {
                            this.firstTimePrint = 0;
                            console.log("diyici 连接而不上");  //应该只会走这里， 下面那个 从启动状态开始的不行的，手动启动 然后发信号停止会出问题
                            sleep1(4000, () => {
                              axios({
                                method: "post",
                                url: "http://localhost:8999/api/send",
                                data: {
                                  message:
                                    "000B|0000|100|/mnt/sdcard/MSG/" +
                                    1 +
                                    "/|0|0000|0|0000|0D0A",
                                },
                                timeout: 6000,
                              });
                            });
                          }


                    } else {
                                            
                          if (this.firstTimePrint == 1) {
                            this.firstTimePrint = 0;

                            console.log("diyici 连接而不上2222222");
                            console.log(resFirstTime);
                            sleep1(4400, () => {
                              axios({
                                method: "post",
                                url: "http://localhost:8999/api/send",
                                data: {
                                  message:
                                    "000B|0000|100|/mnt/sdcard/MSG/" +
                                    1 +
                                    "/|0|0000|0|0000|0D0A",
                                },
                                timeout: 6000,
                              });
                            });
                          }
              
                      this.$message({
                        type: "success",
                        message: "发送失败请检查机器，尝试重连",
                      });
                    }
                  })
                  .catch((err) => {
                    console.log("start err" + err);
                  });
              });
            } else { //停止状态会直接走这里
              // this.$message({
              //   type: "success",
              //   message: "不在打印中，直接启动打印",
              // });
                            console.log("1s 22" + new Date().getSeconds());
              sleep1(1000, () => {
                console.log("1s 后2" + new Date().getSeconds());
                
                              axios({
                method: "post",
                url: "http://localhost:8999/api/send",
                data: {
                  message:
                    "000B|0000|100|/mnt/sdcard/MSG/" +
                    1 +
                    "/|0|0000|0|0000|0D0A",
                },
                timeout: 6000,
              })
                .then((resstart) => {
                  console.log(
                    JSON.stringify(
                      "开始打印返回的2：" + JSON.stringify(resstart)
                    )
                  );
                  if (r.code == 0) {
                    this.$message({
                      type: "success",
                      message: "打印信号已发送",
                    });

                    
                        if (this.firstTimePrint == 1) {
                            this.firstTimePrint = 0;
                            console.log("diyici 连接而不上 2");
                            sleep1(4000, () => {
                              axios({
                                method: "post",
                                url: "http://localhost:8999/api/send",
                                data: {
                                  message:
                                    "000B|0000|100|/mnt/sdcard/MSG/" +
                                    1 +
                                    "/|0|0000|0|0000|0D0A",
                                },
                                timeout: 6000,
                              });
                            });
                          }

                  } else {
                  }
                })
                .catch((err) => {
                  console.log("start err" + err);
                  this.$message({
                    type: "warning",
                    message: "启动失败，请检查喷码机",
                  });
                });

                })


            }
          })
          .catch((err) => {
            console.log("stop err" + err);
            this.$message({
              type: "warning",
              message: "请在打印机操作界面检查打印机",
            });
          });
      });
    },
    printThis() {
      // var arr=this.printArr[this.printSeqAt]
      this.connectStatus = true;

      if (!this.connectStatus) {
        this.$message({
          type: "warning",
          message: "请先连接打印机",
        });
        return;
      }

      var arr = [];
      var docs = this.$store.state.rawDocs;
      var docOne;
      console.log(docs.length);

      for (var k in docs) {
        if (docs[k].docSequence == this.printSeqAt) {
          console.log(docs[k]);
          if (docs[k].deleted == 1) {
            this.$message({
              type: "warning",
              message: "该份已删除",
            });
            return;
          }
          docOne = docs[k];
          if (docOne.printed != 1) {
            docs[k].printed = 1;
            this.printedList.push(docs[k].id);
            var str = "";
            for (var i in this.printedList) {
              str = str + this.printedList[i] + ",";
            }
            if (str.charAt(str.length - 1) == ",") {
              str = str.substring(0, str.length - 1);
            }
            ///setPrint/{type}/{id}
            console.log(str);
            this.postRequest(
              "/work/printedList/" + sessionStorage.getItem("batchId"),
              str
            ).then((resp) => {
              //console.log(resp)
              if (resp.code == 0) {
              }
            });
          }
        }
      }

      arr.push(docOne);

      var step1 = false;
      var step2 = false;
      var that = this;
      const checkp = async function () {
        step1 = await that.sendFormat(arr);
        if (step1) {
          step2 = await that.sendQR(arr);
        }

        if (step1 && step2) {
          that.sendMessage();
        } else {
          that.connectStatus = false;
          this.firstTimePrint = 1;
          that.connectTip = "已断开";
          that.$message({
            type: "success",
            message: "发送出错，请尝试重新连接",
          });
        }
      };

      checkp();
    },

    sendMessage() {
      var td;
      for (var i in this.printArr) {
        if (this.printArr[i].docSequence == this.printSeqAt) {
          td = this.printArr[i].deadline;
          break;
        }
      }

      console.log("111111111?" + td);
      var n = 1;
      if (!this.isNumber(td)) {
        n = 11;
      } else if (td.length == 2) {
        n = 22;
      } else {
        n = 33;
      }

      axios({
        method: "post",
        url: "http://localhost:8999/api/send",
        data: {
          message: "000B|0000|500|0|0|0000|0|0000|0D0A",
        },
        timeout: 4000,
      })
        .then((r) => {
          console.log("stop signal" + JSON.stringify(r));
          this.$message({
            type: "success",
            message: "已停止打印机，并启动新的一组打印",
          });

          if (r) {
            //好像stop信号不响应但是发过去了，再发start信号使其生效
            axios({
              method: "post",
              url: "http://localhost:8999/api/send",
              data: {
                message:
                  "000B|0000|100|/mnt/sdcard/MSG/" + n + "/|0|0000|0|0000|0D0A",
              },
              timeout: 6000,
            })
              .then((r) => {
                console.log(JSON.stringify("开始打印返回的：" + r));
                if (r.code == 0) {
                  this.$message({
                    type: "success",
                    message: "打印信号已发送",
                  });
                } else {
                  if (this.firstTimePrint == 1) {
                    this.firstTimePrint = 0; //第一次发送会收不到 ? 也不是第一次发的问题
                    console.log("第一次发送会收不到");
                  } else {
                    //  this.connectStatus = false;
                    //  this.firstTimePrint=1
                    //   this.$message({
                    //     type: "warning",
                    //     message: "请在打印机操作界面检查打印机，并尝试重新连接",
                    //   });
                  }
                }
              })
              .catch((err) => {
                console.log("start err" + err);
              });
          } else {
            this.$message({
              type: "warning",
              message: "请在打印机操作界面检查打印机",
            });
          }
        })
        .catch((err) => {
          console.log("stop err" + err);
          this.$message({
            type: "warning",
            message: "请在打印机操作界面检查打印机",
          });
        });

      //         axios.post("http://localhost:8999/api/send", {
      //       // message:"000B|0000|100|/mnt/sdcard/MSG/"+n+"/|0|0000|0|0000|0D0A"
      //       message:"000B|0000|500|0|0|0000|0|0000|0D0A",
      //       timeout:1000,

      // }).then(r=>{
      //   console.log("start print")
      //   console.log(r)
      //                  axios.post("http://localhost:8999/api/send", {
      //       message:"000B|0000|100|/mnt/sdcard/MSG/"+n+"/|0|0000|0|0000|0D0A",
      //       // message:"000B|0000|500|0|0|0000|0|0000|0D0A"

      // }).then(r=>{
      //           this.$message({
      //             type: "success",
      //             message: "打印信号已发送"
      //           });
      // })
      // })
    },

    ipInput() {
      console.log(2);
      var cidrs = this.printerIp.split(".");
      if (cidrs.length == 4 && cidrs[cidrs.length - 1].length > 0) {
        for (var i in cidrs) {
          if (!this.isNumber(cidrs[i])) {
            this.$message({
              type: "warning",
              message: "地址格式错误",
            });

            return;
          }
        }
        console.log(this.printerIp);
        this.connectTip = "连接中";
        axios
          .get("http://localhost:8999/api/" + this.printerIp + "/3550", {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((r) => {
            if (r.code == 0) {
              this.$message({
                type: "success",
                message: "连接打印机成功",
              });
              this.firstTimePrint = 1;

              this.connectStatus = true;
            } else {
              this.connectTip = "未连接";
            }
          });
      } else {
        this.$message({
          type: "warning",
          message: "地址格式错误",
        });
      }
    },
    resetPrint() {
      //     axios({
      //       method: "post",
      //       url: "http://localhost:8999/api/send",
      //       data: {
      //         message:
      //           "000B|0000|100|/mnt/sdcard/MSG/" + 1 + "/|0|0000|0|0000|0D0A",
      //       },
      //       timeout: 6000,
      //     })
      //       .then((resstart) => {
      //                 this.$message({
      //   type: "warning",
      //   message: JSON.stringify(resstart),
      // });
      //       })
      //       return

      this.nowPrintSeq = "";
      // this.SelectedPrintOrder=""
      this.connectStatus = false;
      this.firstTimePrint = 1;
      this.cidrs = "";
      this.processShow = false;
    },
    startPrint() {
      // this.printOrderDone
      // for (var i in this.printArr){

      // }
      if (!this.connectStatus) {
        this.$message({
          type: "warning",
          message: "请先连接打印机",
        });
        return;
      }
      this.printSeqAt = 0;
      this.processShow = true;

      var cut = 0;
      // outer: for(var i in this.printArr){
      //   for(var j in this.printArr[i]){
      //     if(this.nowPrintSeq==this.printArr[i][j].docSequence){
      //       cut=i
      //       break outer;
      //     }
      //   }
      // }

      // this.printArr=this.printArr.slice(cut)

      // var arrt=this.printArr[this.printSeqAt]
      var tstring = "";
      console.log(this.printArr);
      // for(var i in arrt){
      //   tstring=tstring+arrt[i].docSequence
      // }
      // if(this.printType=="件号"){ //三处 可提炼一下
      // tstring=arrt.length==1?arrt[0].docNum:arrt[0].docNum+"~"+arrt[arrt.length-1].docNum

      // }else{
      // tstring=arrt.length==1?arrt[0].docSequence:arrt[0].docSequence+"~"+arrt[arrt.length-1].docSequence

      // }

      // this.printInfo=tstring+",共"+arrt.length+"件"

      // this.sendQR(this.printArr[0]);
    },

    nextPrint() {
      if (this.printSeqAt < this.maxSeq) {
        this.printSeqAt = parseInt(this.printSeqAt) + 1;
      }

      return;

      this.printSeqAt++;
      if (this.printSeqAt >= this.printArr.length) {
        this.$message({
          type: "success",
          message: "已全部打印",
        });

        return;
      }
      var arrt = this.printArr[this.printSeqAt];
      var tstring = "";

      if (this.printType == "件号") {
        tstring =
          arrt.length == 1
            ? arrt[0].docNum
            : arrt[0].docNum + "~" + arrt[arrt.length - 1].docNum;
      } else {
        tstring =
          arrt.length == 1
            ? arrt[0].docSequence
            : arrt[0].docSequence + "~" + arrt[arrt.length - 1].docSequence;
      }

      this.printInfo = tstring + ",共" + arrt.length + "件";
    },
    prePrint() {
      //  this.connectStatus=true

      if (this.printSeqAt > 0) {
        this.printSeqAt = parseInt(this.printSeqAt) - 1;
      }
      //this.nowPrintSeq=this.printArr[this.printSeqAt].docSequence

      return;

      if (this.printSeqAt > 0) {
        this.printSeqAt--;
      }
      if (this.printSeqAt >= this.printArr.length) {
        this.$message({
          type: "success",
          message: "已全部打印",
        });

        return;
      }
      var arrt = this.printArr[this.printSeqAt];
      var tstring = "";

      if (this.printType == "件号") {
        tstring =
          arrt.length == 1
            ? arrt[0].docNum
            : arrt[0].docNum + "~" + arrt[arrt.length - 1].docNum;
      } else {
        tstring =
          arrt.length == 1
            ? arrt[0].docSequence
            : arrt[0].docSequence + "~" + arrt[arrt.length - 1].docSequence;
      }

      this.printInfo = tstring + ",共" + arrt.length + "件";
    },

    printOrderBlur() {},
    //     printOrderDone(){
    // //   "按识别号小到大正序",
    //   // "按识别号大到小逆序",
    //   // "按件号顺序",

    //       if(this.SelectedPrintOrder=="按识别号小到大正序"){
    //       var Larry= this.sortL();
    //       // this.$store.state.alreadyDocs=Larry  //由 arr.filter 产生的部分符合条件的alreadydocs 和  rawdocs是指向的同一个数组？ 修改 a也修改了r
    //       this.printArr=this.spliceUtil(Larry)  //分组
    //       // this.printArr=Larry;

    //       // this.
    //       // this.$store.state.alreadyDocs=Larry
    //       }else if(this.SelectedPrintOrder=="按识别号大到小逆序"){
    //         var Rarray = this.sortR();
    //       this.printArr=this.spliceUtil(Rarray)
    //         this.printType="识别号"

    //       }else if(this.SelectedPrintOrder=="按件号顺序"){
    //         var ar=this.deepClone(this.$store.state.rawDocs)
    //         this.printArr=this.spliceUtil(ar)
    //         this.printType="件号"
    //       }
    //     },

    spliceUtil(arr) {
      //因为格式的打印切片
      var totalArr = [];
      for (var i in arr) {
        // if(isNumber(arr[i].deadline)){
        //   arr[i].deadline=arr[i].deadline+""
        // }
        totalArr.push(arr[i]);
      }
      //console.log(totalArr)
      var pos = 0;
      var posDoc;
      var lastDoc = totalArr[0];
      var formatArrays = [];
      var temArray = [];
      temArray.push(totalArr[0]);
      for (var j in totalArr) {
        if (j == 0) continue;
        posDoc = totalArr[j];
        lastDoc = totalArr[j - 1];
        if (
          (posDoc.docNum + "").length != (lastDoc.docNum + "").length ||
          posDoc.docAbout.length != lastDoc.docAbout.length ||
          this.isNumber(posDoc.deadline) != this.isNumber(lastDoc.deadline) ||
          (posDoc.deadline + "").length != (lastDoc.deadline + "").length ||
          // ||(posDoc.boxSeq+"").length!=(lastDoc.boxSeq+"").length
          (posDoc.docPage + "").length != (lastDoc.docPage + "").length
        ) {
          //console.log("前一个"+(posDoc.docNum+"").length+"原字符串是"+posDoc.docNum + "  后一个："+(lastDoc.docNum+"").length+"原字符串是"+lastDoc.docNum )
          formatArrays.push(temArray);
          temArray = [];
          temArray.push(totalArr[j]);
          if (j == totalArr.length - 1) formatArrays.push(temArray);
          continue;
        } else {
          temArray.push(totalArr[j]);
          if (j == totalArr.length - 1) formatArrays.push(temArray);
          continue;
        }

        // if(posDoc.)
      }
      //console.log(formatArrays)
      return formatArrays;
    },

    // 1,13533,1116,333,四个得得问题,100,222,年
    sendQR(arr) {
      var txtString = "";
      var tipString = "";
      for (var i in arr) {
        var order = parseInt(i + 1);
        order = order + ",";
        txtString =
          txtString +
          order +
          sessionStorage.getItem("authCode") +
          "," +
          arr[0].sortYear +
          "," +
          arr[i].docNum +
          "," +
          arr[i].docAbout +
          "," +
          arr[i].deadline +
          "," +
          arr[i].docPage +
          "," +
          "年" +
          "\n";
        if (i == arr.length - 1) {
          //最后一个数据多写一份
          var c = parseInt(i + 2);
          txtString =
            txtString +
            c +
            "," +
            sessionStorage.getItem("authCode") +
            "," +
            arr[i].sortYear +
            "," +
            arr[i].docNum +
            "," +
            arr[i].docAbout +
            "," +
            arr[i].deadline +
            "," +
            arr[i].docPage +
            "," +
            "年" +
            "\n";
        }
      }
      tipString +=
        arr[0].docSequence +
        "-" +
        sessionStorage.getItem("authCode") +
        "," +
        arr[0].sortYear +
        "," +
        arr[i].docNum +
        "," +
        arr[i].docAbout +
        "," +
        arr[i].deadline +
        "," +
        arr[i].docPage;

      var deadlineType = "1";
      if (!this.isNumber(arr[0].deadline)) {
        deadlineType = "1"; //长期永久
      } else if (arr[0].deadline.length == 2) {
        deadlineType = "2";
      } else {
        deadlineType = "3";
      }

      var p = {};
      p.txtString = txtString;
      var params = {};
      params.params = p;

      console.log(p);
      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "http://localhost:8999/api/writeData",
          data: {
            txtString: txtString,
            tip: deadlineType + "," + tipString,
          },
          timeout: 6000,
        }).then((r) => {
          if (r.code == 0) {
            resolve(true);
          } else {
            resolve(false);
          }
          console.log("write txtData");
          console.log(r);
        });
      });
    },

    connectPrinter(ip) {
      this.connectTip = "连接中";
      axios
        .get("http://localhost:8999/api/" + ip + "/3550", {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((r) => {
          console.log(r);
          if (r.code != 0) {
            this.connectTip = "未连接";
            // this.connectTip=""
          }
        });
    },

    sendFormat(arr) {
      // var docAboutNum=arr[0].docAbout.length //位数
      // var docNumNum=arr[0].docNum
      // var pageNum=arr[0].docPage
      console.log("send format：" + arr[0]);
      var deadlineType = "1";
      if (!this.isNumber(arr[0].deadline)) {
        deadlineType = "1";
      } else if (arr[0].deadline.length == 2) {
        deadlineType = "2";
      } else {
        deadlineType = "3";
      }

      var pjson = {};
      pjson.authCode = sessionStorage.getItem("authCode").length + "";
      pjson.docAbout = arr[0].docAbout.length + "";
      pjson.page = (arr[0].docPage + "").length + "";
      pjson.docNum = (arr[0].docNum + "").length + "";
      console.log("?????" + arr[0].docNum);
      pjson.deadline = deadlineType;

      var p = {};
      p.params = pjson;

      return new Promise((resolve, reject) => {
        axios({
          method: "post",
          url: "http://localhost:8999/api/writeFormat",
          data: {
            params: JSON.stringify(pjson),
          },
          timeout: 6000,
        }).then((r) => {
          console.log("write format");
          console.log(r);
          if (r && r.code == 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    },
    deepClone(initalObj) {
      var obj = {};

      obj = JSON.parse(JSON.stringify(initalObj));

      return obj;
    },
    sortR() {
      //大到小
      var rArray = [];
      rArray = this.deepClone(this.$store.state.rawDocs);
      function sortData(a, b) {
        return parseInt(b.docSequence) - parseInt(a.docSequence);
      }
      var t = [];
      for (var i in rArray) {
        t.push(rArray[i]);
      }
      //console.log(t)
      t.sort(sortData);
      for (var k in t) {
        if (t[k].deleted == 1) {
          t.splice(k, 1);
          k = k - 1;
        }
      }

      return t;
    },
    getPrints() {
      var r;
      r = this.deepClone(this.$store.state.rawDocs);
      var t = r;
      for (var k = 0; k < t.length; k++) {
        console.log(t[k].deleted);
        if (t[k].deleted != 0) {
          console.log(t[k]);
          t.splice(k, 1);
          k--; //数组减小了
        }
      }
      return t;
    },
    sortL() {
      //小到大
      var rArray = [];
      //       rArray = this.$store.state.rawDocs.filter(function (element, index, self) {  //复制？ no
      //   return true
      // });
      // rArray[0].docTitle="aaaaaaaaaa"

      rArray = this.deepClone(this.$store.state.rawDocs);
      // rArray[0].docTitle="aaaabbbaaaaaa"
      // rArray[1]={}
      //console.log(rArray)
      //console.log(this.$store.state.rawDocs)

      function sortData(a, b) {
        return parseInt(a.docSequence) - parseInt(b.docSequence);
      }
      var t = [];
      for (var i in rArray) {
        t.push(rArray[i]);
      }
      t.sort(sortData);
      console.log("arr len" + rArray.length);
      for (var k = 0; k < t.length; k++) {
        console.log(t[k].deleted);
        if (t[k].deleted != 0) {
          console.log(t[k]);
          t.splice(k, 1);
          k--; //数组减小了
        }
      }
      return t;
    },
    printOne(item) {
      this.printArr = this.getPrints();
      this.maxSeq = 1;
      for (var i in this.printArr) {
        if (this.maxSeq < parseInt(this.printArr[i].docSequence)) {
          this.maxSeq = parseInt(this.printArr[i].docSequence);
          this.printIndex = i;
        }
      }

      this.printSeqAt = item.docSequence;
      this.PrintControllshow = true;
    },

    PrintSocket() {
      this.printArr = this.getPrints();
      console.log(this.printArr);

      this.maxSeq = 1;
      for (var i in this.printArr) {
        if (this.maxSeq < parseInt(this.printArr[i].docSequence)) {
          this.maxSeq = parseInt(this.printArr[i].docSequence);
          this.printIndex = i;
        }
      }
      if (!this.printSeqAt) {
        this.printSeqAt = this.maxSeq;
      }
      //this.nowPrintSeq=th
      this.PrintControllshow = true;
    },

    enterToPrint() {
      //console.log("p")
    },
    showKWMClick() {
      this.showKWM = true;
      window.scrollTo(0, 0);
    },
    hideSubKWM() {
      this.showKWM = false;
    },
    boxOver(item) {
      if (!this.myBoxNumSwitch) return;
      if (this.startSeq) {
        if (item.docSequence == this.startSeq) return; //鼠标又移到“开始”上
        // if(this.endInfo.docSequence==item.docSequence) return //
        this.endInfo.docSequence = item.docSequence;
        this.endInfo.boxSeq = item.boxSeq;
        item.boxSeq = "结束";

        this.endSeq = item.docSequence;
        this.preComputeBox();
      }
      if (this.startSeq == "") {
        //没有点开始

        this.startInfo.docSequence = item.docSequence;
        this.startInfo.boxSeq = item.boxSeq;

        item.boxSeq = "开始";
        // // this.startStyleCtrl=true
        // for(var i in this.$store.alreadyDocs){ //把上一个还原
        //   if(this.$store.alreadyDocs[i].docSequence==this.startInfo.docSequence){
        //     this.$store.alreadyDocs[i].docSequence.boxSeq=this.startInfo.boxSeq
        //   }
        // }
        // //存新的
      }
    },
    boxLeave(item) {
      if (this.startSeq == item.docSequence) {
        return;
      }
      // if(this.endSeq==item.docSequence) return
      if (this.startInfo.docSequence == item.docSequence) {
        item.boxSeq = this.startInfo.boxSeq; //还原开始候选者的信息
      }

      if (this.endInfo.docSequence == item.docSequence) {
        item.boxSeq = this.endInfo.boxSeq;
      }
    },
    boxClick(item) {
      //点击事件
      if (this.myBoxNumSwitch) {
        //点了手动排盒号后才起作用
        // this.boxSeqText="结束"
        if (this.startSeq == "") {
          //还没指定开始的文档
          this.startSeq = item.docSequence;
          return;
        }
        //指定了开始的文档，该指定结束的文档
        this.endSeq = item.docSequence;

        var ddl1;
        var ddl2;
        var index1;
        var index2;
        for (var i in this.$store.state.alreadyDocs) {
          if (this.$store.state.alreadyDocs[i].docSequence == this.startSeq) {
            ddl1 = this.$store.state.alreadyDocs[i].deadline;
            index1 = i;
          }
          if (this.$store.state.alreadyDocs[i].docSequence == this.endSeq) {
            ddl2 = this.$store.state.alreadyDocs[i].deadline;
            index2 = i;
          }
        }
        if (ddl2 != ddl1) {
          this.endSeq = "";
          this.$message({
            type: "warning",
            message: "不是同一盒型",
          });
          return;
        }
        if (index1 > index2) {
          this.endSeq = "";
          this.$message({
            type: "warning",
            message: "操作错误",
          });
          return;
        }
        if (this.startSeq && this.endSeq) {
          // alert("kaishi:"+this.startSeq+"..jieshu:"+this.endSeq)
          // this.preComputeBox()
          //点击后清除  hover不清除
          // var tindex;
          // for(var i in this.$store.state.alreadyDocs){
          //   if(this.endSeq==this.$store.state.alreadyDocs[i].docSequence){
          //     tindex=i
          //     break
          //   }
          // }

          this.showStartBoxSet = true;

          this.$message({
            type: "success",
            message: "修改完成后请点击“保存盒号”",
          });
        }
      }
    },

    manualBox() {
      this.showStartBoxSet = false;
      var start = -1; //下标
      var end = -1;
      var thisBoxTypeLastIndex = -1; //手动操作影响的盒形范围
      var docs = this.$store.state.alreadyDocs;
      for (var i = 0; i < docs.length; i++) {
        if (docs[i].docSequence == this.startSeq) {
          start = i;
        }
        if (docs[i].docSequence == this.endSeq) {
          end = i;
        }
      }
      console.log(docs.length);
      for (var i = end; i < docs.length; i++) {
        if (docs[i].deadline != docs[end].deadline) {
          thisBoxTypeLastIndex = i - 1;
          break;
        }
      }

      if (thisBoxTypeLastIndex == -1) {
        thisBoxTypeLastIndex = docs.length - 1;
      }

      var j = start;
      //33
      //5
      //5
      //5

      console.log(thisBoxTypeLastIndex);
      // var k = end+1;
      // var delta=parseInt(this.startBoxNum)+1-parseInt(docs[k].boxSeq)
      // for(;k<=thisBoxTypeLastIndex;k++){
      //   docs[k].boxSeq=parseInt(docs[k].boxSeq)+delta
      // }

      if (start >= 0) {
        for (; j <= end; j++) {
          docs[j].boxSeq = this.startBoxNum;
        }
      }

      if (end < thisBoxTypeLastIndex) {
        docs[end + 1].boxSeq = parseInt(this.startBoxNum) + 1;
        docs[end + 1].pageTotal = parseInt(docs[end + 1].docPage);
      }
      var delta1 = 1;
      var boxSum = docs[end + 1].pageTotal;

      for (var k = end + 2; k <= thisBoxTypeLastIndex; k++) {
        var beforeSum = boxSum;
        var tempSum = boxSum + parseInt(docs[k].docPage);
        var reBox = false;
        var pageNow = parseInt(docs[k].docPage);
        if (tempSum > 180 || pageNow > 180) {
          reBox = true;
        }

        if (
          docs[k].docAbout != docs[k - 1].docAbout ||
          docs[k].docSecret != docs[k].docSecret ||
          reBox
        ) {
          delta1++;
          boxSum = parseInt(docs[k].docPage);
          docs[k].boxSeq = parseInt(this.startBoxNum) + delta1;
          docs[k].pageTotal = parseInt(docs[k].docPage);
        } else {
          docs[k].boxSeq = parseInt(this.startBoxNum) + delta1;
          boxSum += parseInt(docs[k].docPage);
          docs[k].pageTotal = boxSum;
        }
      }

      j = start;
      for (; j <= thisBoxTypeLastIndex; j++) {
        this.boxNumMap[docs[j].id] = docs[j].boxSeq + "-" + docs[j].pageTotal;
      }

      this.startSeq = "";
      this.endSeq = "";
      this.startInfo = {};
      this.endInfo = {};
      //console.log(this.boxNumMap)
    },
    cancleManulBox() {
      this.showStartBoxSet = false;
      this.startSeq = "";
      this.endSeq = "";
    },

    preComputeBox() {
      //鼠标悬停预览计数

      var start = -1; //下标
      var end = -1;
      var docs = this.$store.state.alreadyDocs;
      for (var i = 0; i < docs.length; i++) {
        if (docs[i].docSequence == this.startSeq) {
          start = i;
        }
        if (docs[i].docSequence == this.endSeq) {
          end = i;
        }
      }

      if (start >= 0) {
        var pageCount = docs[start].docPage;
        //console.log(pageCount)
        docs[start].pageTotal = pageCount;
        var j = start + 1;
        for (; j <= end; j++) {
          pageCount = pageCount + docs[j].docPage;
          docs[j].pageTotal = pageCount;
          //console.log(pageCount)
        }
      }
      //console.log(docs)
    },
    myBoxNum() {
      var req = { boxes: this.boxNumMap };
      if (this.myBoxNumSwitch) {
        //点击保存

        this.postRequest(
          "/work/boxSet/" + sessionStorage.getItem("batchId"),
          JSON.stringify(this.boxNumMap)
        ).then((resp) => {
          //console.log(resp)
          if (resp.code == 0) {
            this.$message({
              type: "success",
              message: "保存成功，若重新排件号将覆盖已保存盒号",
            });
          }
        });
        this.myBoxNumSwitch = false;
        return;
      }
      if (!this.myBoxNumSwitch) {
        //点击手动排盒号
        this.myBoxNumSwitch = true;
      }
    },
    showDeleted() {
      //       this.$store.state.alreadyDocs[0].docSequence=999
      // //console.log(this.$store.state.alreadyDocs)
      // //console.log(this.$store.state.rawDocs)
      // return
      this.deletedShowSwitch = !this.deletedShowSwitch;
      if (this.deletedShowSwitch == 0) {
        this.showWaitingFlag = true;
        var path =
          "/document/page/" +
          sessionStorage.getItem("docType") +
          "/" +
          sessionStorage.getItem("batchId") +
          "?pageNow=0&pageSize=100000"; //

        axios
          .get(this.baseurl + path, {
            headers: {
              "Content-Type": "application/json",
              authId: sessionStorage.getItem("authId"),
              token: localStorage.getItem("token")
                ? localStorage.getItem("token").split('"')[1] ||
                  localStorage.getItem("token")
                : null,
            },
          })
          .then((resp) => {
            if (resp) {
              this.$store.state.sequenceDocs = resp.data.content;
              this.showWaitingFlag = false;
              // }
              this.$store.state.alreadyDocs = this.$store.state.sequenceDocs;
            }
          });

        //console.log("全部的文件按照序列号，开关处于已删除文件")
      } else {
        // this.$store.state.alreadyDocs=this.$store.state.rawDocs
        this.showAllDocs();
        // this.$store.state.alreadyDocs=this.alreadyDocsRestore
      }
    },
    lockThisBatch() {
      this.putRequest(
        "/work/" + sessionStorage.getItem("batchId") + "/1/end"
      ).then((resp) => {
        //console.log(resp)
        if (resp.code == 0) {
          this.$store.state.isEnd = true;
          this.isEnd=true;
          console.log("end=1")
          window.sessionStorage.setItem("isEnd", 1);
        }
      });
    },

    unLockThisBatch() {
      this.putRequest(
        "/work/" + sessionStorage.getItem("batchId") + "/0/end"
      ).then((resp) => {
        //console.log(resp)
        if (resp.code == 0) {
          this.$store.state.isEnd = false;
          this.isEnd=false;
          window.sessionStorage.setItem("isEnd", 0);
        }
      });
    },
    sortYearCheckChange() {
      // alert(this.sortYearCheck)
      // if(!this.sortYearCheck){}
      this.filterFromRequests();
    },
    dabCheckChange() {
      this.filterFromRequests();
    },
    ddlCheckChange() {
      this.filterFromRequests();
    },

    hideCenterPrintBtn() {
      // this.alreadyDocsRestore=this.$store.state.alreadyDocs
      this.showCenterPrint = false;
    },
    showCenterPrintBtn() {},
    likeDescComplete() {
      var a = this.searchForm.docDesc.replace(/【/g, "[");

      var b = a.replace(/】/g, "]");

      this.searchForm.docDesc = b;
    },

    showFilterName() {
      this.filterNameFlag = true;
    },
    hideFilterName() {
      this.filterNameFlag = false;
    },
    showFilterSortYear() {
      this.filterSortYearFlag = true;
    },
    hideFilterSortYear() {
      this.filterSortYearFlag = false;
    },

    showAllDocs() {
      window.scrollTo(0, 0);
      this.ddlCheck = false;
      this.dabCheck = false;
      this.sortYearCheck = false;
      if (this.deletedShowSwitch != 1) {
        return;
      }

      this.$store.state.alreadyDocs = this.$store.state.rawDocs; //this.$store.state.rawDocs存的是所有的
      //
    },

    filterFromRequests1(item) {
      this.yearReq = item;
      this.filterFromRequests();
    },
    filterFromRequests2(item) {
      this.docAboutReq = item;
      //console.log(item);
      //console.log(this.docAboutReq);

      this.filterFromRequests();
    },
    filterFromRequests3(item) {
      this.deadlineReq = item;
      this.filterFromRequests();
    },
    filterFromRequests() {
      window.scrollTo(0, 0);
      //console.log(this.alreadyDocsRestore)
      // alert(item)
      this.alreadyDocsRestore = this.$store.state.rawDocs;
      if (this.alreadyDocsRestore.length > 0) {
        //console.log("把显示的列表设为储存的数据alreadyDocsRestore")
        this.$store.state.alreadyDocs = this.$store.state.rawDocs;
      }

      var tempDocs = this.alreadyDocsRestore;
      var newDocs;
      //  newDocs= tempDocs.filter(i=> {
      //    //console.log(i.str)
      //  })
      var that = this;
      if (this.dabCheck) {
        //console.log(this.dabCheck);
        //console.log(typeof this.dabCheck); //string!!!!  checkbox居然是string!!!
      }

      if (
        this.docAboutReq != "机构" &&
        (this.dabCheck || this.dabCheck == "true") &&
        this.dabCheck != "false"
      ) {
        //console.log("筛选勾选了的条件")
        tempDocs = tempDocs.filter(function (element, index, self) {
          return element.docAbout == that.docAboutReq;
        });
      }
      //console.log(this.docAboutReq);
      //console.log(tempDocs);
      if (
        this.yearReq != "年度" &&
        (this.sortYearCheck ||
          (this.sortYearCheck == "true" && this.sortYearCheck != "false"))
      ) {
        tempDocs = tempDocs.filter(function (element, index, self) {
          return element.sortYear == that.yearReq;
        });
      }
      if (
        this.deadlineReq != "期限" &&
        (this.ddlCheck || this.ddlCheck == "true") &&
        this.ddlCheck != "false"
      ) {
        tempDocs = tempDocs.filter(function (element, index, self) {
          //filter这个相当于切片  新的一组引用
          return element.deadline == that.deadlineReq;
        });
      }
      this.alreadyDocsRestore = tempDocs;
      //console.log("筛选后的docs")

      //console.log(tempDocs);
      //console.log("vux存的docs")
      //console.log(this.$store.state.rawDocs);

      this.$store.state.alreadyDocs = tempDocs;
    },
    filterThisRequest(str, item) {
      //姓名
      window.scrollTo(0, 0);

      // alert(item)
      if (this.alreadyDocsRestore.length > 0) {
        this.$store.state.alreadyDocs = this.alreadyDocsRestore;
      }

      var tempDocs = this.$store.state.alreadyDocs;
      var newDocs;

      if (str == "docAbout") {
        this.docAboutReq = item;
        newDocs = tempDocs.filter(function (element, index, self) {
          return element.docAbout == item;
        });
      } else if (str == "deadline") {
        this.deadlineReq = item;
        newDocs = tempDocs.filter(function (element, index, self) {
          return element.deadline == item;
        });
      } else if (str == "year") {
        this.yearReq = item;
        newDocs = tempDocs.filter(function (element, index, self) {
          return element.sortYear == item;
        });
      } else if (str == "name") {
        // var one=tempDocs[item-1]
        // var arr=[]
        // arr.push(one)
        // newDocs=arr
        newDocs = tempDocs.filter(function (element, index, self) {
          return element.personName == item;
        });
      }

      //console.log(newDocs);
      // this.alreadyDocsRestore=tempDocs
      this.$store.state.alreadyDocs = newDocs;
    },
    hideFilterDocAbout() {
      this.filterDocAboutFlag = false;
    },
    showFilterDocAbout() {
      this.filterDocAboutFlag = true;
    },
    showFilterDeadline() {
      this.filterDeadlineFlag = true;
    },
    hideFilterDeadline() {
      this.filterDeadlineFlag = false;
    },

    isNumber(value) {
      if (isNaN(value)) {
        return false;
      } else {
        return true;
      }
    },

    filterAlreadyDocs() {
      //
      //获取批次中已经排好的数组时、获取时、排序时、排完件号盒号后需要调用
      //获取sortYear筛选条件
      // //console.log(this.$store.state.alreadyDocs)
      // this.alreadyDocsRestore = this.$store.state.alreadyDocs;

      if (sessionStorage.getItem("docType") == "personnel") {
        var name = [];
        //console.log(this.$store.state.alreadyDocs);

        for (var i in this.$store.state.alreadyDocs) {
          if (name.indexOf(this.$store.state.alreadyDocs[i].personName) < 0) {
            name.push(this.$store.state.alreadyDocs[i].personName);
          }
        }

        this.nameFilter = name;
        //console.log(name);
        return;
      }

      var year = [];
      var docAboutF = [];

      for (var i in this.$store.state.rawDocs) {
        // if (docAboutF.indexOf(this.$store.state.alreadyDocs[i].docAbout) < 0) {
        //   docAboutF.push(this.$store.state.alreadyDocs[i].docAbout);
        // }
        if (year.indexOf(this.$store.state.rawDocs[i].sortYear) < 0) {
          year.push(this.$store.state.rawDocs[i].sortYear);
        }
      }
      this.yearFilter = year;
      // this.docAboutFilter = docAboutF;
    },
    nullJson(data) {
      var arr = Object.keys(data);
      return arr.length == 0; //true
    },
    getDocAboutFilter() {
      var docAboutWeightId;
      var organ = this.$store.state.organ; //刷新就没有了
      if (!organ.id) {
        organ = JSON.parse(sessionStorage.getItem("organ"));
      }
      //console.log(organ)
      // organ=JSON.parse(organ)

      if (sessionStorage.getItem("docType") == "official") {
        docAboutWeightId = organ.docIssueWig;
      }
      if (sessionStorage.getItem("docType") == "science") {
        docAboutWeightId = organ.tecProjectWig;
      }

      if (sessionStorage.getItem("docType") == "business") {
        docAboutWeightId = organ.busProjectWig;
      }
      if (sessionStorage.getItem("docType") == "officialJ") {
        docAboutWeightId = organ.docIssuejWig;
      }

      this.docAboutFilter = [];
      this.getRequest("/weight/" + docAboutWeightId).then((resp) => {
        for (var attr in resp.data.tables) {
          //console.log(resp.data.tables)
          this.docAboutFilter.push(attr);
        }
      });
    },
    preLoadDocs() {
      //this.$store.state.alreadyDocs是显示的文档
      //this.$store.state.rawDocs 是所有的文档，包括删除位为1的
      // this.alreadyDocsRestore 是暂存的文档，如筛选了部分文档后，存下来然后，搜索文档，然后取消搜索，返回显示为暂存的文档

      this.getDocAboutFilter();

      //console.log("preload");
      var f = false;
      if (this.$store.state.alreadyDocs.length == 0) {
        //批次页面进来时会将这个设为[],也就是每次查看
        //新的批次会走这里，返回查看的话不会,返回查看的时候还得跳转到上次记忆的滚动条位置

        this.getRequest(
          "/work/sorted/" + sessionStorage.getItem("batchId")
        ).then((resp) => {
          var item = resp.data;

          if (
            item.sorted != null &&
            !this.nullJson(item.sorted) &&
            this.$store.state.sortedFlag
          ) {
            //该批已经排好序
            console.log("sorted!!!!!!!!!!!!!!");
            console.log(item);
            // item.printedIds="4452,4341"
            if (item.printedIds != null) {
              this.printedList = item.printedIds.split(",");
            }
            // console.log(this.printedList);
            // if(this.printedList.length=)

            var sorted = JSON.parse(item.sorted.sorted);
            //console.log(sorted);
            this.$store.state.alreadyDocs = sorted;
            this.$store.state.rawDocs = sorted; //全部的，第一次加载时存下来
            this.alreadyDocsRestore = sorted;
            this.filterAlreadyDocs(); //已经排好
            console.log(this.$store.state.alreadyDocs);

            for (var i in this.$store.state.alreadyDocs) {
              //  console.log(this.$store.state.alreadyDocs[i].id)
              for (var j in this.printedList) {
                if (
                  this.printedList[j] == this.$store.state.alreadyDocs[i].id
                ) {
                  // console.log("same="+this.$store.state.alreadyDocs[i].id)
                  // console.log(i)
                  // console.log(this.$store.state.alreadyDocs[i])

                  this.$store.state.alreadyDocs[i]["printed"] = 1;
                }
              }
            }
          } else {
            //console.log("no sorted");
            this.loadDocs();
          }
        });
      } else {
        //后续回来的  this.alreadyDocsRestore 是筛选时需要的所有文档，如果没有这步，修改页面回来不会走上面的，就不会初始化
        this.alreadyDocsRestore = this.$store.state.rawDocs;
        setTimeout(() => {
          //console.log(this.$store.state.docDetialBar)
          window.scrollTo(0, this.$store.state.docDetialBar);
        }, 50);
        this.filterAlreadyDocs();
      }

      //设置期限筛选条件 需要获取批次信息
      {
        this.getRequest("/work/" + sessionStorage.getItem("batchId")).then(
          (resp) => {
            var item = resp.data;
            //console.log(item)
            var lastb = item.lastBox;
            this.deadlineFilter = [];
            this.$store.state.isEnd = resp.data.end; //是否录入结束 还可以修改
            if (resp.data.end != 1) {
              this.isEnd=false
              this.$store.state.isEnd = false;
            }else{
              this.isEnd=true
              this.$store.state.isEnd = true;
            }
            //console.log(this.$store.state.isEnd);
            window.sessionStorage.setItem("isEnd", this.$store.state.isEnd);
            for (var deadline in lastb) {
              this.deadlineFilter.push(deadline);
            }
          }
        );
      }
      // .then(() => {
      //   this.store;
      // });
    },
    loadDocs() {
      //console.log("load");

      this.showWaitingFlag = true;
      // return
      var path =
        "/document/page/" +
        sessionStorage.getItem("docType") +
        "/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=100000"; //

      axios
        .get(this.baseurl + path, {
          headers: {
            "Content-Type": "application/json",
            authId: sessionStorage.getItem("authId"),
            token: localStorage.getItem("token")
              ? localStorage.getItem("token").split('"')[1] ||
                localStorage.getItem("token")
              : null,
          },
        })
        .then((resp) => {
          if (resp) {
            this.$store.state.alreadyDocs = resp.data.content;
            this.$store.state.rawDocs = resp.data.content;
            this.alreadyDocsRestore = resp.data.content;

            //console.log(resp.data.content);

            this.showWaitingFlag = false;
          }
        })
        .then(() => {
          this.filterAlreadyDocs(); //load获取时
        });

      // if(this.docType!='personnel'){
      //   //console.log('把暂无调到前面')

      //       for(var i in this.$store.state.alreadyDocs){
      //         //console.log(this.$store.state.alreadyDocs[i])
      //         if(!this.$store.state.alreadyDocs[i].docNum){
      //         //console.log(i)

      //           tmparr.push(this.$store.state.alreadyDocs[i])
      //           this.$store.state.alreadyDocs.splice(i,1)
      //         }
      //     }
      //     for(var k in tmparr){
      //       this.$store.state.alreadyDocs.unshift(tmparr[i])
      //     }
      // }
    },

    putInContent() {
      return;
      this.searchContent = "输入识别号";
    },
    clearSearchContent() {
      this.searchContent = "";
    },
    cancelSearch() {
      // this.getRequest("/work/box-infos?id="+sessionStorage.getItem("batchId")).then((resp) => {
      //   console.log(resp)
      // })
      //   var infoObj={}
      //   infoObj.a="b"
      //         this.postRequest(
      //   //注意防止重复提交
      //   "/work/box-infos/"+sessionStorage.getItem("batchId"),
      //   JSON.stringify(infoObj)
      // ).then((resp) => {
      //   console.log(resp)
      // })

      if (true) {
        this.searchContent = "输入识别号";
        if (this.alreadyDocsRestore.length > 0) {
          this.$store.state.alreadyDocs = this.alreadyDocsRestore; //还原搜索前的列表，不一定是所有的即vuex里面的alreadydocsrestore
        } else {
          this.preLoadDocs();
        }
      }
    },
    goSetRule() {
      // this.$router.push('/work/modifyOragan')
      // if(this.docType=='')
      // this.$store.state.whichRuleSet=
      // this.$store.state.whichRuleSet=sessionStorage.getItem('auth')
      this.$store.state.backToDetailFlag = true;
      this.$router.push("/work/keyWM");
    },

    hideAdvSearch() {
      this.advSearchShow = false;
      if (this.alreadyDocsRestore.length > 0) {
        this.$store.state.alreadyDocs = this.alreadyDocsRestore;
      } else {
        this.preLoadDocs();
      }
    },
    hideAdvSearchNoReload() {
      this.advSearchShow = false;
    },
    ShowadvSearch() {
      this.advSearchShow = true;
    },
    advSearch() {
      this.showWaitingFlag = true;
      var searchPath =
        "/document/list/like/" +
        sessionStorage.getItem("docType") +
        "?pageNow=0&pageSize=900000";
      // var docObj1 = {
      //   // userId:JSON.stringify(sessionStorage.getItem("userId")),
      //   // userId: sessionStorage.getItem('userId'),
      //   docSequence: this.searchForm.docSequence,
      //   docType: sessionStorage.getItem("docType"),
      // };
      this.searchForm.docType = sessionStorage.getItem("docType");
      var docObj = this.searchForm;
      for (var key in docObj) {
        if (docObj[key] == "") {
          delete docObj[key];
        }
      }
      // this.searchForm.pageTotal=-12

      this.postRequest(
        //注意防止重复提交
        searchPath,
        JSON.stringify(docObj)
      ).then((resp) => {
        // //console.log(resp);
        this.showWaitingFlag = false;
        this.alreadyDocsRestore = this.$store.state.alreadyDocs; //保存搜索前的列表
        this.$store.state.alreadyDocs = resp.data.content;

        // if(sessionStorage.getItem('docType')=='personnel'){
        //   // alert(2)
        //   var arr1=this.$store.state.alreadyDocs
        //   var arr2=[]
        //   arr2.push(arr1)
        //   var arr3=[]
        //   arr3.push(arr2)
        //   this.$store.state.alreadyDocs=arr3
        //   // //console.log('aaa')
        //   //console.log(arr3)
        // }
      });
    },

    searchTheDoc() {
      window.scrollTo(0, 0);
      this.showWaitingFlag = true;
      var searchPath =
        "/document/list/page/" +
        sessionStorage.getItem("docType") +
        "?pageNow=0&pageSize=900000";
      var docObj = {
        // userId:JSON.stringify(sessionStorage.getItem("userId")),
        // userId: sessionStorage.getItem('userId'),
        docSequence: this.searchContent,
        docType: sessionStorage.getItem("docType"),
        authId: sessionStorage.getItem("authId"),
        batchId: sessionStorage.getItem("batchId"),
      };
      this.postRequest(
        //注意防止重复提交
        searchPath,
        JSON.stringify(docObj)
      ).then((resp) => {
        // //console.log(resp);
        this.showWaitingFlag = false;
        this.alreadyDocsRestore = this.$store.state.alreadyDocs; //gai1
        // this.alreadyDocsRestore[1].docSequence=888
        this.$store.state.alreadyDocs = resp.data.content;

        // if(sessionStorage.getItem('docType')=='personnel'){
        //   // alert(2)
        //   var arr1=this.$store.state.alreadyDocs
        //   var arr2=[]
        //   arr2.push(arr1)
        //   var arr3=[]
        //   arr3.push(arr2)
        //   this.$store.state.alreadyDocs=arr3
        //   // //console.log('aaa')
        //   //console.log(arr3)
        // }
      });
    },
    sortThisBatchRS1() {
      window.scrollTo(0, 0);
      //console.log("查看批次item");

      //console.log(item); //打印单位

      axios
        .get(this.baseurl + "/work/list", {
          headers: {
            "Content-Type": "application/json",
            authId: sessionStorage.getItem("authId"),
            token: localStorage.getItem("token")
              ? localStorage.getItem("token").split('"')[1] ||
                localStorage.getItem("token")
              : null,
          },
        })
        //成功返回
        .then((response) => {
          if (response.code == 0) {
            this.organsShow = false;
            this.batches = response.data;
            this.batches.reverse();
          }
        })
        //失败返回
        .catch((error) => {
          //console.log(error);
        });
    },
    sortThisBatchRS() {
      // let vm = this;
      var path =
        "/document/" +
        sessionStorage.getItem("docType") +
        "/sort/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=90000";
      this.$confirm(
        "将对本批人事信息排序，本批工作是否已经完成录入，并且所有关键词都已经设置优先级",
        "提示",
        {
          cancelButtonClass: "btn-custom-cancel",
          cancelButtonText: "设置优先级",
          confirmButtonText: "是",

          type: "warning",
        }
      ).then(() => {
        this.$store.state.sortedFlag = true;

        this.showWaitingFlag = true;
        this.$store.state.isEnd = 1;
        this.getRequest(path).then((resp) => {
          //console.log("排件号盒号人事");
          //console.log(resp);
          // //console.log(JSON.stringify(resp))
          if (resp.code == 0) {
            // //console.log("ss000000000aaaa")
            this.showWaitingFlag = false;
            var ttt = resp.data;
            this.$store.state.alreadyDocs = [];
            for (var i in ttt) {
              for (var j in ttt[i]) {
                for (var k in ttt[i][j]) {
                  this.$store.state.alreadyDocs.push(ttt[i][j][k]);
                }
              }
            }
            this.filterAlreadyDocs(); //排序人事时

            // for(var arr in resp.data){
            //     for(var item in arr){
            //         this.$store.state.alreadyDocs.push(item)
            //     }
            // }
            // for (var i = 0; i < resp.data.length; i++) {
            //   for (var j = 0; j < resp.data[i].length; j++) {
            //     for(var k=0;k<resp.data[i][j].length;k++){
            //       this.$store.state.alreadyDocs.push(resp[i][j][k])
            //     }
            //     //
            //   }
            // }
          }
        });
      });
    },
    sortThisBatch() {
      this.showAllDocs(); //取消勾选
      // let vm = this;
      var path =
        "/document/" +
        sessionStorage.getItem("docType") +
        "/sort/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=90000";
      this.$confirm(
        "将重新生成件号盒号，本批工作是否已经完成录入，并且所有关键词责任者等都已经设置优先级",
        "提示",
        {
          cancelButtonClass: "btn-custom-cancel",
          cancelButtonText: "设置优先级",
          confirmButtonText: "是",

          type: "warning",
        }
      ).then(() => {
        this.showWaitingFlag = true;
        this.$store.state.sortedFlag = true;

        this.getRequest(path).then((resp) => {
          //console.log("排件号盒号");
          //console.log(resp);
          // //console.log(JSON.stringify(resp))
          if (resp.code == 0) {
            this.showWaitingFlag = false;
            this.$store.state.alreadyDocs = [];
            // for(var arr in resp.data){
            //     for(var item in arr){
            //         this.$store.state.alreadyDocs.push(item)
            //     }
            // }
            for (var i = 0; i < resp.data.length; i++) {
              for (var j = 0; j < resp.data[i].length; j++) {
                this.$store.state.alreadyDocs.push(resp.data[i][j]);
                //
              }
            }

            this.$store.state.rawDocs = this.$store.state.alreadyDocs;
            this.filterAlreadyDocs(); // 排完件号盒号之后更新筛选条件，使得筛选条件后仍按件号从小到大
          }
        });
      });
    },
    goDocIn() {
      if (this.$store.state.isEnd) {
        this.$confirm("该批档案已经锁定，不允许添加文件", "提示", {
          cancelButtonClass: "btn-custom-cancel",

          confirmButtonText: "是",

          type: "warning",
        }).then(() => {
          return
        });
        return
      }
      this.showDocIn = true;
      this.$store.state.docDetialBar = 0;
      this.$router.push("/work/docInput");

      // this.$store.state.showDocIn=true
    },
    reloadTable() {
      var path =
        "/document/page/" +
        sessionStorage.getItem("docType") +
        "/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=1000";
      axios
        .get(this.baseurl + path, {
          headers: {
            "Content-Type": "application/json",
            authId: sessionStorage.getItem("checkAuthId"),
            token: window.localStorage.getItem("token")
              ? window.localStorage.getItem("token").split('"')[1] ||
                window.localStorage.getItem("token")
              : null,
          },
        })
        .then((resp) => {
          //console.log(resp);

          this.$store.state.alreadyDocs = resp.data.content;
          // this.$router.push('/work/docInputD')
        });
    },

    backToOrgans() {
      this.$store.state.organIdForJump = sessionStorage.getItem("authId");
      this.$router.push("/work/modifyOrgan");
    },
    focusOnThis(e) {},

    getExcel() {
      this.$confirm("下载前请确保已排序", "提示", {
        cancelButtonClass: "btn-custom-cancel",
        cancelButtonText: "否",
        confirmButtonText: "是",

        type: "warning",
      }).then(() => {
        //  var path ='/excel'
        var path =
          "/document/excel/" +
          sessionStorage.getItem("docType") +
          "/" +
          sessionStorage.getItem("batchId");

        if (sessionStorage.getItem("docType") == "personnel") {
          this.showWaitingFlag = true;
          axios({
            method: "get",

            url: this.baseurl + path,

            headers: {
              "Content-Type": "application/json",
              authId: sessionStorage.getItem("authId"),
              token: window.localStorage.getItem("token")
                ? window.localStorage.getItem("token").split('"')[1] ||
                  window.localStorage.getItem("token")
                : null,
            },

            responseType: "blob",
          })
            .then((res) => {
              //ie内核的浏览器下

              if (
                navigator.userAgent.match(/MSIE\s([\d.]+)/) ||
                navigator.userAgent.indexOf("Trident") > -1
              ) {
                window.navigator.msSaveBlob(res, `人员信息.zip`);
              } else {
                let url = window.URL.createObjectURL(res);

                let link = document.createElement("a");

                link.style.display = "none";

                link.href = url;

                link.download = `人员信息.zip`;

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                window.URL.revokeObjectURL(url);
                this.showWaitingFlag = false;
              }
            })

            .catch((error) => {
              this.$message.warning("导出失败");
            });
        } else {
          // alert(2)
          this.showWaitingFlag = true;
          axios({
            method: "get",
            url: this.baseurl + path,
            responseType: "arraybuffer",
            headers: {
              "Content-Type": "application/json",
              authId: sessionStorage.getItem("authId"),
              token: window.localStorage.getItem("token")
                ? window.localStorage.getItem("token").split('"')[1] ||
                  window.localStorage.getItem("token")
                : null,
            },
          }).then((res) => {
            // //console.log("DASDASDASDASD")

            //console.log(res);
            const blob = new Blob([res]); //new Blob([res])中不加data就会返回下图中[objece objece]内容（少取一层）

            const fileName = "文件名称.xls"; //这里可以自定义名称，发现设置xlsx文件类型下载后打开会提示下面图-1的无效报错,所以我用了xls格式

            const elink = document.createElement("a");

            elink.download = fileName;

            elink.style.display = "none";

            elink.href = URL.createObjectURL(blob);

            document.body.appendChild(elink);

            elink.click();

            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
            this.showWaitingFlag = false;
          });

          return;

          var path =
            "/document/excel/" +
            sessionStorage.getItem("docType") +
            "/" +
            sessionStorage.getItem("batchId");

          axios
            .post(
              this.baseurl + path,
              {},
              { responseType: "arraybuffer" },
              {
                headers: {
                  //checkAuthId
                  "Content-Type": "application/json",
                  authId: sessionStorage.getItem("authId"),
                  token: window.localStorage.getItem("token")
                    ? window.localStorage.getItem("token").split('"')[1] ||
                      window.localStorage.getItem("token")
                    : null,
                },
              }
            )
            .then((res) => {
              let blob = new Blob([res], { type: "application/vnd.ms-excel" });
              let objectUrl = URL.createObjectURL(blob);
              window.location.href = objectUrl;
            })
            .catch((error) => {
              if (data.Vue) {
                data.Vue.$message.error("系统异常");
              }
              reject(null, e);
            });
        }
        // let date = item.plans[this.daysIndex[index]]
        //  let url = '/Ecp.Export.exportXls.jdn?entityId='+item.FId+'&date='+date.FDeparture_date+'&token=' + window.localStorage.getItem("token")
      });
    },
    fixThisItem(item) {
      this.$store.state.noChufa = true;

      if (this.$store.state.isEnd == 1) {
        this.$confirm("该批档案已经锁定,您的修改有限制", "提示", {
          cancelButtonClass: "btn-custom-cancel",

          confirmButtonText: "是",

          type: "warning",
        }).then(() => {
        });
      }

      if (
        item.docDescAuthor == "true" ||
        item.docDescAuthor == true ||
        item.docDescAuthor == "1"
      ) {
        //console.log("勾选变成true")

        item.docDescAuthor = true;
      } else {
        //console.log("勾选变成false")
        item.docDescAuthor = false;
      }

      // this.$message.warning("修改后请重新排件号盒号");
      //console.log(item);
      this.$store.state.tempDoc = Object.assign({}, item);
      // docUtil.$emit("changeThisDoc",item)
      //   alert(item.id)
      //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
      // item.sortYear=JSON.stringify(item.sortYear)
      //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
      this.$store.state.tempDocId = item.id;

      this.$store.state.tempDocSeq = item.docSequence;

      let barHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //console.log(barHeight)
      this.$store.state.docDetialBar = barHeight;

      // this.$store.state.showDocIn=true
      this.$router.push("/work/docInput");
    },
    deepClone1(initalObj, finalObj) {
      var obj = finalObj || {};
      for (var i in initalObj) {
        var prop = initalObj[i];

        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
        if (prop === obj) {
          continue;
        }

        if (typeof prop === "object") {
          obj[i] = prop.constructor === Array ? [] : Object.create(prop);
        } else {
          obj[i] = prop;
        }
      }
      return obj;
    },
    printReal() {},

    printBtn(item) {
      //       var command = "msconfig"
      //           window.oldOnError = window.onerror;
      //           window._command = command;
      //           window.onerror = function (err) {
      //               if (err.indexOf('utomation') != -1) {
      //                   alert('命令' + window._command + ' 已经被用户禁止！');
      //                   return true;
      //               }
      //               else return false;
      //           };
      //           var wsh = new ActiveXObject('WScript.Shell');
      //           if (wsh)
      //               wsh.Run(command);
      //           window.onerror = window.oldOnError;
      //

      //       return
      this.$store.state.printDoc = item;
      //console.log( this.$store.state.printDoc)

      window.sessionStorage.setItem("docId", item.id);

      if (sessionStorage.getItem("docType") == "personnel") {
        if (item.personJob == 4 || item.personJob == 5) {
          //personJob字段用来存是哪种文档类型
          window.sessionStorage.setItem("rsPrint", 4);
          window.sessionStorage.setItem(
            "rsPrintSub",
            item.personJob - 3 + "-" + item.docNum
          );
        }
        if (item.personJob < 4) {
          window.sessionStorage.setItem("rsPrint", item.personJob);
          window.sessionStorage.setItem("rsPrintSub", "-" + item.docNum);
        } else if (item.personJob < 10) {
          window.sessionStorage.setItem("rsPrint", item.personJob - 1);
          window.sessionStorage.setItem("rsPrintSub", "-" + item.docNum);
        } else if (item.personJob > 9 && item.personJob < 16) {
          //10-15
          window.sessionStorage.setItem("rsPrint", item.personJob - 9);
          window.sessionStorage.setItem(
            "rsPrintSub",
            item.personJob - 9 + "-" + item.docNum
          );
        } else {
          window.sessionStorage.setItem("rsPrint", 10);
          window.sessionStorage.setItem("rsPrintSub", "-" + item.docNum);
        }
        var ttt = sessionStorage.getItem("rsPrint");
        window.sessionStorage.setItem("rsPrint", ttt + " ");
      } //personnel
      else if (
        sessionStorage.getItem("docType") == "official" ||
        sessionStorage.getItem("docType") == "business" ||
        sessionStorage.getItem("docType") == "officialJ"
      ) {
        // alert(2)
        window.sessionStorage.setItem(
          "authCode",
          sessionStorage.getItem("authCode")
        );

        window.sessionStorage.setItem("sortYear", item.sortYear);
        window.sessionStorage.setItem("docNum", item.docNum);
        window.sessionStorage.setItem("docAbout", item.docAbout);
        window.sessionStorage.setItem("aboutTextNum", item.docAbout.length);
        var y = item.deadline;
        // //console.log(y)
        if (this.isNumber(y)) {
          // alert(1)
          //console.log(y);
          y = y + "年";
        }
        window.sessionStorage.setItem("timedue", y);

        window.sessionStorage.setItem("docPage", item.docPage);
      }

      // else if(sessionStorage.getItem("docType")=="business") {
      //   var t=sessionStorage.getItem('authCode')+ "-"
      //        +'-' +item.docAbout + "-"  +this.formatFourNum1(item.docNum)
      //   window.sessionStorage.setItem('danghao',t)
      // }
      else if (sessionStorage.getItem("docType") == "science") {
        // alert(2)
        // alert(2)
        var tauthcode = sessionStorage.getItem("authCode");
        var c = tauthcode;
        // alert(tauthcode)
        while (c.charAt(0) == "0") {
          c = c.substring(1);
        }
        var kjdh =
          c + "-" + sessionStorage.getItem("docTypeCode") + "-" + item.boxSeq;
        // alert(2)

        window.sessionStorage.setItem("danghao1", kjdh);
        window.sessionStorage.setItem("kjXuhao", item.docNum);
      }
      // Utils.$emit("sendInit", 1);
      this.showCenterPrint = true;
      var docs = this.$store.state.alreadyDocs;
      window.localStorage.setItem("docs", JSON.stringify(docs));
    },
    // printBtn1(item) {
    //   if (!this.reSend) {
    //     var docs = this.$store.state.alreadyDocs;
    //     window.localStorage.setItem("docs", JSON.stringify(docs));

    //     if (this.$store.state.isEnd != 1 && !this.onceFlag) {
    //       // alert(this.$store.state.isEnd)
    //       this.onceFlag = true;
    //       this.putRequest(
    //         "/work/" + sessionStorage.getItem("batchId") + "/1/end"
    //       ).then((resp) => {
    //         //console.log(resp);
    //         if (resp.code == 0) {
    //           this.$store.state.isEnd = 1;
    //         }
    //       });
    //     }
    //     if (sessionStorage.getItem("docType") == "personnel") {
    //       if (item.personJob == 4 || item.personJob == 5) {
    //         //personJob字段用来存是哪种文档类型
    //         window.sessionStorage.setItem("rsPrint", 4);
    //         window.sessionStorage.setItem(
    //           "rsPrintSub",
    //           item.personJob - 3 + "-" + item.docNum
    //         );
    //       }
    //       if (item.personJob < 4) {
    //         window.sessionStorage.setItem("rsPrint", item.personJob);
    //         window.sessionStorage.setItem("rsPrintSub", "-" + item.docNum);
    //       } else if (item.personJob < 10) {
    //         window.sessionStorage.setItem("rsPrint", item.personJob - 1);
    //         window.sessionStorage.setItem("rsPrintSub", "-" + item.docNum);
    //       } else if (item.personJob > 9 && item.personJob < 16) {
    //         //10-15
    //         window.sessionStorage.setItem("rsPrint", item.personJob - 9);
    //         window.sessionStorage.setItem(
    //           "rsPrintSub",
    //           item.personJob - 9 + "-" + item.docNum
    //         );
    //       } else {
    //         window.sessionStorage.setItem("rsPrint", 10);
    //         window.sessionStorage.setItem("rsPrintSub", "-" + item.docNum);
    //       }
    //       var ttt = sessionStorage.getItem("rsPrint");
    //       window.sessionStorage.setItem("rsPrint", ttt + " ");
    //     } //personnel
    //     else if (
    //       sessionStorage.getItem("docType") == "official" ||
    //       sessionStorage.getItem("docType") == "business"
    //     ) {
    //       // alert(2)
    //       window.sessionStorage.setItem(
    //         "authCode",
    //         sessionStorage.getItem("authCode")
    //       );

    //       window.sessionStorage.setItem("sortYear", item.sortYear);
    //       window.sessionStorage.setItem("docNum", item.docNum);
    //       window.sessionStorage.setItem("docAbout", item.docAbout);
    //       window.sessionStorage.setItem("aboutTextNum", item.docAbout.length);
    //       var y = item.deadline;
    //       // //console.log(y)
    //       if (this.isNumber(y)) {
    //         // alert(1)
    //         //console.log(y);
    //         y = y + "年";
    //       }
    //       window.sessionStorage.setItem("timedue", y);

    //       window.sessionStorage.setItem("docPage", item.docPage);
    //     }

    //     // else if(sessionStorage.getItem("docType")=="business") {
    //     //   var t=sessionStorage.getItem('authCode')+ "-"
    //     //        +'-' +item.docAbout + "-"  +this.formatFourNum1(item.docNum)
    //     //   window.sessionStorage.setItem('danghao',t)
    //     // }
    //     else if (sessionStorage.getItem("docType") == "science") {
    //       // alert(2)
    //       // alert(2)
    //       var tauthcode = sessionStorage.getItem("authCode");
    //       var c = tauthcode;
    //       // alert(tauthcode)
    //       while (c.charAt(0) == "0") {
    //         c = c.substring(1);
    //       }
    //       var kjdh =
    //         c + "-" + sessionStorage.getItem("docTypeCode") + "-" + item.boxSeq;
    //       // alert(2)

    //       window.sessionStorage.setItem("danghao1", kjdh);
    //       window.sessionStorage.setItem("kjXuhao", item.docNum);
    //     }

    //     let { href } = this.$router.resolve({ path: "/work/print" });
    //     if (this.reSend) {
    //       //false为不打开
    //       window.open(href, "_blank");
    //     }

    //     this.reSend = true; //恢复默认

    //   } //不打开空页不提醒  很奇怪，把内容抽象成函数就出错
    //   else {
    //     this.$confirm("开始印章后将锁定该批文档不能修改", {
    //       cancelButtonClass: "btn-custom-cancel",
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning",
    //     })
    //       .then(() => {
    //         {
    //           var docs = this.$store.state.alreadyDocs;
    //           window.localStorage.setItem("docs", JSON.stringify(docs));

    //           if (this.$store.state.isEnd != 1) {
    //             // alert(this.$store.state.isEnd)
    //             this.$store.state.isEnd = 1;
    //             this.onceFlag = true;
    //             this.putRequest(
    //               "/work/" + sessionStorage.getItem("batchId") + "/1/end"
    //             ).then((resp) => {
    //               //console.log(resp);
    //             });
    //           }
    //           if (sessionStorage.getItem("docType") == "personnel") {
    //             if (item.personJob == 4 || item.personJob == 5) {
    //               //personJob字段用来存是哪种文档类型
    //               window.sessionStorage.setItem("rsPrint", 4);
    //               window.sessionStorage.setItem(
    //                 "rsPrintSub",
    //                 item.personJob - 3 + "-" + item.docNum
    //               );
    //             }
    //             if (item.personJob < 4) {
    //               window.sessionStorage.setItem("rsPrint", item.personJob);
    //               window.sessionStorage.setItem(
    //                 "rsPrintSub",
    //                 "-" + item.docNum
    //               );
    //             } else if (item.personJob < 10) {
    //               window.sessionStorage.setItem("rsPrint", item.personJob - 1);
    //               window.sessionStorage.setItem(
    //                 "rsPrintSub",
    //                 "-" + item.docNum
    //               );
    //             } else if (item.personJob > 9 && item.personJob < 16) {
    //               //10-15
    //               window.sessionStorage.setItem("rsPrint", item.personJob - 9);
    //               window.sessionStorage.setItem(
    //                 "rsPrintSub",
    //                 item.personJob - 9 + "-" + item.docNum
    //               );
    //             } else {
    //               window.sessionStorage.setItem("rsPrint", 10);
    //               window.sessionStorage.setItem(
    //                 "rsPrintSub",
    //                 "-" + item.docNum
    //               );
    //             }
    //             var ttt = sessionStorage.getItem("rsPrint");
    //             window.sessionStorage.setItem("rsPrint", ttt + " ");
    //           } //personnel
    //           else if (
    //             sessionStorage.getItem("docType") == "official" ||
    //             sessionStorage.getItem("docType") == "business"
    //           ) {
    //             // alert(2)
    //             window.sessionStorage.setItem(
    //               "authCode",
    //               sessionStorage.getItem("authCode")
    //             );

    //             window.sessionStorage.setItem("sortYear", item.sortYear);
    //             window.sessionStorage.setItem("docNum", item.docNum);
    //             window.sessionStorage.setItem("docAbout", item.docAbout);
    //             window.sessionStorage.setItem(
    //               "aboutTextNum",
    //               item.docAbout.length
    //             );
    //             var y = item.deadline;
    //             // //console.log(y)
    //             if (this.isNumber(y)) {
    //               // alert(1)
    //               //console.log(y);
    //               y = y + "年";
    //             }
    //             window.sessionStorage.setItem("timedue", y);

    //             window.sessionStorage.setItem("docPage", item.docPage);
    //           }

    //           // else if(sessionStorage.getItem("docType")=="business") {
    //           //   var t=sessionStorage.getItem('authCode')+ "-"
    //           //        +'-' +item.docAbout + "-"  +this.formatFourNum1(item.docNum)
    //           //   window.sessionStorage.setItem('danghao',t)
    //           // }
    //           else if (sessionStorage.getItem("docType") == "science") {
    //             // alert(2)
    //             // alert(2)
    //             var tauthcode = sessionStorage.getItem("authCode");
    //             var c = tauthcode;
    //             // alert(tauthcode)
    //             while (c.charAt(0) == "0") {
    //               c = c.substring(1);
    //             }
    //             var kjdh =
    //               c +
    //               "-" +
    //               sessionStorage.getItem("docTypeCode") +
    //               "-" +
    //               item.boxSeq;
    //             // alert(2)

    //             window.sessionStorage.setItem("danghao1", kjdh);
    //             window.sessionStorage.setItem("kjXuhao", item.docNum);
    //           }

    //           let { href } = this.$router.resolve({ path: "/work/print" });
    //           if (this.reSend) {
    //             //false为不打开
    //             window.open(href, "_blank");
    //           }

    //           this.reSend = true; //恢复默认
    //         }
    //       })
    //       .catch(() => {});
    //   }
    // },
    formatFourNum1(value) {
      var tvalue = value + "";
      if (tvalue == undefined || tvalue == "null" || !tvalue || tvalue == "") {
        return "暂无";
      } else {
        var h = tvalue;
        while (h.length < 4) {
          h = "0" + h;
        }
        // //console.log(h)
        return h;
      }
    },
    formatFiveKJ(value) {
      var tvalue = value + "";
      if (tvalue == undefined || tvalue == "null" || !tvalue || tvalue == "") {
        return "暂无";
      } else {
        var h = tvalue;
        while (h.length < 5) {
          h = "0" + h;
        }
        // //console.log(h)
        return h;
      }
    },

    formatThreeKJ(value) {
      var tvalue = value + "";
      if (tvalue == undefined || tvalue == "null" || !tvalue || tvalue == "") {
        return "暂无";
      } else {
        var h = tvalue;
        while (h.length < 3) {
          h = "0" + h;
        }
        // //console.log(h)
        return h;
      }
    },

    deleteThisItem(item) {
      if (this.$store.state.isEnd == 1) {
        this.$confirm("该批档案已经锁定", "提示", {
          cancelButtonClass: "btn-custom-cancel",

          confirmButtonText: "好的",

          type: "warning",
        }).then(() => {
          return;
        });
        return;
      }

      this.$confirm(
        "是否删除这条档案数据，删除后请排件号盒号再导出，否则可能会出错",
        "提示",
        {
          cancelButtonClass: "btn-custom-cancel",
          cancelButtonText: "否",
          confirmButtonText: "是",

          type: "warning",
        }
      ).then(() => {
        this.showWaitingFlag = true;
        var pathToDel =
          "/document/" + sessionStorage.getItem("docType") + "/" + item.id;

        axios
          .delete(this.baseurl + pathToDel, {
            headers: {
              "Content-Type": "application/json",
              authId: sessionStorage.getItem("authId"),
              token: window.localStorage.getItem("token")
                ? window.localStorage.getItem("token").split('"')[1] ||
                  window.localStorage.getItem("token")
                : null,
            },
          })
          .then((resp) => {
            if (resp.code == 0) {
              this.showWaitingFlag = false;

              this.loadDocs();
              //               var length = this.$store.state.alreadyDocs.length || 0;
              //               var _arr = this.$store.state.alreadyDocs;
              //               for (var i = 0; i < length; i++) {
              //                 for(var j=0;j<_arr[i].length;j++){
              //                   for(var k=0;k<_arr[i][j].length;k++){
              //  if (_arr[i][j][k].docSequence == item.docSequence) {
              //                   _arr[i][j].splice(k, 1); //删除下标为i的元素
              //                   this.showWaitingFlag = false;

              //                   break;
              //                 }
              //                   }
              //                 }

              //               }
            }
          });
      });

      // '/document/{type}/{id}'
      // var pathToDel='/document'
      //  this.deleteRequest(
      //   //注意防止重复提交
      //   pathToDoc,
      //   JSON.stringify(docObj)
      // ).then((resp) => {
      //   //console.log("修改文件");

      //   //console.log(docObj);
      //   //console.log("修改文件的结果");
      //   //console.log(resp);
      // });
    },
  },
  created() {
    this.alreadyDocsRestore = [];
    window.sessionStorage.setItem("isSub", 1);

    //console.log("created~~~~~~~~~~~~~~~~~~~~~")
    var tt = "你和";
    //console.log(tt.length)
    //     this.socketUtil=new VueSocketIO({

    //     debug: true,

    //     connection: '192.168.213.60:3550',  //

    // })
    //     // this
    // var c="adsd"
    // if(c.charAt(0)=='a') c=c.substring(1)
    // alert(c)
    // if (this.$store.state.sortedFlag) {
    //   //查看后继续录入又回到查看
    //   //console.log("排好序的");
    //   this.$store.state.sortedFlag = false;
    //   return;
    // }
    this.docAboutReq = this.docType == "officialJ" ? "机构" : "问题";
    // //console.log(this.$store.state.alreadyDocs)
  },

  mounted() {
    this.preLoadDocs();

    //     var testarr=[]
    // testarr.push(this.$store.state.alreadyDocs[0],this.$store.state.alreadyDocs[1])
    // //console.log(testarr)
    // var test1=this.deepClone(testarr)
    // test1[0].authCode=111
    // //console.log(test1)
    // //console.log(testarr)
    document.onkeydown = function (e) {
      var theEvent = window.event || e;
      var code = theEvent.keyCode || theEvent.which;
      console.log(code);
      if (code == 13) {
        // alert(2)
        that.printThis1();
      }

      if (code == 38) {
        that.$refs.shibie.focus();
        that.nextPrint();
      }
      if (code == 40) {
        that.$refs.shibie.focus();
        that.prePrint();
      }
    };

    var dd = new Date();
    var inittime =
      dd.getHours() + "-" + dd.getMinutes() + "-" + dd.getSeconds() + "";
    //console.log("init 一个detail"+inittime)
    this.initTime = inittime;

    //     Utils.$on("changeThePrint", function (doc) {
    //   //console.log("get改变已经印了");
    //   var idd=sessionStorage.getItem("docId")
    //     for(var i in that.$store.state.alreadyDocs){
    //       if(that.$store.state.alreadyDocs[i].id==idd){
    //       that.$store.state.alreadyDocs[i].printed=1

    //       }
    //     }
    // });

    var that = this;
    Utils.$on("printBackThisDoc", function (doc) {
      // //console.log("父页面get下拉的");
      // var that=this
      that.$store.state.printDoc = doc;
      //console.log(doc.id+that.initTime+"收到并且设置!!!!")

      that.printBtn(doc);
    });
  },
  //    beforeDestroy(){
  //    docUtil.$off("changeThisDoc")
  //  },
  destroyed() {
    window.sessionStorage.setItem("isSub", 0);
    this.destoryFlag = false;
    //console.log("destory")
    // document=null
  },
};
</script>

<style lang="scss">
.textAreaInput {
  background: rgba(255, 255, 255, 0.15) !important;
  // border-radius: 0.48rem;
  // border: 0.08rem solid #274596c5;
  // height: 5rem !important;
  // color: rgb(83, 17, 17);
  // font-size: 1.1rem;
  // padding-left: 3.3rem;

  .el-textarea__inner {
    background: rgba(255, 255, 255, 0.15) !important;
    border-radius: 0.48rem;
    // border: 0.08rem solid #274596c5 !important;
    border: solid 0.08rem;
    border-color: rgba(33, 57, 94, 0.74);
    // height: 2.5rem !important;
    color: rgba(3, 7, 24, 0.788);
    font-size: 1.1rem;
    padding-left: 3.3rem;
    resize: none;
  }
}
</style>
<style lang="scss" scoped>
.endStyle {
  cursor: pointer;
  color: green;
  font-weight: 600;
}

.startStyle {
  cursor: pointer;
  color: red;
  font-weight: 600;
}
#user_topd {
  position: absolute;

  width: 0px;
  height: 0px;
  line-height: 0px; /*为了防止ie下出现题型*/
  border-bottom: 0.5rem solid #909399;
  border-left: 0.5rem solid rgba(255, 255, 255, 0);
  border-right: 0.5rem solid rgba(255, 255, 255, 0);
  right: 0rem;
  top: 0.8rem;
}

#user_top {
  position: absolute;

  width: 0px;
  height: 0px;
  line-height: 0px; /*为了防止ie下出现题型*/
  border-top: 0.5rem solid #909399;
  border-left: 0.5rem solid rgba(255, 255, 255, 0);
  border-right: 0.5rem solid rgba(255, 255, 255, 0);

  right: 0rem;

  top: 0.8rem;
}

.filterItemStyle {
  border-bottom: 0.01rem;
  font-size: 0.8rem;
  padding-top: 0.2rem;
  padding-bottom: 0.3rem;

  cursor: pointer;
}

.filterItemStyle:hover {
  background-color: rgb(222, 222, 222);
}
.filterStyle {
  position: absolute;
  width: 7rem;
  border-radius: 1rem;

  background-color: rgb(230, 230, 230);

  top: 1.5rem;
}

.specialELContainer {
  background-color: rgb(222, 222, 222) !important;
  position: fixed;
  border-radius: 1rem;
  background-clip: padding-box;
  margin: 0 auto;
  width: 30rem;
  left: 50%;
  margin-left: -15rem;
  top: 15rem;
  padding: 0 2rem 1rem 1rem;
  background: #fff;
  border: 0.06rem solid #e2dede;
  box-shadow: 0 0 2rem #cac6c6;
  z-index: 22;
}
.leftInput {
  float: right;
  width: 10rem;
  margin-left: 2%;
  margin-top: 0.9rem;
}
.hoverStyle:hover {
  cursor: pointer;
  color: rgba(1, 4, 14, 0.801);
}

.optionDiv {
  // color:rgb(170, 138, 51);
  font-weight: 600;
  font-size: 1rem;
  margin-left: 0.5rem;
}
.optionDiv:hover {
  color: #aaa;
  cursor: pointer;
}
.wrapper {
  background-color: rgb(255, 255, 255);

  // height: 120vh;
  position: relative;
  padding-bottom: 60vh;
}

.docDetailBox {
  position: relative;
  top: 3rem;
  // padding-bottom: 50rem;
  .detailItemTitle {
    background-color: rgb(255, 255, 255);
    position: fixed;
    width: 100%;
    top: 11.5rem;
  }
  .detailItemRS {
    // height:2rem;
    // line-height: 2rem;
    padding-top: 0.4rem;
    // line-height: 100%;
    border-bottom: solid 0.02rem;
  }

  .detailItem {
    // height:2rem;
    // line-height: 2rem;
    padding-top: 0.4rem;
    // line-height: 100%;
    border-top: solid 0.02rem;
  }
  .itemInfo {
    display: table-cell;
    vertical-align: center;

    float: left;
    font-size: 0.8rem;
    width: 7%;
    text-align: center;

    height: 100%;
    padding-bottom: 0.2rem;
    // line-height: ;
    // border-right: 0.05rem solid;
    padding-left: 0.3%;
    padding-right: 0.3%;
  }
  .itemInfo2 {
    padding-bottom: 0.2rem; /**这样可以 就算没有内容也占据一格 */

    display: table-cell;
    vertical-align: center;
    float: left;
    font-size: 0.8rem;
    width: 6%;
    text-align: center;
    padding-left: 0.3%;
    padding-right: 0.3%;
    // border-right: 0.05rem solid;
  }

  .detailTopLine {
    position: fixed;

    width: 100%;
    top: 11.5rem;
    height: 2rem;
    line-height: 2rem;
    border-top: solid rgb(56, 53, 53);
    border-bottom: 0.05rem solid rgb(56, 53, 53);
  }
}
</style>