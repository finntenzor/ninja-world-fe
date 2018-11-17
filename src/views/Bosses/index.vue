<template>
  <div class="bosses">
    <boss-card v-for="boss in list" :key="boss.id" :boss="boss"></boss-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BossCard from './Boss'

export default {
  name: 'Bosses',
  components: {
    BossCard
  },
  computed: {
    ...mapGetters({
      bossList: 'bossList'
    }),
    list() {
      return this.bossList.map(boss => ({
        ...boss,
        hp: boss.hp === null ? boss.maxhp : boss.hp
      }))
    }
  }
}
</script>

<style>

</style>
