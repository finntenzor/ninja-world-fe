<template>
  <el-container class="home">
    <el-aside class="home-aside" width="200px">Aside</el-aside>
    <el-container>
      <el-header class="home-header">Header</el-header>
      <el-main class="home-main">
        <div class="home-ninja-container">
          <ninja-card
            v-for="ninja in ninjaList"
            :key="ninja.id"
            :ninja="ninja"
            class="home-ninja-card"
          ></ninja-card>
        </div>
      </el-main>
      <el-footer class="home-footer">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import NinjaCard from '@/components/NinjaCard'

export default {
  name: 'Home',
  components: {
    NinjaCard
  },
  computed: {
    ...mapGetters({
      ninjaList: 'ninjaList'
    })
  },
  methods: {
  }
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
.home-ninja-container {
  display: flex;
  flex-wrap: wrap;
}
.home-ninja-card {
  margin: 10px;
}
</style>
