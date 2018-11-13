<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
      info: null
    }
  },
  methods: {
    testLogin() {
      const form = {
        username: 'bill412',
        password: '147896325'
      }
      axios.post('/api/v1/auth/login', form)
      .then(response => {
        this.info = response.data
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
}
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
