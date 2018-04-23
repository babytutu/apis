import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {i18n} from './i18n'

import './config'

new Vue({
  i18n,
  el: '#app',
  router,
  render: h => h(App),
})
