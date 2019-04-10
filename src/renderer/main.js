import Vue from 'vue'

import App from './App'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
Vue.prototype.$axios = axios
/* eslint-disable no-new */
// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
