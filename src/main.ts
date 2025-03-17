import '../styles/index.css'

import { createApp } from 'vue'
import App from './App.vue'
// 图标库
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
/* add icons to the library */
createApp(App).mount('#app')
