import Vue from 'vue'
import Router from 'vue-router'
import Ninjas from './views/Ninjas'
import NinjasBoard from './views/Ninjas/Board'
import NinjasAlive from './views/Ninjas/Alive'
import NinjasDead from './views/Ninjas/Dead'
import Login from './views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ninjas',
      name: 'ninjas',
      component: Ninjas,
      children: [
        {
          path: 'board',
          name: 'ninjasBoard',
          component: NinjasBoard
        },
        {
          path: 'alive',
          name: 'ninjasAlive',
          component: NinjasAlive
        },
        {
          path: 'dead',
          name: 'ninjasDead',
          component: NinjasDead
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
