import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import vDialog from 'v-dialogs'
import VueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuetify)
Vue.use(vDialog)
Vue.use(VueResource)
Vue.use(VueLocalStorage)
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
