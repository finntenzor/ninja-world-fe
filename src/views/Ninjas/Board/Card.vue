<template>
  <el-card class="ninjas-board-card">
    <ninja-avatar class="ninjas-board-card-avatar" :color="rarityColor" :id="0"></ninja-avatar>
    <p>稀有度：<span :style="{ color: rarityColor }">{{ item.rarity | rarityToReadable }}</span></p>
    <p>价格：{{ item.cost }}</p>
    <el-button class="ninjas-board-card-hire" v-loading="hireLoading" type="primary" @click="handleHire()">雇佣</el-button>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'
import rarityMixin from '@/mixins/rarity'
import NinjaAvatar from '@/components/NinjaAvatar'

export default {
  name: 'NinjasBoardCard',
  mixins: [rarityMixin],
  components: {
    NinjaAvatar
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

<style lang="scss">
$left-margin: 48px; // 量出来的
$total-width: 295px; // 量出来的
$length: 160px;
.ninjas-board-card {
  text-align: center;
}
.ninjas-board-card-avatar {
  margin-left: $left-margin * ($length / $total-width);
  width: 160px;
}
.ninjas-board-card-hire {
  margin-top: 10px;
}
</style>
