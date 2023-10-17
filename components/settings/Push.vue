<!-- 推送设置 -->
<template>
  <div style="margin-top: 20px;">

    <el-form :model="pushSettingsData" :label-width="checkIsMobile() ? '100px' : '120px'" @submit.prevent>
      <div style="text-align: center;" v-show="!pushSettingsData.has_push">
        <el-text class="mx-1" size="small" type="warning">当前套餐暂无推送功能</el-text>
      </div>

      <el-form-item label="邮箱：">
        <el-input v-model="pushSettingsData.email" :disabled="!pushSettingsData.has_push" @change="changeEmail" />
      </el-form-item>
      <el-form-item label="微信关连：">
        <el-button type="primary" :disabled="!pushSettingsData.has_push">微信授权</el-button>
      </el-form-item>
      <el-form-item label="频度：">
        <client-only>
          <el-time-select v-model="userChoicePoinOfTime" start="00:00" step="01:00" end="23:59" placeholder="选择时间点"
            @change="() => { }" />
          <el-button type="primary" @click="onAddItem" style="margin-left: 10px;"
            :disabled="!pushSettingsData.has_push">增加</el-button>
        </client-only>
        <client-only>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="推送时间" width="180">
              <template #default="scope">
                <div style="display: flex; align-items: center">
                  <el-icon>
                    <timer />
                  </el-icon>
                  <span style="margin-left: 10px">{{ scope.row.date }}点</span>
                </div>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template #default="scope">
                <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" icon-color="#626AEF" title="确定删除?"
                  @confirm="handleDelete(scope.$index, scope.row)">
                  <template #reference>
                    <el-button type="danger" size="small">删除</el-button>
                  </template>
                </el-popconfirm>
                <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </client-only>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
import { Timer } from '@element-plus/icons-vue'
import { useMyFetch, checkIsMobile } from '#imports'

interface PushInterf {
  id: number
  date: number
}

const pushSettingsData = reactive({
  email: '',
  has_push: false,  // 是否有推送功能
})

const userChoicePoinOfTime = ref('00:00')

const handleDelete = async (index: number, row: PushInterf) => {
  const data = await useMyFetch("/api/user_push_setting/", {
    method: "DELETE",
    body: { id: row.id }
  })
  if (!data || !data.data || !data.data.value) {
    return
  }
  tableData.value.splice(index, 1)
}

const tableData = ref([

])

async function getPushPoinOfTimeData() {
  const data = await useMyFetch("/api/user_push_setting/", {
    method: "GET",
  })
  console.log(data.data)
  if (!data || !data.data || !data.data.value) {
    return
  }
  console.log('push time:', data.data.value.data)
  tableData.value = data.data.value.data
  console.log(tableData.value)
}

const onAddItem = async () => {
  // console.log('触发了')
  // return
  const data = await useMyFetch("/api/user_push_setting/", {
    method: "POST",
    body: { date: userChoicePoinOfTime.value }
  })
  if (!data || !data.data || !data.data.value) {
    return
  }
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
  pushSettingsData.email = data.data.value.data.user_mail
  pushSettingsData.has_push = data.data.value.data.mail_push
}

async function changeEmail() {
  if (pushSettingsData.email === null || pushSettingsData.email === undefined) {
    return
  }
  const data = await useMyFetch("/api/change_push_email/", {
    method: "POST",
    body: { email: pushSettingsData.email }
  })
  if (!data || !data.data || !data.data.value) {
    return
  }
}

getUserPackageInfo()
getPushPoinOfTimeData()

</script>
<style scoped>
.el-select {
  width: 140px;
}
</style>
