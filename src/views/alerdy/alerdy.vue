<template>
    <div class="container">
              <el-breadcrumb separator-class="el-icon-arrow-right" class="lujing">
 <el-breadcrumb-item >员工管理</el-breadcrumb-item>
  <el-breadcrumb-item>已发放工资名单</el-breadcrumb-item>
  
</el-breadcrumb>
    <el-row>
  <el-col :span="24" class="total">
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
       <!--  <div class="contain-box">
        </div> -->
        <div>
               <div class="tablenews">
            <el-table
                    :data="tableData3"
                    class="tableall"
            >

<el-table-column label="序号"
      type="index"
      width="100">
    </el-table-column>

                <!-- <el-table-column
                        label="序号"
                        width="100">
                    <template slot-scope="scope">

                        <p>{{scope.row.ckid}} </p>
                    </template>
                </el-table-column> -->
                <el-table-column
                        label="开户人姓名"
                        width="150">
                    <template slot-scope="scope">

                        <span style="margin-left: 10px">{{ scope.row.oaaname}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="查看状态"
                       >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.fundstate=="010"?"未打款":"已打款"}}</span>
                    </template>
                </el-table-column>
                                <el-table-column
                        label="打款金额"
                        >
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.aomoney}}</span>
                    </template>
                </el-table-column>


                <el-table-column class="poiner" label="操作"
                width="300"
                >
                    <template slot-scope="scope">
                   <!--      <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">查看
                        </el-button> -->
                        <i class="el-icon-view fonticon poiner"  @click="handleEdit(scope.$index, scope.row)"><span class="font">查看</span></i>
                        
                       
                    </template>
                </el-table-column>
            </el-table>
            <div class="block page">
            <el-pagination
                    @current-change="handleCurrentChange"
                    background
                    layout="prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
        </div>
        
        </div></el-col>
</el-row>
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
                    <span>发放数额</span><input type="number" v-model="lookarray.money" disabled="" placeholder="请输入金额"
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
      currentPage4: 4,
      input21: "",
      value1: "",
      value1:"",
      total: 1,
      options: [
        {
          value: "020",
          label: "已提交"
        },
        {
          value: "030",
          label: "处理中"
        },
        {
          value: "040",
          label: "已经完成"
        }
      ],
      dialoglook: false,
      value: "",
      input1: "",
      input2: "",
      page: 1,
      input3: "",
      lookarray: {},
      tableData3: [],
      multipleSelection: [],
      pickerBeginDateBefore: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getdata();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getdata({suTime = ""}) {
      var json = JSON.stringify({
        page: this.page,
         suTime: suTime
      });
      this.$http
        .post("ws_api/makem/seleyida.do", `jsonStr=${json}`)
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.tableData3 = res.data.info.sj;
            console.log(this.tableData3);
          }else if (res.data.code == 202){
             this.tableData3 = []
          }
        });
    },
    handleEdit(index, user) {
      var ckid = user.ckid;
      var month = user.month;
      var lookjson = JSON.stringify({
        id: ckid,
        month: month
      });

      this.$http
        .post("ws_api/tbm/seleOne.do", `jsonStr=${lookjson}`)
        .then(res => {
          console.log(res);
          if (res.data.code == 202) {
            this.dialoglook = false;
            this.$message({
              type: "success",
              message: "暂无数据哦"
            });
          } else if (res.data.code == 200) {
            this.dialoglook = true;
            this.lookarray = res.data.info;
            this.total = res.data.info.totl;
            console.log(this.total);
          }
        });
    }
  },
   formatDate(date) {
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 > 10
          ? date.getMonth() + 1
          : "0" + date.getMonth() + 1;
      var day = date.getDate() > 10 ? day : "0" + date.getDate();

      return `${year}${month}${day}`;
    },
    // 时间查询
    datechange() {
      if (this.value1) {
        var changedate = this.value1;
      } else {
        var changedate = this.formatDate(new Date());
      }
      this.getdata({
        suTime: changedate
      });
    },
 
  created() {
    this.getdata();
  }
};
</script>
<style scoped>
.container {
  /* padding-left:30px;*/
  box-sizing: border-box;
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
  padding-left: 20px;
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

h1 {
  font-size: 40px;
  margin-top: 20px;
  color: #ccc;
}

.searchin {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #fff;
  padding-bottom: 30px;
}

.searchinput {
  width: 300px;
}

.contain-box {
  display: flex;
  flex-direction: row;
  wisth: 100%;
  background-color: #fff;

  bottom: 30px;
}

.searchin {
  display: flex;
  flex-direction: row;
  /*justify-content: flex-end;*/
  padding-left: 10px;
  background-color: #fff;
  padding-bottom: 30px;
  padding-right: 10px;
  font-size: 14px;
  padding-bottom: 10px;
  padding-top: 30px;
}

.searchinput2,
.searchinput1 {
  width: 200px;
  font-size: 14px;
}

.searchinput2 {
  margin: 0 20px;
}

.searchinput {
  width: 200px;
  font-size: 14px;
}

.searchbutton {
  margin-left: 20px;
}

.elselect {
  padding-left: 20px;
  width: 200px;
}

.searchinput {
  width: 200px;
  font-size: 14px;
}

.content-title {
  width: 100%;
  background-color: #fff;
  font-size: 20px;

  color: #666;
  padding: 20px 0 0px 0;
  text-align: center;
  padding-bottom: 10px;
}

.page {
  /*width: 100%;*/
  text-align: center;
}
.infodeteil {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}

.infodeteil p {
  width: 50%;
  line-height: 40px;
  font-size: 20px;
}

.money {
  border: 1px solid #ccc;
  width: 300px;
  padding: 10px 0;
  padding-left: 10px;
  margin-left: 30px;
}

.infodeteil {
  padding-bottom: 30px;
}

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
.tableall {
  padding: 0 10px;
}
.font {
  padding-left: 10px;
}
.fonticon {
  font-size: 10px;
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
  padding-bottom: 10px;
}

.infodeteil p {
  width: 50%;
  line-height: 30px;
  font-size: 16px;
}
.money {
  border: 1px solid #ccc;
  width: 300px;
  padding: 10px 0;
  padding-left: 10px;
  margin-left: 30px;
}
.textarea {
  margin-top: 30px;
}
.poiner {
  cursor: pointer;
}
.lujing {
  padding-bottom: 10px;
}
.total {
  padding-right: 10px !important;
}
</style>
