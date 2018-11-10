<template >
<div>
 <el-breadcrumb separator-class="el-icon-arrow-right" class="lujing">
 <el-breadcrumb-item >信息中心</el-breadcrumb-item>
  <el-breadcrumb-item>信息详情</el-breadcrumb-item>
  
</el-breadcrumb>
    <div class = "content" >
     
        <el-row>
        <el-col :span="24" >
        <div>

          <div class="contain-box" >
            <el-date-picker type="date"
              value-format = "yyyyMMdd"
                v-model = "time"
              @change="chosetime"
              placeholder = "选择日期" >
            </el-date-picker> 
            <el-select class="elselect" @change="changevalue" v-model="value1" placeholder = "请选择" >
              <el-option v-for = "item in options" :key = "item.value" :label = "item.label" :value = "item.value" >
              </el-option> 
            
            </el-select>
        </div >


          <div class="tablenews" >
            <el-table :data="tableData3" class= "tableall" >
            <el-table-column label= "消息" >
                <template slot-scope = "scope" >
              <p> {{scope.row.messageType == "010" ? "系统消息" :"账单消息"}}</p> </template >
            </el-table-column> 
            <el-table-column label="消息时间" >
                <template slot-scope = "scope" >
                <i class = "el-icon-time" ></i>
                  <span style="margin-left: 10px"> {{scope.row.createTime}}</span> 
                </template>
            </el-table-column> 
            
            <el-table-column label = "查看状态" >
              <template slot-scope = "scope" >{{scope.row.messageState =="010"? "已查看":"未查看"}} </template> 
            </el-table-column >
            <el-table-column class="poiner" label = "操作" >
                <template slot-scope = "scope" >
                <i class = "el-icon-view poiner" @click="handleEdit(scope.$index, scope.row)" >
                <span class = "font poiner" >查看 </span> </i>
                <i class="el-icon-delete poiner" @click = "handleDelete(scope.$index, scope.row)" v-if="scope.row.messageType=='010'" >
                  <span class="font poiner" >删除 </span> </i> </template> 
                  
            </el-table-column >
            </el-table>

          </div> 
          <div class="block page" >
            <el-pagination
            @current-change = "handleCurrentChange"
            background
            :page-size = "10"
            :total = "total"
            layout = "prev, pager, next" >
              </el-pagination>
        </div> 

        
          </div> 
          </el-col>
          </el-row>

        <el-dialog
          :visible.sync = "dialogshowFormVisible"
          @closed="closeDialog">
            <div class="message-box" >
            <div class = "boxmessage" >
                <h1 class="looktitle" >查看消息 </h1> 
                <span
                    v-if = "this.messagestatue=='020'"
                    class = "messagefanhui" >
                    {{statemessagefanhui}}
                </span> 
            </div>
            
            <div v-if = "this.messagestatue=='010'" >
                <div class="message" >
                <p class = "title" > {{ message}}</p> 
                </div>
            </div> 

          <div class = "bill" v-if="this.messagestatue=='020'" >
                  <el-table :data="billarr"
                      style="width: 100%" >
                      <el-table-column label="id" width = "80" >
                      <template slot-scope= "scope" >
                      <span> {{scope.row.id}} </span>
                          </template> 
                      
                      </el-table-column>
                      <el-table-column label = "姓名" width = "200" >
                          <template slot-scope = "scope" >
                          <span>{{scope.row.oaaname}}
                          </span>
                              </template>
                      </el-table-column> 

                      <el-table-column label = "打款状态" >
                          <template slot-scope = "scope" ><span> {{scope.row.fundstate =="010" ? "已打款" :"未到账"}}
                          </span> </template>
                          
                      </el-table-column>
                      
                      <el-table-column label = "打款金额" width = "150" >
                              <template slot-scope="scope" >
                              <span>{{ scope.row.aomoney}}</span> 
                              </template> 
                      </el-table-column> 
                  </el-table>
                  <div class = "money" >
                  <span class = "billmoney" >手续费: {{billjson.shouXu}}<span class = "yuan" >元 </span> </span> 
                  <span class = "service" >服务费: {{ billjson.seCharge}}<span class = "yuan" >元 </span> </span>
                  <span class = "total" >总数: {{billjson.zoJinE}}<span class = "yuan">元 </span> </span>
                  </div>
                  <h1>确认转账后,资金将直接打入我方账户无法退回</h1>
                  <div class = "usaccout" >
                          <div class = "usleft" >
                          <p>银行开户地址： {{billjson.openingBank}}</p>
                          <p>收款账号： {{ billjson.cardNumber}}</p> 
                          <p>转账金额: {{ billjson.transferAmount}}</p> 
                          <p>编号： {{billjson.number}}</p> 
                          </div>
                          <div class = "update" >
                                  <el-upload
                              action = "http://47.94.4.92:8080/ws_api/api/file/upload.do"
                              enctype = "multipart/form-data"
                              list-type = "picture-card"
                                  :before-upload = "beforeUpload"
                                  :on-success = "upLoadFileSuccess"
                                  :on-remove="handleRemove" 
                                  :file-list = "fileList"
                                  :class="{disabled:imgstate}"
                                  >
                                  <!-- <img v-if="imageUrl" :src="imageUrl" alt=""> -->    
                                  <i class = "el-icon-plus"></i> 
                              </el-upload >
                          </div> 
                      </div> 
                  <img   v-if="billjson.voucher==''"  :src="rootimg" class="uploadimages" alt="" >
                  <img v-else :src="billjson.voucher" class="uploadimages" alt="" >
                
                  
                  <el-button :disabled = "billjson.toState=='030' || billjson.toState=='040' " id = "btn" @click = "imgupdate" >确认 </el-button> 
          </div> 

        </div>
        </el-dialog>
 
     <!-- <el-dialog >
        <el-dialog:visible.sync="dialogVisible" >
        <img width = "100%" :src = "rootimg" alt = "">
    </el-dialog> -->
     </div>


