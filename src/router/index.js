import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from 'views/homePage'
import SecondPage from 'views/SecondPage'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'kisekiremi_1'
    }
  },
  {
    path: '/secondPage',
    component: SecondPage,
    meta: {
      title: 'kisekiremi_2'
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const Router = new VueRouter({
  routes: routes
})

/* route guard */
Router.beforeEach((to, from, next) => {
  Vue.prototype.$setTitle(to.meta.title)
  next()
  // ...
})

/* 路由返回滚动 */
Router.afterEach(() => {
  window.scrollTo(0, 0)
  // ...
})

export default Router
