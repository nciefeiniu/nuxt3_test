<template>
  <client-only>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect"
      text-color="#fff" background-color="#00b38a" active-text-color="#fff">
      <el-menu-item index="0">XXXX网</el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="1" v-if="userLogined">
        <template #title><el-icon>
            <svg t="1694766887328" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="1863" width="200" height="200">
              <path
                d="M499.8 62.1c-159.2 0-288.2 129-288.2 288.2s129 288.2 288.2 288.2S788 509.5 788 350.3 659 62.1 499.8 62.1z m0 494.5c-113.9 0-206.3-92.4-206.3-206.3S385.9 144 499.8 144s206.3 92.4 206.3 206.3-92.4 206.3-206.3 206.3z"
                fill="#f6f3f3" p-id="1864"></path>
              <path
                d="M168.6 932.1C188 766.8 328.5 638.5 499 638.5s311 128.3 330.5 293.6h81.9c-19.8-210.4-196.8-375-412.4-375s-392.6 164.6-412.4 375h82z"
                fill="#f6f3f3" p-id="1865"></path>
              <path d="M870.5 933.3m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z" fill="#f6f3f3" p-id="1866">
              </path>
              <path d="M127.6 933.3m-40.9 0a40.9 40.9 0 1 0 81.8 0 40.9 40.9 0 1 0-81.8 0Z" fill="#f6f3f3" p-id="1867">
              </path>
            </svg> </el-icon></template>
        <NuxtLink to="/" class="text-link" replace>
          <el-menu-item index="1-3">回到首页</el-menu-item>
        </NuxtLink>
        <NuxtLink to="/setting" class="text-link" replace v-show="userPackage !== ''">
          <el-menu-item index="1-2">设置</el-menu-item>
        </NuxtLink>
        <el-menu-item index="1-1">退出</el-menu-item>
      </el-sub-menu>
    </el-menu>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose" :fullscreen="checkIsMobile()">
      <template #header="{ close, titleId, titleClass }">
        <div class="my-header">
          <h4 :id="titleId" :class="titleClass">提示</h4>
        </div>
      </template>
      <span>确定退出吗?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import { ref } from "#imports";

const dialogVisible = ref(false);
const activeIndex = ref(0);
const userLogined = ref(true);
const userPackage = ref('normal')

const handleSelect = async (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  if (key === "0") {
    await navigateTo("/");
  } else if (key === "1") {
    if (process.client) {
      window.location.replace("https://www.baidu.com");
    }
  } else if (key === "1-1") {
    dialogVisible.value = true;
  }
};

const handleClose = (done: () => void) => {
  done()
}

</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.el-menu {
  border-bottom: 0px !important;
}

.el-header {
  border-bottom: 0px !important;
}

.text-link {
  text-decoration: none;
}
</style>
