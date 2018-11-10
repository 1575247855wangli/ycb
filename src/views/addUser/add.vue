<template>
    <div class="contain-wrap">
        <div class="top-contain">
             <el-breadcrumb separator-class="el-icon-arrow-right" class="lujing">
  <el-breadcrumb-item >个人中心</el-breadcrumb-item>
  <el-breadcrumb-item>添加用户</el-breadcrumb-item>
  
</el-breadcrumb>
<div class="searchname">
    <el-input v-model="rowusername" placeholder="请输入用户名"></el-input><button type="text"  class="usernamebtn" @click="selectusername">查询</button><button type="text"  class="selectall" @click="selectall">重置查询</button>
</div>
<button type="text" class="addbtn" @click="addusername">新增用户</button>
        </div>
    <el-row>
  <el-col :span="24">
  <div>
        <!-- <el-form :inline="true" class="form demo-form-inline" :model="formInline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.name" class="inputsearch" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="formInline.accout" class="inputsearch" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="fright">
                <el-input v-model="formInline.psd" class="inputsearch" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="重复密码">
                <el-input v-model="formInline.repsd" class="inputsearch" placeholder="请再次输入密码"></el-input>
            </el-form-item>
         <span class="save"  @click="onSubmit" >保存</span>
        </el-form> -->
       
<div class="tablebox">
        <div class="table">
            <el-table
               class="tablefrom"
                :data="tableData"
                 style="width: 100%">
                    <el-table-column label="序号"
      type="index"
      width="200">
    </el-table-column>
                <!-- <el-table-column
                prop="userNo"
                label="用户编号"
                width="100">
                </el-table-column> -->
                <el-table-column
                        prop="userName"
                        label="用户名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="loginName"
                        
                        label="用户登入账号">
                </el-table-column>
                <!-- <el-table-column
                        prop="password"
                         
                        label="用户密码">
                </el-table-column> -->
               <!--  <el-table-column
                        prop="createTime"
                      
                        label="添加时间">
                </el-table-column> -->
                <el-table-column
                        prop="address"
                        width="300"
                        class="poiner"
                        label="操作"
                >
                    <template slot-scope="scope">
                       <i class="el-icon-edit iconphone poiner"  @click="handleedit(scope.row)">  <span class="font">修改</span></i>
                <i class="el-icon-circle-plus-outline sendrole poiner" @click="handlelook(scope.row)">  <span class="font">分配角色</span></i>
                <i class="el-icon-delete iconphone poiner"  @click="handleDelete(scope.row)"> <span class="font"> 删除</span></i>
                       <!--  <el-button size="mini" type="primary" >修改密码</el-button>
                        <el-button size="mini" type="danger" @click="handlelook(scope.row)">分配角色</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
            <div class="block page">
                <el-pagination
                        @current-change="handleCurrentChange"
                        background
                        :page-size="10"
                        layout="prev, pager, next"
                        :total="total"
                >
                </el-pagination>
            </div>
        </div>
        </div>
    </div></el-col>
