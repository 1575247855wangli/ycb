<template>
<div>

<el-breadcrumb separator-class="el-icon-arrow-right" class="lujing">
  <el-breadcrumb-item >个人中心</el-breadcrumb-item>
  <el-breadcrumb-item>角色名称</el-breadcrumb-item>
  
</el-breadcrumb>
  <el-form :inline="true" class="form demo-form-inline" :model="formInline">
            <el-form-item label="请输入角色名">
                <el-input v-model="formInline.name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-button class="addUser" size="medium"  @click="onSubmit">保存</el-button>
        </el-form>   
    <div class="contain-wrap">
         
    <el-row>
  <el-col :span="24"> 
      
  <div class="contentbox">
      

        <el-table
     
                :data="tableData"
                

                class="table"
                style="width: 100%">
            <!-- <el-table-column
                    prop="roleNo"
                    label="编号"
                    width="100">
            </el-table-column> -->
            <el-table-column label="序号"
      type="index"
      width="100">
    </el-table-column>
            <el-table-column
                    prop="createTime"
                    label="创建时间"
                    >

            </el-table-column>
            <el-table-column
                    prop="roleName"
                   
                    label="角色">
            </el-table-column>
            <el-table-column
                    prop="address"
                    width="300"
                    label="操作"
                    class="poiner"
            >
                <template slot-scope="scope">
                <i class="el-icon-edit iconphone poiner"  @click="handleedit(scope.row)">  <span class="font">修改</span></i>
                <i class="el-icon-circle-plus-outline sendrole poiner" @click="handlelook(scope.row)">  <span class="font">授权</span></i>
                <i class="el-icon-delete iconphone poiner"  @click="handleDelete(scope.row)"> <span class="font"> 删除</span></i>
                </template>
            </el-table-column>
        </el-table>
    
            </div>
            
            </el-col>
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
                    <el-input v-model="rolename"></el-input>
                </el-form-item>

            </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handledit">确 定</el-button>
  </span>
        </el-dialog>


        <el-dialog
                title="修改账户信息"
                :visible.sync="tree"
                width="30%"
        >
            <el-tree
                    :data="data2"
                    show-checkbox
                 node-key="id"
                    ref="tree"
                    default-expand-all
                  :default-checked-keys="idarr"
                    :props="defaultProps">
            </el-tree>
  <span slot="footer" class="dialog-footer">
    <el-button @click="tree = false">取 消</el-button>
    <el-button type="primary" @click="handletree">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</div>

</template>
<script>
    export default{
        data () {
            return {
                formInline: {
                    name: ''
                },
                tableData: [],
                dialogVisible: false,
                userno: 0,
                rolename: "",
                labelPosition: 'left',
                tree: false,
                choserole: [],
                menuno: 0,
                uesrid: 0,
                data2: [],
                total:1,
                idarr:[],
                defaultProps: {
                    children: 'children',
                    label: 'text'
                }

            }
        },

        created(){
            this.handlegetdata()
        },
        methods: {
          // 添加
            onSubmit(){
                if (this.formInline.name.trim() == "") {
                    this.$message({
                        type: 'warning',
                        message: '角色不能为空'
                    })
                    return false
                }
                console.log(this.formInline.name)
                var json = JSON.stringify({
                    roleName: this.formInline.name
                })
                this.$http.post('ws_api/power/insRole.do', `jsonStr=${json}`).then(res => {
                    console.log(res)
                if (res.data.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '恭喜您，创建成功'
                    })
                    this.formInline.name=""
                    this.handlegetdata()
                } // 刷新
            })
            },
             handleCurrentChange (val) {
                // console.log(`当前页: ${val}`)
                this.page = val
                // this.handlelookall({})
                this.handlegetdata()

            },
            // 初始时获取数据
            handlegetdata(){
                this.$http.post('ws_api/power/selRole.do', '').then(res => {
                    console.log(res)
                if (res.data.code == 200) {
                    this.tableData = res.data.info.role
                    this.total = res.data.info.totl
                }
            })
            },
            // 回显用户
            handleedit(user){
                var editid = user.roleNo
                this.dialogVisible = true
                this.$http.post('ws_api/power/echoRole.do', `jsonStr={roleNo:${editid}}`).then(res => {
                    // console.log(res)
                    if(res.data.code == 200){
                    this.userno = res.data.info.roleNo
                    this.rolename = res.data.info.roleName
                }
            })
            },
            // 编辑
            handledit(){
                var num = this.userno + ""
                console.log(num)
                var json1 = JSON.stringify({
                    roleNo: num,
                    roleName: this.rolename
                })
                this.$http.post('ws_api/power/updRole.do', `jsonStr=${json1}`).then(res => {
                    // console.log(res)
                    if(res.data.code == 200){
                    this.dialogVisible = false
                    this.$message({
                        type: 'success',
                        message: '恭喜您，修改成功'
                    })
                    this.handlegetdata()
                }
            })
            },
            // 赋权限发送请求
            handletree(){
                const arrId = this.$refs.tree.getCheckedKeys()
                const arrPid = this.$refs.tree.getHalfCheckedKeys()
                const totalId = arrId.concat(arrPid).toString()
                console.log(totalId)
                var jsonrole = JSON.stringify({
                    roleNo: this.uesrid,
                    menuNo: totalId
                })
                this.$http.post('ws_api/power/updaMenu.do', `jsonStr=${jsonrole}`).then(res => {
                    // console.log(res)
                    if(res.data.code == 200){
                    this.tree = false
                    this.$message({
                        type: 'success',
                        message: '恭喜您,操作成功'
                    })
                  
                    this.handlegetdata()
                }
            })
            },
            // 过去已经选中的id
            handlegetid(arr){
                this.idarr=[]
                arr.forEach(item => {
                    if (item.children) {
                        item.children.forEach(item1 => {
                            this.idarr.push(item1.id)
                        })
                    }
                })
                return this.idarr

            },
            // 展示权限树
            handlelook(user){
                // console.log(2)
                // this.lookroletree()
                this.uesrid = user.roleNo
                this.tree = true

                this.$http.post('ws_api/power/selRoleTrue.do', `jsonStr={roleNo:${this.uesrid}}`).then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.data2 = res.data.info.user
                        this.choserole = res.data.info.role
                        this.handlegetid(this.choserole)
                        console.log(this.choserole)
                        // console.log(this.idarr)
                    }
                })
            },
            // 删除用户
            handleDelete(user){
                var deleid = user.roleNo

                this.$confirm('确定删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$http.post('ws_api/power/delRole.do', `jsonStr={roleNo:${deleid}}`).then(res => {
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: '恭喜您，删除成功'
                            })
                            this.handlegetdata()
                        }


                    })

                }).catch(() => {}
            )}
                
        }
    }
</script>
<style scoped>
    .contain-wrap {
        background-color: #fff;
        /*width: 1200px;*/
        /*padding-left: 30px;*/
        padding-top:30px;
        padding-bottom:30px;
        padding-left:10px;
        padding-bottom: 10px;
        box-sizing: border-box;
    }

    .disable {
        display: none;
    }
    .page {
        text-align: center;
        /*padding-top:30px;*/
    }
    .iconphone {
        font-size: 10px;
        
    }
    .form {
        padding-right:30px;
    }

  .font {
    font-size:14px;
    padding-left:5px;
  }
  .sendrole {
    padding: 0 30px;
  }
  .addUser{
    background-color: #409EFF;
    color:#fff;
    border-radius: 10px;
  }
  .poiner {
      cursor: pointer;
  }
    .lujing {
        padding-bottom:10px;
    }
    .contentbox {
        padding-right: 10px;
    }
</style>
