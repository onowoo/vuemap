<template>
    <div class="login-wrap min-h-screen dark:bg-dark-600 dark:text-gray-300">
        <div class="ms-login dark:bg-gray-700">
            <div class="ms-title  dark:text-gray-300">资产分布地图系统</div>
            <el-form :model="loginForm" :rules="loginFormRules" ref="login" label-width="0px" class="ms-content  dark:text-gray-300">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="输入账号">
                        <template #prepend>
                            <el-button :icon="User"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="输入密码"
                        v-model="loginForm.password"
                        @keyup.enter="goLogin"
                    >
                        <template #prepend>
                            <el-button :icon="Lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="goLogin">登录</el-button>
                </div>
                <div class="flex justify-between items-center ">
                  <el-checkbox class="dark:text-gray-300" v-model="loginForm.remember" label="记住密码" size="large" />
                  <el-switch v-model="isDark" :active-icon="Sunny" :inactive-icon="Moon"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" inline-prompt />
                </div>
            </el-form>
        </div>
    </div>
</template>
  
  <script setup>
  import { UserService } from "../api/api";
  import { ElMessage } from "element-plus";
  import { useDark } from '@vueuse/core'
  import { reactive } from "vue";
  import { storage,sessionStorage } from "../utils/storage.ts";
  import { useRouter } from "vue-router";
  import { Lock, User, Sunny, Moon } from '@element-plus/icons-vue';
  const isDark = useDark()
  const router = useRouter();
  
  const loginForm = reactive({
    username: "",
    password: "",
    remember: false,
    captcha:""
  });
  
  const loginFormRules = reactive({
    username: [
      { required: true, message: "请输入登录名称" },
      { min: 2, max: 10, message: "2到10个字符之内" },
    ],
    password: [
      { required: true, message: "请输入登录密码", trigger: "blur" },
      { min: 6, max: 15, message: "6-15个字符", trigger: "blur" },
    ],
  });
  const goLogin = () => {
    const data = {
      account: loginForm.username,
      password: loginForm.password,
    };
    UserService.goLogin(data).then((res) => {
      if (res.data.code == 0) {
        ElMessage({
          message: res.data.msg,
          type: "warning",
        });
      }
      if (res.data.code == 1) {
        ElMessage({
          message: res.data.msg,
          type: "success",
        });
        if (loginForm.remember == false) {
          sessionStorage.set("token", res.data.data.token);
          sessionStorage.set("userId", res.data.data.user_id);
          storage.set("isLogin",true)
        } else {
          storage.set("token", res.data.data.token);
          storage.set("userId", res.data.data.user_id);
          storage.set("isLogin",true)
        }
        router.push("/")
      }
    });
  };
  </script>
  <style scoped>
  .login-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-image: url(../assets/img/login-bg.jpg);
      background-size: 100%;
  }
  .ms-title {
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #333;
      font-weight: bold;
      padding-top: 10px;
  }
  .ms-login {
      width: 350px;
      border-radius: 5px;
      background: #fff;
  }
  .ms-content {
      padding: 10px 30px 30px;
  }
  .login-btn {
      text-align: center;
  }
  .login-btn button {
      width: 100%;
      height: 36px;
      margin-bottom: 10px;
  }
  .login-tips {
      font-size: 12px;
      line-height: 30px;
      color: #333;
  }
  </style>