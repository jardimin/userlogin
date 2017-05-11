// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import 'babel-polyfill'
import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'
import router from './routes.js'

Vue.use(VueFire)

import store from './store'

import App from './App.vue'

var firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyA0mBa32a-bObvU_FpIa4tuRjkRNfh7i48',
  authDomain: 'teste-73511.firebaseapp.com',
  databaseURL: 'https://teste-73511.firebaseio.com',
  projectId: 'teste-73511',
  storageBucket: 'teste-73511.appspot.com',
  messagingSenderId: '181501843283'
})
var db = firebaseApp.database()
var auth = firebaseApp.auth()

new Vue({
  router,
  store,
  data: {
    db: db,
    firebaseApp: firebaseApp,
    auth: auth
  },
  render: (h) => h(App)
}).$mount('#app')
