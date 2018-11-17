<template>
  <div class="boss-card">
    <el-card class="boss-card-card">
      <div class="boss-card-infos">
        <ninja-basic-info :id="boss.id" :name="boss.name"></ninja-basic-info>
        <ninja-attrs :attrs="boss"></ninja-attrs>
      </div>
      <ul class="boss-card-other-infos">
        <li>
          <p>刷新时间：{{ boss.cycle_time | timePeriodToReadble }} 奖励金：{{ boss.reward }}</p>
        </li>
        <li>
          <p>上次挑战：{{ lastFightDate.toReadable() }}</p>
        </li>
        <li>
          <p>上次战胜：{{ lastKillDate.toReadable() }}</p>
        </li>
        <task-attr attr-name="冷却" :percentage="coldRate" color="#8e71c7"></task-attr>
      </ul>
      <ul class="boss-card-skills">
        <skill-tag v-for="(skill, i) in boss.skills" :key="i" :skill="skill"></skill-tag>
      </ul>
      <div class="boss-card-actions">
        <el-button
          v-loading="fightLoading"
          :disabled="!canFight"
          type="primary"
          class="boss-card-fight"
          @click="handleFight()"
          >挑战</el-button>
        <b v-if="!setFirstNinja" class="boss-card-tips">请先设置首发忍者</b>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { timePeriodToReadble } from '@/util'
import NinjaBasicInfo from '@/components/NinjaBasicInfo'
import NinjaAttrs from '@/components/NinjaAttrs'
import SkillTag from '@/components/SkillTag'
import TaskAttr from '../Tasks/TaskAttr' // 这样写不太好，但是懒一波

export default {
  name: 'BossesBoss',
  filters: {
    timePeriodToReadble
  },
  components: {
    NinjaBasicInfo,
    NinjaAttrs,
    SkillTag,
    TaskAttr
  },
  props: {
    boss: Object
  },
  data() {
    return {
      fightLoading: false
    }
  },
  computed: {
    ...mapGetters({
      firstNinja: 'firstNinja',
      now: 'now',
      nowDate: 'nowDate'
    }),
    setFirstNinja() {
      return this.firstNinja !== null
    },
    lastFightDate() {
      return new Date(this.boss.last_fight * 1000)
    },
    lastKillDate() {
      return new Date(this.boss.last_kill * 1000)
    },
    coldRate() {
      const diff = this.now - this.boss.last_kill
      const cycle = this.boss.cycle_time
      const time = Math.max(0, Math.min(cycle, diff))
      return parseInt(time / cycle * 100)
    },
    canFight() {
      return this.setFirstNinja && this.now > this.boss.last_kill + this.boss.cycle_time
    }
  },
  methods: {
    ...mapActions({
      fightBoss: 'fightBoss'
    }),
    async handleFight() {
      this.fightLoading = true
      try {
        const data = await this.fightBoss({
          ninja_id: this.firstNinja.id,
          boss_id: this.boss.id
        })
        for (const item of data) {
          alert(item.message)
        }
      } catch (err) {
        this.report(err)
      }
      this.fightLoading = false
    }
  }
}
</script>

<style lang="scss">
.boss-card-card {
  height: 100%;
}
.boss-card-infos {
  display: flex;
}
.boss-card-skills {
  display: flex;
  width: 350px;
  flex-wrap: wrap;
}
.boss-card-other-infos {
  p.tasks-task-attr-name {
    margin: 0;
    margin-left: 10px;
  }
  p {
    margin: 10px;
  }
}
.boss-card-tips {
  color: red;
}
.boss-card-actions {
  padding-top: 10px;
  text-align: center;
}
</style>
