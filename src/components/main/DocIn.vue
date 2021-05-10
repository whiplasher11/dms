<template>
  <div class="wrapper">
    <Left></Left>

    <div class="detailBox"></div>

    <div
      style="
        position: absolute;
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
      提交中，请稍候...
    </div>
    <!-- 录入提示 -->
    <div
      typeInTipBox
      v-if="tipShowFlag"
      style="
        position: absolute;
        top: 30vh;
        left: 40rem;

        z-index: 122;
        padding-top: 1rem;
        color: #333;
        font-size: 1.5rem;
        width: 20rem;

        background-color: rgb(209, 218, 243);
        -webkit-box-shadow: 0 0 0.5rem #909399;
        box-shadow: 0 0 0.5rem #909399;
        border-radius: 1rem;
      "
    >
      <div
        style="font-size: 1rem; height: 2rem; width: 100%; text-align: center"
      >
        历史匹配:
      </div>
      <!-- <div style="font-size:1rem;text-align:center;width:100%;line-height:2rem">
            关键词 : 问题/机构/项目
          </div> -->
      <div
        v-for="(item, index) in matchedKV"
        :key="index"
        class="matchedKVClass"
      >
        <div
          @click="selectThisTip(item)"
          style="
            font-size: 1rem;
            text-align: center;
            width: 80%;
            margin-left: 10%;
            line-height: 2rem;
          "
          class="matchedItem"
        >
          {{ item[0] }}:{{ item[1] }}
        </div>
      </div>
      <div
        style="
          height: 2rem;
          text-align: right;
          font-size: 0.8rem;
          line-height: 2rem;
          cursor: pointer;
        "
        @click="closeTip"
      >
        关闭&nbsp;
      </div>
    </div>

    <!-- 标题匹配
     -->
    <div
      typeInTipBox
      v-if="likelyTipShowFlag"
      class="windowStyle"
      style="
        position: absolute;
        top: 30vh;
        left: 13rem;

        z-index: 122;
        padding-top: 1rem;
        color: #eee;
        font-size: 1.5rem;
        width: 75rem;

        padding-bottom: 1rem;
        -webkit-box-shadow: 0 0 0.5rem #909399;
        box-shadow: 0 0 0.5rem #909399;
        border-radius: 1rem;
      "
    >
      <div
        style="
          height: 2rem;
          text-align: right;
          font-size: 1rem;
          line-height: 2rem;
          cursor: pointer;
          width: 3rem;
          position: absolute;

          right: 1rem;
          top: 0;
        "
        @click="closeDocTip"
      >
        关闭&nbsp;
      </div>
      <div
        style="font-size: 1rem; height: 2rem; width: 100%; text-align: center"
      >
        智能匹配:
      </div>
      <!-- <div style="font-size:1rem;text-align:center;width:100%;line-height:2rem">
            关键词 : 问题/机构/项目
          </div> -->
      <div
        v-for="(item, index) in matchedDoc"
        :key="index"
        class="matchedDocClass"
      >
        <div
          @click="selectThisDoc(item)"
          style="
            font-size: 1rem;
            text-align: center;
            width: 80%;
            margin-left: 10%;
            padding-bottom: 0.2rem;
          "
          class="matchedItem"
        >
          <font v-html="item.docTitle"> </font> -
          <font style="font-size: 1.1rem; color: #abc">
            {{ item.docAbout }} </font
          >-{{ item.keyword }}-期限：{{item.deadline}}
        </div>
      </div>
    </div>

    <div class="keyWordSelect" v-if="false">
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>
      <div class="keywords">农村</div>

      <div class="keyWordsTimer">3秒后消失</div>
    </div>

    <!-- 人事之外 -->
    <el-form
      v-if="!isRS"
      class="docInForm"
      
      :model="docForm"
      label-width="10rem"
    >
      <!-- <div class="docTypeTitle">sessionStorage批次</div> -->
      <div class="docSequenceTip">
        文件在该批次中唯一识别号：
        <div style="display: inline-block;font-size:1.1rem">{{ this.docForm.docSequence }}</div>
              <div
        v-if="fixDocFlag"
        style="
          display:inline-block;
          color:red;
        "
      >
        &nbsp;&nbsp;修改中
      </div>

      </div>

      <div style="width:60%;position:absolute;top:1rem;left:50%;margin-left:-30%;text-align:center">录入单位：{{authName}}</div>


      <!-- contenteditable="true" @focus="sequenceFocus" @blur="sequenceBlur"  -->
      <el-checkbox
        style="position: absolute; right: 1rem; top: 1rem"
        v-if="true"
        @change="inputChange"
        false-label="false"
        true-label="true"
        :checked="true"
        >智能录入</el-checkbox
      >

      <el-form-item class="textArea" prop="batchName" label="文件标题：">
        <el-input
          @blur="titleComplete"
          @keydown.native="fastNext($event)"
          type="textarea"
          ref="docTitle"
          id="docTitle"
          :rows="3"
          class="textAreaInput"
          v-model="docForm.docTitle"
          auto-complete="off"
          placeholder="输入文件标题"
        ></el-input>
      </el-form-item>

      <el-row :gutter="24">
        <el-col :span="4">
          <el-form-item prop="batchName" label="有无文号:">
            <el-checkbox
              style="position: absolute; left: 2rem; top: 0.5rem"
              v-if="true"

              @change="docDescChange"
              false-label="false"
              true-label="true"
              :checked="true"
              v-model="docForm.docDescAuthor"
            ></el-checkbox>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item
            prop="batchName"
            v-if="docForm.docDescAuthor"
            label="文号："
          >
            <el-input
              size="normal"
              type="text"
              @blur="docDescComplete"
              ref="docDesc"
          id="docDesc"
          @keydown.native="fastNext($event)"

              v-model="docForm.docDesc"
              auto-complete="off"
              placeholder="文号"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            prop="batchName"
            v-if="docForm.docDescAuthor"
            label="序号："
          >
          
            <el-input
              size="normal"
              type="text"
              v-model="docForm.docDescNum"
              auto-complete="off"
              ref="docDescNum"
          id="docDescNum"
          @keydown.native="fastNext($event)"

              placeholder="文号的序号"
              class="DescNumStyle"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="docType == 'officialJ'">
        <!-- 机构分卷法 -->
        <el-row :gutter="24">
          <el-col :span="12" v-if="docType == 'officialJ'">
            <el-form-item prop="historyAuth" label="机构词：">
              <el-select

                @blur="keywordBlur"
                @change="keywordComplete"
                filterable
                v-model="docForm.keyword"
                placeholder="选择或填写机构词"
              >
                <el-option
                  v-for="item in keywordTipArr"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item prop="historyAuth" label="机构：">
              <el-select

                filterable
                @blur="docAboutBlur"
                @change="docAboutChange"
                v-model="docForm.docAbout"
                placeholder="填写或选择机构"
              >
                <el-option
                  v-for="item in docAboutTipArr"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item prop="historyAuth" label="关键词：">
              <el-select

                @blur="keyword2Blur"
                @change="keyword2Complete"
                filterable
                v-model="docForm.keyword2"
                placeholder="选择或填写关键词(可不填)"
              >
                <el-option
                  v-for="item in keyword2TipArr"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 问题分卷法 -->
      <div v-if="docType != 'officialJ'">
        <el-row :gutter="24">
          <div v-if="isKJ">
            <el-col :span="12">
              <!-- <el-form-item prop="batchName" label="项目:">
            <el-input
              @blur="docAboutBlur"
              size="normal"
              type="text"
              v-model="docForm.docAbout"
              auto-complete="off"
              placeholder="根据文件填写"
            ></el-input>
          </el-form-item> -->

              <el-form-item prop="historyAuth" label="项目：">
                <el-select
   
                  filterable
                  @blur="docAboutBlur"
                  @change="docAboutChange"
                  v-model="docForm.docAbout"
                  placeholder="填写或选择项目"
                >
                  <el-option
                    v-for="item in docAboutTipArr"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="historyAuth" label="项目词：">
                <el-select

                  @blur="keywordBlur"
                  @change="keywordComplete"
                  filterable
                  v-model="docForm.keyword"
                  placeholder="选择或填写项目词"
                >
                  <el-option
                    v-for="item in keywordTipArr"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </div>

          <div v-if="!isKJ">
            <el-col :span="12">
              <!-- <el-form-item prop="batchName" label="机构/问题：">
            <el-input
              @blur="docAboutBlur"
              size="normal"
              type="text"
              v-model="docForm.docAbout"
              auto-complete="off"
              placeholder="根据文件填写"
            ></el-input>
          </el-form-item> -->

              <el-form-item prop="historyAuth" label="问题：">
                <el-select
                  ref="docAbout"
                  id = "docAbout"
          @keydown.native="fastNext($event)"

                  filterable
                  @blur="docAboutBlur"
                  @change="docAboutChange"
                  v-model="docForm.docAbout"
                  placeholder="填写或选择问题"
                >
                  <el-option
                    v-for="item in docAboutTipArr"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item prop="historyAuth" label="问题词：">
                <el-select
                  ref="keyword"
                  id="keyword"
          @keydown.native="fastNext($event)"

                  @blur="keywordBlur"
                  @change="keywordComplete"
                  
                  filterable
                  v-model="docForm.keyword"
                  placeholder="选择或填写问题词"
                >
                  <el-option
                    v-for="item in keywordTipArr"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </div>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="文件级别：">
            <el-select
              v-model="docForm.docLevel"
              @change="levelCompelete"
          ref="docLevel"
          id="docLevel"
          @keydown.native="fastNext($event)"

          filterable

              placeholder="选择文件级别"
            >
              <el-option
                v-for="item in docLevels"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="batchName" label="文件期限(年)：">
            <el-select v-model="docForm.deadline" 
                          ref="deadline"
          id="deadline"
          @keydown.native="fastNext($event)"
          filterable
            placeholder="选择文件期限">
              <el-option
                v-for="item in docTimeDues"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item prop="batchName" label="责任者：">
            <el-select

                            ref="dutyAuthor"
          id="dutyAuthor"
          @keydown.native="fastNext($event)"

              @blur="dutyAuthorBlur"
              @change="dutyAuthorComplete"
              filterable
              v-model="docForm.dutyAuthor"
              auto-complete="off"
              placeholder="输入档案责任者"
            >
              <el-option
                v-for="item in dutyAuthorTipArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="发文日期：">
            <el-date-picker
              type="date"
              placeholder="选择发文日期"
              v-model="docForm.docDate"
              value-format="yyyyMMdd"
              :picker-options="pickerOptions"
              @change="selectDateChange"
                            ref="docDate"
          id="docDate"
          @keydown.native="fastNext($event)"

            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="batchName" label="文件页数：">
            <el-input
              size="normal"
              type="text"
              v-model="docForm.docPage"
                            ref="docPage"
          id="docPage"
          @keydown.native="fastNext($event)"

              auto-complete="off"
              placeholder="根据文件填写"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <!-- <el-col :span="12">
          <el-form-item v-show="false" prop="batchName" label="责任者简称：">
            <el-input
              size="normal"
              type="text"
              v-model="docForm.docDescNum"
              auto-complete="off"
              placeholder="文号中的责任者简称"
            ></el-input>
          </el-form-item>
        </el-col> -->

        <el-col :span="12">
          <!-- <el-form-item prop="batchName" label="关键词：">
 
            <el-input
              @click="checkTitle"
              size="normal"
              type="text"
              v-model="docForm.keyword"
              auto-complete="off"
              placeholder="请先填写文件标题"
            ></el-input>
          </el-form-item> -->

          <el-form-item prop="batchName" label="文件密级：">
            <el-select v-model="docForm.docSecret"
                          ref="docSecret"
          id="docSecret"
          @keydown.native="fastNext($event)"
          filterable
           placeholder="选择文件密级">
              <el-option
                v-for="item in docSecrets"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="batchName" label="整档年度：">
            <el-date-picker
              type="year"
              placeholder="选择整档年度"
              v-model="docForm.sortYear"
              value-format="yyyy"
              :picker-options="pickerOptions"
              @change="selectDateChange"
                            ref="sortYear"
          id="sortYear"
          @keydown.native="fastNext($event)"

            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item class="textArea" prop="batchName" label="备注信息：">
        <el-input
          type="textarea"
          :rows="2"
          class="textAreaInput"
          v-model="docForm.remark"
          auto-complete="off"
          placeholder="输入备注"
                                      ref="remark"
          id="remark"
          @keydown.native="fastNext($event)"

        ></el-input>
      </el-form-item>

      <div class="buttonGroup">
        <div
          class="topTextButtonBlue"
          v-if="fixDocFlag"
          size="big"
          style="float: left; margin-left: 40%"
          @click="fixDoc"
        >
          修改档案
        </div>
        <div
          class="topTextButtonBlue"
          type="success"
          v-if="!fixDocFlag"
          size="big"
          style="float: left; margin-left: 30%"
          @click="addDoc"
        >
          添加档案
        </div>

        <div
          class="topTextButtonBlue"
          type="primary"
          size="big"
          style="float: left; margin-left: 10%"
          @click="resetDocIn"
          v-if="!fixDocFlag"
        >
          清空列表
        </div>
        <div
          class="topTextButtonBlue"
          type="warning
          "
          size="big"
          style="float: left; margin-left: 10%"
          @click="goDetail"
          v-if="!fixDocFlag"
        >
          结束录入
        </div>

        <div
          class="topTextButtonBlue"
          type="primary"
          size="big"
          style="float: left; margin-left: 10%"
          @click="cancelFix"
          v-if="fixDocFlag"
        >
          取消修改
        </div>
      </div>
    </el-form>

    <el-form
      v-if="isRS"
      class="docInForm"
      ref="docForm"
      :model="docFormRS"
      label-width="10rem"
    >
      <!-- <div class="docTypeTitle">sessionStorage批次</div> -->
      <div class="docSequenceTip">
        本份文件唯一识别号：{{ this.docFormRS.docSequence }}
      </div>

      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item prop="batchName" label="材料标题：">
            <el-input
              @blur="titleComplete"
              oninput="titleInput()"
              size="normal"
              type="text"
              v-model="docFormRS.docTitle"
              auto-complete="off"
              placeholder="根据材料填写"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <!-- <el-form-item prop="batchName" label="关键词：">
            <el-input
              size="normal"
              type="text"
              v-model="docFormRS.keyword"
              auto-complete="off"
              placeholder="填写关键词"
            ></el-input>
          </el-form-item> -->
          <el-form-item prop="historyAuth" label="关键词：">
            <el-select

              filterable
              v-model="docFormRS.keyword"
              placeholder="选择或填写关键词"
              @blur="keywordBlur"
            >
              <el-option
                v-for="item in keywordTipArr"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="姓名：">
            <el-input
              size="normal"
              type="text"
              v-model="docFormRS.personName"
              auto-complete="off"
              placeholder="填写姓名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="batchName" label="材料形成时间：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="docFormRS.docDate"
              value-format="yyyyMMdd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- erhang -->
      <el-row :gutter="24"></el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="材料类别：">
            <el-select v-model="docFormRS.docAbout" placeholder="选择材料类别">
              <el-option
                v-for="item in RSTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="z" label="子材料类别：">
            <el-select
              v-model="docFormRS.docAboutSub"
              placeholder="选择子材料类别"
            >
              <el-option
                v-for="item in RSSubTypes"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item prop="batchName" label="文件页数：">
            <el-input
              size="normal"
              type="text"
              v-model="docFormRS.docPage"
              auto-complete="off"
              placeholder="根据文件填写"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item class="textArea" prop="batchName" label="备注信息：">
          <el-input
            type="textarea"
            :rows="2"
            class="textAreaInput"
            v-model="docFormRS.remark"
            auto-complete="off"
            placeholder="输入备注"
          ></el-input>
        </el-form-item>
      </el-row>
      <!-- <el-form-item class="textArea" prop="batchName" label="备注信息：">
        <el-input
          type="textarea"
          :rows="2"
          class="textAreaInput"
          v-model="docFormRS.remark"
          auto-complete="off"
          placeholder="输入备注"
        ></el-input>
      </el-form-item>-->

      <div class="buttonGroup">
        <div
          class="topTextButtonBlue"
          type="warning"
          v-if="fixDocFlag"
          style="float: left; margin-left: 30%; width: 4rem"
          @click="fixDocRS"
        >
          修改档案
        </div>
        <div
          class="topTextButtonBlue"
          type="success"
          v-if="!fixDocFlag"
          style="float: left; margin-left: 20%; width: 4rem"
          @click="addDocRS"
        >
          添加档案
        </div>
        <div
          class="topTextButtonBlue"
          type="primary"
          style="float: left; margin-left: 20%; width: 4rem"
          @click="resetDocInRS"
          v-if="!fixDocFlag"
        >
          清空列表
        </div>

        <div
          class="topTextButtonBlue"
          v-if="!fixDocFlag"
          style="float: left; margin-left: 20%; width: 4rem"
          @click="goDetail"
        >
          结束录入
        </div>

        <div
          class="topTextButtonBlue"
          type="primary"
          style="float: left; margin-left: 10%; width: 4rem"
          @click="cancelFixRS"
          v-if="fixDocFlag"
        >
          取消修改
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import Utils from "../../utils/doc.js";
import Left from "../common/History";
import axios from "axios";
// import { delete } from 'vue/types/umd';

