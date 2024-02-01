import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Vue3BaiduMapGL from 'vue3-baidu-map-gl'
import { createPinia } from "pinia"
import {storage,sessionStorage} from './utils/storage'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { DrawScene, MarkerDraw } from 'bmap-draw';
import 'virtual:windi.css'
const app = createApp(App)
const pinia = createPinia();
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.use(Vue3BaiduMapGL, {
    ak: '7iELRkWE3yRZ78tBcR5XGHvLL0XSuIu3',
    plugins: ['TrackAnimation','Mapvgl', 'Mapv', 'MapvThree']
  })
  app.mount('#app')
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }