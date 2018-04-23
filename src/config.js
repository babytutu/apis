import Vue from 'vue'
/* logger */
import Logger from 'tui-vue-logger'

/* ui */
import Tui from 'tui-vue'
import 'tui-vue/dist/style.css'

/* axios */
import './util/http'

import './util/date'

/* style */
import './assets/styles/theme.styl'

import globalMixin from './mixins/index'

Vue.use(Tui)
Vue.use(Logger, {
  types: ['debug'],
  prefix: 'test'
})

Vue.mixin(globalMixin)

Vue.component('choose-district', () => import('./components/choose-district.vue'))

const filters = require.context('src/filter', true, /\.js$/)

filters.keys().map(key => {
  const name = key.replace(/(\.\/|\.js)/g, '')
  Vue.filter(name, filters(key).default)
})
