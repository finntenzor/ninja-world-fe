import store from '@/store'
import router from '@/router'

router.beforeEach(async(to, from, next) => {
  if (!store.getters.initOver) {
    await store.dispatch('getLoginInfo')
  }
  if (to.path === '/login') {
    next()
    return
  }
  if (store.state.isLogin) {
    next()
  } else {
    next('/login')
  }
})
