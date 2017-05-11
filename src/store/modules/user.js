import * as types from '../mutation-types'

import _ from 'underscore'

// initial state
const state = {
  connected: null,
  loaded: null,
  emailVerified: null,
  nome: null,
  email: null,
  ref: null
}

// mutations
const mutations = {
  [types.USER_UPDATE] (state, obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === '.key') {
          state.ref = obj[key]
        } else {
          state[key] = obj[key]
        }
      }
    }
  },

  [types.DISCONECT] (state) {
    for (var key in state) {
      if (state.hasOwnProperty(key)) {
        state[key] = null
      }
    }
  }
}

export default {
  state,
  mutations
}
