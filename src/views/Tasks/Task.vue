<template>
  <el-card>
    <div class="tasks-task-display">
      <div class="tasks-task-logo">
        <i class="tasks-task-icon" :class="[ timeAccepted ? 'el-icon-success' : 'el-icon-warning']"></i>
      </div>
      <div class="tasks-task-info">
        <p class="tasks-task-name">{{ task.task_name }}</p>
        <ul>
          <task-attr attr-name="难度" :percentage="task.difficulty"></task-attr>
          <task-attr attr-name="危险度" :percentage="task.risk" color="#f56c6c"></task-attr>
          <template v-if="setFirstNinja">
            <task-attr attr-name="成功率" :percentage="successRate" color="#67c23a"></task-attr>
            <task-attr attr-name="死亡率" :percentage="deadRate" color="#f56c6c"></task-attr>
          </template>
          <li v-else>
            <b>请先设置首发忍者</b>
          </li>
          <task-attr attr-name="冷却" :percentage="coldRate" color="#8e71c7"></task-attr>
        </ul>
        <li>
          <p>刷新时间：{{ task.cycle_time | timePeriodToReadble }} 奖励金：{{ task.reward }}</p>
        </li>
        <li>
          <p>上次执行：{{ lastExecuteDate.toReadable() }}</p>
        </li>
        <li>
          <p>下次执行：{{ nextExecuteDate.toReadable() }}</p>
        </li>
      </div>
    </div>
    <div class="tasks-task-actions">
      <el-button
        v-loading="executeLoading"
        :disabled="!canExecute"
        type="primary"
        class="tasks-task-execute"
        @click="handleExecute()"
        >执行</el-button>
    </div>
  </el-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { timePeriodToReadble } from './util'
import TaskAttr from './TaskAttr'

export default {
  name: 'TasksTask',
  components: {
    TaskAttr
  },
  props: {
    task: Object
  },
  data() {
    return {
      executeLoading: false,
      nowDate: new Date(),
      timer: null
    }
  },
  filters: {
    timePeriodToReadble
  },
  computed: {
    ...mapGetters({
      firstNinja: 'firstNinja'
    }),
    setFirstNinja() {
      return this.firstNinja !== null
    },
    now() {
      return parseInt(this.nowDate.getTime() / 1000)
    },
    lastExecute() {
      return this.task.last_execute || 0
    },
    nextExecute() {
      return this.lastExecute + this.task.cycle_time
    },
    lastExecuteDate() {
      return new Date(this.lastExecute * 1000)
    },
    nextExecuteDate() {
      return new Date(this.nextExecute * 1000)
    },
    canExecute() {
      return this.timeAccepted && this.setFirstNinja
    },
    successRate() {
      if (!this.setFirstNinja) {
        return 0
      }
      const difficulty = this.task.difficulty - (this.firstNinja.rarity - 1) * 10
      return parseInt(100 - Math.max(difficulty, 0))
    },
    deadRate() {
      if (!this.setFirstNinja) {
        return 0
      }
      return parseInt((100 - this.successRate) * this.task.risk / 100)
    },
    timeAccepted() {
      return this.nowDate > this.nextExecuteDate
    },
    coldRate() {
      const diff = this.now - this.lastExecute
      const cycle = this.task.cycle_time
      const time = Math.max(0, Math.min(cycle, diff))
      return parseInt(time / cycle * 100)
    }
  },
  created() {
    this.removeTimer()
    this.timer = setInterval(this.refresh, 1000)
  },
  beforeDestroy() {
    this.removeTimer()
  },
  methods: {
    ...mapActions({
      executeTask: 'executeTask'
    }),
    async handleExecute() {
      this.executeLoading = true
      try {
        const data = await this.executeTask({
          ninja_id: this.firstNinja.id,
          task_id: this.task.id
        })
        if (data.task_success) {
          this.$message.success('任务成功')
        } else {
          this.$message.warning('任务失败')
        }
      } catch (err) {
        this.report(err)
      }
      this.executeLoading = false
    },
    refresh() {
      this.nowDate = new Date()
    },
    removeTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  }
}
</script>

<style lang="scss">
.tasks-task-display {
  display: flex;
}
.tasks-task-icon {
  font-size: 160px;
  &.el-icon-success {
    color: #67c23a;
  }
  &.el-icon-warning {
    color: #e6a23c;
  }
}
.tasks-task-info {
  margin-left: 10px;
  width: 260px;
}
.tasks-task-name {
  font-size: 1.4em;
}
.tasks-task-attr {
  display: flex;
}
.tasks-task-actions {
  display: flex;
  justify-content: flex-end;
  .tasks-task-execute {
    margin: 10px 10px 0;
  }
}
</style>
