// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './store'

//引入重置样式
import './assets/css/reset.css'
// 引入element-ui
import ElemenntUI from 'element-ui'

// 引入 elementcss样式
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElemenntUI)

Vue.prototype.$imgUrl = 'http://localhost:3000'



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store ,
  components: { App },
  template: '<App/>'
})
