import '@/assets/css/reset.css'
import '@/assets/css/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

// 全局引入 Element-Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 注册elementui 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
// console.log('main.js', import.meta.env)

// 如果浏览器支持 scrollRestoration，将其设置为 'manual' 刷新页面时重置滚动条
if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual'
}
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
