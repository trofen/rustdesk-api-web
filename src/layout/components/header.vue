<template>
  <div class="header-main">
    <button class="icon-button" type="button" @click="expandOrFoldSlider">
      <el-icon>
        <el-icon-expand v-if="setting.sideIsCollapse"></el-icon-expand>
        <el-icon-fold v-else></el-icon-fold>
      </el-icon>
    </button>
    <div class="header-logo">
      <img :src="setting.logo" alt="" class="logo">
      <div class="title">{{ setting.title }}</div>
    </div>
  </div>
  <Setting></Setting>
</template>

<script>
  import { defineComponent, computed } from 'vue'
  import Setting from '@/layout/components/setting/index.vue'
  import { useAppStore } from '@/store/app'

  export default defineComponent({
    name: 'LayerHeader',
    created () {
    },
    components: { Setting },
    watch: {},
    setup (props) {
      const appStore = useAppStore()
      const setting = computed(() => appStore.setting)
      const expandOrFoldSlider = () => {
        appStore.sideCollapse()
      }
      return {
        setting,
        expandOrFoldSlider,
      }
    },

  })
</script>

<style scoped lang="scss">
  .header-main {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .icon-button {
    width: 34px;
    height: 34px;
    border: 1px solid var(--rd-border);
    border-radius: var(--rd-radius);
    background: var(--rd-surface);
    color: var(--rd-text-muted);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    cursor: pointer;
    transition: border-color 0.16s ease, color 0.16s ease, background 0.16s ease;

    &:hover {
      border-color: var(--rd-primary);
      color: var(--rd-primary);
      background: var(--el-color-primary-light-9);
    }
  }

  .header-logo {
    display: flex;
    height: 100%;
    align-items: center;
    min-width: 0;

    .title {
      display: block;
      min-width: 0;
      color: var(--rd-text);
      font-size: 15px;
      font-weight: 650;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .logo {
      display: block;
      width: 28px;
      height: 28px;
      margin-right: 10px;
      border-radius: 6px;
    }
  }

  @media (max-width: 768px) {
    .header-logo .title {
      max-width: 46vw;
    }
  }

</style>
<style lang="scss">

</style>
