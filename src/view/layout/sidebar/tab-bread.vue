<template>
  <div class="breadcrumb Flex">
    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$route.path == '/admin'">
      <el-breadcrumb-item >流向流量业务系统</el-breadcrumb-item>
      <el-breadcrumb-item >首页</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator-class="el-icon-arrow-right" v-else>
      <el-breadcrumb-item v-for="(item,index) in breadcrumblist" :key="index" v-if="item.meta.isshow!=1">
        <span v-if="$route.path==item.path || item.meta.title == '流向流量业务系统'">{{item.meta.title}}</span>
        <a @click="breadcrumb(item.path)" v-else>{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <span @click="refresh()" class="refresh">刷新</span>
  </div>
</template>

<script>
  export default {
    inject:['reload'],
    data(){
      return{
        breadcrumblist:[],
      }
    },
    watch:{
      $route() {
        let breadcrumblist = []
        if(this.$route.path == '/admin'){
           this.breadcrumblist = []
        }else{
           this.breadcrumblist = this.$route.matched
        }
      },
    },
    methods:{
      refresh:function(){
        this.reload()
      },
      breadcrumb:function(path){
        this.$router.push({path:path})
      }
    },
    created() {
       if(this.$route.path == '/admin'){
          this.breadcrumblist = []
       }else{
          this.breadcrumblist = this.$route.matched
       }
    }
  }
</script>

<style scoped>
  .breadcrumb{width: 97%;margin: 0 auto;}
  .refresh{cursor: pointer;border: 1px solid #eaeaea;background: #FFFFFF;padding: 2px 10px;}
</style>
