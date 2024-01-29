import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vue3BaiduMapGL from 'vue3-baidu-map-gl'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'virtual:windi.css'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(Vue3BaiduMapGL, {
    ak: '7iELRkWE3yRZ78tBcR5XGHvLL0XSuIu3',
    plugins: ['TrackAnimation']
  })
  app.mount('#app')
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }