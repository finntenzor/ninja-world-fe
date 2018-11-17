<template>
  <div class="ninjas-dead" v-if="deadNinjaList.length > 0">
    <ninja-card
      v-for="ninja in deadNinjaList"
      :key="ninja.id"
      :ninja="ninja"
      class="ninjas-dead-card"
    ></ninja-card>
  </div>
  <div class="ninjas-dead" v-else>
    <p>这里空空如也</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NinjaCard from '@/components/NinjaCard'

export default {
  name: 'NinjasDead',
  components: {
    NinjaCard
  },
  computed: {
    ...mapGetters({
      deadNinjaList: 'deadNinjaList'
    })
  }
}
</script>

<style>
.ninjas-dead {
  display: flex;
  flex-wrap: wrap;
}
.ninjas-dead-card {
  margin: 10px;
}
</style>
