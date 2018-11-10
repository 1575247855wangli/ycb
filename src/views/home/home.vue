<template>
    <el-container class="container">
           <el-aside class="aside" :class={activeclass:isCollapse} >
               <el-col :span="6">
               <img src="../../assets/images/logo.png" class="logo"  alt="">
            </el-col>
            <!-- <el-col :span="18"  v-show="!isCollapse"> -->
                <div style="overflow:hidden;wifth:200px;">
                <div class="toptitle grid-content bg-purple" :class="!isCollapse?'moveout':'movein'" >{{!isCollapse?'创客联盟管理系统':''}}</div>
                </div>
            <!-- </el-col> -->
                <el-col :span="24">

                    <el-menu
                      
                        @open="handleOpen" @close="handleClose" :collapse="isCollapse"     
                            :collapse-transition="true"
                            show-timeout="600"
                            class="el-menu-vertical-demo line"
                            router
                          
                            background-color="#545c64"
                            text-color="#fff"
                            :unique-opened='false'
                            active-text-color="#ffd04b">
                       

      <el-submenu :index="level1.text" v-for="level1 in lefttar" :key="level1.id">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">{{level1.text}}</span>
            </template>
            <el-menu-item v-for="level2 in level1.children" :key="level2.id" :index="level2.menuUrl" >{{level2.text}}</el-menu-item>
            
          </el-submenu>



                    </el-menu>
                </el-col>
            </el-aside>
            <el-container>
        <el-header class="header">
        
                      <el-col :span="2">
               <img src="../../assets/images/sort.png" @click="hangleaside" class="sort" alt="">
            </el-col>
             <el-col :offset='13' :span="4">
                <div class="welcome"><span class="wel">欢迎</span>{{username}}
                </div>

            </el-col>
             <el-col  :span="3">
                 <button class="changepwd" type="primary"  @click="show">修改密码</button>

            </el-col>

            <el-col  :span="2">
                <div class="grid-content bg-purple-light"><a class="out" @click.prevent='logout'>退出</a></div>
            </el-col>
                            <div id="modifypwd" :class="{show:this.showdialog}">
                        <el-form :label-position="labelPosition" label-width="120px" >
                            <el-form-item label="请输入密码">
                                <el-input type="password" v-model="password"></el-input>
                            </el-form-item>
                            <el-form-item label="请重新输入密码">
                                <el-input  type="password" v-model="repassword"></el-input>
                            </el-form-item>
                            
                            </el-form>
                            <div class="repwd">
                                <button class="btnrepwd cancel" @click="abandon" >取消</button>
                                <button class="btnrepwd" @click="onSubmit">确定</button>
                            </div>
                        </div>
        </el-header>
       
         
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
  data() {
    return {
      defaultActive: "/home/index",
      lefttar: [],
      isCollapse: false,
      password: "",
      repassword: "",
      labelPosition: "left",
      showdialog: false,
      username: ""
    };
  },
  created() {
    this.getUserRoot();
    this.handlelocaldate();
  },
  methods: {
    /**
     * 获取用户权限
     * @return {[type]} [description]
     */
    getUserRoot() {
      let token = localStorage.getItem("ken");
      this.$http.post("ws_api/power/seltrue.do").then(res => {
        console.log(res);
        this.lefttar = res.data.info;
      });
    },
    hangleaside() {
      this.isCollapse = !this.isCollapse;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.post("ws_api/user/zhuLongin.do").then(res => {
            if (res.data.code == 200) {
              window.localStorage.removeItem("token");
              window.localStorage.removeItem("username");
            }
          });

          this.$router.push({
            name: "login"
          });
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {});
    },
    show() {
      this.showdialog = true;
    },
    abandon() {
      this.showdialog = false;
      this.repassword = "";
      this.password = "";
    },
    onSubmit() {
      if (this.password.trim() == null || this.password.trim() == "") {
        this.$message({
          type: "warning",
          message: "密码不能为空"
        });
        return false;
      }
      if (this.repassword.trim() == null || this.repassword.trim() == "") {
        this.$message({
          type: "warning",
          message: "密码不能为空"
        });
        return false;
      }
      if (this.password.trim() !== this.repassword.trim()) {
        this.$message({
          type: "warning",
          message: "两次密码不一致"
        });
        return false;
      }

      this.$http
        .post(
          "/ws_api/user/updLongin.do",
          `jsonStr={password:${this.password}}`
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "恭喜您，修改密码成功"
            });
            this.showdialog = false;
            this.password = "";
            this.repassword = "";
          }
        });
    },
    // 本地存储路由数据
    handlelocaldate() {
      this.username = window.localStorage.getItem("username");
    }
  }
};
</script>
<style scoped>
.container {
  height: 100%;
}
.toptitle {
  font-size: 18px;
  color: #fff;
  margin-top: 10px;
  /* transition: all 400ms; */
  animation: mymove 400ms;
}
.movein {
  animation: movein 400ms;
}
.moveout {
  animation: moveout 400ms;
}

.header {
  background-color: #303133;
  line-height: 50px;
  height: 50px !important;
  position: relative;
}

.aside {
  background-color: #545c64;
  transition: all 300ms;
  overflow: hidden;
  width: 240px !important ;
  box-sizing: border-box;
}

.aside .aside-menu {
  height: 100%;
}

.main {
  background-color: #e9eef3;
  height: 100% !important;
}

.indexpage {
  padding-left: 60px !important;
}

.bigtitle {
  font-size: 20px;
  color: #333;
}
.out {
  color: #fff;
  font-size: 18px;
}
.el-menu-item.is-active {
  color: #409eff !important;
}
.sort {
  width: 30px;
  height: 20px;
  margin-top: 15px;
  margin-left: 10px;
}
.activeclass {
  transition: all 300ms;
  width: 54px !important;
}
.logo {
  width: 50px;
  height: 50px;
}
.line {
  border-right: none;
}
@-webkit-keyframes moveout {
  0% {
    width: 240px;
  }
  50% {
    width: 120px;
  }
  100% {
    widows: 0;
  }
}
@-webkit-keyframes movein {
  0% {
    width: 0;
  }
  50% {
    width: 120px;
  }
  100% {
    widows: 240px;
  }
}
.welcome {
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}
.wel {
  padding-right: 10px;
  font-size: 18px;
}
#modifypwd {
  position: absolute;
  top: 50px;
  right: 80px;
  z-index: 100;
  background-color: #f1f1f1;
  padding: 20px;
  display: none;
}
.repwd {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
}
.btnrepwd {
  background-color: #409eff;
  padding: 8px 20px;
  border-radius: 10px;

  color: #fff;
}
.cancel {
  background-color: #fff;
  color: #666;
}
.cancel:hover {
  background-color: #409eff;
  color: #fff;
}
.show {
  display: block !important;
}
.changepwd {
  border-radius: 10px;
  width: 70px;
  padding:10px 0;
  text-align: center;
  background-color: #409EFF;
  color:#fff;

}
</style>
