<template>
  <el-card>
    <p>稀有度：<span :style="{ color: rarityColor }">{{ item.rarity | rarityToReadable }}</span></p>
    <p>价格：{{ item.cost }}</p>
    <el-button v-loading="hireLoading" type="primary" @click="handleHire()">雇佣</el-button>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'
import rarityMixin from '@/mixins/rarity'

export default {
  name: 'NinjasBoardCard',
  mixins: [rarityMixin],
  props: {
    item: Object
  },
  data() {
    return {
      hireLoading: false
    }
  },
  computed: {
    rarity() {
      return this.item.rarity
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
        this.report(err)
      }
      this.hireLoading = false
    }
  }
}
</script>

<style>

</style>
