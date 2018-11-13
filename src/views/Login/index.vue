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
            <el-input v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-action">
        <el-button type="primary" @click="handleLogin()">登录</el-button>
        <el-button size="small" @click="handleRegister()">注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleRegister() {

    },
    handleLogin() {

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
