<template>
  <div class="login">
    <img class="login-logo" src="@/assets/logo.png">
    <el-card>
      <div class="login-form">
        <el-form ref="form" :model="form" label-width="80px" label-position="top">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-action">
        <el-button type="primary" v-loading="loginLoading" @click="handleLogin()">登录</el-button>
        <el-button size="small" v-loading="registerLoading" @click="handleRegister()">注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      registerLoading: false,
      loginLoading: false,
    }
  },
  methods: {
    ...mapActions({
      register: 'register',
      login: 'login',
      init: 'init'
    }),
    async handleRegister() {
      this.registerLoading = true
      try {
        await this.register(this.form)
        await this.init()
        this.$message.success('注册成功')
        this.$router.push('/')
      } catch (err) {
        this.$message.error(err.data.msg)
      }
      this.registerLoading = false
    },
    async handleLogin() {
      this.loginLoading = true
      try {
        await this.login(this.form)
        await this.init()
        this.$message.success('登录成功')
        this.$router.push('/')
      } catch (err) {
        this.$message.error(err.data.msg)
      }
      this.loginLoading = false
    }
  }
}
</script>

<style>
.login-logo {
  display: block;
  width: 300px;
  height: auto;
  margin: 20px auto;
}
.login {
  width: 420px;
  margin: 0 auto;
}
.login-action {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
