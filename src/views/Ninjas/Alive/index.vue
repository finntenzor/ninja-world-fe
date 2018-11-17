<template>
  <div class="ninjas-alive" v-if="aliveNinjaList.length > 0">
    <ninja-card
      v-for="ninja in aliveNinjaList"
      :key="ninja.id"
      :ninja="ninja"
      class="ninjas-alive-card"
    ></ninja-card>
  </div>
  <div class="ninjas-alive" v-else>
    <b>您还没有雇佣任何忍者，快去<router-link class="ninjas-alive-link" to="/ninjas/board">雇佣一个</router-link></b>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NinjaCard from '@/components/NinjaCard'

export default {
  name: 'NinjasAlive',
  components: {
    NinjaCard
  },
  computed: {
    ...mapGetters({
      aliveNinjaList: 'aliveNinjaList'
    })
  }
}
</script>

<style>
.ninjas-alive {
  display: flex;
  flex-wrap: wrap;
}
.ninjas-alive-card {
  margin: 10px;
}
.ninjas-alive-link {
  color: red;
  text-decoration: underline;
}
</style>
