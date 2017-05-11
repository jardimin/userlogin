import * as types from '../mutation-types'

import _ from 'underscore'

// initial state
const state = {
  connected: false,
  connecting: false,
  emailVerified: false,
  name: '',
  username: '',
  email: '',
  descricao: ''
}

// mutations
const mutations = {
  [types.CONNECT] (state, { item }) {
    state.connected = true
    for (var key in item) {
      if (item.hasOwnProperty(key)) {
        state[key] = item[key]
      }
    }
  },

  [types.CONNECTING] (state) {
    state.connecting = !state.connecting
  },

  [types.DISCONECT] (state) {
    state.connected = false
    state.connecting = false
    state.name = ''
    state.username = ''
    state.email = ''
  }
}

export default {
  state,
  mutations
}
