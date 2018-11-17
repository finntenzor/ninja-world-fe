<template>
  <div class="bosses">
    <boss-card
      class="bosses-boss-card"
      v-for="boss in list"
      :key="boss.id"
      :boss="boss"
      @fight="handleFight"
      ></boss-card>
    <el-dialog
      title="战斗中"
      width="1200px"
      top="10vh"
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      :close-on-press-escape="false">
      <bosses-fight v-if="showFight" :logs="logs" :ninja="ninja" :boss="boss"></bosses-fight>
      <p v-else>请稍后</p>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BossCard from './Boss'
import BossesFight from './Fight'

export default {
  name: 'Bosses',
  components: {
    BossCard,
    BossesFight
  },
  data() {
    return {
      dialogVisible: false,
      ninja: null,
      boss: null,
      logs: null,
      showFight: false
    }
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
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.showFight = false
        this.ninja = null
        this.boss = null
        this.logs = null
      }
    }
  },
  methods: {
    handleFight(data) {
      this.dialogVisible = true
      this.ninja = data.ninja
      this.boss = data.boss
      this.logs = data.logs
      this.showFight = true
    }
  }
}
</script>

<style>
.bosses {
  display: flex;
  flex-wrap: wrap;
}
.bosses-boss-card {
  margin: 10px;
}
</style>
