import Vue from 'vue'
import Vuetify from 'vuetify'
import customize from '~/configs/customize'

Vue.use(Vuetify, {
  // https://vuetifyjs.com/zh-Hans/style/theme
  theme: customize.theme || {},
  iconfont: 'mdi',
})
