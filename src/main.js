import { createApp } from 'vue'
import { Button } from 'vant';
import 'lib-flexible/flexible'
import App from './App.vue'
import './index.css'
import 'vant/lib/index.css'; // 全局引入样式
import router from './router/index'
createApp(App).use(Button).use(router).mount('#app')
