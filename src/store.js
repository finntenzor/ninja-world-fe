import Vue from 'vue'
import Vuex from 'vuex'
import axios from './plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initOver: false,
    isLogin: false,
    userInfo: null
  },
  getters: {
    initOver: state => state.initOver,
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
  },
  mutations: {
    setIsLogin(state, value) {
      state.isLogin = value
    },
    setInitOver(state, value) {
      state.initOver = value
    },
    setUserInfo(state, value) {
      state.userInfo = value
    },
  },
  actions: {
    async init({ dispatch, commit }, payload) {
      const tasks = ['getLoginInfo']
      const promises = tasks.map(taskName => dispatch(taskName))
      const initPromise = Promise.all(promises)
      const results = await initPromise
      commit('setInitOver', true)
      return results
    },
    async getLoginInfo({ commit }) {
      const data = await axios.get('/api/v1/auth/get_login_info')
      commit('setIsLogin', !!data.login)
      commit('setUserInfo', data.info)
      return data
    },
    async login({ dispatch }, { username, password }) {
      await axios.post('/api/v1/auth/login', { username, password })
      await dispatch('getLoginInfo')
    },
    async register({ dispatch }, { username, password }) {
      const input = { username, password }
      await axios.post('/api/v1/user/register', input)
      await dispatch('login', input)
    },
    async logout() {
      await axios.post('/api/v1/auth/logout')
      await dispatch('getLoginInfo')
    }
  }
})
