import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./components/Landing.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/auth/Login.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('./components/auth/Logout.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('./components/auth/404.vue')
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./components/UserList.vue')
    },
  ]
})