export default {
  name: "docInput",
  components: {
    Left: Left,
  },
  destroyed() {
    console.log(this);
  },
  mounted() {
    this.$refs['docTitle'].focus();
    var dd = new Date();
    var inittime =
      dd.getHours() + "-" + dd.getMinutes() + "-" + dd.getSeconds() + "";
    console.log("init 一个detail" + inittime);
    this.initTime = inittime;

    var that = this;
    Utils.$on("changeThisDoc", function (doc) {
      console.log(Utils);
      // console.log(doc);
      console.log(that);
      var obj = Object.assign({}, doc);
      that.docForm = Object.assign({}, doc);
      that.docFormRS = Object.assign({}, doc);
      that.docForm.docDescAuthor = doc.docDescAuthor;
      if (doc.keword2 != "") {
        that.keyword2Check = true;
      }
      // alert(that.docForm.docDescAuthor)
      that.fixDocFlag = true;
      that.$store.state.tempDocSeq = doc.docSequence;
      that.$store.state.tempDocId = doc.id; //id用来修改文件

      // alert(that.TempdocSequence)
    });

    if (this.$store.state.tempDoc) {
      //从详情页跳转，  checked属性会在created后，
      //在mounted之前 所以这段不能放在created里 这段是根据跳转来的doc设置form，使得修改时checkbox正常显示
      var item=this.$store.state.tempDoc
      console.log("详情页得到的");
      console.log(this.$store.state.tempDoc);
      this.fixDocFlag = true;
      console.log(this.$store.state.tempDoc);
      this.docForm = Object.assign({}, this.$store.state.tempDoc);
      this.docFormRS = Object.assign({}, this.$store.state.tempDoc);
      this.docForm.docDescAuthor = this.$store.state.tempDoc.docDescAuthor;
            if (
        item.docDescAuthor == "true" ||
        item.docDescAuthor==true  ||
        item.docDescAuthor == "1"
      ) {
        console.log("勾选变成t")

         this.docForm.docDescAuthor = true;
      } else {
        console.log("勾选变成false")
         this.docForm.docDescAuthor = false;
      }


      console.log(this.$store.state.tempDoc.docDescAuthor);
      if (this.$store.state.tempDoc.keyword2 != "") {
        console.log(this.$store.state.tempDoc.keyword2);
        this.keyword2Check = true;
      }

      this.$store.state.tempDoc = "";
    } else {
      this.genId(6, 62); //1
    }
  },
  watch: {
    edocFormRSJS: {
      handler: (v, o) => {
        console.log(v.docAbout);
        console.log(o);
      },
      deep: true,
    },
    docFormDescJS1: {
      handler(v, o) {
        var desc = v;
        if (desc.indexOf("[") > 0) {
          console.log(desc);
        }
      },
      deep: true,
    },
    docFormJS: {
      handler(v, o) {
        return;
        // console.log(v)
        this.wordsNum = v.length;
        //  console.log(this.docForm)
        var len = v.length;
        // console.log(len)
        if (len > 10 && len < 15) {
          // alert(2)
          this.likelyHoodQuery();
        }
        if (len > 20 && len < 25) {
          this.likelyHoodQuery();
        }
      },
      deep: true,
    },

    docFormRSJS: {
      handler(val, oldVal) {
        // console.log(val);
        // console.log(oldVal);

        // if (val.docAbout != oldVal.docAbout) {
        //   this.docFormRS.docAboutSub = "";
        // }

        // console.log(val);
        if (val.docAbout == "工资、任免、退休材料") {
          this.RSSubTypes = this.RSSubTypesOrigin;
        } else if (val.docAbout == "学历学位、评聘专业职务材料") {
          this.RSSubTypes = [
            {
              name: "学历学位材料",
              value: "学历学位材料",
            },
            {
              name: "职称材料",
              value: "职称材料",
            },
          ];
        } else {
          this.docFormRS.docAboutSub = "无";
          this.RSSubTypes = [
            {
              name: "无",
              value: "无",
            },
          ];
        }

        if (
          val.docAbout == "学历学位、评聘专业职务材料" &&
          oldVal.docAbout != "学历学位、评聘专业职务材料"
        ) {
          this.docFormRS.docAboutSub = "";
        }
        if (
          val.docAbout == "工资、任免、退休材料" &&
          oldVal.docAbout != "工资、任免、退休材料"
        ) {
          this.docFormRS.docAboutSub = "";
        }
      },
      deep: true,
    },
    keyword_docAboutJsonJS: {
      handler(val, oldVal) {
        var attr;
        this.keywordTipArr = [];
        for (attr in this.keyword_docAboutJson) {
          this.keywordTipArr.push(attr);
        }
      },
    },

    docAbout_KeywordArrJsonJS: {
      handler(val, oldVal) {
        var attr;
        this.docAboutTipArr = [];
        for (attr in this.docAbout_KeywordArrJson) {
          this.docAboutTipArr.push(attr);
        }
      },
    },

    weightFormJS: {
      handler(val, oldVal) {
        var attr;
        this.keyword2TipArr = [];
        for (attr in this.weightForm.instituteKW2) {
          this.keyword2TipArr.push(attr);
        }
      },
    },
  },

  computed: {
    authName(){
      return sessionStorage.getItem("authName");

    },
    docType() {
      return sessionStorage.getItem("docType");
    },
    weightFormJS() {
      return this.weightForm;
    },
    keyword_docAboutJsonJS() {
      return this.keyword_docAboutJson;
    },

    docAbout_KeywordArrJsonJS() {
      return this.docAbout_KeywordArrJson;
    },

    replaceval() {
      return;
      var highlight = this.docForm.docTitle;
      const arr = JSON.parse(JSON.stringify(this.matchedDoc));
      const replaceReg = new RegExp(highlight, "g");
      const replaceString = `<font color='#F14F4A'>${highlight}</font>`;

      for (let i = 0; i < arr.length; i++) {
        // 开始替换
        arr[i].docTitle = arr[i].docTitle.replace(replaceReg, replaceString);
        // if(arr[i].batchId==sessionStorage.getItem('batchId')){
        //   arr[i].docTitle=arr[i].docTitle+`<font color='#FF4F4A'>----注：可能是本批重复文件！</font>`;
        // }
      }

      return arr;
    },
    docFormRSJS() {
      return JSON.parse(JSON.stringify(this.docFormRS));
    },
    docFormJS() {
      return this.docForm.docTitle;
    },
    docFormDescJS() {
      return this.docForm.docDesc;
    },
    isRS() {
      return sessionStorage.getItem("docType") == "personnel";
    },
    isKJ() {
      return sessionStorage.getItem("docType") == "science";
    },
  },

  data() {
    return {
      nowId:1,//焦点id

      docDescRepeatNum:0, //文号输入完后检测有无重复 没有的话 后面还需要多重条件判断重复
      initTime: "",
      DescWigArr: [],
      levelTemp: "", //暂存的提交级别 因此异步提交不会在提交时被清空
      docSequenceLock: 0, //会出现识别号重复的问题

      selectDocNoTable: false,
      /**下拉框初始化 */
      docAboutTipArr: [],
      keywordTipArr: [],
      dutyAuthorTipArr: [],

      keyword2TipArr: [],

      docAbout_KeywordArrJson: {},
      keyword_docAboutJson: {},
      authorKwToDeadlineTable: {},

      chufa: 1, //点击相似文档后不要触发了
      likelyTipShowFlag: false,
      matchedDoc: [],
      wordsNum: 3,
      addDocBtnFlg: true,
      kwInTitle: [],
      rsDocTypeMain: "",
      matchedKV: [],
      tipShowFlag: false,
      keywordTemp: "",
      keyword2Temp: "",
      searchForm: {
        batchId: sessionStorage.getItem("batchId"),
        docSequence: "",
        docTitle: "",
        docDesc: "",
        docDate: "",
        dutyAuthor: "",
        docType: "",
        personName: "",
        authId:"",
      },
      docFormRS: {
        id: "",
        docSequence: "", //序列号，标识文件
        docType: "",
        docTitle: "填写标题", //标题
        docAbout: "",
        docAboutSub: "",
        keyword: "关键字", //关键字
        // docDesc: "", //文号
        // sortYear: "2019",
        docDate: "",
        docTypeCode: sessionStorage.getItem("docTypeCode"),

        docSecret: "", //文件密级
        docPage: "",
        remark: "", //备注
        docNum: "", //件号
        personName: "",
        docDescAuthor: false, //文号中的序号
      },
      docFormRSKong: {
        id: "",
        docSequence: "", //序列号，标识文件
        docType: "",
        docTitle: "", //标题
        docAbout: "",
        docAboutSub: "",
        keyword: "", //关键字
        // docDesc: "", //文号
        // sortYear: "2019",
        docDate: "",
        docTypeCode: sessionStorage.getItem("docTypeCode"),

        docSecret: "", //文件密级
        docPage: "",
        remark: "", //备注
        docNum: "", //件号
        personName: "",
        docDescAuthor: false, //文号中的序号
      },

      showWaitingFlag: false,
      weightForm: {},
      manageKeyWordTime: 1,
      keyWordEdit: false,
      fixDocFlag: false,
      RSSubTypesOrigin: [
        {
          name: "工资情况材料",
          value: "工资情况材料",
        },
        {
          name: "任免材料",
          value: "任免材料",
        },
        {
          name: "出国、出境材料",
          value: "出国、出境材料",
        },
        {
          name: "各党派、团体代表登记表",
          value: "各党派、团体代表登记表",
        },
        {
          name: "聘用、录用、转干、转业材料",
          value: "聘用、录用、转干、转业材料",
        },
        {
          name: "待遇、退（离）休、退职材料",
          value: "待遇、退（离）休、退职材料",
        },
      ],
      RSSubTypes: [
        {
          name: "工资情况材料",
          value: "工资情况材料",
        },
        {
          name: "任免材料",
          value: "任免材料",
        },
        {
          name: "出国、出境材料",
          value: "出国、出境材料",
        },
        {
          name: "各党派、团体代表登记表",
          value: "各党派、团体代表登记表",
        },
        {
          name: "聘用、录用、转干、转业材料",
          value: "聘用、录用、转干、转业材料",
        },
        {
          name: "待遇、退（离）休、退职材料",
          value: "待遇、退（离）休、退职材料",
        },
      ],
      RSTypes: [
        {
          name: "履历材料",
          value: "履历材料",
        },
        {
          name: "自传材料",
          value: "自传材料",
        },
        {
          name: "鉴定、考核、考察材料",
          value: "鉴定、考核、考察材料",
        },
        {
          name: "学历学位、评聘专业职务材料",
          value: "学历学位、评聘专业职务材料",
        },
        {
          name: "政治历史情况审查材料",
          value: "政治历史情况审查材料",
        },
        {
          name: "入党入团材料",
          value: "入党入团材料",
        },
        {
          name: "奖励材料",
          value: "奖励材料",
        },
        {
          name: "处分材料",
          value: "处分材料",
        },
        {
          name: "工资、任免、退休材料",
          value: "工资、任免、退休材料",
        },
        {
          name: "其他可供参考的材料",
          value: "其他可供参考的材料",
        },
      ],
      docLevels: [
        {
          name: "部级",
          value: "部级",
        },
        {
          name: "省级",
          value: "省级",
        },
        {
          name: "市级",
          value: "市级",
        },
        {
          name: "县级",
          value: "县级",
        },
        {
          name: "本级",
          value: "本级",
        },
        {
          name: "乡级",
          value: "乡级",
        },
      ],

      docTimeDues: [
        {
          name: "永久",
          value: "永久",
        },
        {
          name: "备查",
          value: "备查",
        },
        {
          name: "长期",
          value: "长期",
        },
        {
          name: "100年",
          value: "100年",
        },
        {
          name: "30年",
          value: "30年",
        },
        {
          name: "10年",
          value: "10年",
        },
      ],
      docSecrets: [
        {
          name: "无",
          value: "无",
        },
        {
          name: "秘密",
          value: "秘密",
        },
        {
          name: "机密",
          value: "机密",
        },
        {
          name: "绝密",
          value: "绝密",
        },
      ],
      keyword2Check: false,
      docForm: {
        id: "",
        docSequence: "", //序列号，标识文件
        docType: "",
        docTitle: "", //标题
        docAbout: "",
        keyword: "", //关键字
        keyword2: "", //机构词
        docDesc: "", //文号
        sortYear: sessionStorage.getItem("docTypeCode"),
        docDate: "",
        docTypeCode: sessionStorage.getItem("docTypeCode"),
        docLevel: "",
        docDescNum: "", //责任者简称
        dutyAuthor: "", //责任者
        deadline: "", //文件期限
        docSecret: "", //文件密级
        docPage: "",
        remark: "", //备注
        docNum: "", //件号
        boxNumber: "", //盒号
        docDescAuthor: true, //是否有文号
        deleted: 0,
      },

      docFormKong: {
        id: "",
        docSequence: "", //序列号，标识文件
        // docSequence:'',//序列号，标识文件
        docType: "",
        docTitle: "", //标题
        docAbout: "",
        keyword: "", //关键字
        docDesc: "", //文号
        sortYear: "",
        docDate: "",
        docTypeCode: "",
        keyword2: "",
        docLevel: "",
        docDescNum: "", //责任者简称
        dutyAuthor: "", //责任者
        deadline: "", //文件期限
        docSecret: "", //文件密级
        docPage: "",
        remark: "", //备注
        docNum: "", //件号
        boxNumber: "", //盒号
        docDescAuthor: true, //文号中的序号
        deleted: 0,
      },

      TempdocSequence: "",

      aiInput: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date("1995/5/1");
        },
      },
    };
  },
  methods: {
    fastNext(e){
      console.log(e)
      if(e.key=="ArrowRight"){
        console.log("down")
        var next=false;
        var pre=""
        for(var key in this.$refs){
          console.log(key)
          if(key==e.srcElement.id){
            next=true
            pre = key
          }
          if(next){
            if(this.$refs[key]&&key!=e.srcElement.id){
              console.log("聚焦于下一个有效的")
              this.$refs[key].focus()
              this.$refs[pre].blur()
              break;
            }
 
          }
        }

      }
            if(e.key=="ArrowLeft"){
        console.log("pre")
        var next=false;
        var pre=""
        var reverse =[]
          for(var key in this.$refs){
            reverse.push(key)
          }

          for (var i =reverse.length;i>=0 ;i--){
            var key=reverse[i]
                      console.log(key)
          if(key==e.srcElement.id){
            next=true
            pre = key
          }
          if(next){
            if(this.$refs[key]&&key!=e.srcElement.id){
              console.log("聚焦于shang一个有效的")
              this.$refs[key].focus()
              this.$refs[pre].blur()
              break;
            }
 
          }
          }
 

      }
          
    },
      // fastNext(e){
      // if(e.key=="ArrowRight"){
      //   if(this.docForm.docDescAuthor){
      //     this.$refs["docDesc"].focus();
      //   }
      // }
    //},
    keyword2CkbChange(e) {
      // console.log(e)
      if (e == "false" || !e) {
        this.keyword2Check = false;
        this.docForm.keyword2 = "";
      } else if (e == "true" || e) {
        keyword2Check = true;
        // this.docForm.docDesc = "";
        // this.docForm.docDescNum = "";
      }
    },
    sequenceFocus() {
      //       this.$confirm(
      //   "确定要手动修改吗：",
      //   "提示",
      //   {
      //     cancelButtonClass: "btn-custom-cancel",
      //     confirmButtonText: "是的",
      //     cancelButtonText: "否",
      //     type: "warning",
      //   }
      // ).then(()=>{
      // }).catch(()=>{
      // }
      // )
    },
    // sequenceBlur(){
    //   // var orig=this.doc

    //   this.docForm.docSequence=
    // },
        docAboutBlur(e) {

      var input = e.target.value;
      this.docForm.docAbout = input;

      if(this.docForm.docAbout==""){
        console.log("问题没了，换整个数组")
                this.keywordTipArr = [];
        for (var attr in this.keyword_docAboutJson) {
          this.keywordTipArr.push(attr);
        }
      }
    },

    docAboutChange() {
      console.log(this.keywordTipArr);
      console.log(this.docAbout_KeywordArrJson);
      this.keywordTipArr = this.docAbout_KeywordArrJson[this.docForm.docAbout];
    },
    dutyAuthorBlur(e) {
      var input = e.target.value;
      this.docForm.dutyAuthor = input;
      // this.docFormRS.dutyAuthor = input;
        if(this.docForm.dutyAuthor.indexOf(" ")>0){
                this.$confirm("检查到了空格，多余空格会影响后续记忆录入， 是否去除", "提示", {
          cancelButtonClass: "btn-custom-cancel",
          confirmButtonText: "好的",
          cancelButtonText: "保留空格",
          type: "warning",
        }).then(() => {
          this.docForm.dutyAuthor=this.docForm.dutyAuthor.replace(/\s+/g,"")
        });
      }
      this.authorAndKwToDeadline(); //1
    },
    keywordBlur(e) {
      var input = e.target.value;
      this.docForm.keyword = input;
      this.docFormRS.keyword = input;

      console.log(input);
 if(this.docForm.keyword.indexOf(" ")>-1){
                this.$confirm("检查到了空格，多余空格会影响后续记忆录入， 是否去除", "提示", {
          cancelButtonClass: "btn-custom-cancel",
          confirmButtonText: "好的",
          cancelButtonText: "保留空格",
          type: "warning",
        }).then(() => {
          console.log(this.docForm.keyword)
          this.docForm.keyword=this.docForm.keyword.replace(/\s+/g,"")
          console.log(this.docForm.keyword)

        });

      }

      this.authorAndKwToDeadline(); //1
    },
    keyword2Blur(e) {
      
      var input = e.target.value;
      this.docForm.keyword2 = input;

      console.log(input);
      if(this.docForm.keyword2.indexOf(" ")>-1){
                this.$confirm("检查到了空格，多余空格会影响后续记忆录入， 是否去除", "提示", {
          cancelButtonClass: "btn-custom-cancel",
          confirmButtonText: "好的",
          cancelButtonText: "保留空格",
          type: "warning",
        }).then(() => {
          this.docForm.keyword2=this.docForm.keyword2.replace(/\s+/g,"")
        });
      }
      // this.authorAndKwToDeadline();
    },

    initTable() {},
    initNull() {
      if (this.weightForm.officialDescAuthor == null) {
        this.weightForm.officialDescAuthor = {};
      }
      if (this.weightForm.officialLevelKeywordDeadline == null) {
        this.weightForm.officialLevelKeywordDeadline = {};
      }
      if (this.weightForm.tecDescAuthor == null) {
        this.weightForm.tecDescAuthor = {};
      }
      if (this.weightForm.tecLevelKeywordDeadline == null) {
        this.weightForm.tecLevelKeywordDeadline = {};
      }
      if (this.weightForm.busDescAuthor == null) {
        this.weightForm.busDescAuthor = {};
      }
      if (this.weightForm.busLevelKeywordDeadline == null) {
        this.weightForm.busLevelKeywordDeadline = {};
      }
      
    },
    closeDocTip() {
      this.matchKvFunc();

      this.likelyTipShowFlag = false;
    },

    selectThisDoc(item) {
      this.selectDocNoTable = true; //选了历史文件就不要根据对照表识别关键词和问题了
      var itemId = item.id;
      var docToSet;
      for (var i in this.matchedDoc) {
        if (this.matchedDoc[i].id == itemId) {
          docToSet = this.matchedDoc[i];
        }
      }

            this.genId(6, 62); //1
      var docTitleTemp = this.docForm.docTitle;
      var docTitleTemp1 = this.docFormRS.docTitle;

      this.likelyTipShowFlag = false;
      this.docForm.deadline = docToSet.deadline; //替换  "依照选取文件的机构问题名，保管期限，关键词"
      this.docForm.keyword = docToSet.keyword;
      this.docForm.docAbout = docToSet.docAbout;
      this.docForm.docTitle = docTitleTemp;


            this.docFormRS.docTitle = docTitleTemp1;
      this.docFormRS.personName = docToSet.personName;
      this.docFormRS.keyword = docToSet.keyword;


      return
      var docTitleTemp = this.docForm.docTitle;
      var docTitleTemp1 = this.docFormRS.docTitle;
      var sortYearT = this.docForm.sortYear; //保留密级和年度
      var docSecretT = this.docForm.docSecret;
      var docDescAuthorT = this.docForm.docDescAuthor;
      var docDescT = this.docForm.docDesc;
      var docDescNumT = this.docForm.docDescNum;
      this.resetDocInRS();
      this.resetDocIn();

      this.docForm.docTitle = docTitleTemp;
      this.docForm.sortYear = sortYearT;
      this.docForm.docSecret = docSecretT; //保留
      this.docForm.docDescAuthor = docDescAuthorT;
      this.docForm.docDesc = docDescT;
      this.docForm.docDescNum = docDescNumT;

      this.docForm.deadline = docToSet.deadline; //替换  "依照选取文件的机构问题名，保管期限，关键词"
      this.docForm.keyword = docToSet.keyword;
      this.docForm.docAbout = docToSet.docAbout;
      // this.docForm.dutyAuthor = docToSet.dutyAuthor;
      // this.docForm.docLevel = docToSet.docLevel;

      this.docFormRS.docTitle = docTitleTemp1;

      this.docFormRS.personName = docToSet.personName;
      this.docFormRS.keyword = docToSet.keyword;

      // this.docForm.
      this.genId(6, 62); //1

      this.likelyTipShowFlag = false;
    },

    likelyHoodQuery() {
      //  this.postRequest(
      //   //注意防止重复提交
      //   "/document/list/fulltext/"+sessionStorage.getItem("docType"),
      //   this.docForm.docTitle
      // ).then((resp) => {
      //   console.log(resp)
      // });
      // return

      if (!this.aiInput) {
        return;
      }
      if (this.$store.state.noChufa) {
        //修改不触发
        this.$store.state.noChufa = false;

        return;
      }
      /*
      if (this.chufa == 0) { //防止无法输入  间断触发
        this.chufa = 1;
        return;
      }
      if (this.chufa == 1) {
        this.chufa = 0;
      }
      //这段是 连续输入的时候
*/
      var tit = this.docForm.docTitle;
      if (this.docForm.docTitle == "") {
        tit = "淦淦淦淦淦淦淦";
      }
      this.postRequest(
        //注意防止重复提交
        "/document/list/fulltext/" + sessionStorage.getItem("docType"),
        tit
      ).then((resp) => {
        if (resp.code == 0 && resp.data.length > 0) {
          this.likelyTipShowFlag = true;
          this.matchedDoc = resp.data;

          this.$message({
            type: "success",
            message:
              "识别出可能相似的文件，助您快速录入，请选择后检查是否需要修改",
          });
        } else if (resp.code == 0 && resp.data.length == 0) {
          this.matchKvFunc(); //关闭或者没有历史匹配就去从标题匹配
        }
      });

      // var docObj = {
      //   // userId:sessionStorage.getItem
      //   docType: sessionStorage.getItem("docType"),
      //   authId: sessionStorage.getItem("authId"),
      //   docTitle:
      //     sessionStorage.getItem("docType") == "personnel"
      //       ? this.docFormRS.docTitle
      //       : this.docForm.docTitle,
      //   // docSequence:4
      // };

      // var pathToDoc =
      //   "/document/list/like/" +
      //   sessionStorage.getItem("docType") +
      //   "?pageNow=0&pageSize=900000";
      // this.postRequest(
      //   //注意防止重复提交
      //   pathToDoc,
      //   JSON.stringify(docObj)
      // ).then((resp) => {
      //   if (resp.data.content.length != 0) {
      //     this.likelyTipShowFlag = true;
      //     this.matchedDoc = resp.data.content;
      //   }
      // });
    },
    titleInput() {
      console.log(this.docForm.docTitle);
    },

    docDescComplete() {

      if (this.docForm.docDesc == "") {
        return;
      }
      if (this.docForm.docDesc.length < 2) {
        console.log("asdsa")

        return;
      }
      if(this.fixDocFlag){
        console.log("修改中啊啊啊啊")
        return;
      }
      console.log(this.docForm.docDesc);

      var a = this.docForm.docDesc.replace(/【/g, "[");

      var b = a.replace(/】/g, "]");
      b = b.replace(/{/g, "[");
      b = b.replace(/}/g, "]");

      if(this.docForm.docDesc.indexOf(" ")>0){
                this.$confirm("检查到了空格，多余空格会影响后续记忆录入， 是否去除", "提示", {
          cancelButtonClass: "btn-custom-cancel",
          confirmButtonText: "好的",
          cancelButtonText: "保留空格",
          type: "warning",
        }).then(() => {
          this.docForm.docDesc=this.docForm.docDesc.replace(/\s+/g,"")
        });
      }

      this.docForm.docDesc = b;
      var searchPath =
        "/document/list/page/" +
        sessionStorage.getItem("docType") +
        "?pageNow=0&pageSize=900000";

      var searchObj = {
        batchId: sessionStorage.getItem("batchId"),  //文号输入完 批内查重
        docDesc: this.docForm.docDesc,
        docType: sessionStorage.getItem("docType"),
      };

      if(this.fixDocFlag){
        return;
      }

      this.postRequest(
        //注意防止重复提交
        searchPath,
        JSON.stringify(searchObj)
      ).then((resp) => {
        console.log("输完文号后检查是否重复1111111");
        console.log(resp);
        var repeatArr = [];
        for (var i in resp.data.content) {
          var k=resp.data.content[i]
          var repeatStr=k.docSequence+"题名："+k.docTitle+"\nabout："+k.docAbout+",文号："+k.docDesc+",日期："+k.docDate+
          ",责任者"+k.dutyAuthor+",页数："+k.docPage
          repeatArr.push(repeatStr);
        }

        if (resp.data.content.length != 0) {
          this.docDescRepeatNum=resp.data.content.length //文号不重复 就不要在addDOc时判断多个条件了
          this.$confirm(
            "请检查是否录入重复:" + repeatArr,
            "提示",
            {
              cancelButtonClass: "btn-custom-cancel",
              confirmButtonText: "没有重复，继续录入",
              cancelButtonText: "好的",
              type: "warning",
            }
          );
        }
      });

      var descText;
      if (b.indexOf("[") > 0) {
        descText = b.split("[")[0];
      }
      if (this.descToAuthor[descText] != null) {
        this.$message({
          type: "success",
          message: "系统根据对照表识别出责任者",
        });
        this.docForm.dutyAuthor = this.descToAuthor[descText];
      }

      console.log(this.docForm.docDesc);

      var index = this.docForm.docDesc.indexOf("号") - 1;
      var numStr;
      var numStrl;
      if (index > 0) {
        numStr = this.docForm.docDesc.charAt(index);

        while (index > 0 && this.isNumber(numStr)) {
          numStrl = numStr;
          index--;
          numStr = this.docForm.docDesc.charAt(index) + numStr;
        }
        this.docForm.docDescNum = numStrl;
      }
    },
    keyword2Complete() {},
    keywordComplete() {
      console.log("keyword选择")

      // console.log(this.authorKwToDeadlineTable);
      // this.authorAndKwToDeadline();
      if (
        this.docForm.docAbout != this.keyword_docAboutJson[this.docForm.keyword]
      ) {
        this.$message({
          type: "success",
          message: "系统根据对照表识别出问题",
        });
      }
        this.docForm.docAbout = this.keyword_docAboutJson[this.docForm.keyword];

    },
    levelCompelete() {
      if (this.docForm.docLevel == "本级") {
        this.docForm.dutyAuthor = sessionStorage.getItem("authName");
        this.docForm.deadline = "永久";
      }
    },
    authorAndKwToDeadline() {
      //根据责任者和关键词识别期限
      //var key = this.docForm.dutyAuthor + "~" + this.docForm.keyword;
      console.log(11111111111)
      var ddl=""
      for(var i in this.authorKwToDeadlineTable){
        console.log(i)
        var arr = this.authorKwToDeadlineTable[i];
        arr=JSON.parse(arr)
        for(var k in arr){
          var ar=arr[k]
            console.log(ar)

          if(ar[0]==this.docForm.keyword&&ar[1]==this.docForm.dutyAuthor){
            ddl=i
          }
        }
      }
      console.log(this.authorKwToDeadlineTable);
     
      if (ddl.length>0) {
        this.$message({
          type: "success",
          message: "系统根据对照表识别出保管期限",
        });
        var dd = ddl
        dd = dd.split("年")[0];
        this.docForm.deadline = dd;
      }
    },
    getRsText(code) {
      if (code == 1 || code == "1") {
        this.rsDocTypeMain = "履历材料";

        return "无";
      }
      if (code == 2 || code == "2") {
        this.rsDocTypeMain = "自传材料";

        return "无";
      }
      if (code == 3 || code == "3") {
        this.rsDocTypeMain = "鉴定、考核、考察材料";

        return "无";
      }
      if (code == 4 || code == "4") {
        this.rsDocTypeMain = "学历学位、评聘专业职务材料";

        return "学历学位材料";
      }
      if (code == 5 || code == "5") {
        this.rsDocTypeMain = "学历学位、评聘专业职务材料";

        return "职称材料"; //return 子材料
      }
      if (code == 6 || code == "6") {
        this.rsDocTypeMain = "政治历史情况审查材料";

        return "无";
      }
      if (code == 7 || code == "7") {
        this.rsDocTypeMain = "入党入团材料";
        return "无";
      }
      if (code == 8 || code == "8") {
        this.rsDocTypeMain = "奖励材料";
        return "无";
      }
      if (code == 9 || code == "9") {
        this.rsDocTypeMain = "处分材料";
        return "无";
      }
      if (code == 10 || code == "10") {
        this.rsDocTypeMain = "工资、任免、退休材料";

        return "工资情况材料"; //return 子材料
      }
      if (code == 11 || code == "11") {
        this.rsDocTypeMain = "工资、任免、退休材料";

        return "任免材料"; //return 子材料
      }
      if (code == 12 || code == "12") {
        this.rsDocTypeMain = "工资、任免、退休材料";

        return "出国、出境材料"; //return 子材料
      }
      if (code == 13 || code == "13") {
        this.rsDocTypeMain = "工资、任免、退休材料";

        return "各党派、团体代表登记表"; //return 子材料
      }
      if (code == 14 || code == "14") {
        this.rsDocTypeMain = "工资、任免、退休材料";

        return "聘用、录用、转干、转业材料"; //return 子材料
      }
      if (code == 15 || code == "15") {
        this.rsDocTypeMain = "工资、任免、退休材料";

        return "待遇、退（离）休、退职材料"; //return 子材料
      }
      if (code == 16 || code == "16") {
        this.rsDocTypeMain = "其他可供参考的材料";
        return "无";
      }
    },
    closeTip() {
      this.tipShowFlag = false;
    },
    selectDateChange(id) {
      var docDateYear = this.docForm.docDate.substring(0, 4);
      console.log(docDateYear);
      console.log(this.docForm.sortYear);
      if (docDateYear == null || this.docForm.sortYear == null) {
        return;
      }
      if (
        docDateYear == "" ||
        this.docForm.sortYear == "" ||
        this.docForm.docDate == ""
      ) {
        return;
      }

      if (docDateYear > this.docForm.sortYear) {
        this.$confirm("发文日期不能迟于整档年度", "提示", {
          cancelButtonClass: "btn-custom-cancel",
          confirmButtonText: "好的",
          cancelButtonText: "忽略此条规则",
          type: "warning",
        }).then(() => {
          this.docForm.docDate = 20190808 + "";
          this.docForm.sortYear = 2019 + "";
        });
      }

            if(this.fixDocFlag){
        return
      }


      var searchPath =
        "/document/list/page/" +
        sessionStorage.getItem("docType") +
        "?pageNow=0&pageSize=900000";

      this.searchForm.docType = sessionStorage.getItem("docType");

      {
        this.searchForm.docTitle = this.docForm.docTitle;
        this.searchForm.batchId=sessionStorage.getItem("batchId") //选完日期查重 批内

        // this.searchForm.docSequence=this.docForm.docSequence
        this.searchForm.docDesc = this.docForm.docDesc;
        this.searchForm.docDate = this.docForm.docDate;
        this.searchForm.dutyAuthor = this.docForm.dutyAuthor;
        this.searchForm.personName = "";
      }
      var searchObj = Object.assign({}, this.searchForm);

      for (var key in searchObj) {
        if (searchObj[key] == "") {
          delete searchObj[key];
        }
      }

            if(this.fixDocFlag){
        return
      }

      this.postRequest(
        //注意防止重复提交
        searchPath,
        JSON.stringify(searchObj)
      ).then((resp) => {
        console.log("添加前检查是否重复");
        console.log(resp);
        var repeatArr = [];
        for (var i in resp.data.content) {
          var k=resp.data.content[i]
          var repeatStr=k.docSequence+"题名："+k.docTitle+"\nabout："+k.docAbout+",文号："+k.docDesc+",日期："+k.docDate+
          ",责任者"+k.dutyAuthor+",页数："+k.docPage
          repeatArr.push(repeatStr);
        }
        if (resp.data.content.length != 0 &&this.docDescRepeatNum==0) { //this.docDescRepeatNum==0 文号不重复才多个条件判断重复
          this.$confirm(
            "请检查是否录入重复：" + repeatArr,
            "提示",
            {
              cancelButtonClass: "btn-custom-cancel",
              confirmButtonText: "没有重复，继续",
              cancelButtonText: "好的，暂不录入",
              type: "warning",
            }
          );
        }
      });
    },
    resetDocInRS() {
      this.docFormRSKong.docSequence = this.docFormRS.docSequence;
      this.docFormRS = Object.assign({}, this.docFormRSKong);
    },
    resetDocIn() {
      this.docFormKong.docSequence = this.docForm.docSequence;
      this.docForm = Object.assign({}, this.docFormKong);
      // console.log(this.docFormKong);
    },
    isNumber(value) {
      if (isNaN(value)) {
        return false;
      } else {
        return true;
      }
    },
    checkAddRS() {
      if (
        !isNumber(this.docFormRS.docPage) ||
        this.docFormRS.personName == "" ||
        this.docFormRS.docPage == "" ||
        this.docFormRS.docDate == "" ||
        this.docFormRS.docTitle == "" ||
        this.docFormRS.docAboutSub == "" ||
        this.docFormRS.docAbout == "" ||
        this.docFormRS.keyword == ""
      )
        return false;
      else return true;
    },
    checkDeadline() {
      //检查期限 +检查在对照表里面 关键词是否对应问题
      // console.log(docTimeDues)
      var arr = this.docTimeDues;

      if (arr.indexOf(this.docForm.deadline) < 0) {
        this.$message({
          type: "error",
          message: "本批整档没有该保管期限",
        });
        return false;
      } else return true;
    },

    checkKeyword() {},
    dutyAuthorComplete() {
      this.authorAndKwToDeadline(); //1
    },
    checkAdd() {
      var bindedDocAbout = this.keyword_docAboutJson[this.docForm.keyword];
      console.log(this.keyword_docAboutJson);
      console.log(bindedDocAbout);

      if (
        !this.isNumber(this.docForm.docPage) ||
        this.docForm.docTitle == "" ||
        this.docForm.keyword == "" ||
        this.docForm.sortYear == "" ||
        this.docForm.docAbout == "" ||
        this.docForm.docDate == "" ||
        this.docForm.docLevel == "" ||
        this.docForm.dutyAuthor == "" ||
        this.docForm.docPage == "" ||
        this.docForm.deadline == "" ||
        this.docForm.docSecret == ""
      ) {
        this.$message({
          type: "error",
          message: "填写检查",
        });

        return false;
      } else if (this.docForm.docDescAuthor && this.docForm.docDesc == "") {
        this.$message({
          type: "error",
          message: "填写文号",
        });
        return false;
      } else if (bindedDocAbout && bindedDocAbout != this.docForm.docAbout) {
        //关键词已经绑定了
        this.$message({
          type: "error",
          message: "关键词和问题与对照表不符合，请修改或前往对照表修改",
        });
        return false;
      } else return true;
    },
    fixDocRS() {
      // this.fixDocFlag = false;

      var jobCode;
      if (this.docFormRS.docAbout == "履历材料") {
        jobCode = 1;
      } else if (this.docFormRS.docAbout == "自传材料") {
        jobCode = 2;
      } else if (this.docFormRS.docAbout == "鉴定、考核、考察材料") {
        jobCode = 3;
      }
      // else if (this.docFormRS.docAbout == "学历学位、评聘专业职务材料") {
      //   jobCode = 4;
      // }
      else if (this.docFormRS.docAbout == "政治历史情况审查材料") {
        jobCode = 6;
      } else if (this.docFormRS.docAbout == "入党入团材料") {
        jobCode = 7;
      } else if (this.docFormRS.docAbout == "奖励材料") {
        jobCode = 8;
      } else if (this.docFormRS.docAbout == "处分材料") {
        jobCode = 9;
      } else if (this.docFormRS.docAbout == "其他可供参考的材料") {
        jobCode = 16;
      }

      if (this.docFormRS.docAboutSub == "学历学位材料") {
        jobCode = 4;
      } else if (this.docFormRS.docAboutSub == "职称材料") {
        jobCode = 5;
      }

      if (this.docFormRS.docAboutSub == "工资情况材料") {
        jobCode = 10;
      }
      if (this.docFormRS.docAboutSub == "任免材料") {
        jobCode = 11;
      }
      if (this.docFormRS.docAboutSub == "出国、出境材料") {
        jobCode = 12;
      }
      if (this.docFormRS.docAboutSub == "各党派、团体代表登记表") {
        jobCode = 13;
      }
      if (this.docFormRS.docAboutSub == "聘用、录用、转干、转业材料") {
        jobCode = 14;
      }
      if (this.docFormRS.docAboutSub == "待遇、退（离）休、退职材料") {
        jobCode = 15;
      }

      var docObj = {
        deleted: 0,
        userId: sessionStorage.getItem("userIdNum"),
        authId: sessionStorage.getItem("authId"),
        batchId: sessionStorage.getItem("batchId"),
        docDate: this.docFormRS.docDate,
        docNum: "", //????
        docPage: this.docFormRS.docPage,
        docSequence: this.docFormRS.docSequence,
        docTitle: this.docFormRS.docTitle,
        docType: sessionStorage.getItem("docType"),
        keyword: this.docFormRS.keyword,
        docAbout: this.docFormRS.docAbout,
        docAboutSub: this.docFormRS.docAboutSub,
        personName: this.docFormRS.personName,
        personJob: jobCode,
        remark: this.docFormRS.remark,
        docTypeCode: sessionStorage.getItem("docTypeCode"),
      };

      if (this.checkAddRS()) {
        var keywordIssueJson;
        this.showWaitingFlag = true;
        var pathToDoc =
          "/document/" +
          sessionStorage.getItem("docType") +
          "/" +
          this.$store.state.tempDocId; //提交的时候返回id，左侧栏点击的时候放在tempDocId
        this.putRequest(
          //注意防止重复提交
          pathToDoc,
          JSON.stringify(docObj)
        )
          .then((resp) => {
            console.log("修改人事文件");

            console.log(docObj);
            console.log("修改人事文件的结果");
            console.log(resp);

            if (resp.code == 0) {
              var table;
              if (this.weightForm.perKeywordWig) {
                //已有权重表
                this.getRequest("/weight/sort/" + this.weightForm.perKeywordWig)
                  .then((resp) => {
                    //查询对应的权重表得到json
                    table = resp.data.tables;
                    var key1 = this.docFormRS.keyword;
                    keywordIssueJson = resp.keywordIssue;
                    if (keywordIssueJson == null) {
                      keywordIssueJson = {};
                    } //fixRs
                    keywordIssueJson[key1] = jobCode;

                    // var json1 = table;
                    if (table[key1] == null) {
                      table[key1] = "0";
                    }
                  })
                  .then((r) => {
                    var docAboutObj = {
                      authId: sessionStorage.getItem("authId"),
                      type: 41,
                      tables: table,
                      keywordIssue: keywordIssueJson, //
                    };

                    this.putRequest(
                      "/weight/" + this.weightForm.perKeywordWig,
                      docAboutObj
                    ).then((resp) => {
                      console.log("更新人事关键词权重表");
                      console.log(resp);
                      this.showWaitingFlag = false;
                    });
                  });
              } //if  已有权重表
              // else {
              //   var key1 = this.docFormRS.keyword;
              //   var json1 = {};
              //   json1[key1] = "0";

              //   var keyWordObj = {
              //     authId: sessionStorage.getItem("authId"),
              //     type: 41,
              //     tables: json1,
              //   };

              //   this.postRequest(
              //     //注意防止重复提交
              //     "/weight",
              //     JSON.stringify(keyWordObj)
              //   ).then((resp) => {
              //     console.log("第一次提交人事关键词权重表");
              //     console.log(resp);
              //     // console.log(this.weightForm=resp)
              //     this.weightForm = resp.data;
              //     if (resp.code == 0) {
              //       this.showWaitingFlag = false;
              //     }
              //   });
              // }

              var length = this.$store.state.alreadyDocs.length || 0;
              var _arr = this.$store.state.alreadyDocs;
              for (var i = 0; i < length; i++) {
                if (_arr[i].docSequence == this.$store.state.tempDocSeq) {
                  _arr.splice(i, 1); //删除下标为i的元素
                  break;
                }
              }
              this.$store.state.alreadyDocs.unshift(
                Object.assign({}, this.docFormRS)
              );
            }

            // this.docFormRS.id = resp.data.id;  //修改文件用
          })
          .then((r) => {
            // this.getRequest("/work/" + sessionStorage.getItem("batchId")) //
            //   .then((resp) => {
            //     // this.
            //   });

            this.docFormRS.docTitle = "";
            this.docFormRS.docPage = "";
            this.genId(6, 62);
            this.docFormRS.docDate.replace("-", "");

            this.showWaitingFlag = false;

            // console.log(this.docFormRS);
            // this.docForm.docTitle = "";
            // this.docForm.docPage = "";
          });
        this.$store.state.sortedFlag = false;
      } else {
        this.showWaitingFlag = false;
        this.$message({
          type: "error",
          message: "填写检查",
        });
      }
    },
    fixDoc() {
      this.showWaitingFlag = true;
      /**需要从store里删除 */
      // alert(this.TempdocSequence)

      if (this.checkAdd() && this.checkDeadline()) {
        /**需要从store里删除 */

        /**需要从store里删除 */

        // this.$store.state.alreadyDocs.unshift({  docKeyWord:this.docForm.docAbout||'无文件信息',
        //   docSequence:this.docForm.docSequence ,
        //   docNumber:''})
        var docDescNumTemp;
        if (this.docForm.docDescAuthor) {
          //有文号
          if (
            !this.docForm.docDescNum ||
            this.docForm.docDescNum == null ||
            this.docForm.docDescNum == ""
          ) {
            docDescNumTemp = 99998; //有文号，没有文号的数字
          } else {
            docDescNumTemp = this.docForm.docDescNum;
          }
        } else {
          docDescNumTemp = 99999; //没有文号
        }

        var docObj = {
          deleted: 0,
          keyword2: this.docForm.keyword2,
          // userId:JSON.stringify(sessionStorage.getItem("userId")),
          // userId: sessionStorage.getItem('userId'),
          userId: sessionStorage.getItem("userIdNum"),

          authId: sessionStorage.getItem("authId"),
          batchId: sessionStorage.getItem("batchId"),
          docDate: this.docForm.docDate,
          docNum: "", //件号
          boxSeq: "",
          docPage: this.docForm.docPage,
          docSequence: this.docForm.docSequence,
          docTitle: this.docForm.docTitle,
          docType: sessionStorage.getItem("docType"),
          keyword: this.docForm.keyword,
          remark: this.docForm.remark,
          deadline: this.docForm.deadline,
          docAbout: this.docForm.docAbout,
          docDesc: this.docForm.docDesc,
          pageTotal: "",
          // docDesc:
          //   this.docForm.docDescNum +
          //   "[" +
          //   this.docForm.docDate.substring(0, 4) +
          //   "]" +
          //   this.docForm.docDescAuthor +
          //   "号", //文号
          docPage: this.docForm.docPage,
          docDescNum: docDescNumTemp,
          docDescAuthor: this.docForm.docDescAuthor,
          docLevel: this.docForm.docLevel,
          docSecret: this.docForm.docSecret,
          docTypeCode: sessionStorage.getItem("docTypeCode"),
          dutyAuthor: this.docForm.dutyAuthor,
          sortYear: this.docForm.sortYear,
        };

        if (this.docForm.docDescAuthor != true) {
          docObj.docDesc = "";
          docObj.docDescNum = 99999;
        }
        var pathToDoc =
          "/document/" +
          sessionStorage.getItem("docType") +
          "/" +
          this.$store.state.tempDocId;
        this.putRequest(

          pathToDoc,
          JSON.stringify(docObj)
        )
          .then((resp) => {
            console.log("修改文件");

            console.log(docObj);
            console.log("修改文件的结果");
            console.log(resp);
            if (resp.code == 0) {
              var length = this.$store.state.alreadyDocs.length || 0;
              var _arr = this.$store.state.alreadyDocs;
              for (var i = 0; i < length; i++) {
                if (_arr[i].docSequence == this.$store.state.tempDocSeq) {
                  _arr.splice(i, 1); //删除下标为i的元素
                  break;
                }
              }
              this.docForm.docNum = "暂无";
              this.docForm.boxSeq = "暂无";
              this.$store.state.alreadyDocs.unshift(
                Object.assign({}, this.docForm)
              );

              this.fixDocFlag = false;
              this.showWaitingFlag = false;

              this.keywordTemp = this.docForm.keyword;
              this.keyword2Temp = this.docForm.keyword2;

              this.dutyAuthorTemp = this.docForm.dutyAuthor;
              this.levelTemp = this.docForm.docLevel;
              this.docAboutTemp = this.docForm.docAbout;

              this.optThreeWeightTable(); //里面三个异步提交
            }
          })
          .then(() => {
            this.docForm.docAbout = "";
            this.docForm.deadline = "";
            this.docForm.docLevel = "";
            this.docForm.dutyAuthor = "";
            this.keyWordEdit = false;
            this.docForm.keyword = "";
            this.genId(6, 62); //修改成功后产生新的识别号
            // this.docForm.docDate.replace("-", "");
                    this.docForm.docSecrets="无"

            this.docForm.docDate = "";
            this.docForm.docTitle = "";
            this.docForm.docDescAuthor = true;
            this.keyword2Check = false;
            this.docForm.keword2 = "";
            this.docForm.docDescNum = "";
            this.docForm.docDesc = "";

            this.docForm.docPage = "";
          });
        this.$store.state.sortedFlag = false;
      } else {
        this.showWaitingFlag = false;
      }
    },
    goDetail() {
      this.$store.state.organ=this.weightForm
      console.log(this.$store.state.organ)
      this.$router.push("/work/docInputd");
    },
    docDescChange(e) {
      // console.log(e)
      if (e == "false" || !e) {
        this.docForm.docDescAuthor = false;
        this.docForm.docDesc = "";
        this.docForm.docDescNum = "";
      } else if (e == "true" || e) {
        this.docForm.docDescAuthor = true;
        this.docForm.docDesc = "";
        this.docForm.docDescNum = "";
      }
    },
    cancelFixRS() {
        this.$store.state.noChufa = false;  //取消修改，（修改时拦截历史匹配）拦截取消

      this.tipShowFlag = false;

      this.keyWordEdit = false;
      this.docFormRS.keyword = "";
      this.docFormRS.personName = "";
      this.genId(6, 62);
      this.docFormRS.docDate.replace("-", "");
      // console.log(this.docForm);
      this.docFormRS.docTitle = "";
      this.docFormRS.docPage = "";
      // this.docFormRS.docDescNum=""
      // this.docFormRS.docDesc=""
      // this.docFormRS.docDescAuthor=false

      (this.docFormRS.docAboutSub = ""), (this.docFormRS.docAbout = "");

      this.fixDocFlag = false;
    },
    cancelFix() {
        this.$store.state.noChufa = false;  //取消修改，（修改时拦截历史匹配）拦截取消

      this.fixDocFlag = false;

      this.keyWordEdit = false;
      this.docForm.keyword = "";
      this.docForm.docDescNum = "";
      this.docForm.docDesc = "";
      this.docForm.docDescAuthor = true;

      this.keyword2Check = false;
      this.docForm.keword2 = "";

      this.genId(6, 62);
      this.docForm.docDate.replace("-", "");
      console.log(this.docForm);
      this.docForm.docTitle = "";
      this.docForm.docPage = "";
      this.fixDocFlag = false;
    },
    addRS() {},
    /**
    name: "工资情况材料",
          value: "工资情况材料",
        },
                                {
          name: "任免材料",
          value: "任免材料",
        },                        {
          name: "出国、出境材料",
          value: "出国、出境材料",
        },                        {
          name: "各党派、团体代表登记表",
          value: "各党派、团体代表登记表",
        },                        {
          name: "聘用、录用、转干、转业材料",
          value: "聘用、录用、转干、转业材料",
        },                        {
          name: "待遇、退（离）休、退职材料",
          value: "待遇、退（离）休、退职材料",
     */
    optSubmitRS() {
      var jobCode;
      if (this.docFormRS.docAbout == "履历材料") {
        jobCode = 1;
      } else if (this.docFormRS.docAbout == "自传材料") {
        jobCode = 2;
      } else if (this.docFormRS.docAbout == "鉴定、考核、考察材料") {
        jobCode = 3;
      }
      // else if (this.docFormRS.docAbout == "学历学位、评聘专业职务材料") {
      //   jobCode = 4;
      // }
      else if (this.docFormRS.docAbout == "政治历史情况审查材料") {
        jobCode = 6;
      } else if (this.docFormRS.docAbout == "入党入团材料") {
        jobCode = 7;
      } else if (this.docFormRS.docAbout == "奖励材料") {
        jobCode = 8;
      } else if (this.docFormRS.docAbout == "处分材料") {
        jobCode = 9;
      } else if (this.docFormRS.docAbout == "其他可供参考的材料") {
        jobCode = 16;
      }

      if (this.docFormRS.docAboutSub == "学历学位材料") {
        jobCode = 4;
      } else if (this.docFormRS.docAboutSub == "职称材料") {
        jobCode = 5;
      }

      if (this.docFormRS.docAboutSub == "工资情况材料") {
        jobCode = 10;
      }
      if (this.docFormRS.docAboutSub == "任免材料") {
        jobCode = 11;
      }
      if (this.docFormRS.docAboutSub == "出国、出境材料") {
        jobCode = 12;
      }
      if (this.docFormRS.docAboutSub == "各党派、团体代表登记表") {
        jobCode = 13;
      }
      if (this.docFormRS.docAboutSub == "聘用、录用、转干、转业材料") {
        jobCode = 14;
      }
      if (this.docFormRS.docAboutSub == "待遇、退（离）休、退职材料") {
        jobCode = 15;
      }

      var docObj = {
        deleted: 0,
        userId: sessionStorage.getItem("userIdNum"),
        authId: sessionStorage.getItem("authId"),
        batchId: sessionStorage.getItem("batchId"),
        docDate: this.docFormRS.docDate,
        docNum: "", //????
        docPage: this.docFormRS.docPage,
        docSequence: this.docFormRS.docSequence,
        docTitle: this.docFormRS.docTitle,
        docType: sessionStorage.getItem("docType"),
        keyword: this.docFormRS.keyword,
        // remark: this.docForm.remark,
        // deadline: this.docForm.deadline,
        docAbout: this.docFormRS.docAbout,
        docAboutSub: this.docFormRS.docAboutSub,
        personName: this.docFormRS.personName,
        personJob: jobCode,
        // docDesc:this.docForm.docDesc,
        // docPage: this.docForm.docPage,
        remark: this.docFormRS.remark,
        docTypeCode: sessionStorage.getItem("docTypeCode"),
        // dutyAuthor: this.docForm.dutyAuthor,
        // sortYear: this.docForm.sortYear,
      };
      var keywordIssueJson;

      var pathToDoc = "/document/" + sessionStorage.getItem("docType");
      this.postRequest(
        //注意防止重复提交
        pathToDoc,
        JSON.stringify(docObj)
      )
        .then((resp) => {
          console.log("tijiao人事文件");

          console.log(docObj);
          console.log("tijiao人事文件的结果");
          console.log(resp);
          this.docFormRS.id = resp.data.id; //修改文件用
        })
        .then((r) => {
          var table;
          if (this.weightForm.perKeywordWig) {
            //已有权重表
            this.getRequest("/weight/sort/" + this.weightForm.perKeywordWig)
              .then((resp) => {
                //查询对应的权重表得到json
                table = resp.data.tables;
                var key1 = this.docFormRS.keyword;
                // var json1 = table;
                keywordIssueJson = resp.data.keywordIssue;
                if (keywordIssueJson == null) {
                  keywordIssueJson = {};
                }
                keywordIssueJson[key1] = jobCode; //optRs

                if (table[key1] == null) {
                  table[key1] = "0";
                }
              })
              .then((r) => {
                var docAboutObj = {
                  authId: sessionStorage.getItem("authId"),
                  type: 41,
                  tables: table,
                  keywordIssue: keywordIssueJson,
                };

                this.putRequest(
                  "/weight/" + this.weightForm.perKeywordWig,
                  docAboutObj
                ).then((resp) => {
                  console.log("更新人事关键词权重表");
                  console.log(resp);
                  this.showWaitingFlag = false;
                });
              });
          } //if  已有权重表
          this.$store.state.alreadyDocs.unshift(
            Object.assign({}, this.docFormRS)
          );

          this.docFormRS.docTitle = "";
          this.docFormRS.docPage = "";
          this.genId(6, 62);
          this.docFormRS.docDate.replace("-", "");
        });
    },
    addDocTimer() {
      this.addDocBtnFlg = false;
      var that = this;
      setTimeout(function () {
        that.addDocBtnFlg = true; //???
      }, 2000);
    },
    addDocRS() {
      this.tipShowFlag = false; //录入提示关闭

      if (!this.addDocBtnFlg) {
        console.log(this.addDocBtnFlg);
        return;
      }
      this.addDocTimer();

      if (this.checkAddRS()) {
        this.showWaitingFlag = true;

        var searchPath =
          "/document/list/page/" +
          sessionStorage.getItem("docType") +
          "?pageNow=0&pageSize=900000";

        this.searchForm.docType = sessionStorage.getItem("docType");
        this.searchForm.personName = this.docFormRS.personName;
        this.searchForm.docTitle = this.docFormRS.docTitle;
        this.searchForm.batchId=""
        this.searchForm.authId=sessionStorage.getItem("authId") //人事提交查重 单位内

        // this.searchForm.docSequence=this.docFormRS.docSequence
        this.searchForm.docDate = this.docFormRS.docDate;
        this.searchForm.dutyAuthor = "";
        this.searchForm.docDesc = "";

        var searchObj = Object.assign({}, this.searchForm);
        for (var key in searchObj) {
          if (searchObj[key] == "") {
            delete searchObj[key];
          }
        }

        this.postRequest(
          //注意防止重复提交
          searchPath,
          JSON.stringify(searchObj)
        ).then((resp) => {
          console.log("添加前检查是否重复");
          console.log(resp);
          var repeatArr = [];
        for (var i in resp.data.content) {
          var k=resp.data.content[i]
          var repeatStr=k.docSequence+"题名："+k.docTitle+"\nabout："+k.docAbout+",文号："+k.docDesc+",日期："+k.docDate+
          ",责任者"+k.dutyAuthor+",页数："+k.docPage
          repeatArr.push(repeatStr);
        }

          if (resp.data.content.length != 0) {
            this.$confirm(
              "请检查是否录入重复：" + repeatArr,
              "提示",
              {
                cancelButtonClass: "btn-custom-cancel",
                confirmButtonText: "没有重复，录入此条",
                cancelButtonText: "好的，暂不录入",
                type: "warning",
              }
            )
              .then(() => {
                //空白地方 点没重复，提交
                this.optSubmitRS();
              })
              .catch(() => {
                this.showWaitingFlag = false;
                return; //点击好的，然后不提交
              });
          } else {
            this.optSubmitRS();
          }
        });
        this.$store.state.sortedFlag = false;
      } else {
        this.$message({
          type: "error",
          message: "填写完整",
        });
      }
    },
    addDoc() {
      window.sessionStorage.setItem("sortYearCache",this.docForm.sortYear)
      //  if(!this.docForm.docDescNum){
      //    alert(0)
      //  }
      // alert(this.docForm.docDescNum)
      // return

      this.selectDocNoTable = false; //在选择历史匹配后会变为true 并且不触发（return）根据标题中的关键字匹配问题

      this.tipShowFlag = false;
      if (!this.addDocBtnFlg) {
        //防止连续点击
        console.log(this.addDocBtnFlg);

        return;
      }
      this.addDocTimer();

      // var
      // this.optThreeWeightTable()
      // return

      if (this.checkAdd() && this.checkDeadline()) {
        this.showWaitingFlag = true;
        // this.$store.state.alreadyDocs.unshift({  docKeyWord:this.docForm.docAbout||'无文件信息',
        //   docSequence:this.docForm.docSequence ,
        //   docNumber:''})
        var docDescNumTemp;
        if (this.docForm.docDescAuthor) {
          //有文号
          if (
            !this.docForm.docDescNum ||
            this.docForm.docDescNum == null ||
            this.docForm.docDescNum == ""
          ) {
            docDescNumTemp = 99998; //有文号，没有文号的数字
          } else {
            docDescNumTemp = this.docForm.docDescNum;
          }
        } else {
          docDescNumTemp = 99999; //没有文号
        }
        var docObj = {
          deleted: 0,
          keyword2: this.docForm.keyword2.trim(),
          // userId:JSON.stringify(sessionStorage.getItem("userId")),
          // userId: sessionStorage.getItem('userId'),
          userId: sessionStorage.getItem("userIdNum"),
          authId: sessionStorage.getItem("authId"),
          batchId: sessionStorage.getItem("batchId"),
          docDate: this.docForm.docDate,
          docNum: "", //????
          docPage: this.docForm.docPage,
          docSequence: this.docForm.docSequence,
          docTitle: this.docForm.docTitle,
          docType: sessionStorage.getItem("docType"),
          keyword: this.docForm.keyword.trim(),
          remark: this.docForm.remark,
          deadline: this.docForm.deadline,
          docAbout: this.docForm.docAbout.trim(),
          docDesc: this.docForm.docDesc.trim(),
          docPage: this.docForm.docPage,
          docDescNum: docDescNumTemp,
          docDescAuthor: this.docForm.docDescAuthor,
          docLevel: this.docForm.docLevel,
          docSecret: this.docForm.docSecret,
          docTypeCode: sessionStorage.getItem("docTypeCode"),
          dutyAuthor: this.docForm.dutyAuthor.trim(),
          sortYear: this.docForm.sortYear,
        };

        var searchPath =
          "/document/list/page/" +
          sessionStorage.getItem("docType") +
          "?pageNow=0&pageSize=900000";

        this.searchForm.docType = sessionStorage.getItem("docType");

        {
          this.searchForm.docTitle = this.docForm.docTitle;
          // this.searchForm.docSequence=this.docForm.docSequence
          this.searchForm.docDesc = this.docForm.docDesc; //提交查重，单位内
          this.searchForm.docDate = this.docForm.docDate;
          this.searchForm.dutyAuthor = this.docForm.dutyAuthor;
          this.searchForm.personName = "";
          this.searchForm.authId=sessionStorage.getItem("authId")
          this.searchForm.batchId=""
        }
        var searchObj = Object.assign({}, this.searchForm);

        for (var key in searchObj) {
          if (searchObj[key] == "") {
            delete searchObj[key];
          }
        }



        this.postRequest(
          //注意防止重复提交
          searchPath,
          JSON.stringify(searchObj)
        ).then((resp) => {
          console.log("添加前检查是否重复");
          console.log(resp);
          var repeatArr = [];
        for (var i in resp.data.content) {
          
          var k=resp.data.content[i]

          var repeatStr=k.docSequence+"-题名："+k.docTitle+",名："+k.docAbout+",文号："+k.docDesc+",日期："+k.docDate+
          ",责任者"+k.dutyAuthor+",页数："+k.docPage
                    if(k.authId!=sessionStorage.getItem("authId")){
                      repeatStr=repeatStr+"（上批次文件，特别检查）"
          }
          repeatArr.push(repeatStr);
        }
          if (resp.data.content.length != 0 &&this.docDescRepeatNum==0) {//this.docDescRepeatNum==0文号不重复才多重条件判断
            this.$confirm(
              "请检查是否录入重复：" + repeatArr, //
              "提示",
              {
                cancelButtonClass: "btn-custom-cancel",
                confirmButtonText: "没有重复，录入此条",
                cancelButtonText: "好的，暂不录入",
                type: "warning",
              }
            )
              .then(() => {
                var pathToDoc =
                  "/document/" + sessionStorage.getItem("docType");
                this.postRequest(
                  //注意防止重复提交
                  pathToDoc,
                  JSON.stringify(docObj)
                )
                  .then((resp) => {
                    console.log("tijiao文件");

                    console.log(docObj);
                    console.log("tijiao文件的结果");
                    console.log(resp);
                    this.docForm.id = resp.data.id; //赋给alreadydocs 修改文件用
                    // alert( this.docForm.id)
                  })
                  .then((r) => {
                    // if(r)
                    //保证提交完返回id后再执行后续操作
                    this.keywordTemp = this.docForm.keyword;
                    this.keyword2Temp = this.docForm.keyword2;
                    console.log(this.keyword2Temp);
                    this.dutyAuthorTemp = this.docForm.dutyAuthor;
                    this.levelTemp = this.docForm.docLevel;
                    this.docAboutTemp = this.docForm.docAbout;

                    this.optThreeWeightTable();

                    this.$store.state.alreadyDocs.unshift(
                      Object.assign({}, this.docForm)
                    );

                    this.keyWordEdit = false;
                    this.docForm.docDescAuthor = true;
                    this.keyword2Check = false;
                    this.docForm.keword2 = "";

                    this.docForm.keyword = "";
                    this.docForm.docAbout = "";
                    this.docForm.deadline = "";
                    this.docForm.docLevel = "";
                    this.docForm.dutyAuthor = "";
                    this.docForm.docDate = "";
                    this.genId(6, 62); //提交文件成功后产生新的识别号  有两处提交成功
                    this.docForm.docDate.replace("-", "");
                    this.docForm.docSecrets="无"
                    console.log(this.docForm);
                    this.docForm.docTitle = "";
                    this.docForm.docPage = "";
                    this.docForm.docDesc = "";
                    this.docForm.keyword2 = "";
                  });
              })
              .catch(() => {
                this.showWaitingFlag = false;
                return; //点击好的，然后不提交
              });
          } // 重复，不提交(cathc) 和 仍要提交(then)
          else {
            //不重复

            var pathToDoc = "/document/" + sessionStorage.getItem("docType");
            this.postRequest(
              //注意防止重复提交
              pathToDoc,
              JSON.stringify(docObj)
            )
              .then((resp) => {
                console.log("tijiao文件");

                console.log(docObj);
                console.log("tijiao文件的结果");
                console.log(resp);
                this.docForm.id = resp.data.id; //赋给alreadydocs 修改文件用
                // alert( this.docForm.id)
              })
              .then((r) => {
                // if(r)
                //保证提交完返回id后再执行后续操作
                this.keywordTemp = this.docForm.keyword;
                this.keyword2Temp = this.docForm.keyword2;
                this.dutyAuthorTemp = this.docForm.dutyAuthor;
                this.levelTemp = this.docForm.docLevel;
                this.docAboutTemp = this.docForm.docAbout;
                this.optThreeWeightTable();

                this.$store.state.alreadyDocs.unshift(
                  Object.assign({}, this.docForm)
                );

                this.keyWordEdit = false;
                this.docForm.docDescAuthor = true;
                this.keyword2Check = false;
                this.docForm.keword2 = "";

                this.docForm.keyword = "";
                this.docForm.docAbout = "";
                this.docForm.deadline = "";
                this.docForm.docLevel = "";
                this.docForm.dutyAuthor = "";
                this.docForm.docDate = "";

                this.docForm.docDesc = "";

                this.genId(6, 62); //提交文件成功后gen
                this.docForm.docDate.replace("-", "");
                    this.docForm.docSecrets="无"

                console.log(this.docForm);
                this.docForm.docTitle = "";
                this.docForm.docPage = "";
              });
          }
        });
        this.$store.state.sortedFlag = false;
      } else {
        this.showWaitingFlag = false;
      }
    },

    //  setTheJsonWigTable(reqId,key,value){
    //          var table
    //         this.getRequest("/weight/sort/" + reqId)
    //           .then((resp) => {
    //             // alert(0)
    //             //查询对应的权重表得到json
    //             table = resp.data.tables;
    //             var key1 = key;
    //             // var json1 = table;
    //             if (table[key1] == null) {
    //               table[key1] = "0";
    //             }
    //           })
    //             var setObj = {
    //               authId: sessionStorage.getItem("authId"),
    //               type: weightType1,
    //               tables: table,
    //               issueKeyword:issueKeyword
    //             };
    //  },
    optDescTable(descWigType) {
      console.log("");
      console.log(this.keyword2Temp);
      var docDescText = "";
      {
        //文号权重表
        if (
          this.docForm.docDescAuthor == true ||
          this.docForm.docDescAuthor == "true"
        ) {
          console.log("文号有！");
          // console.log(this.docForm.docDesc)
          // console.log(this.docForm.docDesc.split("["))
          // console.log(this.docForm.docDesc.split("[").length)
          if (this.docForm.docDesc.split("[").length > 1) {
            console.log("分割[得到两段");
            docDescText = this.docForm.docDesc.split("[")[0];
          }
        }
        console.log(docDescText);

        var fixFlag = false;
        var descJson = this.weightForm[descWigType];
        if (descJson == null) {
          descJson = {};
        }
        docDescText = docDescText.replace(/\d+/g, ""); //除去数字
        var len = Object.keys(descJson).length;
        if (descJson[docDescText] == null) {
          descJson[docDescText] = len + 1 + "";
          fixFlag = true;
        }
      }

      {
      }

      if (fixFlag) {
        this.putRequest(
          //注意防止重复提交
          "/organ/" + sessionStorage.getItem("authId"),
          JSON.stringify(this.weightForm)
        ).then((resp) => {
          console.log("修改单位表的文号权重表");
          console.log(resp);
          this.weightForm = resp.data;
        });
      }
    },

    optDescKwTable(descWigType, kw2WigType) {
      console.log("操作机构法文号权重表和关键词2");
      console.log(this.keyword2Temp);
      var docDescText = "";
      if (
        this.docForm.docDescAuthor == true ||
        this.docForm.docDescAuthor == "true"
      ) {
        console.log("文号有！");
        console.log(this.weightForm);
        // console.log(this.docForm.docDesc)
        // console.log(this.docForm.docDesc.split("["))
        // console.log(this.docForm.docDesc.split("[").length)
        if (this.docForm.docDesc.split("[").length > 1) {
          console.log("分割[得到两段");
          docDescText = this.docForm.docDesc.split("[")[0];
        }
      }
      console.log(docDescText);

      var fixFlag = false; //两个任一修改了就提交修改
      var descJson = this.weightForm[descWigType];
      if (descJson == null) {
        descJson = {};
      }
      docDescText = docDescText.replace(/\d+/g, ""); //除去数字
      var len = Object.keys(descJson).length;
      if (descJson[docDescText] == null) {
        descJson[docDescText] = len + 1 + "";
        fixFlag = true;
      }

      var kw2Json = this.weightForm[kw2WigType];
      var keyword2text = this.keyword2Temp;
      console.log(this.weightForm);
      console.log(this.keyword2Temp);
      if (kw2Json == null) {
        kw2Json = {};
      }
      var len1 = Object.keys(kw2Json).length;
      if (kw2Json[keyword2text] == null && keyword2text.trim().length > 0) {
        kw2Json[keyword2text] = len1 + 1 + "";
        fixFlag = true;
      }
      console.log(fixFlag);
      if (fixFlag) {
        this.putRequest(
          //注意防止重复提交
          "/organ/" + sessionStorage.getItem("authId"),
          JSON.stringify(this.weightForm)
        ).then((resp) => {
          console.log("修改单位表的文号权重表");
          console.log(resp);
        });
      }
    },

    optThreeWeightTable() {
      console.log("进opt");

      if (this.dutyAuthorTipArr.indexOf(this.docForm.dutyAuthor) < 0) {
        this.dutyAuthorTipArr.push(this.docForm.dutyAuthor);
      } //提交或修改后责任者下拉框列表更新

      //操作三种类型的权重表，前提是已知weightForm即单位信息，第一次则先get 不是第一次则
      var weightType1;
      var weightType2;
      var weightType3;

      var keywordTemp = this.keywordTemp;

      // if (sessionStorage.getItem("docType") == "official") {
      // if (true) {
      if (sessionStorage.getItem("docType") == "official") {
        weightType1 = 11; //文书问题
        weightType2 = 12;
        weightType3 = 13;
      }
      if (sessionStorage.getItem("docType") == "science") {
        weightType1 = 21;
        weightType2 = 22;
        weightType3 = 23;
      }

      if (sessionStorage.getItem("docType") == "business") {
        weightType1 = 31;
        weightType2 = 32;
        weightType3 = 33;
      }
      if (sessionStorage.getItem("docType") == "officialJ") {
        weightType1 = 51;
        weightType2 = 52;
        weightType3 = 53;
      }
      if (sessionStorage.getItem("docType") == "officialJ") {
        //文号
        this.optDescKwTable("officialDescWig", "instituteKW2");
        var table;
        var issueKeywordArrJson;
        if (this.weightForm.docIssueWig) {
          //已有权重表 1111
          this.getRequest("/weight/" + this.weightForm.docIssuejWig)
            .then((resp) => {
              // alert(0)
              //查询对应的权重表得到json
              table = resp.data.tables;
              var key1 = this.docAboutTemp;
              // var json1 = table;
              if (table[key1] == null) {
                table[key1] = "0";
              }
              issueKeywordArrJson = resp.data.issueKeyword;

              console.log(resp);

              if (issueKeywordArrJson[key1] == null) {
                var arrtemp = [];
                arrtemp.push(keywordTemp);
                issueKeywordArrJson[key1] = arrtemp;
              } else {
                if (issueKeywordArrJson[key1].indexOf(keywordTemp) < 0) {
                  issueKeywordArrJson[key1].push(keywordTemp);
                }
              }
            })

            .then((r) => {
              // var issueKeyword={}
              // if(true){//假设不包含这个问题
              //   var docAboutKeyWordArr=[]
              //   docAboutKeyWordArr.push(keywordTemp) //因为异步执行，表格已经刷新，kwTemp暂存的关键字
              //   console.log(docAboutKeyWordArr)
              //   issueKeyword[this.docForm.docAbout]=docAboutKeyWordArr
              // }

              var docAboutObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType1,
                tables: table,
                issueKeyword: issueKeywordArrJson,
              };

              this.putRequest(
                "/weight/" + this.weightForm.docIssuejWig,
                docAboutObj
              ).then((resp) => {
                console.log("更新文书问题权重表");
                console.log(resp);
                this.docAbout_KeywordArrJson = resp.data.issueKeyword;
              });
            });

          /**责任者
           *
           */
          var table2;
          // this.getRequest("/weight/sort/" + this.weightForm.docAuthorWig)
          this.getRequest("/weight/" + this.weightForm.docAuthorjWig)

            .then((resp) => {
              //查询对应的权重表得到json
              table2 = resp.data.tables;
              var key2 = this.dutyAuthorTemp;
              // var json1 = table;
              if (table2[key2] == null) {
                table2[key2] = {};
                console.log(table2);
                table2[key2].value = "1";
                table2[key2].level = this.levelTemp;
                table2[key2] = JSON.stringify(table2[key2]);
                console.log(table2);
              }
            })
            .then((r) => {
              var dutyAuthorObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType2,
                tables: table2,
                issueKeyword: {},
                keywordIssue: {},
              };

              this.putRequest(
                "/weight/" + this.weightForm.docAuthorjWig,
                dutyAuthorObj
              ).then((resp) => {
                console.log("更新文书责任者权重表");
                console.log(resp);
              });
            });

          var table3;
          var keywordIssueJson;
          this.getRequest(
            "/weight/keywordSort/" + this.weightForm.docKeywordjWig
          )
            .then((resp) => {
              //查询对应的权重表得到json
              table3 = resp.data.tables;
              keywordIssueJson = resp.data.keywordIssue;
              var key3 = this.keywordTemp; //docForm里的会被刷新
              // var json1 = table;
              if (table3[key3] == null) {
                table3[key3] = "0";
              }
              if (keywordIssueJson[key3] == null) {
                keywordIssueJson[key3] = this.docAboutTemp;
              } else {
                // if (
                //   keywordIssueJson[key3]
                //     .split("|")
                //     .indexOf(this.docAboutTemp) < 0
                // ) {
                //   //
                //   keywordIssueJson[key3] =
                //     keywordIssueJson[key3] + "|" + this.docAboutTemp;
                // }
              }

              console.log(key3);

              console.log(table3);
            })
            .then((r) => {
              var keyWordObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType3,
                tables: table3,
                keywordIssue: keywordIssueJson,
              };

              this.putRequest(
                "/weight/" + this.weightForm.docKeywordjWig,
                keyWordObj
              ).then((resp) => {
                console.log("更新文书机构法关键词权重表");
                console.log(resp);
                this.keyword_docAboutJson = resp.data.keywordIssue;
              });
            })
            .then((r) => {
              this.showWaitingFlag = false;
            });
        }
      } //doctype==officialJ if

      // 问题法
      if (sessionStorage.getItem("docType") == "official") {
        //文号

        this.optDescTable(
          "officialDescWig"
        );

        // {
        //   var str=this.weightForm.officialDescWig[this.docForm.keyword]
        //   if(str==null){
        //     str=JSON.stringify({})
        //     this.weightForm.officialDescWig[this.docForm.keyword]=str
        //   }
        //   else{
        //     js=JSON.parse(str)
        //     js[this]
        //   }
        //   this.weightForm.officialDescWig[this.docForm.keyword]=
        //   this.weightForm.officialDescWig[this.docForm.keyword]==null?JSON.stringify({}):this.weightForm.officialDescWig[this.docForm.keyword]

        //             this.putRequest(
        //     //注意防止重复提交
        //     "/organ/" + sessionStorage.getItem("authId"),
        //     JSON.stringify(this.weightForm)
        //   ).then((resp) => {

        //   })
        // }

        var table;
        var issueKeywordArrJson;
        if (this.weightForm.docIssueWig) {
          //已有权重表 1111
          this.getRequest("/weight/" + this.weightForm.docIssueWig)
            .then((resp) => {
              // alert(0)
              //查询对应的权重表得到json
              table = resp.data.tables;
              var key1 = this.docAboutTemp;
              // var json1 = table;
              if (table[key1] == null) {
                table[key1] = "0";
              }
              issueKeywordArrJson = resp.data.issueKeyword;

              console.log(resp);

              if (issueKeywordArrJson[key1] == null) {
                var arrtemp = [];
                arrtemp.push(keywordTemp);
                issueKeywordArrJson[key1] = arrtemp;
              } else {
                if (issueKeywordArrJson[key1].indexOf(keywordTemp) < 0) {
                  issueKeywordArrJson[key1].push(keywordTemp);
                }
              }
            })

            .then((r) => {
              // var issueKeyword={}
              // if(true){//假设不包含这个问题
              //   var docAboutKeyWordArr=[]
              //   docAboutKeyWordArr.push(keywordTemp) //因为异步执行，表格已经刷新，kwTemp暂存的关键字
              //   console.log(docAboutKeyWordArr)
              //   issueKeyword[this.docForm.docAbout]=docAboutKeyWordArr
              // }

              var docAboutObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType1,
                tables: table,
                issueKeyword: issueKeywordArrJson,
              };

              this.putRequest(
                "/weight/" + this.weightForm.docIssueWig,
                docAboutObj
              ).then((resp) => {
                console.log("更新文书问题权重表");
                console.log(resp);
                this.docAbout_KeywordArrJson = resp.data.issueKeyword;
              });
            });

          /**责任者
           *
           */
          var table2;
          // this.getRequest("/weight/sort/" + this.weightForm.docAuthorWig)
          this.getRequest("/weight/" + this.weightForm.docAuthorWig)

            .then((resp) => {
              //查询对应的权重表得到json
              table2 = resp.data.tables;
              var key2 = this.dutyAuthorTemp;
              // var json1 = table;
              if (table2[key2] == null) {
                table2[key2] = {};
                console.log(table2);
                table2[key2].value = "1";
                table2[key2].level = this.levelTemp;
                table2[key2] = JSON.stringify(table2[key2]);
                console.log(table2);
              }
            })
            .then((r) => {
              var dutyAuthorObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType2,
                tables: table2,
                issueKeyword: {},
                keywordIssue: {},
              };

              this.putRequest(
                "/weight/" + this.weightForm.docAuthorWig,
                dutyAuthorObj
              ).then((resp) => {
                console.log("更新文书责任者权重表");
                console.log(resp);
              });
            });

          var table3;
          var keywordIssueJson;
          this.getRequest(
            "/weight/keywordSort/" + this.weightForm.docKeywordWig
          )
            .then((resp) => {
              //查询对应的权重表得到json
              table3 = resp.data.tables;
              keywordIssueJson = resp.data.keywordIssue;
              var key3 = this.keywordTemp; //docForm里的会被刷新
              // var json1 = table;
              if (table3[key3] == null) {
                table3[key3] = "0";
              }
              if (keywordIssueJson[key3] == null) {
                keywordIssueJson[key3] = this.docAboutTemp;
              } else {
                // if (
                //   keywordIssueJson[key3]
                //     .split("|")
                //     .indexOf(this.docForm.docAbout) < 0
                // ) {
                //   //
                //   keywordIssueJson[key3] =
                //     keywordIssueJson[key3] + "|" + this.docForm.docAbout;
                // }
              }

              console.log(key3);

              console.log(table3);
            })
            .then((r) => {
              var keyWordObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType3,
                tables: table3,
                keywordIssue: keywordIssueJson,
              };

              this.putRequest(
                "/weight/" + this.weightForm.docKeywordWig,
                keyWordObj
              ).then((resp) => {
                console.log("更新文书关键词权重表");
                console.log(resp);
                this.keyword_docAboutJson = resp.data.keywordIssue;
              });
            })
            .then((r) => {
              this.showWaitingFlag = false;
            });
        }
      } //doctype==official if

      if (sessionStorage.getItem("docType") == "business") {
        this.optDescTable("busDescWig");

        var table;
        var issueKeywordArrJson;
        if (this.weightForm.busProjectWig) {
          //已有权重表
          this.getRequest("/weight/" + this.weightForm.busProjectWig)
            .then((resp) => {
              // alert(0)
              //查询对应的权重表得到json
              table = resp.data.tables;
              var key1 = this.docAboutTemp;
              // var json1 = table;
              if (table[key1] == null) {
                table[key1] = "0";
              }
              issueKeywordArrJson = resp.data.issueKeyword;
              if (issueKeywordArrJson[key1] == null) {
                var arrtemp = [];
                arrtemp.push(keywordTemp);
                issueKeywordArrJson[key1] = arrtemp;
              } else {
                if (issueKeywordArrJson[key1].indexOf(keywordTemp) < 0) {
                  issueKeywordArrJson[key1].push(keywordTemp);
                }
              }
            })

            .then((r) => {
              var docAboutObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType1,
                tables: table,
                issueKeyword: issueKeywordArrJson,
              };

              console.log(docAboutObj);

              this.putRequest(
                "/weight/" + this.weightForm.busProjectWig,
                docAboutObj
              ).then((resp) => {
                console.log("更新yewu问题权重表");
                console.log(resp);
                this.docAbout_KeywordArrJson = resp.data.issueKeyword;
              });
            });
          /**责任者
           *
           */
          var table2;
          this.getRequest("/weight/sort/" + this.weightForm.busAuthorWig)
            .then((resp) => {
              //查询对应的权重表得到json
              table2 = resp.data.tables;
              var key2 = this.dutyAuthorTemp;
              // var json1 = table;
              if (table2[key2] == null) {
                table2[key2] = {};
                console.log(table2);
                table2[key2].value = "1";
                table2[key2].level = this.levelTemp;
                table2[key2] = JSON.stringify(table2[key2]);
                console.log(table2);
              }
            })
            .then((r) => {
              var dutyAuthorObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType2,
                tables: table2,
                issueKeyword: {},
                keywordIssue: {},
              };

              this.putRequest(
                "/weight/" + this.weightForm.busAuthorWig,
                dutyAuthorObj
              ).then((resp) => {
                console.log("更新文书责任者权重表");
                console.log(resp);
              });
            });

          var table3;
          var keywordIssueJson;
          this.getRequest(
            "/weight/keywordSort/" + this.weightForm.busKeywordWig
          )
            .then((resp) => {
              //查询对应的权重表得到json
              table3 = resp.data.tables;
              keywordIssueJson = resp.data.keywordIssue;
              var key3 = keywordTemp; //docForm里的会被刷新
              // var json1 = table;
              if (table3[key3] == null) {
                table3[key3] = "0";
              }
              if (keywordIssueJson[key3] == null) {
                keywordIssueJson[key3] = this.docAboutTemp;
              } else {
                // if (
                //   keywordIssueJson[key3]
                //     .split("|")
                //     .indexOf(this.docForm.docAbout) < 0
                // ) {
                //   //
                //   keywordIssueJson[key3] =
                //     keywordIssueJson[key3] + "|" + this.docForm.docAbout;
                // }
              }

              console.log(key3);

              console.log(table3);
            })
            .then((r) => {
              var keyWordObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType3,
                tables: table3,
                keywordIssue: keywordIssueJson,
              };
              this.putRequest(
                "/weight/" + this.weightForm.busKeywordWig,
                keyWordObj
              ).then((resp) => {
                console.log("更新业务关键词权重表");
                console.log(resp);
                this.keyword_docAboutJson = resp.data.keywordIssue;
              });
            })
            .then((r) => {
              this.showWaitingFlag = false;
            });
        }
      } //doctype==business if

      if (sessionStorage.getItem("docType") == "science") {
        this.optDescTable("tecDescWig");

        var table;
        var issueKeywordArrJson;
        if (this.weightForm.tecProjectWig) {
          //已有权重表 3333
          this.getRequest("/weight/sort/" + this.weightForm.tecProjectWig)
            .then((resp) => {
              // alert(0)
              //查询对应的权重表得到json
              table = resp.data.tables;
              var key1 = this.docAboutTemp;
              // var json1 = table;
              if (table[key1] == null) {
                table[key1] = "0";
              }
              issueKeywordArrJson = resp.data.issueKeyword;
              if (issueKeywordArrJson[key1] == null) {
                var arrtemp = [];
                arrtemp.push(keywordTemp);
                issueKeywordArrJson[key1] = arrtemp;
              } else {
                if (issueKeywordArrJson[key1].indexOf(keywordTemp) < 0) {
                  issueKeywordArrJson[key1].push(keywordTemp);
                }
              }
            })

            .then((r) => {
              var docAboutObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType1,
                tables: table,
                issueKeyword: issueKeywordArrJson,
              };

              console.log(docAboutObj);

              this.putRequest(
                "/weight/" + this.weightForm.tecProjectWig,
                docAboutObj
              ).then((resp) => {
                console.log("更新科技问题权重表");
                console.log(resp);
                this.docAbout_KeywordArrJson = resp.data.issueKeyword;
              });
            });
          /**责任者
           *
           */
          var table2;
          this.getRequest("/weight/sort/" + this.weightForm.tecAuthorWig)
            .then((resp) => {
              //查询对应的权重表得到json
              table2 = resp.data.tables;
              var key2 = this.dutyAuthorTemp;
              // var json1 = table;
              if (table2[key2] == null) {
                table2[key2] = {};
                console.log(table2);
                table2[key2].value = "1";
                table2[key2].level = this.levelTemp;
                table2[key2] = JSON.stringify(table2[key2]);
                console.log(table2);
              }
            })
            .then((r) => {
              var dutyAuthorObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType2,
                tables: table2,
                issueKeyword: {},
                keywordIssue: {},
              };

              this.putRequest(
                "/weight/" + this.weightForm.tecAuthorWig,
                dutyAuthorObj
              ).then((resp) => {
                console.log("更新科技责任者权重表");
                console.log(resp);
              });
            });

          var table3;
          var keywordIssueJson;
          this.getRequest(
            "/weight/keywordSort/" + this.weightForm.tecKeywordWig
          )
            .then((resp) => {
              //查询对应的权重表得到json
              table3 = resp.data.tables;
              keywordIssueJson = resp.data.keywordIssue;
              var key3 = keywordTemp; //docForm里的会被刷新
              // var json1 = table;
              if (table3[key3] == null) {
                table3[key3] = "0";
              }
              if (keywordIssueJson[key3] == null) {
                keywordIssueJson[key3] = this.docAboutTemp;
              } else {
                // if (
                //   keywordIssueJson[key3]
                //     .split("|")
                //     .indexOf(this.docForm.docAbout) < 0
                // ) {
                //   //
                //   keywordIssueJson[key3] =
                //     keywordIssueJson[key3] + "|" + this.docForm.docAbout;
                // }
              }

              console.log(key3);

              console.log(table3);
            })
            .then((r) => {
              var keyWordObj = {
                authId: sessionStorage.getItem("authId"),
                type: weightType3,
                tables: table3,
                keywordIssue: keywordIssueJson,
              };

              this.putRequest(
                "/weight/" + this.weightForm.tecKeywordWig,
                keyWordObj
              ).then((resp) => {
                console.log("更新科技关键词权重表");
                console.log(resp);
                this.keyword_docAboutJson = resp.data.keywordIssue;
              });
            })
            .then((r) => {
              this.showWaitingFlag = false;
            });
        }
      } //doctype==science if
    },

    docAboutBlur1() {
      if (this.docForm.keyword != "" && this.docForm.docAbout != "") {
        //todo1  查询是否有关键字

        var tip = "";
        if (true) {
          this.manageKeyWordTime++;
          if (this.manageKeyWordTime % 10 == 0) {
            this.$confirm(
              "检测到一些新的关键字：" +
                this.docForm.keyword +
                " , 和对应分类" +
                this.docForm.docAbout +
                "，是否添加入库，以便更快录入",
              "提示",
              {
                cancelButtonClass: "btn-custom-cancel",
                confirmButtonText: "前往管理",
                cancelButtonText: "我稍后前往",
                type: "warning",
              }
            )
              .then(() => {
                this.$router.push("/work/keyWM");

                // this.$message({
                //   type: "success",
                //   message: "已添加"
                // });
              })
              .catch(() => {});
          }
        }
      }
    },
    weightFormKeywordCode() {
      //点出标题区域可能还没返回
      var type = sessionStorage.getItem("docType");
      if (type == "official") {
        return this.weightForm.docKeywordWig;
      } else if (type == "business") {
        return this.weightForm.busKeywordWig;
      } else if (type == "science") {
        return this.weightForm.tecKeywordWig;
      } else if (type == "personnel") {
        return this.weightForm.perKeywordWig;
      } else if (type == "officialJ") {
        return this.weightForm.docKeywordjWig;
      }
    },

    matchKvFunc() {
      //
      // alert(2)
      var keywordIssueJson;

      /*
      if (sessionStorage.getItem("docType") == "personnel") {
        this.getRequest("/weight/" + this.weightForm.perKeywordWig).then(
          (resp) => {
             keywordIssueJson = resp.data.keywordIssue;
            console.log(keywordIssueJson);
               let attr;
    for (attr in keywordIssueJson) {
      if(this.docFormRS.docTitle.indexOf(attr)==-1){
       delete keywordIssueJson[attr]
      }
      
    }
    console.log(keywordIssueJson)

    // kwInTitleTrue=[]
    // for(var k in kwInTitle){
    //   if(this.docFormRS.docTitle.indexOf(kwInTitle[k])>-1){
    //     kwInTitleTrue.push(kwInTitle[k])
    //   }
    // }
          }
        );
      }*/
      // var titttt=sessionStorage.getItem('docType')=='personnel'?this.docFormRs.docTitle:this.docForm.docTitle
      axios
        .get(this.baseurl + "/weight/map/" + this.weightFormKeywordCode(), {
          headers: {
            "Content-Type": "application/json",
            authId: sessionStorage.getItem("authId"),
            token: window.localStorage.getItem("token")
              ? window.localStorage.getItem("token").split('"')[1] ||
                window.localStorage.getItem("token")
              : null,
          },
          params: {
            title:
              sessionStorage.getItem("docType") == "personnel"
                ? this.docFormRS.docTitle
                : this.docForm.docTitle,
          },
        })
        .then((resp) => {
          this.matchedKV = [];
          if (resp.data == null) {
            resp.data = keywordIssueJson;
          }
          console.log(resp);

          for (var attr in resp.data) {
            // var splitArr = resp.data[attr].split("|"); //一个关键词只对应一个问题，不需要了

            if (sessionStorage.getItem("docType") == "personnel") {
              console.log(2);

              for (var k in splitArr) {
                console.log(splitArr[k]);
                var i = this.getRsText(splitArr[k]);
                console.log(i);
                this.matchedKV.push([attr, this.rsDocTypeMain, i]);
              }
              console.log(this.matchedKV);
            } // 人事要找对照表
            else {
              // for (var k in splitArr) {
              //   this.matchedKV.push([attr, splitArr[k]]);
              // }
              this.matchedKV.push([attr, resp.data[attr]]);
            }
          }
          {
            console.log(this.matchedKV);
            console.log(this.matchedKV.length);

            if (this.matchedKV.length == 1) {
              console.log("zhiyou1ge");

              if (sessionStorage.getItem("docType") == "personnel") {
                this.docFormRS.docAboutSub = this.matchedKV[0][2];
                this.docFormRS.docAbout = this.matchedKV[0][1];
              } else {
                this.docForm.docAbout = this.matchedKV[0][1];
                this.docForm.keyword = this.matchedKV[0][0];
              }
            } else if (this.matchedKV.length > 1) {
              this.tipShowFlag = true;
            }
          }

          // alert()
        });
      if (this.matchedKV.length > 0) {
        this.$message({
          type: "success",
          message: "没有合适的历史文件匹配，根据您的对照表匹配了关键词",
        });
      }
    },
    selectThisTip(item) {
      this.docForm.docAbout = item[1];
      this.docForm.keyword = item[0];

      if (sessionStorage.getItem("docType") == "personnel") {
        this.docFormRS.docAbout = item[1];
        this.docFormRS.docAboutSub = item[2];
        this.docForm.keyword = item[0];
      }
      this.tipShowFlag = false;
    },
    titleComplete() {
      this.matchedDoc = [];
      if (this.fixDocFlag) {
        //修改文档焦点离开不要发请求
        return;
      }

      if (this.docForm.docTitle == "") {
        this.keyWordEdit = false;
      } else this.keyWordEdit = true;

      this.likelyHoodQuery(); //历史匹配

      // if(this.selectDocNoTable){
      //   return
      // }

      // this.getRequest(   //查标题

      //             "/weight/map/"+this.weightFormKeywordCode(),{
      //               title:this.docForm.docTitle,

      //             }

      //           ).then((resp) => {
      //             console.log(resp)
      //           })
    },

    checkTitle() {},
    genID(length) {
      return Number(
        Math.random().toString().substr(3, length) + Date.now()
      ).toString(36);
    },
    getId1(a, b) {
      var date = new Date(); //当前标准时间格式
      var month = date.getMonth() + 1; //返回0~11之间的数字，0代表一月，11代表12月
      var day = date.getDate(); //返回天数，0~31，getDay()返回的是星期几（0~6）
      var hour = date.getHours(); //获取小时
      var minute = date.getMinutes(); //获取分钟
      var second = date.getSeconds(); //获取秒
      var num =
        year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
    },

    genId(len, radix) {
      this.showWaitingFlag = true;
      this.getRequest("/work/" + sessionStorage.getItem("batchId")).then(
        (resp) => {
          if (resp && resp.code == 0) {
            // if(sessionStorage.getItem('docType')=="personnel"){}
            this.docForm.docSequence = resp.data.doc_number;
            this.docFormRS.docSequence = resp.data.doc_number;
            this.showWaitingFlag = false;
          } else {
            this.$message({
              type: "success",
              message: "网络中断，请检查网络",
            });
            this.$router.push("/work/docInputd");
          }
        }
      );
      return;

      var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
        ""
      );
      var uuid = [],
        i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16);
            uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
          }
        }
      }

      return uuid.join("");
    },

    inputChange() {
      this.aiInput = !this.aiInput;
      if (this.aiInput) {
        this.$message({
          type: "success",
          message: "将根据历史记录进行快速录入",
        });
      }
    },
  },
  created() {
    if ("") {
      alert(1);
    }
    // var jsonk={}
    // var aa='aa'
    // if(jsonk[aa]==null){
    //   jsonk[aa]='2'
    // }
    // console.log(jsonk)
    // return
    if(!sessionStorage.getItem("sortYearCache")){
      window.sessionStorage.setItem("sortYearCache",2018)
    }

    window.scrollTo(0, 0);

    this.docTimeDues = [];
    var deadlineJson = JSON.parse(sessionStorage.getItem("lastBox"));
    // console.log(JSON.parse(deadlineJson))
    let attr;

    for (attr in deadlineJson) {
      this.docTimeDues.push(attr);
    }

    console.log(this.docTimeDues);

    // return

    this.getRequest("/organ/" + sessionStorage.getItem("authId"))
      .then((resp) => {
        this.weightForm = resp.data;
      this.$store.state.organ=this.weightForm  //为详情页存下来

        this.initNull();
        // this.initTable()
        console.log(resp.data);
      })
      .then(() => {
        var docAboutId;
        var keywordId;
        var dutyAuthorId;
        if (sessionStorage.getItem("docType") == "official") {
          docAboutId = this.weightForm.docIssueWig;
          keywordId = this.weightForm.docKeywordWig;
          dutyAuthorId = this.weightForm.docAuthorWig;
          this.authorKwToDeadlineTable = this.weightForm.officialAuthorKeywordDeadline;
          this.descToAuthor = this.weightForm.officialDescAuthor;
          // console.log(docAboutId)
        }
        if (sessionStorage.getItem("docType") == "science") {
          docAboutId = this.weightForm.tecProjectWig;
          keywordId = this.weightForm.tecKeywordWig;
          dutyAuthorId = this.weightForm.tecAuthorWig;

          this.authorKwToDeadlineTable = this.weightForm.tecAuthorKeywordDeadline;
          this.descToAuthor = this.weightForm.tecDescAuthor;
        }
        if (sessionStorage.getItem("docType") == "business") {
          docAboutId = this.weightForm.busProjectWig;
          keywordId = this.weightForm.busKeywordWig;
          dutyAuthorId = this.weightForm.busAuthorWig;

          this.authorKwToDeadlineTable = this.weightForm.busAuthorKeywordDeadline;
          this.descToAuthor = this.weightForm.busDescAuthor;
        }
        if (sessionStorage.getItem("docType") == "personnel") {
          keywordId = this.weightForm.perKeywordWig;
        }

        if (sessionStorage.getItem("docType") == "officialJ") {
          //机构分卷法 获取单位表里面存的 机构名-机构词对照表
          docAboutId = this.weightForm.docIssuejWig;
          keywordId = this.weightForm.docKeywordjWig;
          dutyAuthorId = this.weightForm.docAuthorjWig;
          this.authorKwToDeadlineTable = this.weightForm.officialAuthorKeywordDeadline; //
          this.descToAuthor = this.weightForm.officialDescAuthor;

          this;
        }
        var dabJson = {};
        var kwdJson = {};
        var autJson = {};
        if (sessionStorage.getItem("docType") != "personnel") {
          var that = this;
          Promise.all([
            new Promise((resolve, reject) => {
              that.getRequest("/weight/" + docAboutId).then((resp) => {
                dabJson = resp.data.tables;
                this.docAbout_KeywordArrJson = resp.data.issueKeyword;
                resolve(resp);
              });
            }),

            new Promise((resolve, reject) => {
              that.getRequest("/weight/" + keywordId).then((resp) => {
                kwdJson = resp.data.tables;
                console.log("关键词jsontable");
                this.keyword_docAboutJson = resp.data.keywordIssue;
                resolve(resp);
              });
            }),

            new Promise((resolve, reject) => {
              that.getRequest("/weight/" + dutyAuthorId).then((resp) => {
                autJson = resp.data.tables;
                resolve(resp);
              });
            }),
          ]).then((resp) => {
            var attr;

            for (attr in autJson) {
              this.dutyAuthorTipArr.push(attr);
            }
          });

          //  this.getRequest("/work/"+sessionStorage.getItem('batchId')) //
          //       .then((resp) => {

          //       })
        } //if非人事
        else {
          this.getRequest("/weight/" + keywordId)
            .then((resp) => {
              kwdJson = resp.data.tables;
            })
            .then(() => {
              for (attr in kwdJson) {
                this.keywordTipArr.push(attr);
              }
            });
        }
      });
  },
};
</script>