</el-row>

        <el-dialog
                title="修改账户信息"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <el-form :label-position="labelPosition" label-width="100px">
                <el-form-item class="disable" label="用户编号">
                    <el-input v-model="userno"></el-input>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="登入账号">
                    <el-input v-model="loginname"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                    <el-input v-model="passwrd"></el-input>
                </el-form-item>
            </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handledit">确 定</el-button>
  </span>
        </el-dialog>


        <el-dialog
                title="添加角色"
                :visible.sync="role"
                
        >
            <p class="p">请选择角色名称：</p>
            <el-radio-group v-model="chooserole" @change="chooseroleno">
                <el-radio class="radio" v-for="item in radiolist" :key="item.roleNo" :label="item.roleNo">{{item.roleName}}</el-radio>

            </el-radio-group>
  <span slot="footer" class="dialog-footer">
    <el-button @click="role = false">取 消</el-button>
    <el-button type="primary" @click="handlerolechange" >确 定</el-button>
  </span>
        </el-dialog>


        <el-dialog
                title="新增用户"
                :visible.sync="adduser"
                width="30%"
        >
           <el-form :inline="true" :label-position="labelPosition" label-width="80px" class="form demo-form-inline" :model="formInline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.name" class="inputsearch" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="账号">
                <el-input v-model="formInline.accout" class="inputsearch" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" class="fright">
                <el-input :minlength=6 :maxlength=12 v-model="formInline.psd" class="inputsearch" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="重复密码">
                <el-input :minlength=6 :maxlength=12 v-model="formInline.repsd" class="inputsearch" placeholder="请再次输入密码"></el-input>
            </el-form-item>
        
        </el-form>
       
  <span slot="footer" class="dialog-footer">
    <el-button @click="adduser = false">取 消</el-button>
    <el-button type="primary" @click="onSubmit" :disabled="surestatus" >确 定</el-button>
  </span>
        </el-dialog>


    </div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    accout: '',
                    name: '',
                    psd: '',
                    repsd: '',
                },
                total: 0,
                
                labelPosition: 'left',
                page: 1,
                checkList: [],
                tableData: [],
                dialogVisible: false,
                userno: "",
                username: "",
                loginname: "",
                passwrd: "",
                userNUMber: 0,
                role: false,
                radiolist: [],
                chooserole: "",
                rowusername:"",
                adduser:false,
                surestatus:false
            }
        },
        created () {
            this.select({})
        },
        methods: {

            onSubmit () {
                // console.log(this.formInline)
                this.surestatus = true
                if (this.formInline.name.trim() == "" || this.formInline.accout.trim() == "" || this.formInline.psd.trim() == "" || this.formInline.repsd.trim() == "") {
                    this.$message({
                        type: 'warning',
                        message: '要正确输入内容哦'
                    })
                    this.surestatus = false
                    return false

                }
                if (this.formInline.psd !== this.formInline.repsd) {

                    this.$message({
                        type: 'warning',
                        message: '两次密码不一样哦'
                    })
                    return false
                }
                var json = JSON.stringify({
                    userName: this.formInline.name,
                    loginName: this.formInline.accout,
                    password: this.formInline.psd
                })
              
                this.$http.post('ws_api/power/insUser.do', `jsonStr=${json}`).then(res => {
                    console.log(res)
                if (res.data.code == 200) {
                    this.surestatus = false
                    this.$message({
                        type: 'success',
                        message: '恭喜您，新增账户成功'
                    })
                    this.adduser = false
                    this.select({})
                    this.formInline.name = ""
                    this.formInline.accout = ""
                    this.formInline.psd = ""
                    this.formInline.repsd = ""
                } else if (res.data.code == 501) {
                    this.surestatus = false
                    this.$message({
                        type: 'warning',
                        message: '当前账户已经存在啦'
                    })
                    this.formInline.name = ""
                    this.formInline.accout = ""
                    this.formInline.psd = ""
                    this.formInline.repsd = ""
                }
            })
            },
            handleCurrentChange (val) {
                // console.log(`当前页: ${val}`)
                this.page = val

                

            },
            select({
                userName=""
            }){
                var jsonStr = JSON.stringify({
                    page:this.page,
                    userName:this.rowusername
                })
                this.$http.post('ws_api/power/selUser.do', `jsonStr=${jsonStr}`).then(res => {
                    console.log(res)
                if (res.data.code == 200) {
                    this.tableData = res.data.info.user
                    this.total = res.data.info.totl
                }
            })
            },
            handleedit(user){
                var userno = user.userNo
                // var json = JSON.stringify({

                // })
                this.dialogVisible = true
                this.$http.post('ws_api/power/echoUser.do', `jsonStr={userNo:${userno}}`).then(res => {
                    console.log(res)
                if (res.data.code == 200) {
                    this.userno = res.data.info.userNo
                    this.username = res.data.info.userName
                    this.loginname = res.data.info.loginName
                    this.passwrd = res.data.info.password
                }
            })
            },
            handledit(){
                var no = this.userno + ""

                var userdata = JSON.stringify({
                    userNo: no,
                    userName: this.username,
                    loginName: this.loginname,
                    password: this.passwrd
                })
                this.$http.post('/ws_api/power/updUser.do', `jsonStr=${userdata}`).then(res => {
                    // console.log(res)
                    if (res.data.code == 200){
                    this.dialogVisible = false
                    this.$message({
                        type: 'success',
                        message: '恭喜您，修改成功'
                    })
                    this.select({})
                }else if (res.data.code == 501){
                     this.$message({
                        type: 'warning',
                        message: '当前账号已存在'
                    })

                }
            })
            },
            handleDelete(user){
                var usernumber = user.userNo

                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                this.$http.post('ws_api/power/delUser.do', `jsonStr={userNo:${usernumber}}`).then(res => {
                    console.log(res)
                    if(res.data.code == 200){
                    this.role = false
                    this.$message({
                        type: 'success',
                        message: '恭喜您，删除成功'
                    })
                    this.select({})

                }
                             })

                }).catch(() => {}
            )},
            chooseroleno(){
                console.log(this.chooserole)

            },
            // 新增用户
            addusername(){
                this.adduser = true
            },
            handlerolechange(){
                var userforRole = JSON.stringify({
                    userNo: this.userNUMber,
                    roleNo: this.chooserole
                })
                this.$http.post('ws_api/power/insUserRole.do', `jsonStr=${userforRole}`).then(res => {
                    console.log(res)
                if (res.data.code == 200) {
                    this.role = false
                    this.$message({
                        type: 'success',
                        message: '恭喜您，创建角色成功'
                    })
                    this.select()
                }
            })
            },
            handlelook(user){
                this.role = true
                this.userNUMber = user.userNo
                console.log(this.userNUMber)
                this.$http.post('ws_api/power/selRole.do', '').then(res => {
                    console.log(res)
                if (res.data.code == 200) {
                    this.radiolist = res.data.info.role
                    // console.log(this.radiolist)
                }
            })
            },
            selectusername(){
               this.select({
                   userName:this.rowusername
               })
            },
            selectall(){
                this.rowusername =""
                this.select({})
            }


        }

    }
