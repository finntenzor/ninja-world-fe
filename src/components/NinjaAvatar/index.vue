<template>
  <div class="ninja-avatar" :style="{
    'background': `${color}`,
    '-webkit-mask': `url('${avatarSrc}') no-repeat`,
    '-webkit-mask-repeat': `none`,
    '-webkit-mask-size': `100% auto`
  }" alt="头像"></div>
</template>

<script>
import avatars from './avatars'

export default {
  name: 'NinjaAvatar',
  props: {
    color: String,
    id: Number
  },
  computed: {
    index() {
      const id = parseInt(this.id)
      const positive = id > 0 ? id : -id
      return positive % avatars.length
    },
    avatarSrc() {
      return avatars[this.index]
    }
  }
}
</script>

<style>
.ninja-avatar {
  width: 150px;
  height: 150px;
}
</style>
