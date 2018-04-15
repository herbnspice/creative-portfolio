import Vue from 'vue'
import App from './App.vue'
import Airbit from './pages/Airbit.vue'
import Home from './pages/Home.vue'

require('./bootstrap')

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import { Carousel, Slide } from 'vue-carousel';


const routes = [
  { path: '/', component: Home },
  { path: '/tools/airbit', component: Airbit }
] 

Vue.config.productionTip = false

Vue.use(require('vue-moment'));
Vue.use(VueResource);
Vue.use(VueRouter)

const router = new VueRouter({
  routes ,// short for `routes: routes`
  mode: 'history'
})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
