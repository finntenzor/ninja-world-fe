<template>
  <div class="ninja-basic-info">
    <div class="ninja-basic-info-avatar-container">
      <ninja-avatar :color="color" :id="id"></ninja-avatar>
      <img v-if="isFirst" class="ninja-basic-info-first" src="@/assets/first.png" alt="首发">
    </div>
    <p class="ninja-basic-info-name" :style="{ color: color }">
      <slot name="name">{{ name }}</slot>
    </p>
  </div>
</template>

<script>
import NinjaAvatar from '@/components/NinjaAvatar'

export default {
  name: 'NinjaBasicInfo',
  components: {
    NinjaAvatar
  },
  props: {
    id: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#000000'
    },
    isFirst: {
      type: Boolean,
      default: false
    },
    name: String
  }
}
</script>

<style lang="scss">
$length: 150px;
.ninja-basic-info-avatar-container {
  margin-top: 10px;;
  position: relative;
}
.ninja-basic-info-first {
  position: absolute;
  width: 120px;
  height: auto;
  top: -35px;
  left: -45px;
  transform: rotate(-35deg);
}
.ninja-basic-info-name {
  // 等比例缩放以居中
  width: $length * (246 / 292);
  text-align: center;
  font-weight: 900;
}
</style>
