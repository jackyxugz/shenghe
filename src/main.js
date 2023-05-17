import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import echarts from "echarts"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'  //全局样式引入


Vue.use(ElementUI);
Vue.config.productionTip = false
//Vue.prototype.$echarts = echarts;
Vue.prototype.url = 'http://139.196.42.209:5004';

import './permission'  //路由拦截

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
