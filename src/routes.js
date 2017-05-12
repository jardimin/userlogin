import Vue from 'vue'
import VueRouter from 'vue-router'

// Importa todas as views a serem usadas
import Home from './views/Home.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '*', redirect: '/home' }
  ]
})