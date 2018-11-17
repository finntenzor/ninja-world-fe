import './plugins/date'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/axios'
import './plugins/elementui'
import './plugins/guard'
import './plugins/reporter'

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