<style lang="scss">
.el-textarea__inner {
  &::placeholder {
    color: rgb(155, 155, 155);
  }

  &::-webkit-input-placeholder {
    /* WebKit browsers 适配谷歌 */
    color: rgb(155, 155, 155) !important;
  }

  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 适配火狐 */
    color: rgb(155, 155, 155) !important;
  }

  &::-moz-placeholder {
    /* Mozilla Firefox 19+ 适配火狐 */
    color: rgb(155, 155, 155) !important;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10+  适配ie*/
    color: rgb(155, 155, 155) !important;
  }
}
.docInForm >>> .el-input__inner {
  color: #000;

  border: 0.04rem solid #274596c5 !important;
}
.docInForm {
  .el-input__inner {
    color: #000;
  }
}

.docInForm {
  .textArea {
    height: 5rem;
  }

  .el-select {
    width: 100%;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 3.3rem;
  }

  .el-input__inner {
    &::placeholder {
      color: rgb(155, 155, 155);
    }

    &::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      color: rgb(155, 155, 155);
    }

    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      color: rgb(155, 155, 155);
    }

    &::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      color: rgb(155, 155, 155);
    }

    &:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: rgb(155, 155, 155);
    }
  }

  .el-input__inner {
    background: rgba(255, 255, 255, 0.15) !important;
    border-radius: 0.48rem;
    border: 0.05rem solid rgba(33, 57, 94, 0.74);
    height: 2.5rem !important;
    font-size: 1.1rem;
    padding-left: 3.3rem;
  }

  .DescNumStyle {
    .el-input__inner {
      // font-size: 0.8rem;
    }
  }

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

  .textAreaInput {
    background: rgba(255, 255, 255, 0.15) !important;
    // border-radius: 0.48rem;
    // border: 0.08rem solid #274596c5;
    // height: 5rem !important;
    // color: rgb(83, 17, 17);
    // font-size: 1.1rem;
    // padding-left: 3.3rem;
  }

  .el-form-item__label {
    line-height: 3rem !important;
  }
  .el-form-item__content {
    // height: 3rem !important;
  }
}
</style>


