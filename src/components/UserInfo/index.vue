<template>
  <div class="user-info">
    <ninja-avatar class="user-info-avatar" :color="rarityColor" :id="userInfo.id"></ninja-avatar>
    <ul class="user-info-deatils">
      <li>欢迎您：{{ userInfo.username }}</li>
      <li>账户余额：{{ userInfo.money }}</li>
      <li>拥有忍者：{{ aliveNinjaList.length }}名</li>
      <!-- 以下属性都是我瞎编的 -->
      <li>当前战力：{{ power }}</li>
      <li>总攻击：{{ totalAtk }}</li>
      <li>总防御：{{ totalDef }}</li>
      <!-- 凑字数 -->
      <li>战胜BOSS：{{ killBoss }}个</li>
      <li>最近战胜：{{ lastBoss }}</li>
    </ul>
    <div class="user-info-actions">
      <el-button type="primary" @click="logout()" plain>登出</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NinjaAvatar from '@/components/NinjaAvatar'
import rarityMixin from '@/mixins/rarity'

export default {
  name: 'UserInfo',
  mixins: [rarityMixin],
  components: {
    NinjaAvatar
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      aliveNinjaList: 'aliveNinjaList',
      bossList: 'bossList',
    }),
    rarity() {
      const money = this.userInfo.money
      if (money < 200) {
        return 1
      } else if (money < 1000) {
        return 2
      } else if (money < 3000) {
        return 3
      } else if (money < 10000) {
        return 4
      } else {
        return 5
      }
    },
    totalAtk() {
      return this.aliveNinjaList.map(ninja => ninja.atk).reduce((a, b) => a + b, 0)
    },
    totalDef() {
      return this.aliveNinjaList.map(ninja => ninja.def).reduce((a, b) => a + b, 0)
    },
    power() {
      return this.totalAtk + this.totalDef
    },
    killBoss() {
      return this.bossList.map(boss => boss.last_kill > 0 ? 1 : 0).reduce((a, b) => a + b, 0)
    },
    lastBoss() {
      const list = this.bossList.filter(boss => boss.last_kill > 0).sort((a, b) => b.last_kill - a.last_kill)
      return list[0] ? list[0].name : '暂无'
    }
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    })
  }
}
</script>

<style lang="scss">
.user-info {
  padding: 10px;
}
.user-info-deatils > li {
  margin: 10px 0;
}
.user-info-avatar {
  margin: 0 auto;
}
.user-info-actions {
  text-align: center;
}
</style>
