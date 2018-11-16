<template>
  <el-container class="home">
    <el-aside class="home-aside" width="200px">Aside</el-aside>
    <el-container>
      <el-header class="home-header">Header</el-header>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
      <el-footer class="home-footer">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Ninjas'
}
</script>

<style>
.home {
  height: 100vh;
}
.home-aside {
  background-color: #d3dce6;
}
.home-header,
.home-footer {
  background-color: #b3c0d1;
}
.home-main {
  background-color: #e9eef3;
}
</style>
