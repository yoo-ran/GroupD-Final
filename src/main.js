import { createApp} from 'vue'
import App from './App.vue'
import router from "./router/router"
import $ from 'jquery'

global.jQuery=require('jquery');
window.$=$

createApp(App).use(router).mount('#app');