1、已印 2、根据识别号

          <div
            v-for="(item, index) in this.$store.state.alreadyDocs"
            :key="index"
            style="border-bottom: 0.05rem solid"
          class="infoItemHighlight" >
            <!-- 上面是循环有多少个人  -->
            <!-- 接下来是循环每个人的16个list -->
            <div v-for="(i, ind) in item" :key="ind">
              <div v-for="(j, ind3) in i" :key="ind3">
                <div class="itemInfo" style="width:3%">
                  {{ j.docSequence }}
                </div>
                <div class="itemInfo" v-if="ind3 == 0">
                  {{ j.personName }}
                </div>
                <div class="itemInfo"  v-if="ind3 != 0">&nbsp;</div>

                <div class="itemInfo" style="width: 10%" v-if="ind3 == 0">
                  {{ j.docAbout }}
                </div>
                <div class="itemInfo" v-if="ind3 != 0">&nbsp;</div>

                <div class="itemInfo" style="width: 10%">
                  {{ j.docAboutSub == "无" ? "&nbsp;" : j.docAboutSub }}
                </div>

                <div class="itemInfo" style="width: 15%">
                  {{ j.docTitle }}
                </div>

                <div class="itemInfo">
                  {{ j.docDate }}
                </div>

                <div class="itemInfo" style="width: 4%">
                  {{ j.docPage }}
                </div>
                <div class="itemInfo" style="width: 4%">
                  {{ j.docNum == "" || j.docNum == null ? "&nbsp;" : j.docNum }}
                </div>
                <div class="itemInfo" style="width: 10%" >
                  {{ j.remark == "" || j.remark == null ? "&nbsp;" : j.remark }}
                </div>
                <div class="itemInfo2" style="width: 10%">
                  <div
                    style="float:left;margin-left=1rem"
                    class="optionDiv"
                    @click="fixThisItem(j)"
                  >
                    修改
                  </div>
                  <div
                    style="float: left"
                    class="optionDiv"
                    @click="deleteThisItem(j)"
                  >
                    删除
                  </div>
                                    <div
                    style="float: left"
                    class="optionDiv"
                    @click="printBtn(j)"
                  >
                    印章
                  </div>
                </div>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>