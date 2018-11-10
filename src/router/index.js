import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/login'
import home from '@/views/home/home'
import addUser from '@/views/addUser/add'
import first from '@/views/first/first'
import index from '@/views/index/index'
import nogrant from '@/views/nogrant/nogrant'
import alerdy from '@/views/alerdy/alerdy'
import news from '@/views/news/news'
import addroles from '@/views/addroles/addroles'

Vue.use(Router)
// 运行一下
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: 'first',
          name: 'first',
          component: first
        },
        {
          path: 'index',
          name: 'index',
          component: index
        },
        {
          path: 'adduser',
          name: 'addUser',
          component: addUser
        },
        {
          path: 'nogrant',
          name: 'nogrant',
          component: nogrant
        },
        {
          path: 'alerdy',
          name: 'alerdy',
          component: alerdy
        },
         {
          path: 'news',
          name: 'news',
          component: news
        },
        {
          path: 'addroles',
          name: 'addroles',
          component: addroles
        }
        
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.name === 'login') {
//     next()
//   } else {
//     if ( !window.localStorage.getItem('token')) {
//       next({
//         'name': 'login'
//       })
//     } else {
//       next()
//     }
//   }
// })
export default router
