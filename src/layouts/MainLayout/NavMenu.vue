<template>
  <el-menu
    :default-active="activeIndex"
    router
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-submenu index="/ninjas/alive">
      <template slot="title">忍者</template>
      <el-menu-item index="/ninjas/board">商店</el-menu-item>
      <el-menu-item index="/ninjas/alive">我的</el-menu-item>
      <el-menu-item index="/ninjas/dead">墓地</el-menu-item>
    </el-submenu>
    <el-menu-item index="/tasks/index">任务</el-menu-item>
    <el-menu-item index="/bosses/index">BOSS</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'MainLayoutNavMenu',
  data() {
    const path = this.$route.path
    const basePath = path.split('\?')[0]
    return {
      activeIndex: basePath
    }
  }
}
</script>

<style>

</style>
