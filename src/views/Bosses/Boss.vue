<template>
  <div class="boss-card">
    <pre>{{ boss }}</pre>
    <el-card>
      <ninja-basic-info :id="boss.id" :name="boss.name"></ninja-basic-info>
      <ninja-attrs :attrs="boss"></ninja-attrs>
      <ul class="boss-card-skills">
        <skill-tag v-for="(skill, i) in boss.skills" :key="i" :skill="skill"></skill-tag>
      </ul>
    </el-card>
  </div>
</template>

<script>
import NinjaBasicInfo from '@/components/NinjaBasicInfo'
import NinjaAttrs from '@/components/NinjaAttrs'
import SkillTag from '@/components/SkillTag'

export default {
  name: 'BossesBoss',
  components: {
    NinjaBasicInfo,
    NinjaAttrs,
    SkillTag,
  },
  props: {
    boss: Object
  }
}
</script>

<style>
.boss-card-skills {
  display: flex;
}
</style>
