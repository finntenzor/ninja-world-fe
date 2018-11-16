import Vue from 'vue'
import Router from 'vue-router'
import MainLayout from './layouts/MainLayout'
import NinjasBoard from './views/Ninjas/Board'
import NinjasAlive from './views/Ninjas/Alive'
import NinjasDead from './views/Ninjas/Dead'
import Tasks from './views/Tasks'
import Bosses from './views/Bosses'
import Login from './views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ninjas',
      name: 'Ninjas',
      component: MainLayout,
      children: [
        {
          path: 'board',
          name: 'NinjasBoard',
          component: NinjasBoard
        },
        {
          path: 'alive',
          name: 'NinjasAlive',
          component: NinjasAlive
        },
        {
          path: 'dead',
          name: 'NinjasDead',
          component: NinjasDead
        }
      ]
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: MainLayout,
      children: [
        {
          path: 'index',
          name: 'TasksIndex',
          component: Tasks,
        }
      ]
    },
    {
      path: '/bosses',
      name: 'Bosses',
      component: MainLayout,
      children: [
        {
          path: 'index',
          name: 'BossesIndex',
          component: Bosses,
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
