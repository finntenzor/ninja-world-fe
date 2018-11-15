<template>
  <div class="home">
    <div v-for="ninja in ninjaList" :key="ninja.id">
      <ninja-card :ninja="ninja"></ninja-card>
    </div>
  </div>
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

</style>
