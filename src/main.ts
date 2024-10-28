import { createApp } from 'vue'
import { Buffer } from "buffer"
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import VueMobileDetection from "vue-mobile-detection"
import 'amfe-flexible'
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/css/main.css'

import App from './App.vue'
import router from './router'

const version = '1.0.0';

if (typeof (window as any).Buffer === "undefined") {
    (window as any).Buffer = Buffer;
}

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

pinia.use(context => {
  // 给store添加一个公共属性
  context.store.version = version

  // 给store添加一个公共方法
  context.store.changeVersion = function (newVersion: string) {
    context.store.version = newVersion
  }
})

app.use(pinia)
app.use(VueMobileDetection)
app.use(Vant)
app.use(router)
app.mount('#app')
