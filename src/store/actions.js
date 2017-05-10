import * as types from './mutation-types'
import _ from 'underscore'

export const userRegister = ({ commit, state }, item) => {
  console.log('userRegister')
  console.log('item: ', item)
}

export const registerConfirm = ({ commit, state }, item) => {
  console.log('registerConfirm')
  console.log('item: ', item)
}

export const forgotPassword = ({ commit, state }, item) => {
  console.log('forgotPassword')
  console.log('item: ', item)
}

export const login = ({ commit, state }, item) => {
  console.log('login')
  console.log('item: ', item)
}

export const logout = ({ commit, state }, item) => {
  console.log('logout')
  console.log('item: ', item)
}