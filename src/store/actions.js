import * as types from './mutation-types'
import _ from 'underscore'

// Recebe um objeto e mutaciona o modelo user no Vuex de acordo com o objeto passado
export const userUpdate = ({ commit, state }, item) => {
  commit(types.USER_UPDATE, item)
}

// Mutaciona o modelo user no Vuex para constar o usuário como deslogado
export const logout = ({ commit, state }) => {
  console.log('logout')
  commit(types.DISCONECT)
}

// Mutaciona o modelo message no Vuex para exibir mensagens de erro ou sucesso
export const flashMessage = ({ commit, state }, message) => {
  console.log('logout')
  commit(types.PUSH_MESSAGE, message)
  setTimeout(() => {
    commit(types.REMOVE_MESSAGE)
  }, 15000)
}
