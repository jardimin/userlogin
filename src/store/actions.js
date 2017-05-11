import * as types from './mutation-types'
import _ from 'underscore'

export const userUpdate = ({ commit, state }, item) => {
  commit(types.USER_UPDATE, item)
}

export const logout = ({ commit, state }) => {
  console.log('logout')
  commit(types.DISCONECT)
}

export const flashMessage = ({ commit, state }, message) => {
  console.log('logout')
  commit(types.PUSH_MESSAGE, message)
  setTimeout(() => {
    commit(types.REMOVE_MESSAGE)
  }, 15000)
}
