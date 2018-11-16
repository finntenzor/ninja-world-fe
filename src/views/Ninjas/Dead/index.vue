<template>
  <div class="ninjas-dead">
    <ninja-card
      v-for="ninja in deadNinjaList"
      :key="ninja.id"
      :ninja="ninja"
      class="ninjas-dead-card"
    ></ninja-card>
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
