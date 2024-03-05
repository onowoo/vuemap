<template>
    <Map v-if="userLevel !== 1"/>
    <MapSingle v-else/>
</template>
<script setup>
import { onMounted,ref } from "vue";
import { UserService } from "/src/api/api.js";
const userLevel = ref(null)
onMounted(()=>{
    getUserInfo()
})
const getUserInfo = async () => {
  const res = await UserService.getUserIndex();  
  userLevel.value = res.data.data.userInfo.level
  // console.log(userLevel.value);
};
</script>