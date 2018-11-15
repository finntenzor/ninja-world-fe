<template>
  <el-card class="ninja-card-container">
    <div class="ninja-card">
      <div class="ninja-card-avatar-container">
        <img class="ninja-card-avatar" :src="avatarSrc" alt="头像">
        <p class="ninja-card-name">{{ ninja.name }}</p>
      </div>
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
import avatars from './avatars'
import { mapActions } from 'vuex'

export default {
  name: 'NinjaCard',
  props: {
    ninja: Object
  },
  data() {
    return {
      avatarSrc: '',
      cureLoading: false,
      fireLoading: false
    }
  },
  created() {
    this.avatarSrc = avatars[parseInt(Math.random() * avatars.length)]
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
        this.$message.error(err.data.msg)
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
        this.$message.error(err.data.msg)
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
  object-fit: contain;
}
.ninja-card-name {
  // 等比例缩放以居中
  width: $length * (246 / 292);
  text-align: center;
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
</style>
