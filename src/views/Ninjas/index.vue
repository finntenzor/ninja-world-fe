<template>
  <el-container class="home">
    <el-aside class="home-aside" width="200px">
      <user-info></user-info>
    </el-aside>
    <el-container>
      <el-header class="home-header">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="广场" name="board"></el-tab-pane>
          <el-tab-pane label="我的忍者" name="alive"></el-tab-pane>
          <el-tab-pane label="忍者墓地" name="dead"></el-tab-pane>
        </el-tabs>
      </el-header>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
      <el-footer class="home-footer">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import UserInfo from '@/components/UserInfo'

export default {
  name: 'Ninjas',
  components: {
    UserInfo
  },
  data() {
    return {
      activeName: 'alive'
    }
  },
  methods: {
    handleClick(tab) {
      this.$router.push('/ninjas/' + tab.name)
    }
  }
}
</script>

<style lang="scss">
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
.home-header {
  padding-top: 10px;
  .el-tabs__item { // is-top is-active
    &.is-active {
      background-color: #fff;
    }
    background-color: #d8dfe7;
  }
}
</style>
