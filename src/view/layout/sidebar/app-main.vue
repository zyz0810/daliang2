<template>
  <div class="main-app">
    <!-- keep-alive缓存机制防止重复刷新DOM include当前指令不会被缓存其他的都会，exclude当前指令会被缓存其他的不会 -->
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    // 组件重复调用
    name: 'app-main',
    data() {
      return {
      }
    },
  }
</script>

<style scoped lang="stylus">
</style>
