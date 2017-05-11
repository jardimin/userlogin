import * as types from '../mutation-types'

import _ from 'underscore'

// initial state
const state = {
  title: null,
  desc: null
}

// mutations
const mutations = {
  [types.PUSH_MESSAGE] (state, message) {
    state.title = message.title
    state.desc = message.desc
  },

  [types.REMOVE_MESSAGE] (state) {
    state.title = null
    state.desc = null
  }
}

export default {
  state,
  mutations
}
