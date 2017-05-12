<template>
  <div id="app">
    <transition enter-active-class="animated fadein" leave-active-class="animated fadein" mode="out-in">
      <div v-if="user.loaded" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header">
          <div class="mdl-layout__header-row">
            <!-- Title -->
            <span class="mdl-layout-title">Login e Posts Firebase</span>
            <!-- Add spacer, to align navigation to the right -->
            <div class="mdl-layout-spacer"></div>
            <!-- Navigation. We hide it in small screens. -->
            <nav class="mdl-navigation mdl-layout--large-screen-only">
              <a class="mdl-navigation__link" :class="{'mdl-badge': users.length > 0}" href="" :data-badge="users.length">Usuarios</a>
              <a class="mdl-navigation__link mdl-badge" href="" data-badge="5">Posts</a>
            </nav>
          </div>
        </header>
        <div class="mdl-layout__drawer">
          <span class="mdl-layout-title">Title</span>
          <nav class="mdl-navigation">
            <a class="mdl-navigation__link" :class="{'mdl-badge': users.length > 0}" href="" :data-badge="users.length">Usuarios</a>
            <a class="mdl-navigation__link mdl-badge" href="" data-badge="5">Posts</a>
            <a v-if="user.connected" @click.prevent="signout" class="mdl-navigation__link" href="">LogOut</a>
            <a v-else class="mdl-navigation__link" href="">LogIn</a>
          </nav>
        </div>
        <!--Componente que mostra mensagens de erro ou sucesso-->
        <message v-if="message.title"></message>
        <!--Componente que mostra mensagens de erro ou sucesso-->
        <main class="mdl-layout__content">
          <router-view class="page-content"></router-view>
        </main>
      </div>
      <div v-else>
        <div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import auth from './mixins/auth.js'

import _ from 'underscore'

import Message from './components/Message.vue'

export default {
  name: 'app',
  mixins: [auth],
  computed: {
    ...mapGetters([
      'user',
      'message'
    ])
  },

  firebase () {
    return {
      users: this.$root.db.ref('user'),
      posts: this.$root.db.ref('posts')
    }
  },

  methods: {
    ...mapActions([
      'userUpdate',
      'flashMessage'
    ])
  },

  mounted () {
    this.$nextTick(() => {
      // Acompanha a mudança de status do currentUser
      this.$root.auth.onAuthStateChanged((user) => {
        // Sinal para o carregamento da página
        this.userUpdate({ loaded: true })
        // Se não houver currentUser
        if (user === null) {
          console.log('Deslogado')
          this.userUpdate({ connected: null, emailVerified: null })
        // Se houver currentUser
        } else {
          // Chama função que se encontra no mixin auth.js
          this.isUser(user.email)
          // Determina a propriedade logado do usuário em sua referencia na database para true
          this.$firebaseRefs.users.child(this.user.ref).child('logado').set(true)
          // Se o usuário já verificou o email
          if (user.emailVerified) {
            console.log('Email is verified')
            // Mutaciona o modelo de user no Vuex
            this.userUpdate({ connected: true, emailVerified: true })
          // Se o usuário ainda não verificou seu email mas o email de verificação já foi enviado
          } else if (user.confirm_email) {
            // Mutaciona o modelo de user no Vuex
            this.userUpdate({ connected: true, emailVerified: null })
          // Se o usuário ainda não verificou seu email e o email de verificação ainda não foi enviado
          } else {
            // Mutaciona o modelo de user no Vuex
            this.userUpdate({ connected: true, emailVerified: null })
            // Envia o email de verificação
            user.sendEmailVerification()
            // // Determina a propriedade confirm_email do usuário em sua referencia na database para true
            this.$firebaseRefs.users.child(this.user.ref).child('confirm_email').set(true)
          }
        }
      })
    })
  },

  updated () {
    this.$nextTick(function () {
      // Ação da biblioteca do Material Design Lite para executar as funções de update do DOM
      componentHandler.upgradeDom()
    })
  },

  components: {
    Message
  }
}
</script>

<style lang="scss">
.mdl-badge[data-badge]:after {
  top: 14px;
  right: 5px;
}
.mdl-layout__drawer {
  .mdl-badge[data-badge]:after {
    top: 18px;
    right: 25px;
  }
}
</style>