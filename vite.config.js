import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite' 
import { ElementPlusResolver} from 'unplugin-vue-components/resolvers' 
import WindiCSS from 'vite-plugin-windicss'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    Components({
      // ui库解析器，也可以自定义 
      resolvers: [ 
          ElementPlusResolver(),
      ]
      })
    ],
})
