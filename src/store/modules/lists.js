import * as types from '../mutation-types'
import api from '../../api'
import _ from 'lodash'

// Initial state
const state = {
  data: []
}

// Getters
const getters = {

}

// Actions
const actions = {
  getLists ({ commit, rootState, state }) {
    api
      .get('/list', {
        headers: {
          'x-access-token': rootState.token
        }
      })
      .then(response => {
        commit(types.SET_LISTS, { lists: response.data })
      })
      .catch(error => {
        console.log('error', error)
      })
  },

  updateLists ({ commit, rootState, state, dispatch }, lists) {
    console.log('update lists action')
    commit(types.SET_LISTS, { lists })
    api
      .patch('/list', { lists }, {
        headers: {
          'x-access-token': rootState.token
        }
      })
  },

  createList ({ commit, rootState, state, dispatch }, name) {
    api
    .post('/list', { name, index: state.data.length }, {
      headers: {
        'x-access-token': rootState.token
      }
    })
    .then(response => {
      commit(types.ADD_LIST, { list: response.data })
    })
    .catch(error => {
      console.log('error', error)
    })
  },

  deleteList ({ commit, rootState, dispatch }, list) {
    api
      .delete(`/list/${list._id}`, {
        headers: {
          'x-access-token': rootState.token
        }
      })
      .then(response => {
        commit(types.REMOVE_LIST, { list })
      })
      .catch(error => {
        console.log('error', error)
      })
  }

}

// Mutations
const mutations = {
  [types.SET_LISTS] (state, { lists }) {
    state.data = lists
  },

  [types.ADD_LIST] (state, { list }) {
    state.data.unshift(list)
  },

  [types.REMOVE_LIST] (state, { list }) {
    const index = _.findIndex(state.data, currentList => currentList._id === list._id)
    console.log('index', index)
    state.data.splice(index, 1)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
