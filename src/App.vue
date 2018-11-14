<template>
  <div id="app" v-loading="!initOver">
    <router-view v-if="initOver"/>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  created() {
    this.init()
  },
  computed: {
    ...mapGetters({
      initOver: 'initOver',
    })
  },
  methods: {
    ...mapActions({
      init: 'init'
    })
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
