<template>
  <div id="app">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
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
          <a v-if="logado" @click.prevent="signout" class="mdl-navigation__link" href="">LogOut</a>
          <a v-else class="mdl-navigation__link" href="">LogIn</a>
        </nav>
      </div>
      <main class="mdl-layout__content">
        <router-view class="page-content"></router-view>
      </main>
    </div>
  </div>
</template>

<script>

import auth from './mixins/auth.js'

export default {
  name: 'app',
  mixins: [auth],
  data () {
    return {
      logado: false,
      confirmado: false
    }
  },

  firebase () {
    return {
      users: this.$root.db.ref('user'),
      posts: this.$root.db.ref('posts')
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.$root.auth.onAuthStateChanged((user) => {
        if (user === null) {
          console.log('Deslogado')
          this.logado = false
          this.confirmado = false
        } else if (user.emailVerified) {
          console.log('Email is verified')
          this.logado = true
          this.confirmado = true
        } else {
          this.logado = true
          this.confirmado = false
          user.sendEmailVerification()
        }
      })
    })
  },

  updated () {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  }
}
</script>
