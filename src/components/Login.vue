<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--6-col">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Login</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input v-model="logar.email" class="mdl-textfield__input" type="text" id="email">
              <label class="mdl-textfield__label" for="email">Email</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input v-model="logar.senha" class="mdl-textfield__input" type="password" id="senha">
              <label class="mdl-textfield__label" for="senha">Senha</label>
            </div>
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <a @click.prevent="signin" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Enviar
            </a>
          </div>
        </div>
      </div>
      <div class="mdl-cell mdl-cell--6-col">
        <div class="demo-card-wide mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title">
            <h2 class="mdl-card__title-text">Cadastre-se</h2>
          </div>
          <div class="mdl-card__supporting-text">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input v-model="cadastro.nome" class="mdl-textfield__input" type="text" id="nome">
              <label class="mdl-textfield__label" for="nome">Nome</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input v-model="cadastro.email" class="mdl-textfield__input" type="text" id="email">
              <label class="mdl-textfield__label" for="email">Email</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input v-model="cadastro.senha" class="mdl-textfield__input" type="password" id="senha">
              <label class="mdl-textfield__label" for="senha">Senha</label>
            </div>
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <a @click.prevent="cadastrar" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
              Enviar
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <ul>
          <li v-for="(u, index) in users">{{u.email}} {{u.nome}} <span class="mdl-button mdl-button-primary" @click.prevent="deleteUser(u['.key'])">Delete</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'login',
  firebase () {
    return {
      users: this.$root.db.ref('user')
    }
  },
  data() {
    return {
      logar: {
        email: '',
        senha: ''
      },
      cadastro: {
        email: '',
        senha: '',
        nome: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'login',
      'userRegister'
    ]),
    cadastrar () {
      // this.userRegister(this.cadastro)
      // this.$root.firebaseApp.auth().createUserWithEmailAndPassword(this.cadastro.email, this.cadastro.senha)
      //   .then( (user) => {
      //     console.log(user);
      //   })
      //   .catch( (error) => {
      //     console.log(error);
      //   })
      this.$firebaseRefs.users.push(this.cadastro, (error, data) => {
        console.log(error)
        console.log(data)
      })
    },
    signin () {
      // this.$firebaseRefs.users.push(this.logar)
      // this.login(this.logar)
    },
    deleteUser (key) {
      this.$firebaseRefs.users.child(key).remove( () => {
        console.log('worked');
      })
    }
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  }
}
</script>

<style>

</style>
