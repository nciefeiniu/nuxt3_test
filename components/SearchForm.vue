
<template>
  <div class="search-form">
    <div class="website-name">XXXXX网</div>

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
import { ref, reactive } from '#imports'

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


const onSubmit = async () => {
  console.log('search')
}

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
