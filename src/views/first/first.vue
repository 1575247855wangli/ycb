<template>
<div class="container">
    <el-row>
  <el-col :span="24">
     <div class="content">
         <h3 class="titleh">管理系统快捷入口</h3>
        <div class="item-content">
            <div class="item" v-for="level1 in lefttar" :key="level1.index">
            <div class="firsttitle"><i class="el-icon-menu"></i>
            <span slot="title" class="firsttitle">{{level1.text}}</span></div>
            <a class="rootlink" @click="handlerouter(level2.menuUrl)" v-for="level2 in level1.children" :key="level2.id">{{level2.text}}</a>
          
            </div>
        </div>
     </div>
  </el-col>
</el-row>
</div>
</template>
<script>
export default {
    data () {
        return {
            lefttar:[]
        }
    },
    created(){
        this.getUserRoot()
    },
    methods:{
        getUserRoot() {
                let token = localStorage.getItem('ken')
                this.$http.post('ws_api/power/seltrue.do').then(res => {
                    console.log(res)
                    this.lefttar = res.data.info
                })
            },
            handlerouter(url){
                this.$router.push(url)
            }
    }
}
</script>
<style scoped>
.container {

   margin-left:10px;
    padding-top:10px !important;
    background-color: #fff;
}
.content {
    display: flex;
    flex-direction: columns;
    flex-wrap: wrap;
    width:1000px;
}
.titleh {
    width:100%;
    font-size: 20px;
    margin-left:10px;
    padding-bottom:10px;
    border-bottom:1px solid #ccc;
}
.item {
    margin-top:10px;
    border:1px solid #ccc;
    box-shadow: 4px 4px 4px #ccc;
    width:200px;
    padding:20px;
    margin-right:20px;
}
.item a {
    line-height:28px;
    font-size:14px;
    padding-left:10px;
    display: block;
    text-decoration: none;
    color: #333;

}
.item a:hover{
    color:#409EFF;
}
.item-content {
    display: flex;
    margin-top:20px;
    margin-left:10px;
    flex-direction: row;
}
.firsttitle {
    font-size: 20px;
    padding-bottom:5px;
}
.firsttitle{
    padding-bottom:10px;
}

</style>
