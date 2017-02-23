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
  getItems ({ commit, rootState, dispatch }, list) {
    api
      .get(`/list/${list._id}`, {
        headers: {
          'x-access-token': rootState.token
        }
      })
      .then(response => {
        commit(types.SET_ITEMS, { items: response.data.items })
      })
      .catch(error => {
        console.log('error', error)
      })
  },

  updateItems ({ commit, rootState, dispatch }, items) {
    commit(types.SET_ITEMS, { items })
    api
      .patch('/item', { items }, {
        headers: {
          'x-access-token': rootState.token
        }
      })
  },

  updateItem ({ commit, rootState, state, dispatch }, item) {
    console.log('updateItem', item)
    // commit(types.SAVE_ITEM, { item })
    api
      .patch('/item', { item }, {
        headers: {
          'x-access-token': rootState.token
        }
      })
      .then(response => {
        console.log('item.completed', item.completed)
        if (item.completed) {
          commit(types.REMOVE_ITEM, item)
        } else {
          commit(types.SET_ITEM, item)
        }
      })
      .catch(error => {
        console.log('error', error)
      })
  },

  createItem ({ commit, rootState, state, dispatch }, name) {
    console.log('createItem', name, state.data.length)
    api
      .post('/item', {
        name,
        list: rootState.selectedList._id,
        index: state.data.length
      }, {
        headers: {
          'x-access-token': rootState.token
        }
      })
      .then(response => {
        dispatch('getItems', rootState.selectedList)
      })
      .catch(error => {
        console.log('error', error)
      })
  },

  deleteItem ({ commit, rootState, dispatch }, item) {
    api
      .delete(`/item/${item._id}`, {
        headers: {
          'x-access-token': rootState.token
        }
      })
      .then(response => {
        commit(types.REMOVE_ITEM, item)
      })
      .catch(error => {
        console.log('error', error)
      })
  }
}

// Mutations
const mutations = {
  [types.SET_ITEMS] (state, { items }) {
    state.data = items
  },
  [types.SET_ITEM] (state, item) {
    const index = _.findIndex(state.data, currentItem => currentItem._id === item._id)
    state.data.splice(index, 1, item)
  },
  [types.REMOVE_ITEM] (state, item) {
    const index = _.findIndex(state.data, currentItem => currentItem._id === item._id)
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
