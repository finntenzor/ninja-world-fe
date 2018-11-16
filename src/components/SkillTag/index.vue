<template>
  <li>
    <el-popover
      placement="top-start"
      :title="skill.name + ' LV' + skill.level"
      width="200"
      trigger="hover"
      :content="skill.description">
      <el-tag class="ninja-card-skill" :color="color" slot="reference">{{ skill.name }} LV{{ skill.level }}</el-tag>
    </el-popover>
  </li>
</template>

<script>
export default {
  name: 'SkillTag',
  props: {
    skill: Object,
    color: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style>

</style>
