<template>
  <div class="ninjas-alive">
    <ninja-card
      v-for="ninja in aliveNinjaList"
      :key="ninja.id"
      :ninja="ninja"
      class="ninjas-alive-card"
    ></ninja-card>
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
</style>
