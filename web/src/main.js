import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// import './assets/variables.scss'
// 引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'
// 引用6.0swiper
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// 将卡片注册成全局组件
import Card from './components/Card.vue'
Vue.component('m-card', Card)
// 将卡片列表注册成全局组件
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:3000/web/api'
})
// 引入字体图标
import './assets/iconfont/iconfont.css'
import './assets/style.scss'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
