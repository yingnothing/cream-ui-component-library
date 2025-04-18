import '../styles/index.css'

import { createApp } from 'vue'
import App from './App.vue'
// 存储图标库
import { library } from '@fortawesome/fontawesome-svg-core'
// 导入图标
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
/* add icons to the library */
createApp(App).mount('#app')
