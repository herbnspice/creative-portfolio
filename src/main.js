import Vue from 'vue'
import App from './App.vue'
import Airbit from './pages/Airbit.vue'
import Home from './pages/Home.vue'

require('./bootstrap')

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

const routes = [
  { path: '/', component: Home,
    meta : { 
      title : 'Herbert Saladar',
      name: 'home',
      description: "Hi! I'm Herbert I am a web devveloper and a front end engineer feel free to checkout my creative profile!",
      ogurl: 'http://herbert-saladar.com',
      ogimage: 'http://herbert-saladar.com/images/me-gray.png', 
      ogdescription:  "Hi! I'm Herbert I am a web devveloper and a front end engineer feel free to checkout my creative profile!",
      ogtitle: "Herbert Saladar",
      ogsitename : "Herbert Saladar",
    }   
  },
  { path: '/tools/airbit', component: Airbit,
    meta : { 
        title : 'Airbit tools',
        name: 'tools-airbit',
        description: 'This is an airbit tool',
        ogurl: 'http://herbert-saladar.com/tools/airbit',
        ogimage: 'http://herbert-saladar.com/images/logo-airbit.png', 
        ogdescription:  "Airbit tool is a Free web application and is made available free of charge.",
        ogtitle: "Airbit tool",
        ogsitename : "Airbit tool",
    }
  }
] 

Vue.config.productionTip = false

Vue.use(require('vue-moment'));
Vue.use(VueResource);
Vue.use(VueRouter)

const router = new VueRouter({
  routes ,// short for `routes: routes`
  mode: 'history'
})

router.beforeEach(function(to, from, next) {
  window.scrollTo(0, 0)
  if( to.meta.title){
      document.title =  to.meta.title
  }
  if( to.meta.description){
      document.head.querySelector('meta[name=description]').content = to.meta.description
  }
  if( to.meta.ogimage){
    document.head.querySelector('meta[name=ogimage]').content = to.meta.ogimage
  }
  if( to.meta.ogurl){
    document.head.querySelector('meta[name=ogurl]').content = to.meta.ogurl
  }
  if( to.meta.ogdescription){
    document.head.querySelector('meta[name=ogdescription]').content = to.meta.ogdescription
  }
  if( to.meta.ogsitename){
    document.head.querySelector('meta[name=ogsitename]').content = to.meta.ogsitename
  }
  if( to.meta.ogtitle){
    document.head.querySelector('meta[name=ogtitle]').content = to.meta.ogtitle
  }
  
  next();

})

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
