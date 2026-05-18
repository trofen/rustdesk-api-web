<template>
  <el-config-provider :locale="appStore.setting.locale.value">
    <el-container class="app-shell">
      <el-aside :width="leftWidth" class="app-left">
        <g-aside></g-aside>
      </el-aside>
      <el-container class="app-container ">
        <el-header class="app-header">
          <g-header></g-header>
        </el-header>
        <div class="header-tags">
          <tags></tags>
        </div>

        <el-main class="app-main">
          <router-view v-slot="{ Component }">
            <transition mode="out-in" name="el-fade-in-linear">
              <keep-alive :include="cachedTags">
                <component :is="Component"/>
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup>
  import { useAppStore } from '@/store/app'
  import { useTagsStore } from '@/store/tags'
  import { ref, computed } from 'vue'
  import Tags from '@/layout/components/tags/index.vue'
  import GAside from '@/layout/components/aside.vue'
  import GHeader from '@/layout/components/header.vue'

  const appStore = useAppStore()
  const tagStore = useTagsStore()
  const leftWidth = computed(() => appStore.setting.sideIsCollapse ? '64px' : 'var(--rd-sidebar-width)')

  const cachedTags = ref([])

  cachedTags.value = tagStore.cached
</script>

<style lang="scss" scoped>
.app-shell {
  min-height: 100vh;
  background: var(--rd-bg);
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  height: var(--rd-header-height);
  padding: 0 20px;
  border-bottom: 1px solid var(--rd-border);
  background-color: var(--rd-header-bg);
  color: var(--rd-text);
  backdrop-filter: blur(14px);
  display: flex;
}

.header-tags {
  height: auto;
  border-bottom: 1px solid var(--rd-border);
  background: var(--rd-surface);
  display: flex;
  padding: 0;
}

.app-left {
  position: sticky;
  top: 0;
  z-index: 30;
  height: 100vh;
  transition: width 0.22s ease;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

.app-container {
  min-height: 100vh;
  min-width: 0;
}

.app-main {
  padding: 18px;
  background: var(--rd-bg);
}

@media (max-width: 768px) {
  .app-header {
    padding: 0 12px;
  }

  .app-left {
    position: fixed;
    left: 0;
    top: 0;
  }

  .app-container {
    min-width: 100vw;
  }

  .app-main {
    padding: 12px;
  }
}
</style>