</div>

     </template> 
    <script>
export default {
  data() {
    return {
      dialogshowFormVisible: false,
      options: [
        {
          value: "010",
          label: "已查看"
        },

        {
          value: "020",
          label: "未查看"
        },

        {
          value: "",
          label: "查看所有"
        }
      ],
      value1: "",
      statemessagefanhui: "",
      tableData3: [],
      time: "",
      page: 1,
      total: 0,
      status: "010",
      imgstate: false,
      dialogVisible: false,
      messagestatue: "",
      message: "",
      billarr: [],
      imageUrl: "",
      billjson: {},
      imageurl: "",
      rootimg: "",
      fileList: []
    };
  },

  created() {
    this.handlegetnews({});
  },

  methods: {
    handlegetnews({ createTime = "", messageState = "" }) {
      let news = JSON.stringify({
        page: this.page,
        createTime: createTime,
        messageState: messageState
      });
      this.$http
        .post("/ws_api/enews/seleAll.do", `jsonStr=${news}`)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.total = res.data.info.totl;
            this.tableData3 = res.data.info.sj;
          } else if (res.data.code == 202) {
            this.tableData3 = [];
          }
        });
    },

    formatDate(date) {
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 > 10
          ? date.getMonth() + 1
          : "0" + date.getMonth() + 1;
      var day = date.getDate() > 10 ? day : "0" + date.getDate();
      var hour = date.getHours() > 10 ? date.getHours() : "0" + date.getHours();
      var minute =
        date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes();
      var second =
        date.getSeconds() > 10 ? date.getSeconds() : "0" + date.getSeconds();
      return `${year}${month}${day}${hour}${minute}${second}`;
    },
    //当前页数改变时
    handleCurrentChange(val) {
      this.page = val;
      this.handlegetnews({});
    },

    chosetime() {
      var time = "";
      if (this.time == null) {
        time = "";
      } else {
        time = this.time + "000000";
      }
      this.handlegetnews({
        createTime: time
      });
    },

    changevalue() {
      this.handlegetnews({
        messageState: this.value1
      });
    },

    // 删除
    handleDelete(index, row) {
      var id = row.id;

      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("ws_api/enews/delOng.do", `jsonStr={id:${id}}`)
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.handlegetnews({});
              }
            });
        })
        .catch(() => {});
    },

    //查看
    handleEdit(index, row) {
      this.rootimg = "";
      this.status = row.fieid1;
      var lookid = row.id + "";
      this.messagestatue = row.messageType;
      
      var fieid1 = row.fieid1 ? row.fieid1 : "";
      var looknews = JSON.stringify({
        id: lookid,
        messageType: this.messagestatue,
        fieid1: fieid1
      });
      this.$http
        .post("ws_api/tblem/seleTblem.do", `jsonStr=${looknews}`)
        .then(res => {
            console.log(res)
          if (res.data.code == 201) {
            this.dialogshowFormVisible = true;
            this.a = res.data.info.message;
             this.handlegetnews({});
          } else if (res.data.code == 200) {
            this.dialogshowFormVisible = true;
            this.billarr = res.data.info.ck;
            this.billjson = res.data.info.zd;
            this.handlegetnews({});
            this.handlestatue(this.billjson.toState);
          } else if (res.data.code == 202) {
            this.tableData3 = [];
          }
        });
    },
    //删除图片
    handleRemove(file, fileList) {
      this.rootimg = "";
      this.imgstate = false;
    },
    // 上传图片之前

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;

      this.dialogVisible = true;
    },

    beforeUpload() {
      console.log(1);
    },

    //图片上传
    imgupdate() {
      if (this.imageurl.trim() === "") {
        this.$message({
          type: "warning",
          message: "请上传打款凭证"
        });
        return false;
      }

      var submitjson = JSON.stringify({
        id: this.billjson.id,
        voucher: this.rootimg
      });

      this.$http
        .post("/ws_api/tblem/updateTblem.do", `jsonStr=${submitjson}`)
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "恭喜您，上传成功"
            });
            this.dialogshowFormVisible = false;
          }
        });
    },
    closeDialog() {
      this.fileList = [];
      this.imgstate = false;
    },
    //文件上传成功回调
    upLoadFileSuccess(response, file, fileList) {
      console.log(response);
      this.fileList = fileList;
      this.imgstate = true;
      this.imageurl = JSON.parse(response.info).lj;
      console.log(this.imageurl);
      this.rootimg = "http://47.94.4.92:8080" + this.imageurl;
      console.log(this.rootimg);
    },

    //处理文字
    handlestatue(val) {
      if (val == "010") {
        this.statemessagefanhui = "未审核";
      } else if (val == "020") {
        this.statemessagefanhui = "账单已提交";
      } else if (val == "030") {
        this.statemessagefanhui = "二次审核";
      } else if (val == "040") {
        this.statemessagefanhui = "已完成";
      }
    }

    //放大图片
  }
};
</script> 
<style scoped >
.contain-wrap {
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;
}

