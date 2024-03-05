<template>
  <div class="bg-[rgb(255,255,255,0.5)] dark:bg-[rgb(0,0,0,0.7)] border shadow backdrop-filter backdrop-blur-4 p-4 rounded-t-md rounded-l-none">
    <el-descriptions 
    direction="vertical" 
    :column="4" 
    size="small" 
    title="资产基础信息"
    border
    >
    <template #extra>
      <el-button type="primary" size="small" @click="show = !show">查阅更多信息</el-button>
    </template>
      <el-descriptions-item label="资产名称" :span="2"><span class="text-white"></span>{{
        detail.nickname
      }}</el-descriptions-item>
      <el-descriptions-item label="占地面积" :span="1">{{
        detail.cover_area
      }}</el-descriptions-item>
      <el-descriptions-item label="建筑面积" :span="1">{{
        detail.floor_area
      }}</el-descriptions-item>
      <el-descriptions-item label="管理单位" :span="2">{{
        detail.channel.name
      }}</el-descriptions-item>
      <el-descriptions-item label="负责人">{{
        detail.manager
      }}</el-descriptions-item>
      <el-descriptions-item label="产权证明" :span="1">{{
        detail.identification
      }}</el-descriptions-item>
      <el-descriptions-item label="资产现状" :span="2">{{
        detail.status_quo
      }}</el-descriptions-item>
      <el-descriptions-item label="责任人">{{
        detail.just_manager
      }}</el-descriptions-item>
      <el-descriptions-item label="应急电话">{{
        detail.tel
      }}</el-descriptions-item>
    </el-descriptions>
  </div>
  <el-drawer v-model="show" :show-close="false" size="30%" class="dark:bg-gray-700 dark:text-white">
    <template #header="{ titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass" class="dark:text-white text-xl font-bold">{{ detail.title }}</h4>
    </template>
    <div class="flex flex-col gap-4">
      <div v-html="detail.content"></div>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
    detail:Object
})
const show = ref(false)
</script>