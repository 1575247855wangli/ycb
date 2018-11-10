<template>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="lujing">
 <el-breadcrumb-item >员工管理</el-breadcrumb-item>
  <el-breadcrumb-item>设置员工工资</el-breadcrumb-item>
  
</el-breadcrumb>
        <div class="contain-box">

            <div class="block">
                <el-date-picker
                        v-model="value1"
                        @change="datechange"
                        type="date"
                        class="chosedate"
                        value-format="yyyyMMdd"
                      
                        placeholder="选择日期">
                </el-date-picker>
            </div>
  <!-- :picker-options="pickerBeginDateBefore" -->
            <div class="searchin">
                <el-input
                        class="searchinput1"
                        placeholder="请输入搜索信息"
                        prefix-icon="el-icon-search"
                        v-model="name">
                </el-input>
                <!-- <el-input
                        class="searchinput2"
                        placeholder="请输入搜索人id"
                        prefix-icon="el-icon-search"
                        v-model="id">
                </el-input> -->
                <!-- <el-input
                        class="searchinput"
                        placeholder="请输入手机号"
                        prefix-icon="el-icon-search"
                        v-model="phone">
                </el-input> -->
                       <el-select class="elselect"  v-model="choevalue" placeholder="请选择">
                    <el-option
                            v-for="item in chosebox"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select class="elselect"  v-model="value" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" class="searchbutton" @click="searchsession" icon="el-icon-search">搜索
                </el-button>
                 <el-button type="primary" class="null" @click="handlenull" >重置查询
                </el-button>
               
            </div>
        </div>
        <div>
         <el-table
         :data="tableData3"
         class="tableall"
            >
                <!-- <el-table-column
                        label="序号"
                        width="100">
                    <template slot-scope="scope">
                        <p>{{scope.row.id}} </p>
                    </template>
                </el-table-column> -->
                <el-table-column label="序号"
      type="index"
      width="100">
    </el-table-column>
                <el-table-column
                        label="开户人姓名"
                       >
                    <template slot-scope="scope">

                        <span style="margin-left: 10px">{{ scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="手机号"
                        >
                    <template slot-scope="scope">

                        <span style="margin-left: 10px">{{ scope.row.phone}}</span>
                    </template>
                </el-table-column>
                 <el-table-column
                        label="操作者"
                        
                        >
                    <template slot-scope="scope">

                        <span >{{ scope.row.czz}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作状态"
                       >
                    <template slot-scope="scope">
                        <span v-if="scope.row.submittype=='010'" style="margin-left: 10px">未提交</span>
                         <span v-if="scope.row.submittype=='020'" style="margin-left: 10px">已提交</span>
                         <span v-if="scope.row.submittype=='030'" style="margin-left: 10px">审核中</span>
                         <span v-if="scope.row.submittype=='040'" style="margin-left: 10px">已完成</span>
                    
                    </template>
                </el-table-column>
                <el-table-column class="poiner" label="操作"
                width="300"
                >
                    <template slot-scope="scope">
                      <el-button type="text" class="el-icon-edit iconphone poiner" :disabled = "scope.row.submittype != '010'"  @click="handleedit(scope.$index, scope.row)"><span class="font">编辑</span></el-button>
                        <i class="el-icon-view fonticon iconphone poiner"  @click="handlelook(scope.$index, scope.row)"><span class="font">查看</span></i>
                        <i class="el-icon-delete iconphone poiner"  @click="handleDelete(scope.$index,scope.row)"> <span class="font"> 删除</span></i>
                       
                    </template>
                </el-table-column>
            </el-table>



        <div class="block page">
            <el-pagination
                    @current-change="handleCurrentChange"
                    background
                    :page-size="10"
                    layout="prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>

            </div>
        <el-dialog :visible.sync="dialogshowFormVisible">
            <div class="edit">
                <div class="save">
                    <h2>基本信息</h2>
                    <p>
                        <button @click="save">保存</button>
                        <button @click="dialogshowFormVisible=false">取消</button>
                    </p>
                </div>
                <div class="info">
                    <div class="infodeteil">
                        <p class="display">手机号：{{add.phone}}</p>
                        <p>姓名：{{add.name}}</p>
                        <p>开户行：{{add.bankaddress}}</p>
                        <p>手机号码：{{add.phone}}</p>
                        <p>银行卡号：{{add.banknumber}}</p>
                        <p>申请时间：{{add.applytime}}</p>
                        <p>开户行姓名：{{add.bankname}}</p>
                        <p>申请编号:{{add.applyNumber}}</p>
                    </div>
                    <span>输入待发放数额</span><input type="text"   v-model="moneynum" placeholder="请输入金额" class="money">

                    <div class="update">
                         <div class="tupian">
                            <span>营业执照</span>
                            <span>共两张</span>
                           
                        </div>
                        <div class="imgbox">
                            <img :src="add.businessimg1" class="img" alt="">
                             <img :src="add.usinessimg2" class="img" alt="">
                        </div>
              
                        <el-input
                                class="textarea"
                                type="textarea"
                              
                                 :rows="2"
                                placeholder="请输入内容"
                                v-model="textarea">
                        </el-input>
                    </div>

                </div>
            </div>

        </el-dialog>


        <el-dialog :visible.sync="dialoglook">
            <div class="edit">
                <div class="save">
                    <h2>基本信息</h2>
                </div>
                <div class="info">
                    <div class="infodeteil">
                        <p>姓名：{{lookarray.name}}</p>
                        <p>开户行：{{lookarray.bankaddress}}</p>
                        <p>手机号码：{{lookarray.phone}}</p>
                        <p>银行卡号：{{lookarray.banknumber}}</p>
                        <p>申请时间：{{lookarray.applytime}}</p>
                        <p>开户行姓名：{{lookarray.bankname}}</p>
                        <p>申请编号:{{lookarray.applyNumber}}</p>
                    </div>
                    <span>发放数额</span><input type="number" v-model="lookarray.money" disabled="" 
                                            class="money">

                    <div class="update">
                        <div class="tupian">
                            <span>营业执照</span>
                            <span>共两张</span>
                           
                        </div>
                        <div class="imgbox">
                            <img :src="lookarray.businessimg1" class="img" alt="">
                             <img :src="lookarray.usinessimg2" class="img" alt="">
                        </div>

                        <el-input
                                class="textarea"
                                type="textarea"
                                disabled
                                :rows="2"
                                v-model="lookarray.remarks">
                        </el-input>
                    </div>

                </div>
            </div>
        </el-dialog>

    </div>
</template>
<script>
export default {
  data() {
    return {
      // pickerBeginDateBefore: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   }
      // },
      currentPage4: 4,
      name: "",
      id: "",
      phone: "",
      dialoglook: false,
      page: 1,
      value1: "",
      chosebox: "",
      add: {
        field1: "",
        id: "",
        money: "",
        bankname: "",
        bankaddress: "",
        account: "",
        banknumber: ""
      },
      moneynum: 0,
      total: 0,
      t: "",
      options: [
        {
          value: "010",
          label: "未提交"
        },

        {
          value: "020",
          label: "已提交"
        },
        {
          value: "030",
          label: "审核中"
        },
        {
          value: "040",
          label: "已完成"
        }
      ],
      chosebox: [
        {
          value: "020",
          label: "请输入id"
        },
        {
          value: "030",
          label: "请输入姓名"
        },
        {
          value: "040",
          label: "请输入手机号"
        }
      ],
      choevalue: "",
      value: "",
      dialogImageUrl: "",
      textarea: "",
      lookarray: {},
      moneystatue: "",
      dialogVisible: false,
      dialogshowFormVisible: false,
      tableData3: [],
      multipleSelection: [],
      statetype: "",
      selectvalue: "",
      savetime: ""
    };
  },
  created() {
    this.handlelookall({});
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.handlelookall({});
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    // 查看所有
    handlelookall({
      date = this.formatDate(new Date()),
      handleType = "",
      state = "",
      type = ""
    }) {
      let jsonStr = JSON.stringify({
        page: this.page,
        cktime: date,
        handleType: handleType,
        state: state,
        type: type
      });
      this.$http
        .post("/ws_api/tbm/seleAll.do", `jsonStr=${jsonStr}`)
        .then(res => {
          if (res.data.code == 200) {
            this.tableData3 = res.data.info.ckxx;
            this.total = res.data.info.totl;
          } else if (res.data.code == 202) {
            // this.$message({
            //   type: "success",
            //   message: "暂无数据哦"
            // });
            this.tableData3 = [];
          }
        });
    },
    // 删除
    handleDelete(index, user) {
      const { id } = user;
      var delejson = JSON.stringify({
        id:id
      })
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("ws_api/tbm/deleOne.do", `jsonStr=${delejson}`)
            .then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.handlelookall({});
              }
            });
        })
        .catch(() => {});
    },
    // handleInput(e){
    //     this.moneynum = target.value.replace(/[^\.\d]/g,'')
    // },

    // 查看
    handlelook(index, user) {
      var id = user.id;
      var looktime = "";
      // if (this.value1 == "null") {
      //   looktime = this.formatDate(new Date());
      // } else if (this.value1 != "") {
      //   looktime = this.value1 + "000000";
      // }
      looktime =
        this.value1 != ""
          ? this.value1 + "000000"
          : this.formatDate(new Date());

      var lookjson = JSON.stringify({
        id: id,
        month: looktime
      });
      this.dialoglook = true;
      this.$http
        .post("ws_api/tbm/seleOne.do", `jsonStr=${lookjson}`)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.lookarray = res.data.info;
            looktime = "";
          }
        });
    },
    // 编辑
    handleedit(index, user) {
      var id = user.id;

      this.dialogshowFormVisible = true;
      var edittime = "";
      edittime =
        this.value1 != ""
          ? this.value1 + "000000"
          : this.formatDate(new Date());
      var editjson = JSON.stringify({
        id: id,
        month: edittime
      });

      this.$http
        .post("ws_api/tbm/seleOne.do", `jsonStr=${editjson}`)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.add = res.data.info;
          }
        });
    },
    // 新增账单
    save() {
      if (this.value1 == "") {
        this.$message({
          type: "warning",
          message: "请先选择日期,选择的日期不能小于当天日期"
        });
        return false;
      }

      this.savetime = this.value1 + "000000";
      if (this.savetime < this.formatDate(new Date())) {
        this.$message({
          type: "warning",
          message: "选择的日期不能小于当天日期"
        });
        return false;
      }
      // if (this.savetime<this.formatDate(new Date())){
      //    this.$message({
      //     type: "warning",
      //     message: "选择的日期不能超过当前日期"
      //   });
      //   return false
      // }

      let moneynum = this.moneynum;

      if (moneynum > 30000) {
        this.$message({
          type: "warning",
          message: "金额不能高于30000元"
        });
        return false;
      }
      let jsonStr1 = JSON.stringify({
        field1: this.add.field1,
        id: this.add.id,
        money: this.moneynum,
        bankname: this.add.bankname,
        bankaddress: this.add.bankaddress,
        banknumber: this.add.bankaddress,
        account: this.add.account,
        filld: this.savetime,
        remarks: this.textarea,
        name: this.add.name,
        phone: this.add.phone
      });
      this.$http
        .post("ws_api/makem/instMakemone.do", `jsonStr=${jsonStr1}`)
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "本月已提交"
            });
            this.dialogshowFormVisible = false;
            this.moneynum = 0;
            this.add.remarks = "";
            this.savetime = "";
           
            this.textarea = "";
              this.handlelookall({});
          }
        });
    
    },
    // 搜索功能
    searchsession() {
      var handleType = this.value; // choevalue 这两个是啥子 是如果为id 我就传020
      var type = this.choevalue;
      var state = this.name;
      this.handlelookall({
        handleType: handleType,
        type: type,
        state: state
      });
    },

    // 下拉框
    // choosetype(val) {

    //   this.selectvalue = val;

    // },
    // 时间切换
    datechange() {
      if (this.value1) {
        var changedate = this.value1 + "000000";
      } else {
        var changedate = this.formatDate(new Date());
      }

      this.handlelookall({
        date: changedate
      });
    },
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // getvalue (val){
    //   this.statetype = val

    // },
    // 重置查询
    handlenull() {
      this.name = "";
      this.value1 = null;
      this.value = "";
      this.choevalue = "";
      // 重新获取全部数据
      if (
        this.name == "" &&
        this.value == "" &&
        this.choevalue == "" &&
        this.value1 == null
      ) {
        this.handlelookall({});
      }
    }
  }
};
</script>
<style scoped>
.lujing {
  padding-bottom: 10px;
}
.contain-box {
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: #fff;

  bottom: 30px;
}

