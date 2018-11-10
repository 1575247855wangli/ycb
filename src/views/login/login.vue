<template>
<div class="bgc">
 <div class="title">
            <img src="../../assets/images/logo-text.png" alt="">
            <span>易创吧科技</span>
</div>
<div class="content-wrap">
       
        <!-- <div class="content-wrap"> -->
       <div class="content-box">
        <img src="../../assets/images/left.png" alt="">
        <div class="form-box">
             <h1>创客联盟后台管理系统</h1>
             <form  :model="jsonStr">
                 <div class="inpputbox">
                     <img class="img2" src="../../assets/images/password.png" alt="">
                     <input type="text" v-model="jsonStr.loginName" class="people " placeholder="请输入用户名">
                 </div>
                 <div class="inpputbox">
                      
                        <img class="img1" src="../../assets/images/people.png" alt="">
                     <input  type="password"  @keyup.enter="onSubmit()"  v-model="jsonStr.password" class="input password" placeholder="请输入密码">
                 </div>
                 <div>
                     <button type="button"  @click="onSubmit" class="btn">立即登录</button>
                 </div>
             </form>
        </div>
       </div>
        </div>
    </div>
    <!-- </div> -->
</template>
<script>
// import {saveUser} from '@/assets/js/auth.js'
export default {
  data() {
    return {
      jsonStr: {
        loginName: "",
        password: ""
      }
    };
  },
  methods: {
    /**
     * 登录提交
     * @return {[type]} [description]
     */
    onSubmit() {
      this.$http
        .post(
          "/ws_api/user/userLogin.do",
          "jsonStr=" + JSON.stringify(this.jsonStr)
        )
        .then(res => {
          if (res.data.code === "101") {
            this.$message({
              type: "warning",
              message: "密码不正确，请重输密码"
            });

            this.jsonStr.password = "";
          } else if (res.data.code === "100") {
            this.$message({
              type: "warning",
              message: "账号错误"
            });
            this.jsonStr.loginName = "";
          } else if (res.data.code === "200") {
            this.$message({
              type: "success",
              message: "恭喜您，登入成功"
            });

            localStorage.setItem("token", res.data.info);
            this.$router.push({
              name: "first"
            });
            window.localStorage.setItem("username", this.jsonStr.loginName);
            this.jsonStr.loginName = "";
            this.jsonStr.password = "";
          }
        });
    }
  }
};
</script>
<style>
.bgc {
  width: 100%;
  background: url("../../assets/images/bgc.png");
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center
}
.login-container {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  background-color: #fff;

  border-radius: 2px;
  /* padding: 70px 50px 50px 20px; */
}

.button {
  width: 100%;
}
.title {
  position: absolute;
  top:20px;
  left:20px;
  display: flex;
  flex-direction: row;
  padding-top: 27px;
  margin-left: 28px;
  text-align: center;
  line-height: 82px;
}
.title > img {
  width: 76px;
  height: 82px;
  padding-right: 11px;
}
.bgc > span {
  font-size: 26px;
  color: #333;
}
.content-box {
  margin-top: 10px;
  display: flex;

  flex-direction: row;
  background-color: #fff;
  padding-left: 65px;
  padding-bottom: 82px;
  padding-top: 74px;
  padding-right: 48px;
}
.content-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 22px;
  color: #409eff;
}
.content-wrapimg {
  width: 517px;
  height: 440px;
}
.inpputbox {
  position: relative;
}

.img1 {
  position: absolute;
  left: 20px;
  top: 11px;
}
.img2 {
  position: absolute;
  top: 46px;
  left: 17px;
}
.form-box {
  width: 290px;
  padding-left: 65px;
}
.form-box input {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #c1c1c1;
  font-size: 14px;
  color: #999;
  padding-left: 56px;
  border-radius: 10px;
  box-sizing: border-box;
}
.people {
  margin-top: 40px;
  margin-bottom: 20px;
}
.password {
  margin-bottom: 40px;
}
.btn {
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 16px;
  border-radius: 10px;
  background-color: #409eff;
  height: 40px;
  line-height: 40px;
}
</style>
