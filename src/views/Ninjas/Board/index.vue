<template>
  <div class="ninjas-board">
    <item-card class="ninjas-board-card" v-for="(item, i) in ninjaBoard" :key="i" :item="item"></item-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemCard from './Card'

export default {
  name: 'NinjasBoard',
  components: {
    ItemCard
  },
  computed: {
    ...mapGetters({
      ninjaBoard: 'ninjaBoard'
    })
  }
}
</script>

<style>
.ninjas-board {
  display: flex;
  flex-wrap: wrap;
}
.ninjas-board-card {
  margin: 10px;
}
</style>
