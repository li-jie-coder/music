// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import Vant from 'vant';
import 'vant/lib/index.css';
import './assets/normal.css'
Vue.use(Vant);

axios.defaults.baseURL = "https://autumnfish.cn"//api调用的跟地址
Vue.use(vueAxios, axios)


Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
