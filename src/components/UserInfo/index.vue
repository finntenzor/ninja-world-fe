<template>
  <div class="user-info">
    <img class="user-info-avatar" src="@/assets/ninjas/ninja_01.png" alt="">
    <p>欢迎您：{{ userInfo.username }}</p>
    <p>账户余额：{{ userInfo.money }}</p>
    <p>拥有忍者：{{ aliveNinjaList.length }}名</p>
    <!-- 以下属性都是我瞎编的 -->
    <p>当前战力：{{ power }}</p>
    <p>总攻击：{{ totalAtk }}</p>
    <p>总防御：{{ totalDef }}</p>
    <!-- 凑字数 -->
    <p>战胜BOSS：{{ killBoss }}</p>
    <p>最近战胜：{{ lastBoss }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'UserInfo',
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      aliveNinjaList: 'aliveNinjaList',
      bossList: 'bossList',
    }),
    totalAtk() {
      return this.aliveNinjaList.map(ninja => ninja.atk).reduce((a, b) => a + b)
    },
    totalDef() {
      return this.aliveNinjaList.map(ninja => ninja.def).reduce((a, b) => a + b)
    },
    power() {
      return this.totalAtk + this.totalDef
    },
    killBoss() {
      return this.bossList.map(boss => boss.last_kill > 0 ? 1 : 0).reduce((a, b) => a + b)
    },
    lastBoss() {
      const list = this.bossList.filter(boss => boss.last_kill > 0).sort((a, b) => b.last_kill - a.last_kill)
      return list[0] ? list[0].name : '暂无'
    }
  }
}
</script>

<style lang="scss">
.user-info {
  padding: 10px;
  p {
    margin: 10px 0;
  }
}
.user-info-avatar {
  width: 100%;
  height: auto;
}
</style>
