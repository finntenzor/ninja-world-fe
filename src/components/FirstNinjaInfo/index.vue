<template>
  <div class="first-ninja-info" v-if="ninja !== null">
    <p :style="{ color: rarityColor }">{{ ninja.name }} {{ ninja.rarity | rarityToReadable }}</p>
    <img class="first-ninja-info-icon" src="@/assets/icons/sword.png" alt="攻击力">
    <p>{{ ninja.atk }}</p>
    <img class="first-ninja-info-icon" src="@/assets/icons/shield.png" alt="防御力">
    <p>{{ ninja.def }}</p>
    <img class="first-ninja-info-icon" src="@/assets/icons/heart.png" alt="体力">
    <p>{{ ninja.hp }} / {{ ninja.maxhp }}</p>
    <ul class="first-ninja-info-skills">
      <skill-tag
        v-for="(skill, i) in ninja.skills"
        :key="i"
        color="white"
        :skill="skill"></skill-tag>      
    </ul>
    <el-button
      v-loading="cureLoading"
      type="warning"
      @click="handleCure()"
      class="first-ninja-info-button"
      >治疗</el-button>
  </div>
  <div class="first-ninja-info" v-else>
    <p>请先设置首发忍者</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import rarityMixin from '@/mixins/rarity'
import SkillTag from '@/components/SkillTag'

export default {
  name: 'FirstNinjaInfo',
  mixins: [rarityMixin],
  components: {
    SkillTag
  },
  data() {
    return {
      cureLoading: false
    }
  },
  computed: {
    ...mapGetters({
      ninja: 'firstNinja'
    }),
    rarity() {
      return this.ninja.rarity
    }
  },
  methods: {
    async handleCure() {
      this.cureLoading = true
      try {
        const msg = await this.cureNinja(this.ninja.id)
        this.$message.success(msg)
      } catch (err) {
        this.report(err)
      }
      this.cureLoading = false
    },
  }
}
</script>

<style lang="scss">
.first-ninja-info {
  display: flex;
  align-items: center;
  height: 100%;
  p {
    text-shadow: 1px 1px 4px rgba(#ddd, .6);
  }
  .first-ninja-info-button {
    margin-left: 10px;
  }
}
.first-ninja-info-icon {
  margin: 0 5px;
  width: 25px;
  height: auto;
}
.first-ninja-info-skills {
  margin-left: 10px;
  display: flex;
}
</style>
