import Vue from 'vue'
import Vuex from 'vuex'
// Importa as actions e os getters
import * as actions from './actions'
import * as getters from './getters'
// Importa todos os Modelos(modules)
import user from './modules/user'
import message from './modules/message'
// Cria o logger para desenvolvimento
import createLogger from './plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user,
    message
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
