<template>
  <div class="setting">
    <div class="menu-item">
      <button class="title icon-title" type="button" @click="toggleTheme">
        <el-icon>
          <Moon v-if="isDark"/>
          <Sunny v-else/>
        </el-icon>
      </button>
    </div>
    <el-dropdown class="menu-item" trigger="click">
      <button class="title icon-title" type="button">
        <i class="el-icon el-tooltip__trigger" style="font-size: 24px;">
          <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="1.2em" height="1.2em">
            <path fill="currentColor"
                  d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z"></path>
          </svg>
        </i>
      </button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(v, k) in appStore.setting.langs" @click="changeLang(k)" :key="k">{{ v.name }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown class="menu-item" trigger="click">
      <button class="title user-title" type="button">
        <span class="avatar">{{ user.username?.slice(0, 1)?.toLowerCase() || 'a' }}</span>
        <span class="nickname">{{ user.username }}</span>
        <el-icon>
          <el-icon-arrow-down/>
        </el-icon>

      </button>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="showChangePwd">{{ T('ChangePassword') }}</el-dropdown-item>
          <el-dropdown-item @click="logout">{{ T('Logout') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <changePwdDialog v-model:visible="changePwdVisible"></changePwdDialog>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/store/user'
  import { useAppStore } from '@/store/app'
  import changePwdDialog from '@/components/changePwdDialog.vue'
  import { computed, ref } from 'vue'
  import { T } from '@/utils/i18n'
  import { Sunny, Moon } from '@element-plus/icons'

  const userStore = useUserStore()
  const user = userStore
  const appStore = useAppStore()

  const logout = () => {
    userStore.logout()
    window.location.reload()
  }

  const changePwdVisible = ref(false)
  const showChangePwd = () => {
    changePwdVisible.value = true
  }
  const changeLang = (v) => {
    appStore.changeLang(v)
  }
  const isDark = computed(() => appStore.setting.theme === 'dark')
  const toggleTheme = () => {
    appStore.toggleTheme()
  }
</script>

<style lang="scss" scoped>
.setting {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  min-width: 0;

  .menu-item {
    display: flex;
    align-items: center;

    * {
      outline: none;
    }
  }

  .title {
    min-height: 36px;
    border: 1px solid transparent;
    border-radius: 999px;
    background: transparent;
    color: var(--rd-text);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    transition: border-color 0.16s ease, color 0.16s ease, background 0.16s ease, transform 0.16s ease;

    &:hover {
      color: var(--rd-primary);
      background: var(--rd-control-hover);
      transform: translateY(-1px);
    }

    .nickname {
      max-width: 180px;
      overflow: hidden;
      padding: 0 4px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .icon-title {
    width: 36px;
    padding: 0;
    font-size: 20px;
  }

  .user-title {
    padding: 0 12px 0 3px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 999px;
    background: var(--rd-primary);
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }
}

@media (max-width: 768px) {
  .setting {
    gap: 6px;

    .title .nickname {
      max-width: 92px;
    }
  }
}
</style>
