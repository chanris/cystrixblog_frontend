import '@/assets/css/reset.css'
import '@/assets/css/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VMdPreview from '@kangc/v-md-editor/lib/preview.js';
import '@kangc/v-md-editor/lib/style/preview.css';
// 引入你所使用的主题 此处以 github 主题为例
import githubTheme from '@kangc/v-md-editor/lib/theme/github';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js'

// 引入md文档渲染组件
VMdPreview.use(githubTheme, {
	Hljs: hljs,
})

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
app.use(VMdPreview)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
