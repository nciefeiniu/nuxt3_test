<template>
  <SearchForm @dataReady="searchResultOK"></SearchForm>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'

let testData = ref([])

function searchResultOK(data) {
  console.log(data)
}
</script>
<style lang="less" scoped>
</style>