.search {
  margin-bottom: 50px;
}

.input {
  height: 50px;
  border-radius: 10px;
  padding-left: 10px;
}

.confirm {
  height: 50px;
  border-radius: 10px;
}

.table {
  border: none;
}

.block {
  background-color: #fff;
  padding-left: 10px;
  border: none !important;
  padding-top: 30px;
  padding-bottom: 20px;
}

.head-wrap {
  width: 100%;
  background-color: #fff;
  padding-bottom: 30px;
  padding-top: 30px;
}

.head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1200px;
}



.searchin {
  display: flex;
  flex-direction: row;
  /*justify-content: flex-end;*/
  padding-left: 30px;
  background-color: #fff;
  padding-bottom: 30px;
  font-size: 14px;
  padding-top: 30px;
}

.searchinput2,
.searchinput1 {
  width: 150px;
  font-size: 14px;
}

.searchinput2 {
  margin: 0 10px;
}

.searchinput {
  width: 150px;
  font-size: 14px;
}

.searchbutton {
  margin-left: 20px;
  border-radius: 10px;
}
.null {
  width: 100px;
  border-radius: 10px;
}

/*.page {
      padding-left:500px;
    }*/
.infodeteil {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.infodeteil p {
  width: 50%;
  font-size: 20px;
}

.money {
  border: 1px solid #ccc;
  width: 300px;
  padding: 10px 0;
  padding-left: 10px;
  margin-left: 30px;
}

/* .infodeteil {
  padding-bottom: 30px;
} */

.tupian {
  margin-top: 30px;
}

.textarea {
  margin-top: 30px;
}

.tupian {
  margin-bottom: 30px;
}

.save {
  color: #333;
  font-size: 24px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.save h2 {
  font-size: 18px !important;
  color: #333;
  font-weight: 400;
  margin-bottom: 5px;
}

.save button {
  border: none;
  border-radius: 15px;
  background-color: transparent;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 15px;
  color: #fff;
}
.save button:first-child {
  border: 1px solid #409eff;
  background-color: #409eff;
}
.save button:nth-child(2) {
  border: 1px solid #ccc;
  background-color: #ccc;
}

.save p {
  margin-right: 30px;
  font-size: 14px;
}

.page {
  text-align: center;
}

.elselect {
  padding-left: 20px;
  width: 200px;
}

.news {
  padding-left: 20px;
}
.display {
  display: none;
}
.tableall {
  padding: 0 10px;
}
.font {
  font-size: 14px;
  padding-left: 5px;
}
.fonticon {
  padding: 0 10px;
}
.edit {
  margin-top: 0;
}
.chosedate {
  width: 200px;
}
.poiner {
  cursor: pointer;
}
.tupian {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.imgbox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.img {
  width: 48%;
  height: 300px;
}
.infodeteil {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.infodeteil p {
  width: 50%;
  line-height: 30px;
  font-size: 16px;
}
.el-button--text {
  color: #333;
}
.iconphone {
  color: #333;
  padding:0 ;
}
.el-table__row .cell {
  height: 20px !important;
}

</style>
