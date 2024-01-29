<template>
    <div class="h-20 bg-white dark:bg-gray-700 shadow flex justify-between px-10 items-center">
        <div class="text-2xl font-bold font-serif dark:text-white">可视化</div>
        <div class="flex items-center gap-3">

            <el-button type="info" size="small" @click="toggleDark()">灯</el-button>
        </div>
    </div>
</template>
<script setup>
import { useDark, useToggle } from '@vueuse/core'



const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>