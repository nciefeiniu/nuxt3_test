<template>
  <div>
    <el-container class="el-container-custom">
      <el-header>
        <SiteHeader />
      </el-header>
      <!-- <SubNav /> -->
      <el-main style="overflow:hidden">
        <slot></slot>
      </el-main>
      <el-footer height="179px">
        <SiteFooter />
      </el-footer>
    </el-container>
  </div>
</template>
<script>

</script>


