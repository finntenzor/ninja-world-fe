<template>
  <div class="tasks">
    <task-item class="tasks-task-item" v-for="(task, i) in taskList" :key="i" :task="task"></task-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TaskItem from './Task'

export default {
  name: 'Tasks',
  components: {
    TaskItem
  },
  computed: {
    ...mapGetters({
      taskList: 'taskList'
    })
  }
}
</script>

<style>
.tasks-task-item {
  margin: 10px;
}
.tasks {
  display: flex;
  flex-wrap: wrap;
}
</style>
