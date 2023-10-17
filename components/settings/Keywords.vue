<template>
  <client-only>
    <div :class="checkIsMobile() ? 'sub-keyword-setting-mobile-key' : 'sub-keyword-setting-key'">
      <el-descriptions class="margin-top" title="当前套餐" :column="checkIsMobile() ? 1 : 3" :style="blockMargin">
        <el-descriptions-item label="套餐类型：">{{ currentPackageInfo.package_name }}</el-descriptions-item>
        <!-- <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item> -->
        <el-descriptions-item label="生效时间：">
          <el-tag size="small">{{ currentPackageInfo.start_time }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="失效时间：">
          <el-tag size="small">{{ currentPackageInfo.end_time }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="可订阅关键字数量：">
          <el-tag size="small">{{ currentPackageInfo.keyword_limit }}个</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <el-divider />
      <el-table :data="filterTableData" style="width: 100%" empty-text="暂未订阅相关关键字">
        <el-table-column type="index" width="50" />
        <el-table-column label="订阅时间" prop="create_time" sortable />
        <el-table-column label="关键词" prop="keyword" />
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="搜索" />
          </template>
          <template #default="scope">
            <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon-color="#626AEF" title="确定删除?"
              @confirm="handleDelete(scope.$index, scope.row)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
            <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" type="primary" style="width: 100%" @click="openAddKeywordDialog"
        :disabled="currentPackageInfo.keyword_limit > 0 ? false : true">添加关键字</el-button>
    </div>
    <!-- dialog -->
    <el-dialog v-model="showAddKeywordDialog" title="添加关键字" :width="checkIsMobile() ? '70%' : '30%'" align-center>
      <el-input v-model="addKeywordData.keyword" placeholder="">
        <template #prepend>关键字</template>
      </el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddKeywordDialog = false">取消</el-button>
          <el-button type="primary" @click="onAddItem">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </client-only>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import { useMyFetch, checkIsMobile } from '#imports'

interface keywordIntF {
  create_time: string
  keyword: string
}

const search = ref('')
const tableData = ref([])
const currentPackageInfo = reactive({
  'package_name': '',
  'keyword_limit': 0,
  'start_time': '',
  'end_time': ''
})
const showAddKeywordDialog = ref(false)
const addKeywordData = ref({
  keyword: ''
})

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.keyword.toLowerCase().includes(search.value.toLowerCase())
  )
)

const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap.default,
  }
})

const handleDelete = async (index: number, row) => {

  console.log(row)
  const data = await useMyFetch("/api/user_sub_keywords/", {
    method: "DELETE",
    body: { id: row.id }
  })
  if (!data || !data.data || !data.data.value) {
    return
  }
  tableData.value.splice(index, 1)
}

const onAddItem = async () => {
  if (addKeywordData.value.keyword === '' || addKeywordData.value.keyword === null || addKeywordData.value.keyword === undefined) {
    return
  }
  const data = await useMyFetch("/api/user_sub_keywords/", {
    method: "POST",
    body: { keyword: addKeywordData.value.keyword }
  })
  if (!data || !data.data || !data.data.value) {
    return
  }
  tableData.value = data.data.value.data
  showAddKeywordDialog.value = false
}

function openAddKeywordDialog() {
  addKeywordData.value.keyword = ''
  showAddKeywordDialog.value = true

}


async function getUserKeywords() {
  const data = await useMyFetch("/api/user_sub_keywords/", {
    method: "GET",
  })
  if (!data || !data.data || !data.data.value) {
    return
  }
  console.log('keywords:', data.data.value.data)
  tableData.value = data.data.value.data

}


async function getUserPackageInfo() {
  const data = await useMyFetch("/api/user_package_info/", {
    method: "GET",
  })
  if (!data || !data.data || !data.data.value) {
    return
  }
  console.log('package_info:', data.data.value.data)
  currentPackageInfo.end_time = data.data.value.data.end_time
  currentPackageInfo.start_time = data.data.value.data.start_time
  currentPackageInfo.package_name = data.data.value.data.package_name
  currentPackageInfo.keyword_limit = data.data.value.data.keyword_limit
}
getUserPackageInfo()
getUserKeywords()
</script>
<style scoped lang="less">
.sub-keyword-setting {
  width: 800px;
  margin: 30px auto;
}
</style>
