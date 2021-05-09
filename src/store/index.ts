import { createStore } from 'vuex'

const defaultState = {
  list: window.localStorage.getItem('todoList') || []
}
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    saveList(state: typeof defaultState, params) {
      localStorage.setItem('todoList', params)
    }
  },
  actions: {
    add({ commit }, params) {
      commit('saveList', params)
    }
  },
  getters: {
    list(state) {
      return state.list
    }
  }
})
