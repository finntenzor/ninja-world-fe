<template>
  <el-card class="ninja-card-container">
    <div class="ninja-card">
      <ninja-basic-info
        :id="ninja.id"
        :color="rarityColor"
        :is-first="ninja === firstNinja"
        >
        <template slot="name">
          <span>{{ ninja.name }}</span>
          <span class="ninja-card-rarity">{{ ninja.rarity | rarityToReadable }}</span>
        </template>
      </ninja-basic-info>
      <div class="ninja-card-details" v-if="ninja.hp > 0">
        <div class="ninja-card-infos">
          <ninja-attrs :attrs="ninja"></ninja-attrs>
          <ul class="ninja-card-skills">
            <skill-tag v-for="(skill, i) in ninja.skills" :key="i" :skill="skill"></skill-tag>
          </ul>
        </div>
        <div class="ninja-card-actions">
          <el-button
            v-loading="cureLoading"
            type="primary"
            @click="handleCure()"
            class="ninja-card-button"
            >治疗</el-button>
          <el-button
            type="success"
            @click="handleSet()"
            class="ninja-card-button"
            >首发</el-button>
          <el-button
            v-loading="fireLoading"
            type="danger"
            @click="handleFire()"
            class="ninja-card-button"
            >解雇</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import rarityMixin from '@/mixins/rarity'
import NinjaBasicInfo from '@/components/NinjaBasicInfo'
import NinjaAttrs from '@/components/NinjaAttrs'
import SkillTag from '@/components/SkillTag'

export default {
  name: 'NinjaCard',
  mixins: [rarityMixin],
  components: {
    NinjaBasicInfo,
    NinjaAttrs,
    SkillTag,
  },
  props: {
    ninja: Object
  },
  data() {
    return {
      cureLoading: false,
      fireLoading: false
    }
  },
  computed: {
    ...mapGetters({
      firstNinja: 'firstNinja'
    }),
    rarity() {
      return this.ninja.rarity
    }
  },
  methods: {
    ...mapActions({
      cureNinja: 'cureNinja',
      fireNinja: 'fireNinja',
    }),
    ...mapMutations({
      setFirstNinja: 'setFirstNinja'
    }),
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
    async handleFire() {
      this.fireLoading = true
      try {
        if (await this.confirm('确认解雇该忍者？', '警告')) {
          const msg = await this.fireNinja(this.ninja.id)
          this.$message.success(msg)
        }
      } catch (err) {
        this.report(err)
      }
      this.fireLoading = false
    },
    async confirm(tips, title) {
      try {
        await this.$confirm(tips, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        return true
      } catch (err) {
        return false
      }
    },
    handleSet() {
      this.setFirstNinja(this.ninja)
    }
  }
}
</script>

<style lang="scss">
$length: 150px;
.el-card.ninja-card-container {
  // 用于令“首发”显示在外部
  overflow: visible;
}
.ninja-card {
  display: flex;
}
.ninja-card-rarity {
  margin-left: 10px;
}

.ninja-card-infos {
  display: flex;
}

.ninja-card-skills {
  display: flex;
  width: 210px;
  flex-wrap: wrap;
  justify-content: space-between;
}
.ninja-card-skill {
  margin: 5px;
}
</style>
