<!-- 订阅设置页面 -->
<template>
  <div :class="isMobile ? 'sub-keyword-setting-mobile' : 'sub-keyword-setting'">
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane label="订阅设置">
        <settings-keywords></settings-keywords>
      </el-tab-pane>
      <el-tab-pane label="推送设置">
        <settings-push></settings-push>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>

import { checkIsMobile, onMounted, ref } from '#imports'

let isMobile = ref(false)

onMounted(() => {
  if (checkIsMobile()) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
  console.log('是否是手机端：', isMobile.value)
})

</script>
<style lang="less" scoped>
</style>
