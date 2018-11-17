<template>
  <el-button-group class="ninja-switcher">
    <el-button type="primary" icon="el-icon-arrow-left" @click="choose(-1)">上一个</el-button>
    <el-button type="primary" icon="el-icon-arrow-right" @click="choose(1)">下一个</el-button>
  </el-button-group>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'FirstNinjaInfo',
  computed: {
    ...mapGetters({
      aliveNinjaList: 'aliveNinjaList',
      ninja: 'firstNinja'
    })
  },
  methods: {
    ...mapMutations({
      setFirstNinja: 'setFirstNinja'
    }),
    choose(offset) {
      const list = this.aliveNinjaList
      let index = 0
      if (this.ninja) {
        index = list.indexOf(this.ninja)
        index = index >= 0 ? index : 0
      } else {
        if (offset > 0) {
          index = -1
        } else {
          index = 0
        }
      }
      index = (index + offset + list.length) % list.length
      this.setFirstNinja(list[index])
    }
  }
}
</script>
