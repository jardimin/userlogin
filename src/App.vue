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
        <message v-if="message.title"></message>
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
      this.$root.auth.onAuthStateChanged((user) => {
        this.userUpdate({ loaded: true })
        if (user === null) {
          console.log('Deslogado')
          this.userUpdate({ connected: null, emailVerified: null })
        } else {
          this.isUser(user.email)
          if (user.emailVerified) {
            console.log('Email is verified')
            this.userUpdate({ connected: true, emailVerified: true })
          } else if (user.confirm_email) {
            this.userUpdate({ connected: true, emailVerified: null })
          } else {
            this.userUpdate({ connected: true, emailVerified: null })
            user.sendEmailVerification()
            console.log(this.user)
            this.$firebaseRefs.users.child(this.user.ref).set({ confirm_email: true })
          }
        }
      })
    })
  },

  updated () {
    this.$nextTick(function () {
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