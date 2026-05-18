<template>
  <el-menu
          class="menus"
          :collapse="isCollapse"
          :default-active="activeIndex"
          background-color="var(--rd-sidebar-bg)"
          text-color="#d1d5db"
          active-text-color="#ffffff"
          router
  >
    <menu-item v-for="(route,index) in routes" :key="route.name" :route="route"></menu-item>
  </el-menu>
</template>

<script>
  import { defineComponent, ref, computed } from 'vue'
  import { useRouteStore } from '@/store/router'
  import MenuItem from '@/layout/components/menu/item.vue'
  import { useRoute } from 'vue-router'
  import { useAppStore } from '@/store/app'

  export default defineComponent({
    name: 'Menu',
    created () {
    },
    components: { MenuItem },
    setup () {
      const routes = ref([])
      const route = useRoute()
      const app = useAppStore()
      const isCollapse = computed(() => app.setting.sideIsCollapse)
      const activeIndex = computed(() => route.name)

      routes.value = useRouteStore().routes
      return {
        routes,
        activeIndex,
        isCollapse,
      }
    },

  })
</script>

<style lang="scss" scoped>
  .menus {
    min-height: 100vh;
    border-right: none;
    padding: 10px 8px;
    background: var(--rd-sidebar-bg);

    &:not(.el-menu--collapse) {
      width: var(--rd-sidebar-width);
    }

    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 42px;
      margin: 4px 0;
      border-radius: var(--rd-radius);
      color: #d1d5db;
      line-height: 42px;
    }

    :deep(.el-menu-item:hover),
    :deep(.el-sub-menu__title:hover) {
      background: var(--rd-sidebar-hover);
      color: #fff;
    }

    :deep(.el-menu-item.is-active) {
      background: var(--rd-primary);
      color: #fff;
      font-weight: 650;
    }

    :deep(.el-icon) {
      color: currentColor;
    }

  }
</style>
<style>
</style>
