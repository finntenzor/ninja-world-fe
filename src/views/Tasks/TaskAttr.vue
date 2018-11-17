<template>
  <li class="tasks-task-attr">
    <p class="tasks-task-attr-name">{{ attrName }}</p>
    <div class="tasks-task-attr-bar">
      <el-progress :stroke-width="12" :percentage="percentage" :color="color"></el-progress>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TasksTaskAttr',
  props: {
    attrName: String,
    percentage: Number,
    color: String
  }
}
</script>

<style>
.tasks-task-attr {
  display: flex;
}
.tasks-task-attr-name {
  width: 60px;
}
.tasks-task-attr-bar {
  width: 150px;
}
</style>