</script>
<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        
    }

 

    .el-checkbox__inner {
        width: 30px;
        height: 30px;
    }

    .el-button--medium {
        padding: 15px 41px;
    }


    .page {
        background-color: #fff;
        padding-top: 10px;
        text-align: center;
        padding-bottom: 10px;
    }

    .disable {
        display: none
    }
 .save {
 height: 40px;
padding:0 20px;
background-color: #409EFF;
border-radius: 10px;
text-align: center;
line-height: 40px;
color:#fff;

 }
   .font {
    font-size:10px;
    padding-left:5px;
  }
  .sendrole {
    padding: 0 30px;
  }
  .radio {
    width:100px;
    height: 30px;
  }
 
  .el-dialog__body {
      padding:10px 20px;
  }
  .poiner{
      cursor: pointer;
  }
 .el-dialog__body{
     padding:10px 20px;
 }
 .lujing{
     padding-bottom:10px;
 }

 .tablebox {
    width:100%;
    box-sizing: border-box;
 }
 .el-table {
     padding-left:10px !important;
     padding-right: 10px !important;
 }
 .el-radio+.el-radio {
     margin-left: 0 !important;
 }
 .p{
     margin-top:-20px;
     padding-bottom:10px;
 }
 .top-contain {
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     align-items: center;
     margin-bottom:10px;
 }
 .addbtn {
     margin-right:20px;
     background-color: #409EFF;
     color:#fff;
     border-radius: 10px;
    
     padding:11px 15px;
 
 }
 .el-dialog__body{
     padding:10px 20px !important;
 }
 .searchname {
     display: flex;
     flex-direction: row;

 }
 .usernamebtn {
     padding:3px 8px;
     background-color: #409EFF;
     font-size: 14px;
     color:#fff;
     width:100px;
     margin-left:10px;
     border-radius: 10px;
     
 }
 .selectall {
     width:120px;
       background-color: #409EFF;
     font-size: 14px;
     color:#fff;
       border-radius: 10px;
       margin-left:10px;
 }
 .inputsearch {
     width:250px;
 }
</style>
