<template>
  <el-container class="main-layout">
    <el-aside class="main-layout-aside" width="200px">
      <user-info></user-info>
    </el-aside>
    <el-container>
      <el-header class="main-layout-header">
        <nav-menu></nav-menu>
      </el-header>
      <el-main class="main-layout-main">
        <router-view></router-view>
      </el-main>
      <el-footer class="main-layout-footer">
        <first-ninja-info></first-ninja-info>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import FirstNinjaInfo from '@/components/FirstNinjaInfo'
import NavMenu from './NavMenu'

export default {
  name: 'MainLayout',
  components: {
    UserInfo,
    FirstNinjaInfo,
    NavMenu
  }
}
</script>

<style lang="scss">
.main-layout {
  height: 100vh;
  .main-layout-header {
    padding: 0;
  }
}
.main-layout-aside {
  background-color: #d3dce6;
}
.main-layout-header,
.main-layout-footer {
  background-color: #b3c0d1;
}
.main-layout-main {
  background-color: #e9eef3;
}
</style>
