
<template>
  <div class="search-form">
    <div class="website-name">负责任采购网</div>

    <el-row :gutter="10">
      <el-col :span="2">
        <div class="grid-content ep-bg-purple" />
      </el-col>
      <el-col :span="20">
        <el-form ref="FormInstance" class="demo-ruleForm" :size="formSize" status-icon @submit.native.prevent>
          <el-form-item prop="name">
            <el-row :gutter="10" style="width: 100%;">
              <el-col :span="14">
                <div class="grid-content ep-bg-purple" />
                <el-input size="large" v-model="ruleForm.keywords" placeholder="请输入关键字" class="input-with-select"
                  :autofocus="true" @keyup.enter.native="onSubmit" style="max-width: 800px;">
                  <template #append>
                    <el-button :icon="Search" @click="onSubmit">搜索</el-button>
                  </template>
                </el-input>
              </el-col>
              <el-col :span="10">
                <div style="line-height: 47px;">
                  <el-button size="large" @click="packageDialog = true">订阅套餐</el-button>
                </div>
              </el-col>

            </el-row>

          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="ruleForm.bidStatus" size="large">
              <el-radio :label="1">招标</el-radio>
              <el-radio :label="2">中标</el-radio>
              <el-radio :label="3">成交</el-radio>
              <el-radio :label="0">所有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="ruleForm.forSmes" fill="#ffffff">面向中小企业</el-checkbox>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2">
        <div class="grid-content ep-bg-purple-light" />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>

import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElLoading } from 'element-plus'
import { showPackagesDialog } from '../composables/useState';
import { ref, reactive, onMounted, watch, useLogined, totalPageState, currentPageState, usePackageState, useMyFetch, thisIsBidderState } from '#imports'

const emit = defineEmits(['dataReady'])
const page = ref(1)
const packageDialog = showPackagesDialog()
const userLogined = useLogined()
const totalPage = totalPageState()
const currentPage = currentPageState()
const userPackage = usePackageState()
const isBidderState = thisIsBidderState()

interface RuleForm {
  keywords: string
  bidStatus: number
  forSmes: boolean
}

const formSize = ref('large')
const ruleForm = reactive<RuleForm>({
  keywords: '',
  bidStatus: 0,
  forSmes: false,
})

const fetchApi = ref(true)

watch(() => currentPage.value, async function (val: number, oldVal: number) {
  console.log('value changes detected', val, oldVal);
  page.value = val
  if (fetchApi.value) {
    await fetchData()
  }
});

const openFullScreenLoading = (timeout: number = 60000) => {
  const loading = ElLoading.service({
    lock: true,
    text: '正在搜索',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    try {
      loading.close()
    } catch (error) {
    }
  }, timeout)  // 60秒自动关闭
  return loading
}


const fetchData = async () => {
  console.log('发起搜索请求')
  const query = {
    page: page.value,
    keywords: ruleForm.keywords,
    bid_status: ruleForm.bidStatus,
    for_smes: ruleForm.forSmes
  }
  const loading = openFullScreenLoading()
  const data = await useMyFetch(userLogined.value && userPackage.value ? "/api/real_search/" : "/api/search/", {
    method: "GET",
    query: query
  })
  loading.close()
  if (!data || !data.data || !data.data.value) {
    return
  }
  emit('dataReady', data.data.value.data)
  totalPage.value = data.data.value.total
  console.log('数据量：', totalPage.value)
  isBidderState.value = data.data.value.bidder
}


const onSubmit = async () => {
  // if (ruleForm.keywords === '' || ruleForm.keywords === undefined || ruleForm.keywords === null) {
  //   ElMessage({
  //     showClose: true,
  //     message: '请输入关键字！',
  //     type: 'error',
  //   })
  //   return
  // }
  currentPage.value = 1
  try {
    fetchApi.value = false
    page.value = 1
    await fetchData()
  } catch (error) {
  } finally {
    fetchApi.value = true
  }
}


onMounted(async () => {
  await fetchData()
})

</script>
<style lang="less" scoped>
.search-form {
  background-color: #00b38a;
  border-radius: 0 0 8px 8px;
}

.website-name {
  font-size: 3.5rem;
  color: white;
  padding: 30px 0 30px 30px;
  font-weight: 700;
}

.demo-ruleForm {}

::v-deep .el-input__inner {
  border-radius: 23px;
  height: 45px;
}

.el-radio__label {
  color: #ffffff;
}

.el-radio {
  color: #ffffff;
}

.el-radio__label {
  color: #ffffff !important;
}

.el-radio__input.is-checked+.el-radio__label {
  color: #ffffff !important;
}

.el-checkbox {
  color: #ffffff !important;
}
</style>
