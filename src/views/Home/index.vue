<template>
  <div class="home">
    <p>登录后显示这个页面</p>
    <el-button @click="handleLogout()">登出</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  methods: {
    handleLogout() {
      axios.post('/api/v1/auth/logout')
      .then(response => {
        this.$message.success('登出成功')
        this.$router.push('/login')
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style>

</style>
