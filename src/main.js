import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Particles from "particles.vue3";

import Antd from 'ant-design-vue';
import './plugins/antd'

import './styles/index.less'

createApp(App).use(Antd).use(Particles).use(router).mount('#app')
