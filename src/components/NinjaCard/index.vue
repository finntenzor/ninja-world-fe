<template>
  <el-card class="ninja-card-container">
    <div class="ninja-card">
      <div class="ninja-card-avatar-container">
        <ninja-avatar :color="rarityColor" :id="ninja.id"></ninja-avatar>
        <p class="ninja-card-name" :style="{ color: rarityColor }">
          <span >{{ ninja.name }}</span>
          <span class="ninja-card-rarity">{{ ninja.rarity | rarityToReadable }}</span>
        </p>
      </div>
      <div class="ninja-card-details" v-if="ninja.hp > 0">
        <div class="ninja-card-infos">
          <ul class="ninja-card-attrs">
            <li class="ninja-card-attr attr-atk">
              <img class="ninja-card-attr-icon" src="@/assets/icons/sword.png" alt="攻击力">
              <p class="ninja-card-attr-value">{{ ninja.atk }}</p>
            </li>
            <li class="ninja-card-attr attr-def">
              <img class="ninja-card-attr-icon" src="@/assets/icons/shield.png" alt="防御力">
              <p class="ninja-card-attr-value">{{ ninja.def }}</p>
            </li>
            <li class="ninja-card-attr attr-def">
              <img class="ninja-card-attr-icon" src="@/assets/icons/heart.png" alt="体力">
              <div class="ninja-card-attr-value attr-hp">
                <p>{{ ninja.hp }}/{{ ninja.maxhp }}</p>
                <el-progress
                  :stroke-width="12"
                  :show-text="false"
                  :percentage="ninja.hp / ninja.maxhp * 100"
                  status="exception"
                ></el-progress>
              </div>
            </li>
          </ul>
          <ul class="ninja-card-skills">
            <li
              v-for="(skill, i) in ninja.skills"
              :key="i">
              <el-popover
                placement="top-start"
                :title="skill.name + ' LV' + skill.level"
                width="200"
                trigger="hover"
                :content="skill.description">
                <el-tag class="ninja-card-skill" slot="reference">{{ skill.name }} LV{{ skill.level }}</el-tag>
              </el-popover>
            </li>
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
import { mapActions } from 'vuex'
import rarityMixin from '@/mixins/rarity'
import NinjaAvatar from '@/components/NinjaAvatar'

export default {
  name: 'NinjaCard',
  mixins: [rarityMixin],
  components: {
    NinjaAvatar
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
    rarity() {
      return this.ninja.rarity
    }
  },
  methods: {
    ...mapActions({
      cureNinja: 'cureNinja',
      fireNinja: 'fireNinja',
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
    }
  }
}
</script>

<style lang="scss">
$length: 150px;
.ninja-card {
  display: flex;
}
.ninja-card-avatar {
  display: block;
  width: $length;
  height: $length;
}
.ninja-card-name {
  // 等比例缩放以居中
  width: $length * (246 / 292);
  text-align: center;
  font-weight: 900;
}
.ninja-card-rarity {
  margin-left: 10px;
}

.ninja-card-infos {
  display: flex;
}
.ninja-card-attr {
  display: flex;
  margin: 10px;
  align-items: center;
}

.ninja-card-icon,
.ninja-card-attr-icon {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.ninja-card-attr-value {
  width: 2em;
  margin: 0 20px;
  &.attr-hp {
    width: 100px;
  }
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
