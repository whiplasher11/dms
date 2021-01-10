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
      <HidePrint v-bind:printDoc="printDoc"
        v-show="!showPrint"
        style="margin-left: -30mm; position: relative;width:80%; left: 50%"
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

    <div class="wrapper" style="padding-bottom: 50rem">
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
            width: 35%;
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
        <!-- fix遮挡div -->
        <div
          style="
            height: 9rem;
            width: 100%;
            position: fixed;
            background-color: rgb(255, 255, 255);
            top: 3rem;
          "
        ></div>
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
         float:left
         width:5rem
         text-align:center
          "
            class="topTextButton hoverStyle"
            @click="backToOrgans"
          >
            查看与设置
          </div>

          <div
            style="
         float:left
         width:5rem
         text-align:center
         margin-left:1rem
          "
            class="hoverStyle topTextButton"
            @click="goDocIn"
          >
            继续录入
          </div>

          <div
            style="
         float:left
         width:5rem
         text-align:center
         margin-left:1rem
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
         float:left
         width:5rem
         text-align:center
         margin-left:1rem !important
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
         margin-left:1rem !important
          "
            class="hoverStyle topTextButton"
            @click="lockThisBatch"
                        v-if="!isEnd"

          >
            锁定本批
          </div>
                    <div
            style="
         float:left
         width:5rem
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
         margin-top:0.3rem
         "
            class="hoverStyle"
            @click="goSetRule"
          >
            顺序有问题？请前往设置本单位规则
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
                  style="width: 0.7rem; height: 0.7rem; position: absolute;right:1rem"
                  v-if="!filterSortYearFlag && docType != 'personnel'"
                >
                  <span id="user_top"></span>
                </div>
                <div
                  style="width: 0.7rem; height: 0.7rem; position: absolute;right:1rem"
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
                  style="width: 0.7rem; height: 0.7rem; position: absolute;right:1rem"
                  v-if="!filterDocAboutFlag && docType != 'personnel'"
                >
                  <span id="user_top" ></span>
                </div>
                <div
                  style="width: 0.7rem; height: 0.7rem; position: absolute;right:1rem"
                  v-if="filterDocAboutFlag"
                >
                  <span id="user_topd" ></span>
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
              所有文件
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
            <div class="itemInfo" style="width: 6%">问题</div>
            <div class="itemInfo" style="width: 4%">关键字</div>

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
            v-for="(item, index) in this.$store.state.alreadyDocs"
            :key="index"
          >
            <div class="itemInfo" style="width: 3%">{{ item.docSequence }}</div>
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

            <div class="itemInfo" style="width: 12%">{{ item.dutyAuthor }}</div>
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
            <div class="itemInfo" style="width: 2%">
              {{ item.pageTotal | pageTotalformat }}
            </div>

            <div class="itemInfo" style="width: 4%">
              {{ item.docNum ? item.docNum : "暂无" }}
            </div>
            <div class="itemInfo" style="width: 4%">
              {{ item.boxSeq ? item.boxSeq : "暂无" }}
            </div>
            <div class="itemInfo" style="width: 7%">
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
              v-if="item.printed==null"
                style="float: left"
                class="optionDiv"
                @click="printBtn(item)"
              >
                印章
              </div>
                            <div v-if="item.printed"
                style="float: left;color:#ccc"
                class="optionDiv"
                @click="printBtn(item)"
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
            <div class="itemInfo" style="width: 3%">{{ item.docSequence }}</div>

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
      <div style="height: 2rem"></div>
    </div>
  </div>
</template>

<script>
import Utils from "../../utils/doc.js";
import axios from "axios";
import doc from "../../utils/doc.js";

import HidePrint from "./print";

