import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import iView from 'iview'

import './index.less'

Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
