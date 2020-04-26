<template>
  <el-menu
    mode="vertical"
    class="left-sidebar"
    unique-opened
    :collapse="isCollapse" :default-active="activeindex">
    <sidebar-item v-for="(router,index) of routers" :key="router.path" :item="router" :base-path="router.path"></sidebar-item>
  </el-menu>
</template>
<script>
  import { mapGetters } from 'vuex'
  import SidebarItem from './sidebar-item'
  export default {
    name: 'SideBar',
    components: {
      SidebarItem
    },
    data() {
      return {
        isCollapse: false,
      }
    },
    computed: {
      ...mapGetters([
        'routers'
      ]),
      activeindex(){
        if(this.$route.path){
          if(this.$route.matched[1].path == '/task/list'){
            return '/task/list'
          }
          else if(this.$route.matched[1].path == '/Salestask/list'){
            return '/Salestask/list'
          }
          else if(this.$route.matched[1].path == '/Salestask/forwardlist'){
            return '/Salestask/forwardlist'
          }
          else if(this.$route.matched[1].path == '/task/datalist'){
            return '/task/datalist'
          }
          else if(this.$route.matched[1].path == '/Salestask/datalist'){
            return '/Salestask/datalist'
          }
          else{
            return this.$route.path
          }
        }else{
          return '/admin'
        }
      }
    },
  }
</script>
<style lang="stylus">
.left-sidebar
  position fixed
  top 56px
  width 210px
  height 100%
  min-height 500px
  overflow auto
</style>