.content {
  background-color: #fff;
  min-height: 700px;
}

.elselect {
  padding: 0 100px;
}

.tableinfo {
  padding-left: 30px;
  padding-top: 30px;
}

.page {
  text-align: center;
  padding-top: 30px;
}

.tablenews {
  width: 100%;
  background-color: #fff;
}

.tableall {
  padding: 0px 10px;
}

.message {
  border: 1px solid #ccc;
  box-shadow: 4px 4px 4px #ccc;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  margin-top: 10px;
  padding-bottom: 30px;
}

.title {
  padding-left: 5px;
  box-sizing: border-box;
  margin-top: 5px;
  text-align: left;
}

.money {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.yuan {
  color: red;
}

.service {
  padding: 0 30px;
}

.total {
  margin-right: 30px;
}

.bill {
  padding-top: 10px;
  padding-left: 10px;
}

.usaccout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
}

.usleft {
  display: flex;
  flex-direction: column;
  line-height: 30px;
  justify-content: flex-start;
}

h1 {
  font-size: 20px;
  font-weight: 600;
}

#btn {
  padding-top: 15px;
  padding-bottom: 15px;
  color: #fff;
  text-align: center;
  width: 100%;
  margin-top: 20px;
  background-color: #409eff;
}

.looktitle {
  font-size: 28px;
  margin-bottom: 15px;
}
.contain-box {
  padding-top: 30px;
  padding-left: 10px;
}
.el-table::before {
  height: 0 !important;
}
.looktitle {
  font-size: 20px !important;
  margin-bottom: 0;
}
h1 {
  font-weight: 400;
}

.font {
  padding-left: 5px;
}
.poiner {
  cursor: pointer;
}
.el-dialog__body {
  padding: 10px 30p;
}
.boxmessage {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.messagefanhui {
  padding: 3px 9px;
  border: 1px solid #ccc;
  margin-right: 20px;
}
.uploadimages {
  width: 100%;
  padding-top: 20px;
  height: 300px;
}

.el-dialog__body {
  padding: 10px 30px;
}
.lujing {
  padding-bottom: 10px;
}
.el-select-dropdown {
  min-width: 220px !important;
}
.el-popper {
  min-width: 220px !important;
}
.message-box {
  padding-bottom: 30px;
}
</style>
