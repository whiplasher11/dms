        <div v-if="docType!='science'">
          <div class="detailItem">
            <div class="itemInfo">识别号</div>

            <div class="itemInfo">档号</div>
            <div class="itemInfo">文号</div>
            <div class="itemInfo">责任者</div>
            <div class="itemInfo" style="font-size:0.6rem;width:10%">题名</div>
            <div class="itemInfo">成文时间</div>
            <div class="itemInfo">密级</div>
            <div class="itemInfo">页数</div>
            <div class="itemInfo" style="font-size:0.6rem;width:10%">备注</div>
            <div class="itemInfo">件号</div>
            <div class="itemInfo">盒号</div>

            <div style="clear:both"></div>

            <!-- <div style="clear:both"></div> -->
          </div>

          <div
            class="detailItem"
            v-for="item in this.$store.state.alreadyDocs"
            :key="item.docSequence"
          >
            <div class="itemInfo">{{item.docSequence}}</div>

            <div
              class="itemInfo"
            >{{authCode+'-'+item.docTypeCode+'·'}}{{item.sortYear|formatSortYear}}-{{item.deadline|deadlineFormat}}-{{item.docAbout+'-'}}{{item.docNum|formatFourNum}}</div>
            <!-- 档号 -->
            <!-- <div class="itemInfo">{{item.docDescAuthor+'['}}{{item.sortYear|formatSortYear}}{{']'+(item.docNum?item.docNum:'暂无')+"号"}}</div> -->
            <div class="itemInfo">{{item.docDesc?item.docDesc:'&nbsp;'}}</div>

            <div class="itemInfo">{{item.dutyAuthor}}</div>
            <div class="itemInfo" style="font-size:0.6rem;width:10%">{{item.docTitle}}</div>
            <div class="itemInfo">{{item.docDate}}</div>
            <div class="itemInfo">{{item.docSecret=='无'?'&nbsp;':item.docSecret}}</div>
            <div class="itemInfo">{{item.docPage}}</div>
            <div
              class="itemInfo"
              style="font-size:0.6rem;width:10%"
            >{{item.remark?item.remark:'&nbsp;'}}</div>
            <div class="itemInfo">{{(item.docNum?item.docNum:'暂无')}}</div>
            <div class="itemInfo">{{(item.boxSeq?item.boxSeq:'暂无')}}</div>
            <div class="itemInfo" style="width:10%">
              <div
                style="float:left;margin-left=1rem"
                class="optionDiv"
                @click="fixThisItem(item)"
              >修改</div>
              <div style="float:left" class="optionDiv" @click="deleteThisItem(item)">删除</div>
            </div>
            <div style="clear:both"></div>
            <!-- <div style="clear:both"></div> -->
          </div>
        </div>