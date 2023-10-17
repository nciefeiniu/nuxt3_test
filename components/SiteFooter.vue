<style lang="less" scoped>
.footer-wrapper {
  text-align: center;
  color: #d3dce6;
  margin-top: 16px;
}
</style>
<style>
.el-footer {
  background-color: #333 !important;
}
</style>

<template>
  <div class="footer-wrapper">
    Copyright &copy; 2013-{{ currentYear }} All rights reserved.
    <br />
    <br />
    <div style="width: 300px; margin: 0 auto; padding: 20px 0 0 0;">
      <p><a href="https://beian.miit.gov.cn/" target="_blank"
          style="display: inline-block; text-decoration: none; height: 20px; line-height: 20px; color: #d3dce6;">沪ICP备xxxxxxxxxx</a>
      </p>
      <p><a style="display: inline-block; text-decoration: none; height: 20px; line-height: 20px;"
          href="http://www.beian.gov.cn/portal/registerSystemInfo" target="_blank"
          rel="noopener noreferrer"><img style="float: left;"
            src="https://www.epmap.org/wp-content/uploads/2022/02/备案图标.png"> </a>沪公网安备 xxxxxxxxxxxx号</p>
    </div>
  </div>
</template>
<script setup>

import { computed } from 'vue'

const currentYear = computed(() => {
  return (new Date()).getFullYear()
})

</script>