export default {
  components: {
    HidePrint: HidePrint,
  },

  computed: {
    docType() {
      return sessionStorage.getItem("docType");
    },
    authCode() {
      return sessionStorage.getItem("authCode") || "";
    },
  },
  data() {
    return {
      printDoc:false,

      deadlineReq: "期限",
      yearReq: "年度",
      docAboutReq: "机构",
      showCenterPrint: false,
      showPrint: false,
      reSend: true, //打印页面发过来文档，然后再从本页面printBtn(文档)，
      //改变setSessionStorage的一些值，但是这个变量false就不打开新的页面了，为了重用里面的一些设置值的代码

      isEnd: null,
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
      sortedTemp: [],
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
    lockThisBatch(){
                                    this.putRequest(
        "/work/"+sessionStorage.getItem("batchId")+"/1/end"
      ).then((resp) => {
        console.log(resp)
        if(resp.code==0){
          this.isEnd=true
          window.sessionStorage.setItem('isEnd',1)
        }
      })
    },

    unLockThisBatch(){
                                    this.putRequest(
        "/work/"+sessionStorage.getItem("batchId")+"/0/end"
      ).then((resp) => {
        console.log(resp)
        if(resp.code==0){
          this.isEnd=false
          window.sessionStorage.setItem('isEnd',0)
        }
      })
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
      this.alreadyDocsRestore=this.$store.state.alreadyDocs
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

      if (this.alreadyDocsRestore.length > 0) {
        this.$store.state.alreadyDocs = this.alreadyDocsRestore;
      }
    },

    filterFromRequests1(item) {
      this.yearReq = item;
      this.filterFromRequests();
    },
    filterFromRequests2(item) {
      this.docAboutReq = item;
      console.log(item);
      console.log(this.docAboutReq);

      this.filterFromRequests();
    },
    filterFromRequests3(item) {
      this.deadlineReq = item;
      this.filterFromRequests();
    },
    filterFromRequests() {
      window.scrollTo(0, 0);

      // alert(item)
      if (this.alreadyDocsRestore.length > 0) {
        this.$store.state.alreadyDocs = this.alreadyDocsRestore;
      }

      var tempDocs = this.alreadyDocsRestore;
      var newDocs;
      //  newDocs= tempDocs.filter(i=> {
      //    console.log(i.str)
      //  })
      var that = this;
      if (this.dabCheck) {
        console.log(this.dabCheck);
        console.log(typeof this.dabCheck); //string!!!!  checkbox居然是string!!!
      }

      if (
        this.docAboutReq != "机构" &&
        (this.dabCheck || this.dabCheck == "true") &&
        this.dabCheck != "false"
      ) {
        tempDocs = tempDocs.filter(function (element, index, self) {
          return element.docAbout == that.docAboutReq;
        });
      }
      console.log(this.docAboutReq);
      console.log(tempDocs);
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
          return element.deadline == that.deadlineReq;
        });
      }
      console.log(tempDocs);

      this.$store.state.alreadyDocs = tempDocs;
    },
    filterThisRequest(str, item) {
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

      console.log(newDocs);
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
      //获取批次中已经排好的数组时、获取时、排序时、排完件号盒号后需要调用
      //获取所有的筛选条件
      // console.log(this.$store.state.alreadyDocs)
      this.alreadyDocsRestore = this.$store.state.alreadyDocs;

      if (sessionStorage.getItem("docType") == "personnel") {
        var name = [];
        console.log(this.$store.state.alreadyDocs);

        for (var i in this.$store.state.alreadyDocs) {
          if (name.indexOf(this.$store.state.alreadyDocs[i].personName) < 0) {
            name.push(this.$store.state.alreadyDocs[i].personName);
          }
        }

        this.nameFilter = name;
        console.log(name);
        return;
      }

      var year = [];
      var docAboutF = [];

      for (var i in this.$store.state.alreadyDocs) {
        if (docAboutF.indexOf(this.$store.state.alreadyDocs[i].docAbout) < 0) {
          docAboutF.push(this.$store.state.alreadyDocs[i].docAbout);
        }
        if (year.indexOf(this.$store.state.alreadyDocs[i].sortYear) < 0) {
          year.push(this.$store.state.alreadyDocs[i].sortYear);
        }
      }
      this.yearFilter = year;
      this.docAboutFilter = docAboutF;
    },
    nullJson(data) {
      var arr = Object.keys(data);
      return arr.length == 0; //true
    },
    preLoadDocs() {
      console.log("preload");
      var f = false;
      if(this.$store.state.alreadyDocs.length==0){
          this.getRequest("/work/sorted/"+sessionStorage.getItem("batchId")).then((resp) => {
     var item=resp.data

          if (item.sorted != null && !this.nullJson(item.sorted) &&this.$store.state.sortedFlag ) {
            //该批已经排好序
            console.log("sorted！");
            var sorted = JSON.parse(item.sorted.sorted);
            console.log(sorted);
            this.$store.state.alreadyDocs = sorted;
            this.filterAlreadyDocs(); //已经排好

          } else {
            console.log("no sorted");
            this.loadDocs();
          }

                })
      }


//设置期限筛选条件 需要获取批次信息
{
      this.getRequest("/work/" + sessionStorage.getItem("batchId"))
        .then((resp) => {
          var item = resp.data;
          var lastb = item.lastBox;
          this.deadlineFilter = [];
          this.isEnd = resp.data.end; //是否录入结束 还可以修改
          if (resp.data.end == null) {
            this.isEnd = 0;
          }
          console.log(this.isEnd);
          window.sessionStorage.setItem("isEnd", this.isEnd);
          for (var deadline in lastb) {
            this.deadlineFilter.push(deadline);
          }


        }).then(()=>{

        })
}
        // .then(() => {
        //   this.store;
        // });
    },
    loadDocs() {
      console.log("load");

      if (this.sortedTemp.length != 0) {
        this.$store.state.alreadyDocs = this.sortedTemp;
        console.log("return");
        return;
      }
      //         if(sessionStorage.getItem('docType')=='personnel'){
      // var path =
      //         "/document/" +
      //         sessionStorage.getItem("docType") +
      //         "/sort/" +
      //         sessionStorage.getItem("batchId") +
      //         "?pageNow=0&pageSize=10000";

      //         this.showWaitingFlag = true;
      //         this.getRequest(path).then((resp) => {
      //           console.log("排件号盒号");
      //           console.log(resp);})
      //         }
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
          // console.log(resp)
          if (resp) {
            //               if(resp.data.content&&this.docType=='personnel' ){

            //                  let vm = this;
            // var path =
            //   "/document/" +
            //   sessionStorage.getItem("docType") +
            //   "/sort/" +
            //   sessionStorage.getItem("batchId") +
            //   "?pageNow=0&pageSize=10000";

            //    this.getRequest(path).then((resp) => {
            //     console.log("排件号人事");
            //     console.log(resp);
            //     if(resp){
            //       this.showWaitingFlag=false
            //     }
            //     // console.log(JSON.stringify(resp))
            //     if (resp.code == 0) {

            //       // console.log("ss000000000aaaa")
            //       this.showWaitingFlag = false;
            //       console.log(resp.data)
            //       this.$store.state.alreadyDocs = resp.data

            //     }
            //   }).then(()=>this.filterAlreadyDocs());
            //               }

            // else {
            this.$store.state.alreadyDocs = resp.data.content;
            console.log(resp.data.content);

            this.showWaitingFlag = false;
            // }
          }

          // this.$router.replace('/work/docInputD')
        })
        .then(() => {
          this.filterAlreadyDocs(); //获取时
        });

      var tmparr = [];
      // if(this.docType!='personnel'){
      //   console.log('把暂无调到前面')

      //       for(var i in this.$store.state.alreadyDocs){
      //         console.log(this.$store.state.alreadyDocs[i])
      //         if(!this.$store.state.alreadyDocs[i].docNum){
      //         console.log(i)

      //           tmparr.push(this.$store.state.alreadyDocs[i])
      //           this.$store.state.alreadyDocs.splice(i,1)
      //         }
      //     }
      //     for(var k in tmparr){
      //       this.$store.state.alreadyDocs.unshift(tmparr[i])
      //     }
      // }
    },

    loadDocs1() {
      this.$store.state.alreadyDocs = [];
      //         if(sessionStorage.getItem('docType')=='personnel'){

      // var path =
      //         "/document/" +
      //         sessionStorage.getItem("docType") +
      //         "/sort/" +
      //         sessionStorage.getItem("batchId") +
      //         "?pageNow=0&pageSize=90000";

      //         this.showWaitingFlag = true;

      //         this.getRequest(path).then((resp) => {
      //           console.log("排件号盒号");
      //           console.log(resp);})

      //         }

      this.showWaitingFlag = true;

      // return
      // var path =
      //   "/document/page/" +
      //   sessionStorage.getItem("docType") +
      //   "/" +
      //   sessionStorage.getItem("batchId") +
      //   "?pageNow=0&pageSize=900000";
      var path =
        "/document/" +
        sessionStorage.getItem("docType") +
        "/sort/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=10000";

      // var path='/document/page/'+sessionStorage.getItem('docType')+'/'
      // +sessionStorage.getItem('batchId')+'?pageNow=0&pageSize=100000'

      axios
        .get(this.baseurl + path, {
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
          console.log(resp);
          this.$store.state.alreadyDocs = resp.data;

          if (resp) {
            // if (resp.data.content && this.docType == "personnel") {
            if (resp.data.content && this.docType == "personnel") {
              // let vm = this;
              // var path =
              //   "/document/" +
              //   sessionStorage.getItem("docType") +
              //  "/" +
              //   sessionStorage.getItem("batchId") +
              //   "?pageNow=0&pageSize=90000";

              var path =
                "/document/page/" +
                sessionStorage.getItem("docType") +
                "/" +
                sessionStorage.getItem("batchId") +
                "?pageNow=0&pageSize=1000";

              this.getRequest(path).then((resp) => {
                console.log("排件号人事");
                console.log(resp);
                if (resp) {
                  this.showWaitingFlag = false;
                }
                // console.log(JSON.stringify(resp))
                if (resp.code == 0) {
                  // console.log("ss000000000aaaa")
                  this.showWaitingFlag = false;
                  console.log(resp.data);
                  this.$store.state.alreadyDocs = resp.data;
                }
              });
            } else {
              this.$store.state.alreadyDocs = resp.data.content;

              this.showWaitingFlag = false;
            }
          }

          // this.$router.replace('/work/docInputD')
        });
    },
    putInContent() {
      return;
      this.searchContent = "输入识别号";
    },
    clearSearchContent() {
      this.searchContent = "";
    },
    cancelSearch() {
      // if (this.searchContent != "输入识别号") {
      if (true) {
        this.searchContent = "输入识别号";
      if (this.alreadyDocsRestore.length > 0) {
        this.$store.state.alreadyDocs = this.alreadyDocsRestore;
      }else{
      this.preLoadDocs();

      }
      }
    },
    goSetRule() {
      // this.$router.replace('/work/modifyOragan')
      // if(this.docType=='')
      // this.$store.state.whichRuleSet=
      // this.$store.state.whichRuleSet=sessionStorage.getItem('auth')
      this.$store.state.backToDetailFlag=true
      this.$router.replace("/work/keyWM");
    },

    hideAdvSearch() {
      this.advSearchShow = false;
      if (this.alreadyDocsRestore.length > 0) {
        this.$store.state.alreadyDocs = this.alreadyDocsRestore;
      }else{
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
        // console.log(resp);
        this.showWaitingFlag = false;
        this.alreadyDocsRestore= this.$store.state.alreadyDocs 
        this.$store.state.alreadyDocs = resp.data.content;

        // if(sessionStorage.getItem('docType')=='personnel'){
        //   // alert(2)
        //   var arr1=this.$store.state.alreadyDocs
        //   var arr2=[]
        //   arr2.push(arr1)
        //   var arr3=[]
        //   arr3.push(arr2)
        //   this.$store.state.alreadyDocs=arr3
        //   // console.log('aaa')
        //   console.log(arr3)
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
        // console.log(resp);
        this.showWaitingFlag = false;
        this.alreadyDocsRestore=this.$store.state.alreadyDocs
        this.$store.state.alreadyDocs = resp.data.content;

        // if(sessionStorage.getItem('docType')=='personnel'){
        //   // alert(2)
        //   var arr1=this.$store.state.alreadyDocs
        //   var arr2=[]
        //   arr2.push(arr1)
        //   var arr3=[]
        //   arr3.push(arr2)
        //   this.$store.state.alreadyDocs=arr3
        //   // console.log('aaa')
        //   console.log(arr3)
        // }
      });
    },
    sortThisBatchRS1() {
      window.scrollTo(0, 0);
      console.log("查看批次item");

      console.log(item); //打印单位

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
          console.log(error);
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
      this.$store.state.sortedFlag=true

        this.showWaitingFlag = true;
        this.isEnd = 1;
        this.getRequest(path).then((resp) => {
          console.log("排件号盒号人事");
          console.log(resp);
          // console.log(JSON.stringify(resp))
          if (resp.code == 0) {
            // console.log("ss000000000aaaa")
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
            this.sortedTemp = Object.assign({}, this.$store.state.alreadyDocs);
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
      // let vm = this;
      var path =
        "/document/" +
        sessionStorage.getItem("docType") +
        "/sort/" +
        sessionStorage.getItem("batchId") +
        "?pageNow=0&pageSize=90000";
      this.$confirm(
        "将生成件号盒号，本批工作是否已经完成录入，并且所有关键词责任者等都已经设置优先级",
        "提示",
        {
          cancelButtonClass: "btn-custom-cancel",
          cancelButtonText: "设置优先级",
          confirmButtonText: "是",

          type: "warning",
        }
      ).then(() => {
        this.showWaitingFlag = true;
      this.$store.state.sortedFlag=true

        this.getRequest(path).then((resp) => {
          console.log("排件号盒号");
          console.log(resp);
          // console.log(JSON.stringify(resp))
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
            this.sortedTemp = Object.assign({}, this.$store.state.alreadyDocs);
            console.log(this.sortedTemp);
            this.filterAlreadyDocs(); // 排完件号盒号之后更新筛选条件，使得筛选条件后仍按件号从小到大
          }
        });
      });
    },
    goDocIn() {
      if (this.isEnd == 1) {
        this.$confirm("该批档案已经锁定", "提示", {
          cancelButtonClass: "btn-custom-cancel",

          confirmButtonText: "是",

          type: "warning",
        }).then(() => {
          return;
        });
        return;
      }
      this.$router.replace("/work/docInput");
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
          console.log(resp);

          this.$store.state.alreadyDocs = resp.data.content;
          // this.$router.replace('/work/docInputD')
        });
    },

    backToOrgans() {
      this.$router.replace("/work/modifyOrgan");
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
            // console.log("DASDASDASDASD")

            console.log(res);
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
      this.$store.state.noChufa=true

      if (this.isEnd == 1) {
        this.$confirm("该批档案已经锁定", "提示", {
          cancelButtonClass: "btn-custom-cancel",

          confirmButtonText: "是",

          type: "warning",
        }).then(() => {
          
          return;
        });
        return;
      }

      if (
        item.docDescAuthor == "true" ||
        item.docDescAuthor  ||
        item.docDescAuthor == "1"
      ) {
        item.docDescAuthor = true;
      } else {
        item.docDescAuthor = false;
      }

      this.$message.warning("修改后请重新排件号盒号");
      console.log(item);
      this.$store.state.tempDoc = Object.assign({}, item);
      //   alert(item.id)
      //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
      // item.sortYear=JSON.stringify(item.sortYear)
      //   this.$store.state.tempDoc.sortYear=JSON.stringify(item.sortYear)
      this.$store.state.tempDocId = item.id;

      this.$store.state.tempDocSeq = item.docSequence;
      this.sortedTemp = [];

      this.$router.replace("/work/docInput");
    },
    aaa() {},

    printReal() {},

    printBtn(item) {
      this.$store.state.printDoc=item
      console.log( this.$store.state.printDoc)

      window.sessionStorage.setItem('docId',item.id)
      
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
        sessionStorage.getItem("docType") == "business"
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
        // console.log(y)
        if (this.isNumber(y)) {
          // alert(1)
          console.log(y);
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

    //     if (this.isEnd != 1 && !this.onceFlag) {
    //       // alert(this.isEnd)
    //       this.onceFlag = true;
    //       this.putRequest(
    //         "/work/" + sessionStorage.getItem("batchId") + "/1/end"
    //       ).then((resp) => {
    //         console.log(resp);
    //         if (resp.code == 0) {
    //           this.isEnd = 1;
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
    //       // console.log(y)
    //       if (this.isNumber(y)) {
    //         // alert(1)
    //         console.log(y);
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

    //           if (this.isEnd != 1) {
    //             // alert(this.isEnd)
    //             this.isEnd = 1;
    //             this.onceFlag = true;
    //             this.putRequest(
    //               "/work/" + sessionStorage.getItem("batchId") + "/1/end"
    //             ).then((resp) => {
    //               console.log(resp);
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
    //             // console.log(y)
    //             if (this.isNumber(y)) {
    //               // alert(1)
    //               console.log(y);
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
        // console.log(h)
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
        // console.log(h)
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
        // console.log(h)
        return h;
      }
    },

    deleteThisItem(item) {
      if (this.isEnd == 1) {
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
        this.sortedTemp = [];
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
      //   console.log("修改文件");

      //   console.log(docObj);
      //   console.log("修改文件的结果");
      //   console.log(resp);
      // });
    },
  },
  created() {
    this.sortedTemp = [];
    this.alreadyDocsRestore=[];
    // this
    // var c="adsd"
    // if(c.charAt(0)=='a') c=c.substring(1)
    // alert(c)
    // if (this.$store.state.sortedFlag) {
    //   //查看后继续录入又回到查看
    //   console.log("排好序的");
    //   this.$store.state.sortedFlag = false;
    //   return;
    // }
    this.preLoadDocs();
  },

  mounted() {
    var that = this;
    //     Utils.$on("changeThePrint", function (doc) {
    //   console.log("get改变已经印了");
    //   var idd=sessionStorage.getItem("docId")
    //     for(var i in that.$store.state.alreadyDocs){
    //       if(that.$store.state.alreadyDocs[i].id==idd){
    //       that.$store.state.alreadyDocs[i].printed=1

    //       }
    //     }
    // });
    
  var that=this
    Utils.$on("printBackThisDoc", function (doc) {
      // console.log("父页面get下拉的");
      // var that=this
      that.$store.state.printDoc=doc
      console.log(doc.id+"收到并且设置!!!!")
      that.printBtn(doc)
    });
  },
  destroyed(){
    console.log("destory")
    this.$.destory()
  }
};
</script>

<style lang="scss" scoped>
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
  background-color: rgb(181, 181, 181) !important;
  position: fixed;
  border-radius: 1rem;
  background-clip: padding-box;
  margin: 0 auto;
  width: 30rem;
  left: 50%;
  margin-left: -15rem;
  top: 10rem;
  padding: 0 2rem 1rem 1rem;
  background: #fff;
  border: 0.06rem solid #eaeaea;
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