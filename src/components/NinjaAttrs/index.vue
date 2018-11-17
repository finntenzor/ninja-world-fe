<template>
  <ul class="ninja-attrs">
    <li class="ninja-attrs-attr attr-atk">
      <img class="ninja-attrs-icon" src="@/assets/icons/sword.png" alt="攻击力">
      <p class="ninja-attrs-value">{{ attrs.atk }}</p>
    </li>
    <li class="ninja-attrs-attr attr-def">
      <img class="ninja-attrs-icon" src="@/assets/icons/shield.png" alt="防御力">
      <p class="ninja-attrs-value">{{ attrs.def }}</p>
    </li>
    <li class="ninja-attrs-attr attr-hp">
      <img class="ninja-attrs-icon" src="@/assets/icons/heart.png" alt="体力">
      <div class="ninja-attrs-value attr-hp">
        <p>{{ attrs.hp }}/{{ attrs.maxhp }}</p>
        <el-progress
          :stroke-width="12"
          :show-text="false"
          :percentage="attrs.hp / attrs.maxhp * 100"
          color="#f56c6c"
        ></el-progress>
      </div>
    </li>
    <li v-if="isBoss" class="ninja-attrs-attr attr-fight">
      <img class="ninja-attrs-icon" src="@/assets/icons/fight.png" alt="对战结果">
      <div class="ninja-attrs-value attr-fight">
        <p>{{ attrs.pass }}/{{ attrs.fail }}</p>
        <el-progress
          :stroke-width="12"
          :show-text="false"
          :percentage="attrs.pass / (attrs.pass + attrs.fail) * 100"
          color="#67c23a"
        ></el-progress>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NinjaAttrs',
  props: {
    attrs: Object
  },
  computed: {
    isBoss() {
      return this.attrs.pass >= 0 && this.attrs.fail >= 0
    }
  }
}
</script>

<style lang="scss">
.ninja-attrs-attr {
  display: flex;
  margin: 10px;
  align-items: center;
}
.ninja-attrs-icon {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: contain;
}
.ninja-attrs-value {
  width: 2em;
  margin: 0 20px;
  &.attr-hp {
    width: 100px;
  }
  &.attr-fight {
    .el-progress-bar__outer {
      background-color: #e6e13c;
    }
    width: 100px;
  }
}
</style>
