import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api'
import lists from './modules/lists'
import items from './modules/items'
import createLogger from '../plugins/logger'
import * as types from './mutation-types'
// import _ from 'lodash'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({

  state: {
    token: window.localStorage.getItem('token') || null,
    selectedList: null,
    editMode: false
  },

  modules: {
    lists,
    items
  },

  actions: {
    getToken ({ commit, store }, { email, password }) {
      api
        .post('/authenticate', {
          email: email,
          password: password
        })
        .then(response => {
          if (response.data.token) {
            commit(types.SET_TOKEN, { token: response.data.token })
          }
        })
        .catch(error => {
          console.log('error', error)
        })
    },

    selectList ({ commit, dispatch }, list) {
      dispatch('items/getItems', list).then(() => {
        commit(types.SELECT_LIST, { list })
      })
    }
  },

  mutations: {
    [types.SET_TOKEN] (state, { token }) {
      state.token = token
      window.localStorage.setItem('token', token)
    },
    [types.SELECT_LIST] (state, { list }) {
      state.selectedList = list
    },
    [types.UNSELECT_LIST] (state) {
      state.selectedList = null
    },
    [types.TOGGLE_EDIT_MODE] (state, bool) {
      state.editMode = bool
    }
  },

  strict: debug,

  plugins: debug ? [createLogger()] : []

})
