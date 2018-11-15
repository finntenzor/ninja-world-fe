<template>
  <el-card class="ninja-card-container">
    <div class="ninja-card">
      <img class="ninja-card-avatar" :src="avatarSrc" alt="头像">
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
        </ul>
        <el-button class="ninja-card-button" @click="handleFire">解雇</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import avatars from './avatars'

export default {
  name: 'NinjaCard',
  props: {
    ninja: Object
  },
  data() {
    return {
      avatarSrc: ''
    }
  },
  created() {
    this.avatarSrc = avatars[parseInt(Math.random() * avatars.length)]
  },
  methods: {
    handleFire() {

    }
  }
}
</script>

<style>
.ninja-card {
  display: flex;
}
.ninja-card-avatar {
  display: block;
  width: 150px;
  height: 150px;
  object-fit: contain;
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
}
</style>
