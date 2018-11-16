<template>
  <el-card>
    <p>稀有度：<span :style="{ color: rarityColor }">{{ item.rarity | rarityToReadable }}</span></p>
    <p>价格：{{ item.cost }}</p>
    <el-button v-loading="hireLoading" type="primary" @click="handleHire()">雇佣</el-button>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'NinjasBoardCard',
  // 过滤器，有兴趣自己查一下
  filters: {
    rarityToReadable(val) {
      // 1代表N，2代表R，3代表SR，4代表SSR，5代表UR
      const map = {
        1: 'N',
        2: 'R',
        3: 'SR',
        4: 'SSR',
        5: 'UR'
      }
      return map[val] || '?'
    }
  },
  props: {
    item: Object
  },
  data() {
    return {
      hireLoading: false
    }
  },
  computed: {
    rarityColor() {
      // 1代表N，2代表R，3代表SR，4代表SSR，5代表UR
      const map = {
        1: '#000000',
        2: '#ea1e63',
        3: '#4cb050',
        4: '#1976d3',
        5: '#9c28b1'
      }
      return map[this.item.rarity] || 'grey'
    }
  },
  methods: {
    ...mapActions({
      hireNinja: 'hireNinja'
    }),
    async handleHire() {
      this.hireLoading = true
      try {
        const data = await this.hireNinja(this.item.rarity)
        this.$message.success('雇佣成功：' + data.msg)
      } catch (err) {
        this.$message.error(err.data.msg)
      }
      this.hireLoading = false
    }
  }
}
</script>

<style>

</style>
