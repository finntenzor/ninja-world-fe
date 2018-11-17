<template>
  <div class="bosses-fight">
    <div class="bosses-fight-main">
      <div class="bosses-fight-ninja">
        <p>HP: {{ left }}/{{ ninja.maxhp }}</p>
        <el-progress
          class="bosses-fight-hp"
          color="#f56c6c"
          :show-text="false"
          :stroke-width="16"
          :percentage="leftRate"></el-progress>
        <ninja-avatar :id="1" color="#000"></ninja-avatar>
      </div>
      <div class="bosses-fight-boss">
        <p>HP: {{ right }}/{{ boss.maxhp }}</p>
        <el-progress
          class="bosses-fight-hp"
          color="#f56c6c"
          :show-text="false"
          :stroke-width="16"
          :percentage="rightRate"></el-progress>
        <ninja-avatar :id="1" color="#000"></ninja-avatar>
      </div>
    </div>
    <div class="bosses-fight-config">
      <p>消息显示速度</p>
      <el-slider v-model="readSpeed" :min="600" :max="3000" show-input></el-slider>
    </div>
    <div class="bosses-fight-logs">
      <div class="bosses-fight-outter">
        <el-alert
          v-for="(item, i) in showingLogs"
          :key="i"
          :closable="false"
          :description="item.message"
          class="bosses-fight-log"
          title=""
          type="info"
          show-icon>
        </el-alert>
      </div>
    </div>
    <audio v-show="false" ref="attackAudio" preload>
      <source src="@/assets/audio/attack.mp3" type="audio/mpeg">
      <source src="@/assets/audio/attack.ogg" type="audio/ogg">
    </audio>
  </div>
</template>

<script>
import NinjaAvatar from '@/components/NinjaAvatar'

export default {
  name: 'BossesFight',
  props: {
    logs: Array,
    ninja: Object,
    boss: Object
  },
  data() {
    return {
      left: this.ninja.maxhp,
      right: this.boss.maxhp,
      showingLogs: [],
      readSpeed: 1500
    }
  },
  components: {
    NinjaAvatar
  },
  created() {
    window.debug = this
  },
  computed: {
    leftRate() {
      return parseInt(this.left / this.ninja.maxhp * 100)
    },
    rightRate() {
      return parseInt(this.right / 300 * 100)
    }
  },
  mounted() {
    this.start()
  },
  methods: {
    async start() {
      const audio = this.$refs.attackAudio
      function wait(time) {
        return new Promise(resolve => {
          setTimeout(resolve, time)
        })
      }
      for (const item of this.logs) {
        const copy = { ...item }
        this.showingLogs.unshift(copy)
        this.left = item.left
        this.right = item.right
        for (let i = 0; i < item.message.length; i++) {
          await wait((60 * 1000 / this.readSpeed))
          copy.message = item.message.substring(0, i + 1)
        }
        audio.currentTime = 0
        await audio.play()
        await wait((60 * 1000 / this.readSpeed) * 10)
      }
    }
  }
}
</script>

<style lang="scss">
.bosses-fight {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 480px;
}
.bosses-fight-main {
  height: 200px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
}
.bosses-fight-hp {
  width: 200px;
}
.bosses-fight-ninja,
.bosses-fight-boss {
  display: flex;
  flex-direction: column;
  width: 200px;
  & .el-progress-bar__inner {
    transition: width 1s;
  }
}
.bosses-fight-ninja {
  align-items: flex-start;
}
.bosses-fight-boss {
  align-items: flex-end;
  & .bosses-fight-hp {
    transform: rotateY(180deg);
  }
}
.bosses-fight-logs {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  .bosses-fight-outter {
    flex-grow: 1;
    width: 100%;
    padding: 10px;
    overflow-y: scroll;
  }
  .bosses-fight-log {
    margin: 10px 0;
  }
}
</style>