<style lang="scss" scoped>
// .detailBox{
//   width: 100%;
//   height: 50rem;
//   z-
// }
.matchedItem {
}
.matchedItem:hover {
  // background-color:rgb(57, 60, 65);
  color: #fff;
  font-weight: 550;
  cursor: pointer;
}

.matchedKVClass {
  height: 2rem;
  border-bottom: solid 0.2px #aaa;
}
.matchedDocClass {
  border-bottom: solid 0.2px #aaa;
}
.docSequenceTip {
  position: absolute;
  left: 2rem;
  top: 1rem;
}

.buttonGroup {
  position: relative;
  bottom: 0;
  height: 3rem;

  .bottomButton {
    display: flex;
  }
}

.keyWordSelect {
  width: 60rem;
  height: 8rem;
  padding-bottom: 2rem;

  position: absolute;
  top: 6rem;
  left: 50%;
  margin-left: -25rem;
  background-color: rgb(92, 96, 160);
  z-index: 3;

  .keywords {
    width: 10rem;
    height: 1.6rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    // position: absolute;
    float: left;

    z-index: 3;
    // background-color: #fff;
  }

  .keyWordsTimer {
    position: absolute;
    width: 10rem;
    height: 1.6rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    bottom: 0;
    right: 0;
    background-color: rgb(92, 96, 160);
    z-index: 3;
  }
}

.el-date-editor.el-input {
  width: 100%;
}

.el-date-editor.el-input__inner {
  padding-left: 3.3rem;
}

.docTypeTitle {
  position: absolute;
  width: 50rem;
  left: 50%;
  margin-left: -25rem;
  font-size: 1.2rem;
  top: -2.5rem;
  text-align: center;
}
.docInForm {
  position: relative;
  padding-top: 4rem;
  top: 5rem;
  left: 16%;
  padding-bottom: 2rem;
  width: 70rem;
  padding-right: 5rem;
  border: solid 1px;
}

.wrapper {
  height: 150vh;

  position: relative;
  background-color: rgb(255, 255, 255);
}
</style>