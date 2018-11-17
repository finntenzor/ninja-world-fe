import Vue from 'vue'
import Vuex from 'vuex'
import axios from './plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initOver: false,
    isLogin: false,
    userInfo: null,
    ninjaBoard: [],
    ninjaList: [],
    taskList: [],
    bossList: [],
    firstNinja: null,
    nowTimer: null,
    nowDate: new Date()
  },
  getters: {
    initOver: state => state.initOver,
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
    ninjaBoard: state => state.ninjaBoard,
    ninjaList: state => state.ninjaList,
    aliveNinjaList: state => state.ninjaList.filter(ninja => ninja.hp > 0),
    deadNinjaList: state => state.ninjaList.filter(ninja => ninja.hp <= 0),
    taskList: state => state.taskList,
    bossList: state => state.bossList,
    firstNinja: state => state.firstNinja,
    nowDate: state => state.nowDate,
    now: state => parseInt(state.nowDate.getTime() / 1000)
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
    setNinjaBoard(state, value) {
      state.ninjaBoard = value
    },
    setNinjaList(state, value) {
      state.ninjaList = value
    },
    setTaskList(state, value) {
      state.taskList = value
    },
    setBossList(state, value) {
      state.bossList = value
    },
    setFirstNinja(state, value) {
      state.firstNinja = value
    },
    setNowTimer(state, value) {
      state.nowTimer = value
    },
    setNowDate(state, value) {
      state.nowDate = value
    }
  },
  actions: {
    startTimer({ state, commit }) {
      function refresh() {
        commit('setNowDate', new Date())
      }
      if (state.nowTimer) {
        clearInterval(state.nowTimer)
      }
      const timer = setInterval(refresh, 1000)
      commit('setNowTimer', timer)
    },
    async init({ dispatch, commit }) {
      const tasks = ['getLoginInfo', 'getNinjaBoard', 'getNinjaList', 'getTaskList', 'getBossList']
      const promises = tasks.map(taskName => dispatch(taskName))
      const initPromise = Promise.all(promises)
      let results = []
      try {
        results = await initPromise
      } catch (err) {
      }
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
      location.reload()
    },
    async getNinjaBoard({ commit }) {
      const board = await axios.get('/api/v1/ninja/get_board')
      commit('setNinjaBoard', board)
      return board
    },
    async hireNinja({ dispatch }, rarity) {
      const data = await axios.post('/api/v1/ninja/hire', { rarity })
      await dispatch('getNinjaList')
      await dispatch('getLoginInfo')
      return data
    },
    async getNinjaList({ commit }) {
      const ninjaList = await axios.get('/api/v1/ninja/get_my_ninjas')
      commit('setNinjaList', ninjaList)
      return ninjaList
    },
    async cureNinja({ dispatch }, id) {
      const msg = await axios.post('/api/v1/ninja/cure', { ninja_id: id })
      await dispatch('getNinjaList')
      await dispatch('getLoginInfo')
      return msg
    },
    async fireNinja({ dispatch }, id) {
      const msg = await axios.post('/api/v1/ninja/fire', { ninja_id: id })
      await dispatch('getNinjaList')
      await dispatch('getLoginInfo')
      return msg
    },
    async getTaskList({ commit }) {
      const taskList = await axios.get('/api/v1/task/get_all_task')
      commit('setTaskList', taskList)
      return taskList
    },
    async executeTask({ dispatch }, { ninja_id, task_id }) {
      const data = await axios.post('/api/v1/task/execute', { ninja_id, task_id })
      await dispatch('getTaskList')
      await dispatch('getNinjaList')
      await dispatch('getLoginInfo')
      return data
    },
    async getBossList({ commit }) {
      const bossList = await axios.get('/api/v1/boss/get_all_boss')
      commit('setBossList', bossList)
      return bossList
    }
  }
})
